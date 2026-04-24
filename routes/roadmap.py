"""
routes/roadmap.py
-----------------
Crop Roadmap: Browse detailed organic farming guides per crop.
"""

import json
from flask import Blueprint, render_template, abort
from models import CropRoadmap

roadmap_bp = Blueprint('roadmap', __name__, url_prefix='/roadmap')


@roadmap_bp.route('/')
def index():
    """Browse all crop roadmaps."""
    crops = CropRoadmap.query.order_by(CropRoadmap.crop_name).all()
    return render_template('roadmap/index.html', crops=crops)


@roadmap_bp.route('/<slug>')
def detail(slug):
    """Detailed roadmap for a specific crop."""
    crop = CropRoadmap.query.filter_by(slug=slug).first_or_404()
    stages = []
    if crop.stages_json:
        try:
            stages = json.loads(crop.stages_json)
        except Exception:
            stages = []
    return render_template('roadmap/detail.html', crop=crop, stages=stages)
