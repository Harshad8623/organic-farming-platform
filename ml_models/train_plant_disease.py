"""
ml_models/train_plant_disease.py
---------------------------------
Train a MobileNetV2 CNN on the PlantVillage dataset.

HOW TO USE:
  1. Download PlantVillage dataset from:
     https://www.kaggle.com/datasets/emmarex/plantdisease
     (File: PlantVillage.zip, ~800MB)

  2. Extract so you have a folder like:
     PlantVillage/
       Apple___Apple_scab/  (image files)
       Apple___Black_rot/
       ...  (38 class folders total)

  3. Install training dependencies:
     pip install tensorflow==2.15.0

  4. Run this script:
     python ml_models/train_plant_disease.py --data_dir "C:/path/to/PlantVillage"

  5. After training (~10-15 min on GPU, ~45 min on CPU):
     ml_models/plant_disease_model.tflite   <- use this in the web app
     ml_models/plant_disease_classes.json   <- class index mapping
     ml_models/plant_disease_model.h5       <- full model (backup)

  NOTE: You only need to run this ONCE. The generated .tflite file
        is then loaded automatically by the web app for fast inference.
"""

import os
import sys
import json
import argparse
import numpy as np

# ─── Argument Parsing ────────────────────────────────────────────────────────
parser = argparse.ArgumentParser(description='Train PlantVillage Disease CNN')
parser.add_argument('--data_dir', type=str, required=True,
                    help='Path to PlantVillage dataset folder')
parser.add_argument('--epochs',   type=int, default=10,
                    help='Number of training epochs (default: 10)')
parser.add_argument('--img_size', type=int, default=224,
                    help='Image input size (default: 224)')
parser.add_argument('--batch',    type=int, default=32,
                    help='Batch size (default: 32, reduce to 16 if OOM)')
args = parser.parse_args()

# ─── Validate Dataset ─────────────────────────────────────────────────────────
if not os.path.isdir(args.data_dir):
    print(f"ERROR: Dataset directory not found: {args.data_dir}")
    print("  Download PlantVillage from: https://www.kaggle.com/datasets/emmarex/plantdisease")
    sys.exit(1)

classes = sorted([d for d in os.listdir(args.data_dir)
                  if os.path.isdir(os.path.join(args.data_dir, d))])
print(f"\nFound {len(classes)} classes in {args.data_dir}")
for c in classes:
    count = len(os.listdir(os.path.join(args.data_dir, c)))
    print(f"  {c}: {count} images")

print("\nLoading TensorFlow... (may take a minute)")
import tensorflow as tf
from tensorflow.keras import layers, Model
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau, ModelCheckpoint

print(f"TensorFlow version: {tf.__version__}")
print(f"GPU available: {len(tf.config.list_physical_devices('GPU')) > 0}")

# ─── Dataset Loading ─────────────────────────────────────────────────────────
IMG_SIZE  = args.img_size
BATCH     = args.batch
NUM_CLASS = len(classes)

print(f"\nPreparing dataset (img_size={IMG_SIZE}, batch={BATCH})...")

full_ds = tf.keras.utils.image_dataset_from_directory(
    args.data_dir,
    image_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH,
    shuffle=True,
    seed=42,
    label_mode='categorical',
    interpolation='bilinear',
)

# Train/Val split (80/20)
total_batches = len(full_ds)
val_batches   = max(1, int(total_batches * 0.2))
train_batches = total_batches - val_batches

train_ds = full_ds.take(train_batches)
val_ds   = full_ds.skip(train_batches)

# Performance optimization
AUTOTUNE = tf.data.AUTOTUNE
train_ds = train_ds.prefetch(AUTOTUNE)
val_ds   = val_ds.prefetch(AUTOTUNE)

# Save class names mapping
script_dir   = os.path.dirname(os.path.abspath(__file__))
classes_path = os.path.join(script_dir, 'plant_disease_classes.json')
with open(classes_path, 'w') as f:
    json.dump(classes, f, indent=2)
print(f"Saved class list: {classes_path}")

# ─── Data Augmentation ───────────────────────────────────────────────────────
augmentation = tf.keras.Sequential([
    layers.RandomFlip("horizontal_and_vertical"),
    layers.RandomRotation(0.2),
    layers.RandomZoom(0.15),
    layers.RandomBrightness(0.1),
    layers.RandomContrast(0.1),
], name="augmentation")

# ─── Model Architecture ───────────────────────────────────────────────────────
print("\nBuilding MobileNetV2 model with transfer learning...")

