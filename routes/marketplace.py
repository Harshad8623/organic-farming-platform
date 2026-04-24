"""
routes/marketplace.py
---------------------
Marketplace: Farmers list products, Buyers browse and filter them.
"""

import os
import uuid
from flask import Blueprint, render_template, redirect, url_for, flash, request, current_app
from flask_login import login_required, current_user
from werkzeug.utils import secure_filename
from models import db, Product, User

marketplace_bp = Blueprint('marketplace', __name__, url_prefix='/marketplace')

ALLOWED = {'png', 'jpg', 'jpeg', 'gif', 'webp'}


def _allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED


# ---------------------------------------------------------------------------
# Browse all products (Buyer / public)
# ---------------------------------------------------------------------------
@marketplace_bp.route('/')
def listing():
    """Product listing page with optional search and category filter."""
    search   = request.args.get('search', '').strip()
    category = request.args.get('category', '')

    query = Product.query

    if search:
        query = query.filter(Product.name.ilike(f'%{search}%'))
    if category:
        query = query.filter_by(category=category)

    products  = query.order_by(Product.created_at.desc()).all()
    categories = db.session.query(Product.category).distinct().all()
    categories = [c[0] for c in categories if c[0]]

    return render_template('marketplace/listing.html',
                           products=products,
                           categories=categories,
                           search=search,
                           selected_category=category)


# ---------------------------------------------------------------------------
# Add Product (Farmer only)
# ---------------------------------------------------------------------------
@marketplace_bp.route('/add', methods=['GET', 'POST'])
@login_required
def add_product():
    """Farmer adds a new product listing."""
    if not current_user.is_farmer():
        flash('Only farmers can add products.', 'danger')
        return redirect(url_for('marketplace.listing'))

    if request.method == 'POST':
        name        = request.form.get('name', '').strip()
        price       = request.form.get('price', 0)
        quantity    = request.form.get('quantity', '').strip()
        description = request.form.get('description', '').strip()
        category    = request.form.get('category', '').strip()

        if not name or not price or not quantity:
            flash('Name, price and quantity are required.', 'danger')
            return render_template('marketplace/add_product.html')

        # Handle image upload
        image_filename = None
        file = request.files.get('image')
        if file and file.filename and _allowed_file(file.filename):
            ext = file.filename.rsplit('.', 1)[1].lower()
            image_filename = f"{uuid.uuid4().hex}.{ext}"
            file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], image_filename))

        product = Product(
            farmer_id=current_user.id,
            name=name,
            price=float(price),
            quantity=quantity,
            description=description,
            category=category,
            image_filename=image_filename
        )
        db.session.add(product)
        db.session.commit()
        flash('Product added successfully!', 'success')
        return redirect(url_for('marketplace.my_products'))

    return render_template('marketplace/add_product.html')


# ---------------------------------------------------------------------------
# My Products (Farmer only)
# ---------------------------------------------------------------------------
@marketplace_bp.route('/my-products')
@login_required
def my_products():
    """Show farmer's own product listings."""
    if not current_user.is_farmer():
        flash('Access denied.', 'danger')
        return redirect(url_for('marketplace.listing'))

    products = Product.query.filter_by(farmer_id=current_user.id)\
                            .order_by(Product.created_at.desc()).all()
    return render_template('marketplace/my_products.html', products=products)


# ---------------------------------------------------------------------------
# Delete Product (Farmer only)
# ---------------------------------------------------------------------------
@marketplace_bp.route('/delete/<int:product_id>', methods=['POST'])
@login_required
def delete_product(product_id):
    """Farmer deletes one of their products."""
    product = Product.query.get_or_404(product_id)

    if product.farmer_id != current_user.id:
        flash('You can only delete your own products.', 'danger')
        return redirect(url_for('marketplace.my_products'))

    # Remove image file if it exists
    if product.image_filename:
        img_path = os.path.join(current_app.config['UPLOAD_FOLDER'], product.image_filename)
        if os.path.exists(img_path):
            os.remove(img_path)

    db.session.delete(product)
    db.session.commit()
    flash('Product deleted.', 'success')
    return redirect(url_for('marketplace.my_products'))


# ---------------------------------------------------------------------------
# Farmer detail (Buyer view)
# ---------------------------------------------------------------------------
@marketplace_bp.route('/farmer/<int:farmer_id>')
def farmer_detail(farmer_id):
    """Buyer views farmer's profile and products."""
    farmer   = User.query.get_or_404(farmer_id)
    products = Product.query.filter_by(farmer_id=farmer_id).all()
    return render_template('marketplace/farmer_detail.html', farmer=farmer, products=products)
