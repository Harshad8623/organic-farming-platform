"""
routes/translate.py
-------------------
Batch translation endpoint using Gemini.
Translates dynamic DB content (roadmap stages, crop data, etc.)
into Hindi (hi) or Marathi (mr) on the fly.
Results are cached client-side in localStorage.
"""

import json
import hashlib
from flask import Blueprint, request, jsonify, current_app
from flask_login import login_required

translate_bp = Blueprint('translate', __name__, url_prefix='/api')


def _gemini_translate(texts: list[str], target: str) -> list[str]:
    """Translate a list of English texts to target language using Gemini."""
    import requests as req

    api_key = (current_app.config.get('GEMINI_API_KEY', '') or '').strip()
    if not api_key:
        return texts  # Return originals if no key

    lang_name = {'hi': 'Hindi', 'mr': 'Marathi'}.get(target, 'Hindi')

    # Build a numbered list for Gemini to translate
    numbered = '\n'.join(f'{i+1}. {t}' for i, t in enumerate(texts))

    prompt = (
        f"Translate each of the following numbered lines from English to {lang_name}. "
        f"Return ONLY the translated lines in the exact same numbered format. "
        f"Do NOT add explanations. Preserve emojis and technical/crop names as-is. "
        f"Keep numbers, units (kg, L, cm, %, pH) unchanged. "
        f"If a line is already in {lang_name} or is a proper noun, return it unchanged.\n\n"
        f"{numbered}"
    )

    models = ['gemini-2.0-flash', 'gemini-2.5-flash', 'gemini-2.0-flash-lite']
    for model in models:
        url = (
            f"https://generativelanguage.googleapis.com/v1beta/models/"
            f"{model}:generateContent?key={api_key}"
        )
        try:
            resp = req.post(url, json={
                'contents': [{'parts': [{'text': prompt}]}]
            }, timeout=20)
            if resp.status_code == 200:
                raw = resp.json()['candidates'][0]['content']['parts'][0]['text']
                # Parse numbered lines back into list
                translated = []
                for line in raw.strip().split('\n'):
                    line = line.strip()
                    if not line:
                        continue
                    # Strip "1. " prefix
                    if '. ' in line and line[0].isdigit():
                        translated.append(line.split('. ', 1)[1])
                    elif line:
                        translated.append(line)
                # If count doesn't match, return originals for safety
                if len(translated) == len(texts):
                    return translated
                # Partial match — pad with originals
                return translated + texts[len(translated):]
            elif resp.status_code in (429, 503):
                continue
        except Exception:
            continue

    return texts  # Fallback: return originals


@translate_bp.route('/translate', methods=['POST'])
@login_required
def translate():
    """
    POST /api/translate
    Body: { "texts": ["text1", "text2", ...], "target": "hi" | "mr" }
    Returns: { "translations": ["trans1", "trans2", ...] }
    """
    data   = request.get_json(silent=True) or {}
    texts  = data.get('texts', [])
    target = data.get('target', 'hi')

    if not texts or not isinstance(texts, list):
        return jsonify({'error': 'No texts provided'}), 400
    if target not in ('hi', 'mr'):
        return jsonify({'translations': texts})  # English — no translation needed
    if len(texts) > 100:
        return jsonify({'error': 'Too many texts (max 100)'}), 400

    # Filter out empty strings (preserve positions)
    positions = [(i, t) for i, t in enumerate(texts) if t and t.strip()]
    if not positions:
        return jsonify({'translations': texts})

    to_translate = [t for _, t in positions]
    translated   = _gemini_translate(to_translate, target)

    # Re-insert into original list
    result = list(texts)
    for (orig_idx, _), trans in zip(positions, translated):
        result[orig_idx] = trans

    return jsonify({'translations': result})
