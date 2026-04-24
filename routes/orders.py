"""
routes/orders.py
----------------
Order Management:
  - Buyer: view orders, submit ratings
  - Farmer: view incoming orders, accept/reject/ship/deliver
"""

from flask import Blueprint, render_template, redirect, url_for, flash, request, abort
from flask_login import login_required, current_user
from models import db, Order, Rating, Product
from datetime import datetime

orders_bp = Blueprint('orders', __name__, url_prefix='/orders')

STATUS_FLOW = {
    'pending':  ['accepted', 'rejected'],
    'accepted': ['shipped'],
    'shipped':  ['delivered'],
}


# ---------------------------------------------------------------------------
# Buyer: My Orders
# ---------------------------------------------------------------------------
@orders_bp.route('/my')
@login_required
def buyer_orders():
    if not current_user.is_buyer():
        flash('Only buyers can view their orders.', 'danger')
        return redirect(url_for('marketplace.listing'))

    orders = Order.query.filter_by(buyer_id=current_user.id)\
                        .order_by(Order.created_at.desc()).all()

    # Map order_id -> has rating
    rated_ids = {r.order_id for r in current_user.ratings_given}
    return render_template('orders/buyer_orders.html', orders=orders, rated_ids=rated_ids)


# ---------------------------------------------------------------------------
# Farmer: Incoming Orders
# ---------------------------------------------------------------------------
@orders_bp.route('/farmer')
@login_required
def farmer_orders():
    if not current_user.is_farmer():
        flash('Only farmers can view farmer orders.', 'danger')
        return redirect(url_for('marketplace.listing'))

    orders = Order.query.filter_by(farmer_id=current_user.id)\
                        .order_by(Order.created_at.desc()).all()
    return render_template('orders/farmer_orders.html', orders=orders)


# ---------------------------------------------------------------------------
# Farmer: Update Order Status
# ---------------------------------------------------------------------------
@orders_bp.route('/<int:order_id>/update', methods=['POST'])
@login_required
def update_status(order_id):
    if not current_user.is_farmer():
        abort(403)

    order = Order.query.get_or_404(order_id)
    if order.farmer_id != current_user.id:
        abort(403)

    new_status = request.form.get('status')
    allowed = STATUS_FLOW.get(order.status, [])

    if new_status not in allowed:
        flash(f'Cannot change status from "{order.status}" to "{new_status}".', 'danger')
        return redirect(url_for('orders.farmer_orders'))

    order.status     = new_status
    order.updated_at = datetime.utcnow()
    db.session.commit()

    status_msg = {
        'accepted':  '✅ Order accepted! The buyer has been notified.',
        'rejected':  '❌ Order rejected.',
        'shipped':   '🚚 Order marked as shipped!',
        'delivered': '🎉 Order marked as delivered!',
    }
    flash(status_msg.get(new_status, 'Order status updated.'), 'success')
    return redirect(url_for('orders.farmer_orders'))


# ---------------------------------------------------------------------------
# Buyer: Rate Order
# ---------------------------------------------------------------------------
@orders_bp.route('/<int:order_id>/rate', methods=['GET', 'POST'])
@login_required
def rate_order(order_id):
    if not current_user.is_buyer():
        abort(403)

    order = Order.query.get_or_404(order_id)

    if order.buyer_id != current_user.id:
        abort(403)

    if order.status != 'delivered':
        flash('You can only rate delivered orders.', 'warning')
        return redirect(url_for('orders.buyer_orders'))

    if order.rating:
        flash('You have already rated this order.', 'info')
        return redirect(url_for('orders.buyer_orders'))

    if request.method == 'POST':
        stars  = int(request.form.get('stars', 5))
        review = request.form.get('review', '').strip()

        if stars < 1 or stars > 5:
            flash('Please select a rating between 1 and 5 stars.', 'danger')
            return redirect(url_for('orders.rate_order', order_id=order_id))

        rating = Rating(
            order_id   = order.id,
            buyer_id   = current_user.id,
            farmer_id  = order.farmer_id,
            product_id = order.product_id,
            stars      = stars,
            review     = review
        )
        db.session.add(rating)
        db.session.commit()
        flash(f'⭐ Thank you for your {stars}-star review!', 'success')
        return redirect(url_for('orders.buyer_orders'))

    return render_template('orders/rate_order.html', order=order)
