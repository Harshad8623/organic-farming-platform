"""
app.py
------
Flask application factory — entry point for the Organic Farming Platform.
Run with:  python app.py
"""

import os
from dotenv import load_dotenv
from flask import Flask, render_template
from models import db, User, CartItem
from flask_login import LoginManager, current_user
from config import Config

# Load .env file before anything reads os.environ
load_dotenv()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Ensure required directories exist
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    os.makedirs(os.path.join(os.path.dirname(__file__), 'database'), exist_ok=True)
    os.makedirs(os.path.join(os.path.dirname(__file__), 'ml_models'), exist_ok=True)

    # -----------------------------------------------------------------------
    # Database
    # -----------------------------------------------------------------------
    db.init_app(app)

    # -----------------------------------------------------------------------
    # Flask-Login
    # -----------------------------------------------------------------------
    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'
    login_manager.login_message = 'Please log in to access this page.'
    login_manager.login_message_category = 'warning'

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    # -----------------------------------------------------------------------
    # Template Globals (cart count injected to all templates)
    # -----------------------------------------------------------------------
    @app.context_processor
    def inject_cart_count():
        count = 0
        try:
            if current_user.is_authenticated and current_user.is_buyer():
                count = CartItem.query.filter_by(buyer_id=current_user.id).count()
        except Exception:
            pass
        return {'cart_count': count}

    # -----------------------------------------------------------------------
    # Register Blueprints
    # -----------------------------------------------------------------------
    from routes.auth               import auth_bp
    from routes.marketplace        import marketplace_bp
    from routes.crop_recommendation import crop_bp
    from routes.disease_detection  import disease_bp
    from routes.chatbot            import chatbot_bp
    from routes.weather            import weather_bp
    from routes.analytics          import analytics_bp
    from routes.roadmap            import roadmap_bp
    from routes.cart               import cart_bp
    from routes.orders             import orders_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(marketplace_bp)
    app.register_blueprint(crop_bp)
    app.register_blueprint(disease_bp)
    app.register_blueprint(chatbot_bp)
    app.register_blueprint(weather_bp)
    app.register_blueprint(analytics_bp)
    app.register_blueprint(roadmap_bp)
    app.register_blueprint(cart_bp)
    app.register_blueprint(orders_bp)

    # -----------------------------------------------------------------------
    # Home Route
    # -----------------------------------------------------------------------
    @app.route('/')
    def index():
        return render_template('index.html')

    # -----------------------------------------------------------------------
    # Create DB tables on first run
    # -----------------------------------------------------------------------
    with app.app_context():
        db.create_all()

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
