# 🌿 KrishiAI — AI-Powered Organic Farming & Marketplace Platform

A full-stack Flask web application that empowers Indian farmers and buyers with AI-powered tools for crop recommendation, disease detection, marketplace, chatbot, weather advisory, and analytics.

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| 🔐 Auth System | Register/Login for Farmers and Buyers with role-based dashboards |
| 🤖 Crop Recommendation AI | Random Forest model (22 crops) predicts best crop from N, P, K, weather |
| 🔬 Disease Detection | Upload leaf image → disease name + organic treatment solutions |
| 🛒 Marketplace | Farmers list products, Buyers browse/filter and contact farmers |
| 💬 AI Chatbot | Gemini API-powered chatbot (smart keyword fallback when key not set) |
| 🌦 Weather Advisory | Real-time weather + smart irrigation/spray/harvest advice |
| 📊 Analytics Dashboard | 5 interactive Plotly charts — marketplace, yield, soil, registrations |

---

## 📁 Project Structure

```
organic-farming-platform/
├── app.py                    # Flask application factory
├── config.py                 # Configuration (API keys here)
├── models.py                 # SQLAlchemy models
├── requirements.txt
├── Procfile                  # Render/Railway deployment
├── routes/
│   ├── auth.py               # Register, Login, Logout, Dashboards
│   ├── marketplace.py        # Product CRUD + image upload
│   ├── crop_recommendation.py # ML crop prediction
│   ├── disease_detection.py  # Leaf disease detection
│   ├── chatbot.py            # Gemini AI chatbot
│   ├── weather.py            # Weather API advisory
│   └── analytics.py         # Plotly analytics charts
├── ml_models/
│   └── disease_model.py      # Disease knowledge base
├── templates/
│   ├── base.html             # Bootstrap 5 base layout
│   ├── index.html            # Landing page
│   ├── auth/                 # register.html, login.html
│   ├── farmer/               # dashboard.html
│   ├── buyer/                # dashboard.html
│   ├── marketplace/          # listing, add_product, my_products, farmer_detail
│   ├── crop/                 # recommendation.html
│   ├── disease/              # detection.html
│   ├── chatbot/              # chat.html
│   ├── weather/              # advisory.html
│   └── analytics/            # dashboard.html
├── static/
│   ├── css/style.css
│   ├── js/main.js
│   └── uploads/              # Product images stored here
└── database/
    └── seed.py               # Test account seeder
```

---

## ⚙️ Setup Instructions

### 1. Create a Python virtual environment

```bash
cd organic-farming-platform
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # Mac/Linux
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. (Optional) Add API keys in `config.py`

```python
GEMINI_API_KEY      = 'your-gemini-key'        # https://aistudio.google.com
OPENWEATHER_API_KEY = 'your-openweather-key'   # https://openweathermap.org/api
```
> Without API keys, the chatbot uses smart keyword responses and weather shows simulated data.

### 4. Seed the database with test accounts

```bash
python database/seed.py
```

### 5. Run the app

```bash
python app.py
```

Open: **http://localhost:5000**

### 6. Test login credentials

| Role   | Email              | Password |
|--------|--------------------|----------|
| Farmer | farmer@test.com    | 123456   |
| Buyer  | buyer@test.com     | 123456   |

---

## 🤖 Crop AI — How it works

- Generates 4400 synthetic training samples (200/crop × 22 crops) with realistic NPK/weather values
- Trains a **Random Forest Classifier** automatically on first request
- Model saved to `ml_models/crop_model.pkl` for fast subsequent predictions
- **~95% accuracy** on synthetic data

---

## 🔬 Disease Detection — How it works

- Knowledge base with **15 plant diseases** + organic solutions (Neem oil, Bordeaux mixture, Trichoderma, etc.)
- Upload any leaf image → instant disease report with severity rating
- To upgrade to a real CNN: replace `predict_disease()` in `ml_models/disease_model.py`

---

## 🚀 Deployment on Render (free)

1. Push code to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Build command: `pip install -r requirements.txt`
4. Start command: `gunicorn app:create_app()`
5. Add environment variables (GEMINI_API_KEY, OPENWEATHER_API_KEY, SECRET_KEY)

---

## 🛠 Tech Stack

- **Backend**: Flask 3, Flask-SQLAlchemy, Flask-Login
- **Database**: SQLite (easily switch to MySQL/PostgreSQL)
- **ML**: scikit-learn (Random Forest), pandas, numpy
- **Frontend**: HTML5, Bootstrap 5, Vanilla CSS + JS
- **Charts**: Plotly.js
- **APIs**: Google Gemini, OpenWeatherMap

---

## 📋 Resume Description

> Developed a full-stack AI-powered organic farming platform using Flask, featuring a crop recommendation ML model (Random Forest, 22 crops), plant disease detection with organic treatment suggestions, a Gemini API-powered chatbot, real-time weather advisory with smart farming tips, a farmer-buyer marketplace with image upload, and an interactive analytics dashboard. Stack: Python, Flask, SQLAlchemy, scikit-learn, Bootstrap 5, Plotly, SQLite.
