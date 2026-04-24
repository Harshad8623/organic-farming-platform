"""
routes/auth.py
--------------
Authentication routes: Register, Login, Logout.
Supports two roles: 'farmer' and 'buyer'.
"""

from flask import Blueprint, render_template, redirect, url_for, flash, request, session
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, FarmerProfile, BuyerProfile

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')


# ---------------------------------------------------------------------------
# Register
# ---------------------------------------------------------------------------
@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    """Show registration form and handle new user creation."""
    if current_user.is_authenticated:
        return _redirect_dashboard()

    if request.method == 'POST':
        name     = request.form.get('name', '').strip()
        email    = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')
        confirm  = request.form.get('confirm_password', '')
        role     = request.form.get('role', 'buyer')

        # Basic validation
        if not name or not email or not password:
            flash('All fields are required.', 'danger')
            return render_template('auth/register.html')

        if password != confirm:
            flash('Passwords do not match.', 'danger')
            return render_template('auth/register.html')

        if User.query.filter_by(email=email).first():
            flash('Email already registered. Please log in.', 'warning')
            return redirect(url_for('auth.login'))

        # Create user with hashed password
        hashed_pw = generate_password_hash(password)
        user = User(name=name, email=email, password=hashed_pw, role=role)
        db.session.add(user)
        db.session.flush()  # get user.id before commit

        # Create the appropriate profile
        if role == 'farmer':
            profile = FarmerProfile(
                user_id=user.id,
                farm_location=request.form.get('location', ''),
                soil_type=request.form.get('soil_type', ''),
                phone=request.form.get('phone', '')
            )
            db.session.add(profile)
        else:
            profile = BuyerProfile(
                user_id=user.id,
                location=request.form.get('location', ''),
                phone=request.form.get('phone', '')
            )
            db.session.add(profile)

        db.session.commit()
        flash('Registration successful! Please log in.', 'success')
        return redirect(url_for('auth.login'))

    return render_template('auth/register.html')


# ---------------------------------------------------------------------------
# Login
# ---------------------------------------------------------------------------
@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    """Handle user login and role-based redirect."""
    if current_user.is_authenticated:
        return _redirect_dashboard()

    if request.method == 'POST':
        email    = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')

        user = User.query.filter_by(email=email).first()

        if user and check_password_hash(user.password, password):
            login_user(user, remember=request.form.get('remember') == 'on')
            flash(f'Welcome back, {user.name}!', 'success')
            next_page = request.args.get('next')
            return redirect(next_page or _dashboard_url(user))
        else:
            flash('Invalid email or password.', 'danger')

    return render_template('auth/login.html')


# ---------------------------------------------------------------------------
# Logout
# ---------------------------------------------------------------------------
@auth_bp.route('/logout')
@login_required
def logout():
    """Log out the current user."""
    logout_user()
    flash('You have been logged out.', 'info')
    return redirect(url_for('auth.login'))


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def _dashboard_url(user):
    if user.role == 'farmer':
        return url_for('auth.farmer_dashboard')
    return url_for('auth.buyer_dashboard')


def _redirect_dashboard():
    return redirect(_dashboard_url(current_user))


@auth_bp.route('/farmer/dashboard')
@login_required
def farmer_dashboard():
    if not current_user.is_farmer():
        flash('Access denied.', 'danger')
        return redirect(url_for('auth.buyer_dashboard'))
    from models import Product
    products = Product.query.filter_by(farmer_id=current_user.id).all()
    return render_template('farmer/dashboard.html', products=products)


@auth_bp.route('/buyer/dashboard')
@login_required
def buyer_dashboard():
    if not current_user.is_buyer():
        flash('Access denied.', 'danger')
        return redirect(url_for('auth.farmer_dashboard'))
    from models import Product
    products = Product.query.order_by(Product.created_at.desc()).limit(6).all()
    return render_template('buyer/dashboard.html', products=products)