# Load MobileNetV2 pre-trained on ImageNet (no top classifier)
base_model = MobileNetV2(
    input_shape=(IMG_SIZE, IMG_SIZE, 3),
    include_top=False,
    weights='imagenet'   # pre-trained weights
)

# Phase 1: Freeze base model — train only the new top layers
base_model.trainable = False

# Build model
inputs  = layers.Input(shape=(IMG_SIZE, IMG_SIZE, 3))
x       = augmentation(inputs)
x       = tf.keras.applications.mobilenet_v2.preprocess_input(x)  # Scale [-1, 1]
x       = base_model(x, training=False)
x       = layers.GlobalAveragePooling2D()(x)
x       = layers.BatchNormalization()(x)
x       = layers.Dense(256, activation='relu')(x)
x       = layers.Dropout(0.4)(x)
outputs = layers.Dense(NUM_CLASS, activation='softmax')(x)

model = Model(inputs, outputs)
model.summary(line_length=80)

# ─── Phase 1: Train Top Layers ────────────────────────────────────────────────
print(f"\n{'='*60}")
print("PHASE 1: Training top layers (base model frozen)")
print('='*60)

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
    loss='categorical_crossentropy',
    metrics=['accuracy', tf.keras.metrics.TopKCategoricalAccuracy(k=3, name='top3_acc')]
)

callbacks_phase1 = [
    EarlyStopping(monitor='val_accuracy', patience=3, restore_best_weights=True, verbose=1),
    ReduceLROnPlateau(monitor='val_loss', factor=0.5, patience=2, verbose=1),
]

history1 = model.fit(
    train_ds,
    epochs=min(args.epochs, 5),
    validation_data=val_ds,
    callbacks=callbacks_phase1,
    verbose=1,
)

# ─── Phase 2: Fine-tune Top 30% of Base Model ────────────────────────────────
print(f"\n{'='*60}")
print("PHASE 2: Fine-tuning top layers of base model")
print('='*60)

base_model.trainable = True

# Only fine-tune the top 30% of layers
fine_tune_from = int(len(base_model.layers) * 0.7)
for layer in base_model.layers[:fine_tune_from]:
    layer.trainable = False

print(f"Unfreezing layers from {fine_tune_from}/{len(base_model.layers)}")

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-4),   # Lower LR for fine-tuning
    loss='categorical_crossentropy',
    metrics=['accuracy', tf.keras.metrics.TopKCategoricalAccuracy(k=3, name='top3_acc')]
)

h5_path = os.path.join(script_dir, 'plant_disease_model.h5')
callbacks_phase2 = [
    EarlyStopping(monitor='val_accuracy', patience=4, restore_best_weights=True, verbose=1),
    ReduceLROnPlateau(monitor='val_loss', factor=0.3, patience=2, verbose=1),
    ModelCheckpoint(h5_path, monitor='val_accuracy', save_best_only=True, verbose=1),
]

history2 = model.fit(
    train_ds,
    epochs=args.epochs,
    validation_data=val_ds,
    callbacks=callbacks_phase2,
    verbose=1,
)

# ─── Save Full Keras Model ───────────────────────────────────────────────────
print(f"\nSaving Keras model to: {h5_path}")
model.save(h5_path)

# ─── Convert to TFLite ───────────────────────────────────────────────────────
print("\nConverting to TFLite (for fast lightweight inference)...")
converter = tf.lite.TFLiteConverter.from_keras_model(model)
converter.optimizations = [tf.lite.Optimize.DEFAULT]   # Dynamic quantization
tflite_model = converter.convert()

tflite_path = os.path.join(script_dir, 'plant_disease_model.tflite')
with open(tflite_path, 'wb') as f:
    f.write(tflite_model)

tflite_size_mb = os.path.getsize(tflite_path) / (1024 * 1024)
print(f"TFLite model saved: {tflite_path} ({tflite_size_mb:.1f} MB)")

# ─── Final Report ─────────────────────────────────────────────────────────────
# Evaluate on validation set
val_loss, val_acc, val_top3 = model.evaluate(val_ds, verbose=0)
print(f"\n{'='*60}")
print("TRAINING COMPLETE")
print('='*60)
print(f"  Classes:          {NUM_CLASS}")
print(f"  Val Accuracy:     {val_acc*100:.2f}%")
print(f"  Val Top-3 Acc:    {val_top3*100:.2f}%")
print(f"  Model (h5):       {h5_path}")
print(f"  Model (TFLite):   {tflite_path}  ({tflite_size_mb:.1f} MB)")
print(f"  Classes JSON:     {classes_path}")
print(f"\n  The web app will automatically use the TFLite model.")
print(f"  Just restart the Flask server — no other changes needed!")
print('='*60)
