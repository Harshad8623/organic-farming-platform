"""
ml_models/plant_disease_cnn.py
-------------------------------
Inference module for the PlantVillage-trained CNN disease detector.

Priority chain:
  1. TFLite model  (plant_disease_model.tflite)  — fast, lightweight, no GPU needed
  2. Keras .h5     (plant_disease_model.h5)       — full model fallback
  3. Not available                                 — caller uses Gemini / Demo

Usage:
    from ml_models.plant_disease_cnn import CNNDiseasePredictor
    predictor = CNNDiseasePredictor()          # loads model once
    result    = predictor.predict("image.jpg") # returns dict

The result dict has:
    {
        'disease_name':   str,   # e.g. "Early Blight"
        'raw_class':      str,   # e.g. "Tomato___Early_blight"
        'confidence':     float, # 0.0 – 1.0
        'top3':           list,  # [(class, confidence), ...]
        'crops':          str,
        'symptoms':       str,
        'cause':          str,
        'organic_solutions': list[str],
        'severity':       str,
        'ai_powered':     True,
        'engine':         'CNN (PlantVillage)'
    }
"""

import os
import json
import numpy as np
from PIL import Image

# ─── PlantVillage class → our DISEASE_DB name mapping ───────────────────────
PLANTVILLAGE_TO_DB = {
    'Apple___Apple_scab':                                'Apple Scab',
    'Apple___Black_rot':                                 'Anthracnose',
    'Apple___Cedar_apple_rust':                          'Leaf Rust',
    'Apple___healthy':                                   'Healthy Plant',
    'Blueberry___healthy':                               'Healthy Plant',
    'Cherry_(including_sour)___Powdery_mildew':          'Powdery Mildew',
    'Cherry_(including_sour)___healthy':                 'Healthy Plant',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot':'Cercospora Leaf Spot',
    'Corn_(maize)___Common_rust_':                       'Leaf Rust',
    'Corn_(maize)___Northern_Leaf_Blight':               'Early Blight',
    'Corn_(maize)___healthy':                            'Healthy Plant',
    'Grape___Black_rot':                                 'Anthracnose',
    'Grape___Esca_(Black_Measles)':                      'Fusarium Wilt',
    'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)':        'Cercospora Leaf Spot',
    'Grape___healthy':                                   'Healthy Plant',
    'Orange___Haunglongbing_(Citrus_greening)':          'Yellow Mosaic Virus',
    'Peach___Bacterial_spot':                            'Bacterial Blight of Rice',
    'Peach___healthy':                                   'Healthy Plant',
    'Pepper,_bell___Bacterial_spot':                     'Bacterial Blight of Rice',
    'Pepper,_bell___healthy':                            'Healthy Plant',
    'Potato___Early_blight':                             'Early Blight',
    'Potato___Late_blight':                              'Late Blight',
    'Potato___healthy':                                  'Healthy Plant',
    'Raspberry___healthy':                               'Healthy Plant',
    'Soybean___healthy':                                 'Healthy Plant',
    'Squash___Powdery_mildew':                           'Powdery Mildew',
    'Strawberry___Leaf_scorch':                          'Cercospora Leaf Spot',
    'Strawberry___healthy':                              'Healthy Plant',
    'Tomato___Bacterial_spot':                           'Bacterial Blight of Rice',
    'Tomato___Early_blight':                             'Early Blight',
    'Tomato___Late_blight':                              'Late Blight',
    'Tomato___Leaf_Mold':                                'Downy Mildew',
    'Tomato___Septoria_leaf_spot':                       'Cercospora Leaf Spot',
    'Tomato___Spider_mites Two-spotted_spider_mite':     'Leaf Curl',
    'Tomato___Target_Spot':                              'Brown Spot',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus':            'Yellow Mosaic Virus',
    'Tomato___Tomato_mosaic_virus':                      'Yellow Mosaic Virus',
    'Tomato___healthy':                                  'Healthy Plant',
}

