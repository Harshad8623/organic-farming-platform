"""
routes/disease_detection.py
---------------------------
Plant disease detection via uploaded leaf image.
Uses a simulated predictor (swap predict_disease() for a real CNN if needed).
"""

import os
import uuid
from flask import Blueprint, render_template, request, flash, current_app
from flask_login import login_required

disease_bp = Blueprint('disease', __name__, url_prefix='/disease')

ALLOWED = {'png', 'jpg', 'jpeg', 'gif', 'webp'}


def _allowed(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED


@disease_bp.route('/', methods=['GET', 'POST'])
@login_required
def detect():
    result     = None
    image_url  = None

    if request.method == 'POST':
        file = request.files.get('leaf_image')

        if not file or not file.filename:
            flash('Please upload a leaf image.', 'warning')
            return render_template('disease/detection.html')

        if not _allowed(file.filename):
            flash('Allowed formats: PNG, JPG, JPEG, GIF, WEBP.', 'danger')
            return render_template('disease/detection.html')

        # Save uploaded image
        ext      = file.filename.rsplit('.', 1)[1].lower()
        filename = f"disease_{uuid.uuid4().hex}.{ext}"
        save_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(save_path)
        image_url = f"/static/uploads/{filename}"

        # Run prediction using Gemini Vision AI
        try:
            from ml_models.disease_model import predict_disease
            api_key = (current_app.config.get('GEMINI_API_KEY', '') or '').strip()
            result = predict_disease(save_path, api_key=api_key)
        except Exception as e:
            flash(f'Detection error: {e}', 'danger')

    return render_template('disease/detection.html', result=result, image_url=image_url)
