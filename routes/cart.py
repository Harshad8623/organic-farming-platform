"""
routes/cart.py
--------------
Shopping Cart: Add, view, remove items.
Checkout supports:
  - COD  (Cash on Delivery)  → direct form POST
  - Razorpay UPI / Card      → two-step: create order → verify signature → save
"""

import hmac
import hashlib
import razorpay

from flask import (Blueprint, render_template, redirect, url_for,
                   flash, request, jsonify, current_app)
from flask_login import login_required, current_user
from models import db, CartItem, Product, Order

cart_bp = Blueprint('cart', __name__, url_prefix='/cart')


def _razorpay_client():
    """Return an authenticated Razorpay client."""
    return razorpay.Client(
        auth=(current_app.config['RAZORPAY_KEY_ID'],
              current_app.config['RAZORPAY_KEY_SECRET'])
    )


# ---------------------------------------------------------------------------
# View Cart
# ---------------------------------------------------------------------------
@cart_bp.route('/')
@login_required
def view_cart():
    if not current_user.is_buyer():
        flash('Only buyers can access the cart.', 'danger')
        return redirect(url_for('marketplace.listing'))

    items = CartItem.query.filter_by(buyer_id=current_user.id).all()
    total = sum(item.subtotal() for item in items)
    razorpay_key = current_app.config.get('RAZORPAY_KEY_ID', '')
    return render_template('cart/cart.html',
                           items=items,
                           total=total,
                           razorpay_key=razorpay_key)


# ---------------------------------------------------------------------------
# Add to Cart
# ---------------------------------------------------------------------------
@cart_bp.route('/add/<int:product_id>', methods=['POST'])
@login_required
def add_to_cart(product_id):
    if not current_user.is_buyer():
        flash('Only buyers can add items to cart.', 'danger')
        return redirect(url_for('marketplace.listing'))

    product = Product.query.get_or_404(product_id)

    if product.farmer_id == current_user.id:
        flash('You cannot buy your own product.', 'warning')
        return redirect(url_for('marketplace.listing'))

    qty = int(request.form.get('quantity', 1))
    if qty < 1:
        qty = 1

    existing = CartItem.query.filter_by(
        buyer_id=current_user.id,
        product_id=product_id
    ).first()

    if existing:
        existing.quantity += qty
    else:
        item = CartItem(buyer_id=current_user.id, product_id=product_id, quantity=qty)
        db.session.add(item)

    db.session.commit()
    flash(f'🛒 "{product.name}" added to cart!', 'success')
    return redirect(request.referrer or url_for('marketplace.listing'))


# ---------------------------------------------------------------------------
# Remove from Cart
# ---------------------------------------------------------------------------
@cart_bp.route('/remove/<int:item_id>', methods=['POST'])
@login_required
def remove_from_cart(item_id):
    item = CartItem.query.get_or_404(item_id)
    if item.buyer_id != current_user.id:
        flash('Access denied.', 'danger')
        return redirect(url_for('cart.view_cart'))
    db.session.delete(item)
    db.session.commit()
    flash('Item removed from cart.', 'info')
    return redirect(url_for('cart.view_cart'))


# ---------------------------------------------------------------------------
# Update Quantity
# ---------------------------------------------------------------------------
@cart_bp.route('/update/<int:item_id>', methods=['POST'])
@login_required
def update_quantity(item_id):
    item = CartItem.query.get_or_404(item_id)
    if item.buyer_id != current_user.id:
        return jsonify({'error': 'Access denied'}), 403
    qty = int(request.form.get('quantity', 1))
    if qty < 1:
        db.session.delete(item)
    else:
        item.quantity = qty
    db.session.commit()
    return redirect(url_for('cart.view_cart'))


# ---------------------------------------------------------------------------
# STEP 1 — Create Razorpay Order  (called via fetch from frontend)
# ---------------------------------------------------------------------------
@cart_bp.route('/create-razorpay-order', methods=['POST'])
@login_required
def create_razorpay_order():
    """
    Creates a Razorpay order for the current cart total.
    Returns JSON: { razorpay_order_id, amount, currency, key }
    """
    if not current_user.is_buyer():
        return jsonify({'error': 'Only buyers can checkout.'}), 403

    items = CartItem.query.filter_by(buyer_id=current_user.id).all()
    if not items:
        return jsonify({'error': 'Cart is empty.'}), 400

    delivery_location = (request.json or {}).get('delivery_location', '').strip()
    if not delivery_location:
        return jsonify({'error': 'Delivery address is required.'}), 400

    # Convert total to paise (Razorpay uses smallest currency unit)
    total_rupees = sum(item.subtotal() for item in items)
    amount_paise = int(total_rupees * 100)

    try:
        client = _razorpay_client()
        rz_order = client.order.create({
            'amount':   amount_paise,
            'currency': 'INR',
            'payment_capture': 1,       # Auto-capture
            'notes': {
                'buyer_id': current_user.id,
                'buyer_name': current_user.name,
            }
        })
    except Exception as e:
        current_app.logger.error(f'Razorpay order creation failed: {e}')
        return jsonify({'error': 'Payment gateway error. Please try again.'}), 500

    return jsonify({
        'razorpay_order_id': rz_order['id'],
        'amount':            amount_paise,
        'currency':          'INR',
        'key':               current_app.config['RAZORPAY_KEY_ID'],
        'name':              current_user.name,
        'email':             current_user.email,
    })