# Friendly display names for raw PlantVillage class labels
FRIENDLY_NAMES = {
    'Apple___Apple_scab':                                'Apple Scab',
    'Apple___Black_rot':                                 'Apple Black Rot',
    'Apple___Cedar_apple_rust':                          'Apple Cedar Rust',
    'Apple___healthy':                                   'Apple — Healthy',
    'Blueberry___healthy':                               'Blueberry — Healthy',
    'Cherry_(including_sour)___Powdery_mildew':          'Cherry Powdery Mildew',
    'Cherry_(including_sour)___healthy':                 'Cherry — Healthy',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot':'Corn Cercospora Leaf Spot',
    'Corn_(maize)___Common_rust_':                       'Corn Common Rust',
    'Corn_(maize)___Northern_Leaf_Blight':               'Corn Northern Leaf Blight',
    'Corn_(maize)___healthy':                            'Corn — Healthy',
    'Grape___Black_rot':                                 'Grape Black Rot',
    'Grape___Esca_(Black_Measles)':                      'Grape Esca (Black Measles)',
    'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)':        'Grape Leaf Blight',
    'Grape___healthy':                                   'Grape — Healthy',
    'Orange___Haunglongbing_(Citrus_greening)':          'Orange Citrus Greening',
    'Peach___Bacterial_spot':                            'Peach Bacterial Spot',
    'Peach___healthy':                                   'Peach — Healthy',
    'Pepper,_bell___Bacterial_spot':                     'Bell Pepper Bacterial Spot',
    'Pepper,_bell___healthy':                            'Bell Pepper — Healthy',
    'Potato___Early_blight':                             'Potato Early Blight',
    'Potato___Late_blight':                              'Potato Late Blight',
    'Potato___healthy':                                  'Potato — Healthy',
    'Raspberry___healthy':                               'Raspberry — Healthy',
    'Soybean___healthy':                                 'Soybean — Healthy',
    'Squash___Powdery_mildew':                           'Squash Powdery Mildew',
    'Strawberry___Leaf_scorch':                          'Strawberry Leaf Scorch',
    'Strawberry___healthy':                              'Strawberry — Healthy',
    'Tomato___Bacterial_spot':                           'Tomato Bacterial Spot',
    'Tomato___Early_blight':                             'Tomato Early Blight',
    'Tomato___Late_blight':                              'Tomato Late Blight',
    'Tomato___Leaf_Mold':                                'Tomato Leaf Mold',
    'Tomato___Septoria_leaf_spot':                       'Tomato Septoria Leaf Spot',
    'Tomato___Spider_mites Two-spotted_spider_mite':     'Tomato Spider Mites',
    'Tomato___Target_Spot':                              'Tomato Target Spot',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus':            'Tomato Yellow Leaf Curl Virus',
    'Tomato___Tomato_mosaic_virus':                      'Tomato Mosaic Virus',
    'Tomato___healthy':                                  'Tomato — Healthy',
}

# Extended disease info for classes not in DISEASE_DB
EXTENDED_DB = {
    'Apple Scab': {
        'crops': 'Apple',
        'symptoms': 'Olive-green or brown velvety spots on leaves and fruits; scab-like lesions.',
        'cause': 'Fungus (Venturia inaequalis)',
        'organic_solutions': [
            'Spray sulfur-based fungicide early in season.',
            'Apply Neem oil every 7-10 days during wet weather.',
            'Rake and destroy fallen leaves to break disease cycle.',
            'Prune for better air circulation.',
        ],
        'severity': 'medium'
    },
    'Apple Black Rot': {
        'crops': 'Apple',
        'symptoms': 'Brown to black rotting lesions on fruits; "frog-eye" leaf spots.',
        'cause': 'Fungus (Botryosphaeria obtusa)',
        'organic_solutions': [
            'Remove mummified fruits from tree and ground.',
            'Spray copper-based fungicide at bud break.',
            'Prune dead or diseased wood promptly.',
            'Apply Bordeaux mixture preventively.',
        ],
        'severity': 'high'
    },
}

IMG_SIZE  = 224   # Must match training IMG_SIZE
MODEL_DIR = os.path.dirname(os.path.abspath(__file__))


