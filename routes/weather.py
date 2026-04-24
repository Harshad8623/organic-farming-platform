"""
routes/weather.py
-----------------
Weather advisory using OpenWeatherMap API.
Falls back to simulated data when API key is not set.
"""

import random
from flask import Blueprint, render_template, request, flash, current_app
from flask_login import login_required

weather_bp = Blueprint('weather', __name__, url_prefix='/weather')

# Smart farming advice based on conditions
def _advice(temp, humidity, rain_prob, description):
    tips = []
    desc = description.lower()

    if rain_prob > 60 or 'rain' in desc or 'drizzle' in desc:
        tips.append("🌧 Rain expected — skip irrigation for the next 24 hours.")
        tips.append("⚠️ Postpone pesticide spraying; rain will wash it away.")
    elif rain_prob < 20:
        tips.append("☀️ No rain expected — irrigate your crops today.")

    if temp > 35:
        tips.append("🌡 Very hot — increase watering frequency for vegetables.")
        tips.append("💨 Apply mulch to reduce soil temperature and water loss.")
    elif temp < 15:
        tips.append("❄️ Cool weather — protect seedlings with cover or mulch.")

    if humidity > 80:
        tips.append("💧 High humidity — watch for fungal diseases; improve air circulation.")
    elif humidity < 40:
        tips.append("🏜 Low humidity — check soil moisture daily and use drip irrigation.")

    if 'storm' in desc or 'thunder' in desc:
        tips.append("⛈ Storm alert — secure farm equipment and support tall crops.")

    if not tips:
        tips.append("✅ Conditions look good for normal farming operations.")

    return tips


# -----------------------------------------------------------------------
# City alias map — handles renamed / alternate spellings
# OpenWeatherMap still uses old names for many Indian cities
# -----------------------------------------------------------------------
CITY_ALIASES = {
    'sambhajinagar':    'Aurangabad,IN',
    'aurangabad':       'Aurangabad,IN',
    'chhatrapati sambhajinagar': 'Aurangabad,IN',
    'ch. sambhajinagar': 'Aurangabad,IN',
    'prayagraj':        'Allahabad,IN',
    'allahabad':        'Allahabad,IN',
    'vadodara':         'Vadodara,IN',
    'baroda':           'Vadodara,IN',
    'kolkata':          'Kolkata,IN',
    'calcutta':         'Kolkata,IN',
    'chennai':          'Chennai,IN',
    'madras':           'Chennai,IN',
    'mumbai':           'Mumbai,IN',
    'bombay':           'Mumbai,IN',
    'bengaluru':        'Bangalore,IN',
    'bangalore':        'Bangalore,IN',
}


def _resolve_city(city):
    """Return the OWM-compatible city string for a given input city name."""
    return CITY_ALIASES.get(city.lower().strip(), city.strip())


def _fetch_weather(city):
    """Fetch from OpenWeatherMap, or return simulated data."""
    api_key = (current_app.config.get('OPENWEATHER_API_KEY', '') or '').strip()

    if api_key:
        import requests
        owm_city = _resolve_city(city)
        # Use HTTPS; append ,IN to bias results toward India if no country given
        if ',' not in owm_city:
            owm_city = f"{owm_city},IN"
        url = (
            f"https://api.openweathermap.org/data/2.5/weather"
            f"?q={owm_city}&appid={api_key}&units=metric"
        )
        resp = requests.get(url, timeout=10)

        if resp.status_code == 404:
            raise ValueError(
                f"City '{city}' not found. Try nearby city names "
                f"(e.g. 'Aurangabad' instead of 'Sambhajinagar')."
            )
        resp.raise_for_status()
        data = resp.json()

        weather = {
            'city':        data['name'],
            'country':     data['sys']['country'],
            'temp':        round(data['main']['temp'], 1),
            'feels_like':  round(data['main']['feels_like'], 1),
            'humidity':    data['main']['humidity'],
            'description': data['weather'][0]['description'].title(),
            'icon':        data['weather'][0]['icon'],
            'wind_speed':  data['wind']['speed'],
            'rain_prob':   int(data.get('clouds', {}).get('all', 0)),
        }
    else:
        # Simulated data — realistic ranges
        conditions = [
            ('Sunny', 20, 35, 45, 10),
            ('Partly Cloudy', 18, 32, 55, 20),
            ('Overcast', 16, 28, 70, 40),
            ('Light Rain', 19, 26, 85, 75),
            ('Heavy Rain', 17, 24, 90, 90),
            ('Thunderstorm', 22, 30, 88, 85),
            ('Clear Sky', 25, 38, 40, 5),
        ]
        label, tmin, tmax, hum, rain = random.choice(conditions)
        weather = {
            'city':        city.title() if city else 'Your Location',
            'country':     'IN',
            'temp':        round(random.uniform(tmin, tmax), 1),
            'feels_like':  round(random.uniform(tmin, tmax) - 2, 1),
            'humidity':    hum,
            'description': label,
            'icon':        None,
            'wind_speed':  round(random.uniform(2, 15), 1),
            'rain_prob':   rain,
        }
    return weather



@weather_bp.route('/', methods=['GET', 'POST'])
@login_required
def advisory():
    weather = None
    tips    = []
    city    = ''

    if request.method == 'POST':
        city = request.form.get('city', '').strip()
        if not city:
            flash('Please enter a city name.', 'warning')
            return render_template('weather/advisory.html')
        try:
            weather = _fetch_weather(city)
            tips    = _advice(weather['temp'], weather['humidity'],
                              weather['rain_prob'], weather['description'])
        except Exception as e:
            flash(f'Could not fetch weather: {e}', 'danger')

    return render_template('weather/advisory.html', weather=weather, tips=tips, city=city)