# ---------------------------------------------------------------------------
# STEP 2 — Verify & Confirm (Razorpay callback)
# ---------------------------------------------------------------------------
@cart_bp.route('/verify-payment', methods=['POST'])
@login_required
def verify_payment():
    """
    Called after Razorpay popup succeeds.
    Verifies HMAC-SHA256 signature, creates DB orders, clears cart.
    """
    if not current_user.is_buyer():
        flash('Only buyers can checkout.', 'danger')
        return redirect(url_for('marketplace.listing'))

    razorpay_order_id   = request.form.get('razorpay_order_id', '')
    razorpay_payment_id = request.form.get('razorpay_payment_id', '')
    razorpay_signature  = request.form.get('razorpay_signature', '')
    delivery_location   = request.form.get('delivery_location', '').strip()

    if not all([razorpay_order_id, razorpay_payment_id, razorpay_signature]):
        flash('Payment verification failed — incomplete data.', 'danger')
        return redirect(url_for('cart.view_cart'))

    # ---- Signature Verification (HMAC-SHA256) ----
    key_secret = current_app.config['RAZORPAY_KEY_SECRET'].encode('utf-8')
    msg        = f'{razorpay_order_id}|{razorpay_payment_id}'.encode('utf-8')
    expected   = hmac.new(key_secret, msg, hashlib.sha256).hexdigest()

    if not hmac.compare_digest(expected, razorpay_signature):
        flash('⚠️ Payment verification failed — signature mismatch. Please contact support.', 'danger')
        return redirect(url_for('cart.view_cart'))

    # ---- Create DB Orders ----
    items = CartItem.query.filter_by(buyer_id=current_user.id).all()
    if not items:
        flash('Your cart is empty!', 'warning')
        return redirect(url_for('cart.view_cart'))

    order_count = 0
    for item in items:
        order = Order(
            buyer_id            = current_user.id,
            farmer_id           = item.product.farmer_id,
            product_id          = item.product_id,
            quantity_ordered    = item.quantity,
            total_price         = item.subtotal(),
            delivery_location   = delivery_location,
            payment_method      = 'razorpay',
            razorpay_order_id   = razorpay_order_id,
            razorpay_payment_id = razorpay_payment_id,
            status              = 'pending'
        )
        db.session.add(order)
        order_count += 1

    CartItem.query.filter_by(buyer_id=current_user.id).delete()
    db.session.commit()

    flash(f'✅ Payment successful! {order_count} order(s) placed. Payment ID: {razorpay_payment_id}', 'success')
    return redirect(url_for('orders.buyer_orders'))


# ---------------------------------------------------------------------------
# COD Checkout (unchanged flow)
# ---------------------------------------------------------------------------
@cart_bp.route('/checkout', methods=['POST'])
@login_required
def checkout():
    """Cash on Delivery checkout — no payment gateway needed."""
    if not current_user.is_buyer():
        flash('Only buyers can checkout.', 'danger')
        return redirect(url_for('marketplace.listing'))

    items = CartItem.query.filter_by(buyer_id=current_user.id).all()
    if not items:
        flash('Your cart is empty!', 'warning')
        return redirect(url_for('cart.view_cart'))

    delivery_location = request.form.get('delivery_location', '').strip()
    if not delivery_location:
        flash('Please enter your delivery address.', 'danger')
        return redirect(url_for('cart.view_cart'))

    order_count = 0
    for item in items:
        order = Order(
            buyer_id          = current_user.id,
            farmer_id         = item.product.farmer_id,
            product_id        = item.product_id,
            quantity_ordered  = item.quantity,
            total_price       = item.subtotal(),
            delivery_location = delivery_location,
            payment_method    = 'cod',
            status            = 'pending'
        )
        db.session.add(order)
        order_count += 1

    CartItem.query.filter_by(buyer_id=current_user.id).delete()
    db.session.commit()

    flash(f'✅ {order_count} order(s) placed (Cash on Delivery)! Farmers will confirm soon.', 'success')
    return redirect(url_for('orders.buyer_orders'))
