"""
routes/analytics.py
-------------------
Agricultural data analytics dashboard using Plotly.
Charts are passed as JSON to the template and rendered with Plotly.js.
"""

import json
import random
from flask import Blueprint, render_template
from flask_login import login_required
from models import db, Product, User

analytics_bp = Blueprint('analytics', __name__, url_prefix='/analytics')


def _make_chart(chart_type, labels, values, title, color_scheme=None):
    """Helper to create a Plotly chart dict."""
    colors = color_scheme or ['#2e7d32','#388e3c','#43a047','#4caf50','#66bb6a',
                               '#81c784','#a5d6a7','#c8e6c9','#e8f5e9','#f1f8e9']
    if chart_type == 'bar':
        data = [{'type': 'bar', 'x': labels, 'y': values,
                 'marker': {'color': colors[:len(labels)]}}]
    elif chart_type == 'pie':
        data = [{'type': 'pie', 'labels': labels, 'values': values,
                 'marker': {'colors': colors[:len(labels)]}}]
    elif chart_type == 'line':
        data = [{'type': 'scatter', 'mode': 'lines+markers',
                 'x': labels, 'y': values,
                 'line': {'color': '#2e7d32', 'width': 3},
                 'marker': {'color': '#43a047', 'size': 8}}]
    else:
        data = []

    layout = {
        'title': {'text': title, 'font': {'size': 16}},
        'paper_bgcolor': 'rgba(0,0,0,0)',
        'plot_bgcolor':  'rgba(0,0,0,0)',
        'margin': {'l': 40, 'r': 20, 't': 50, 'b': 40},
        'xaxis': {'gridcolor': '#e0e0e0'},
        'yaxis': {'gridcolor': '#e0e0e0'},
        'showlegend': chart_type == 'pie',
    }
    return json.dumps({'data': data, 'layout': layout})


def _crop_distribution():
    """How many products per category in the marketplace."""
    rows = db.session.query(Product.category, db.func.count(Product.id))\
                     .group_by(Product.category).all()
    if not rows:
        # Sample data when DB is empty
        rows = [('Vegetables', 12), ('Fruits', 8), ('Grains', 10),
                ('Spices', 5), ('Pulses', 7), ('Dairy', 3)]
    labels = [r[0] or 'Other' for r in rows]
    values = [r[1] for r in rows]
    return _make_chart('pie', labels, values, 'Product Categories in Marketplace')


def _price_by_category():
    """Average product price per category."""
    rows = db.session.query(Product.category, db.func.avg(Product.price))\
                     .group_by(Product.category).all()
    if not rows:
        rows = [('Vegetables', 35), ('Fruits', 60), ('Grains', 25),
                ('Spices', 150), ('Pulses', 80), ('Dairy', 45)]
    labels = [r[0] or 'Other' for r in rows]
    values = [round(r[1], 2) for r in rows]
    return _make_chart('bar', labels, values, 'Average Price per Category (₹/kg)')


def _monthly_registrations():
    """Simulated monthly user registrations (last 12 months)."""
    months = ['May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr']
    # Use real DB count or simulate growth
    total = User.query.count()
    base  = max(1, total // 12)
    values = [base + random.randint(0, base * 2) for _ in months]
    return _make_chart('line', months, values, 'User Registrations (Last 12 Months)')


def _soil_crop_guide():
    """Best crops for each soil type (educational chart)."""
    soils  = ['Clay', 'Sandy', 'Loamy', 'Silt', 'Peat', 'Chalky']
    scores = [72, 55, 95, 85, 78, 62]  # Fertility index (0-100)
    return _make_chart('bar', soils, scores, 'Soil Fertility Index by Type',
                       color_scheme=['#1b5e20','#2e7d32','#388e3c','#43a047','#4caf50','#66bb6a'])


def _harvest_yield_trend():
    """Simulated yield trend data (tonnes/acre)."""
    years  = ['2019', '2020', '2021', '2022', '2023', '2024']
    yields = [2.1, 2.4, 2.3, 2.8, 3.1, 3.4]  # Organic farming improvement
    return _make_chart('line', years, yields, 'Average Yield Trend (Tonnes/Acre)')


# ---------------------------------------------------------------------------
# Route
# ---------------------------------------------------------------------------
@analytics_bp.route('/')
@login_required
def dashboard():
    charts = {
        'category_distribution': _crop_distribution(),
        'price_by_category':     _price_by_category(),
        'monthly_registrations': _monthly_registrations(),
        'soil_fertility':        _soil_crop_guide(),
        'yield_trend':           _harvest_yield_trend(),
    }

    stats = {
        'total_farmers': User.query.filter_by(role='farmer').count(),
        'total_buyers':  User.query.filter_by(role='buyer').count(),
        'total_products': Product.query.count(),
        'avg_price':     round(db.session.query(db.func.avg(Product.price)).scalar() or 0, 2),
    }

    return render_template('analytics/dashboard.html', charts=charts, stats=stats)
