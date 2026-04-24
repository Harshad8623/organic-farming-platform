"""
routes/chatbot.py
-----------------
Gemini-powered agricultural chatbot.
Falls back to smart keyword-based responses when API key is not set.
"""

import json
from flask import Blueprint, render_template, request, jsonify, current_app
from flask_login import login_required

chatbot_bp = Blueprint('chatbot', __name__, url_prefix='/chatbot')

# ---------------------------------------------------------------------------
# Fallback responses (used when GEMINI_API_KEY is empty)
# ---------------------------------------------------------------------------
FALLBACK_RESPONSES = {
    'pest': (
        "For organic pest control:\n"
        "🌿 Spray **Neem oil** (5 ml/L water) every 7 days.\n"
        "🌿 Use **yellow sticky traps** for whiteflies & thrips.\n"
        "🌿 Spray **garlic-chilli extract** as a natural repellent.\n"
        "🌿 Introduce **ladybug larvae** to control aphids naturally."
    ),
    'fertiliz': (
        "Organic fertilization tips:\n"
        "🌱 Apply **Jeevamrutha** (fermented cow dung + urine) as soil drench.\n"
        "🌱 Use **vermicompost** at 2-3 tonnes/acre before sowing.\n"
        "🌱 Spray **panchagavya** (5%) foliar spray fortnightly.\n"
        "🌱 Grow **green manure** crops like Dhaincha and plough in."
    ),
    'disease': (
        "For disease management organically:\n"
        "🍃 Apply **Bordeaux mixture** (1%) for fungal diseases.\n"
        "🍃 Use **Trichoderma viride** bio-fungicide in soil.\n"
        "🍃 Spray **cow urine** (diluted 1:10) as preventive.\n"
        "🍃 Practice **crop rotation** to break disease cycles."
    ),
    'water': (
        "Water management advice:\n"
        "💧 Use **drip irrigation** to save 40-60% water.\n"
        "💧 **Mulch** your beds to reduce evaporation.\n"
        "💧 Water early morning to minimise fungal risk.\n"
        "💧 Check soil moisture with a tensiometer before irrigating."
    ),
    'soil': (
        "Soil health tips:\n"
        "🌍 Add **organic matter** (compost, green manure) regularly.\n"
        "🌍 Test soil pH; most crops prefer **pH 6.0–7.0**.\n"
        "🌍 Avoid tilling when soil is wet to protect structure.\n"
        "🌍 Grow **cover crops** in off-season to prevent erosion."
    ),
    'crop': (
        "Crop selection advice:\n"
        "🌾 Use our **Crop Recommendation** tool (N, P, K, weather → best crop).\n"
        "🌾 Grow **intercrop combinations** like maize + beans.\n"
        "🌾 Choose **region-adapted varieties** from your local KVK.\n"
        "🌾 Plan **crop rotation** to maintain soil nutrient balance."
    ),
    'weather': (
        "Weather-smart farming:\n"
        "🌤 Check the **Weather Advisory** tab for live forecasts.\n"
        "🌤 Delay irrigation if rain predicted within 24 hours.\n"
        "🌤 Cover seedlings during unseasonal frost or hail.\n"
        "🌤 Harvest before predicted heavy rain to avoid crop loss."
    ),
}

DEFAULT_RESPONSE = (
    "Hello! I'm your Organic Farming Assistant 🌿\n\n"
    "I can help you with:\n"
    "• **Pest & disease control** (organic methods)\n"
    "• **Fertilization** (Jeevamrutha, vermicompost, panchagavya)\n"
    "• **Water management** and irrigation scheduling\n"
    "• **Crop selection** recommendations\n"
    "• **Soil health** improvement\n\n"
    "Ask me anything about organic farming!"
)


# Models tried in order — first one that responds wins
GEMINI_MODELS = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
    "gemini-2.5-pro",
]

SYSTEM_CONTEXT = (
    "You are KrishiBot, an expert organic farming advisor for Indian farmers. "
    "Give practical, beginner-friendly advice focused on organic methods: "
    "Jeevamrutha, Neem oil, Panchagavya, bio-fertilizers, and sustainable farming. "
    "Keep responses concise (under 150 words), use emoji bullet points, and be warm and encouraging."
)


def _gemini_response(question):
    """Call Gemini API, trying multiple models until one succeeds."""
    import requests
    import time

    api_key = (current_app.config.get('GEMINI_API_KEY', '') or '').strip()
    if not api_key:
        raise ValueError("No API key configured")

    payload = {
        "contents": [{
            "parts": [{"text": f"{SYSTEM_CONTEXT}\n\nFarmer's question: {question}"}]
        }]
    }

    last_error = None
    for model in GEMINI_MODELS:
        url = (
            f"https://generativelanguage.googleapis.com/v1beta/models/"
            f"{model}:generateContent?key={api_key}"
        )
        try:
            resp = requests.post(url, json=payload, timeout=15)
            if resp.status_code == 200:
                data = resp.json()
                return data['candidates'][0]['content']['parts'][0]['text']
            elif resp.status_code in (429, 503):
                # Rate limited or overloaded — try next model
                last_error = f"{resp.status_code} on {model}"
                current_app.logger.warning(f"Gemini: {last_error}, trying next model...")
                time.sleep(0.5)
                continue
            else:
                resp.raise_for_status()
        except requests.exceptions.Timeout:
            last_error = f"Timeout on {model}"
            current_app.logger.warning(f"Gemini: {last_error}, trying next model...")
            continue

    raise RuntimeError(f"All Gemini models failed. Last error: {last_error}")


def _fallback_response(question):
    """Keyword-based local response when API key is absent."""
    q = question.lower()
    for keyword, response in FALLBACK_RESPONSES.items():
        if keyword in q:
            return response
    return DEFAULT_RESPONSE


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
@chatbot_bp.route('/')
@login_required
def chat():
    api_key = (current_app.config.get('GEMINI_API_KEY', '') or '').strip()
    gemini_active = bool(api_key)
    return render_template('chatbot/chat.html', gemini_active=gemini_active)


@chatbot_bp.route('/ask', methods=['POST'])
@login_required
def ask():
    """Return chatbot response as JSON."""
    import logging
    data     = request.get_json(silent=True) or {}
    question = data.get('question', '').strip()

    if not question:
        return jsonify({'answer': 'Please type a question.'})

    # Strip whitespace from key (handles accidental spaces in .env)
    api_key = (current_app.config.get('GEMINI_API_KEY', '') or '').strip()

    if api_key:
        try:
            answer = _gemini_response(question)
            return jsonify({'answer': answer, 'source': 'gemini'})
        except Exception as e:
            logging.error(f"Gemini API error: {e}")
            # Show clean message + local fallback to the user
            fallback = _fallback_response(question)
            return jsonify({
                'answer': (
                    "🔄 AI is temporarily busy — here's a local response:\n\n"
                    + fallback
                ),
                'source': 'error'
            })
    else:
        return jsonify({'answer': _fallback_response(question), 'source': 'fallback'})