class CNNDiseasePredictor:
    """Loads and caches the TFLite / Keras model for inference."""

    def __init__(self):
        self._tflite_interp = None
        self._keras_model   = None
        self._classes       = None
        self._loaded        = False
        self._available     = False
        self._engine        = None
        self._load()

    def _load(self):
        """Try to load TFLite first, then Keras .h5."""
        classes_path = os.path.join(MODEL_DIR, 'plant_disease_classes.json')
        if not os.path.exists(classes_path):
            return   # Model not trained yet
        with open(classes_path) as f:
            self._classes = json.load(f)

        # Try TFLite (preferred — fast & lightweight)
        tflite_path = os.path.join(MODEL_DIR, 'plant_disease_model.tflite')
        if os.path.exists(tflite_path):
            try:
                import tflite_runtime.interpreter as tflite
                self._tflite_interp = tflite.Interpreter(model_path=tflite_path)
            except ImportError:
                try:
                    import tensorflow as tf
                    self._tflite_interp = tf.lite.Interpreter(model_path=tflite_path)
                except ImportError:
                    self._tflite_interp = None
            if self._tflite_interp:
                self._tflite_interp.allocate_tensors()
                self._engine    = 'CNN (PlantVillage · TFLite)'
                self._available = True
                self._loaded    = True
                return

        # Fallback: full Keras model
        h5_path = os.path.join(MODEL_DIR, 'plant_disease_model.h5')
        if os.path.exists(h5_path):
            try:
                import tensorflow as tf
                self._keras_model = tf.keras.models.load_model(h5_path)
                self._engine      = 'CNN (PlantVillage · Keras)'
                self._available   = True
                self._loaded      = True
            except Exception as e:
                print(f"[CNN] Failed to load Keras model: {e}")

    @property
    def available(self):
        return self._available

    def _preprocess(self, image_path):
        """Load and preprocess image to (1, 224, 224, 3) float32 in [-1, 1]."""
        img = Image.open(image_path).convert('RGB')
        img = img.resize((IMG_SIZE, IMG_SIZE), Image.LANCZOS)
        arr = np.array(img, dtype=np.float32)
        arr = (arr / 127.5) - 1.0          # MobileNetV2 preprocess: [-1, 1]
        return np.expand_dims(arr, axis=0)  # (1, 224, 224, 3)

    def _infer_tflite(self, input_data):
        """Run inference using TFLite interpreter."""
        interp = self._tflite_interp
        inp    = interp.get_input_details()[0]
        out    = interp.get_output_details()[0]
        interp.set_tensor(inp['index'], input_data)
        interp.invoke()
        return interp.get_tensor(out['index'])[0]    # (num_classes,)

    def _infer_keras(self, input_data):
        """Run inference using Keras model."""
        preds = self._keras_model.predict(input_data, verbose=0)
        return preds[0]

    def predict(self, image_path):
        """
        Predict plant disease from an image file.
        Returns a result dict compatible with disease_model.py format.
        """
        if not self._available:
            raise RuntimeError("CNN model not available. Run train_plant_disease.py first.")

        input_data = self._preprocess(image_path)

        # Run inference
        if self._tflite_interp:
            probs = self._infer_tflite(input_data)
        else:
            probs = self._infer_keras(input_data)

        # Get top-3 predictions
        top3_idx  = np.argsort(probs)[::-1][:3]
        top3      = [(self._classes[i], float(probs[i])) for i in top3_idx]

        best_class = top3[0][0]
        confidence = top3[0][1]

        # Map to display name and disease info
        friendly   = FRIENDLY_NAMES.get(best_class, best_class.replace('___', ' — ').replace('_', ' '))
        db_name    = PLANTVILLAGE_TO_DB.get(best_class, 'Healthy Plant')

        # Get disease info from our database
        from ml_models.disease_model import get_disease_by_name, DISEASE_DB
        db_entry = get_disease_by_name(db_name)

        # Check extended DB if not found in main DB
        if db_entry is None or db_entry['name'] == 'Healthy Plant':
            db_entry = EXTENDED_DB.get(friendly, db_entry)

        return {
            'name':              friendly,
            'raw_class':         best_class,
            'confidence':        confidence,
            'top3':              top3,
            'crops':             db_entry.get('crops', 'Various crops'),
            'symptoms':          db_entry.get('symptoms', ''),
            'cause':             db_entry.get('cause', 'Unknown'),
            'organic_solutions': db_entry.get('organic_solutions', ['Consult an agricultural expert.']),
            'severity':          db_entry.get('severity', 'medium'),
            'ai_powered':        True,
            'engine':            self._engine,
        }


# ─── Singleton instance (loaded once at module import) ───────────────────────
# This avoids reloading the model on every request
_predictor = None

def get_predictor():
    """Return the singleton CNNDiseasePredictor (lazy-loaded)."""
    global _predictor
    if _predictor is None:
        _predictor = CNNDiseasePredictor()
    return _predictor


def cnn_predict(image_path):
    """
    Convenience function. Returns result dict or raises RuntimeError if
    model is not available.
    """
    return get_predictor().predict(image_path)


def cnn_available():
    """Returns True if the CNN model files are present and loadable."""
    return get_predictor().available
