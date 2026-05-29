# 🌿 PlantVillage CNN Setup Guide

## Overview
This guide helps you train and integrate the PlantVillage CNN model into the app.
The CNN uses **MobileNetV2 transfer learning** and achieves **~99% accuracy** on 38 plant disease classes across 14 crops.

---

## Step 1 — Download the PlantVillage Dataset

1. Go to: https://www.kaggle.com/datasets/emmarex/plantdisease
2. Click **Download** (you need a free Kaggle account)
3. Extract the zip. You should have a folder like:
   ```
   PlantVillage/
   ├── Apple___Apple_scab/
   ├── Apple___Black_rot/
   ├── Tomato___Early_blight/
   ├── Tomato___Late_blight/
   ├── Tomato___healthy/
   ... (38 folders total, ~54,000 images)
   ```

---

## Step 2 — Install Training Dependencies

```bash
# Only needed for training (not for running the web app):
pip install tensorflow==2.15.0
```

> **Note:** TensorFlow is only required during training. The web app uses TFLite runtime which is much smaller (~5MB).

---

## Step 3 — Run the Training Script

```bash
python ml_models/train_plant_disease.py --data_dir "C:/path/to/PlantVillage"
```

**Optional flags:**
| Flag | Default | Description |
|------|---------|-------------|
| `--data_dir` | *required* | Path to PlantVillage folder |
| `--epochs` | 10 | Training epochs (more = better, but slower) |
| `--batch` | 32 | Batch size (reduce to 16 if out of memory) |
| `--img_size` | 224 | Image input size (224 recommended) |

**Example with all options:**
```bash
python ml_models/train_plant_disease.py \
  --data_dir "C:/Downloads/PlantVillage" \
  --epochs 15 \
  --batch 32
```

---

## Step 4 — Training Time Estimates

| Hardware | Time |
|---|---|
| NVIDIA GPU (RTX 3060+) | ~5–8 minutes |
| CPU only (modern) | ~40–60 minutes |
| Google Colab (free GPU) | ~10–15 minutes |

> **Tip:** Use Google Colab if you don't have a GPU. Upload your dataset there.

---

## Step 5 — After Training

The script creates three files in `ml_models/`:
```
ml_models/
├── plant_disease_model.tflite   ← Used by web app (fast, ~13MB)
├── plant_disease_model.h5       ← Full model backup (~20MB)
└── plant_disease_classes.json   ← Class index mapping
```

**Restart the Flask server** — the CNN is automatically detected and loaded.

You'll see this in the Disease Detection page:
- **🧠 CNN (PlantVillage)** badge on results
- **Confidence %** bar showing model certainty
- **Top-3 Predictions** panel

---

## Step 6 — Deploy to Render

After training locally, push the model files to GitHub:
```bash
git add ml_models/plant_disease_model.tflite
git add ml_models/plant_disease_classes.json
git commit -m "feat: add trained PlantVillage CNN model"
git push origin main
```

> **Note:** The `.h5` file may be too large for GitHub (>100MB). Only push the `.tflite` file.

Add to Render environment variables (no changes needed — CNN works offline):
- No new env vars required!

---

## Supported Diseases & Crops

| Crop | Diseases Detected |
|------|------------------|
| **Tomato** | Early Blight, Late Blight, Leaf Mold, Bacterial Spot, Septoria Leaf Spot, Spider Mites, Target Spot, Yellow Leaf Curl Virus, Mosaic Virus, Healthy |
| **Potato** | Early Blight, Late Blight, Healthy |
| **Corn/Maize** | Cercospora Leaf Spot, Common Rust, Northern Leaf Blight, Healthy |
| **Apple** | Apple Scab, Black Rot, Cedar Apple Rust, Healthy |
| **Grape** | Black Rot, Esca (Black Measles), Leaf Blight, Healthy |
| **Pepper** | Bacterial Spot, Healthy |
| **Peach** | Bacterial Spot, Healthy |
| **Strawberry** | Leaf Scorch, Healthy |
| **Cherry** | Powdery Mildew, Healthy |
| **Squash** | Powdery Mildew |
| **Orange** | Citrus Greening (HLB) |
| **Soybean, Blueberry, Raspberry** | Healthy |

**Total: 38 classes across 14 crops**

---

## Detection Priority Chain

```
Image Upload
     │
     ▼
CNN available?  ──YES──► CNN Prediction (99% accuracy, offline)
     │
     NO
     ▼
Gemini API key? ──YES──► Gemini Vision AI (85-92%, any disease)
     │
     NO
     ▼
Demo Mode (hash-based, for UI testing only)
```
