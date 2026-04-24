import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    # -------------------------------------------------------
    # Security
    # -------------------------------------------------------
    SECRET_KEY = os.environ.get('SECRET_KEY', 'krishi-ai-secret-2024-change-in-production')

    # -------------------------------------------------------
    # Database
    # -------------------------------------------------------
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'database', 'farming.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # -------------------------------------------------------
    # File Uploads
    # -------------------------------------------------------
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static', 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB max upload
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

    # -------------------------------------------------------
    # API Keys  <-- Replace '' with your actual keys
    # -------------------------------------------------------
    GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY', '')        # https://aistudio.google.com
    OPENWEATHER_API_KEY = os.environ.get('OPENWEATHER_API_KEY', '')  # https://openweathermap.org/api

    # -------------------------------------------------------
    # Razorpay Payment Gateway (Test Mode)
    # -------------------------------------------------------
    RAZORPAY_KEY_ID     = os.environ.get('RAZORPAY_KEY_ID', '')
    RAZORPAY_KEY_SECRET = os.environ.get('RAZORPAY_KEY_SECRET', '')

    # -------------------------------------------------------
    # ML model paths
    # -------------------------------------------------------
    CROP_MODEL_PATH = os.path.join(BASE_DIR, 'ml_models', 'crop_model.pkl')
    CROP_ENCODER_PATH = os.path.join(BASE_DIR, 'ml_models', 'crop_label_encoder.pkl')
