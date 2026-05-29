"""
ml_models/train_plant_disease.py
---------------------------------
Train MobileNetV2 CNN on PlantVillage dataset using PyTorch + GPU.
Exports model to ONNX for lightweight cross-platform inference.

HOW TO USE:
  1. Download PlantVillage dataset from:
     https://www.kaggle.com/datasets/emmarex/plantdisease
     Extract so you have: PlantVillage/Tomato_Early_blight/, PlantVillage/Potato___Late_blight/ etc.

  2. Run:
     python ml_models/train_plant_disease.py --data_dir "C:/path/to/PlantVillage"

  3. After training, these files will be created in ml_models/:
       plant_disease_model.onnx      <- used by web app (fast inference, ~13MB)
       plant_disease_classes.json    <- class index mapping

  NOTE: Requires PyTorch + CUDA for GPU training.
        pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121
"""

import os, sys, json, argparse, time
import numpy as np
from pathlib import Path

# ─── Args ─────────────────────────────────────────────────────────────────────
parser = argparse.ArgumentParser(description='Train PlantVillage CNN (PyTorch)')
parser.add_argument('--data_dir', type=str, required=True,  help='Path to PlantVillage folder')
parser.add_argument('--epochs',   type=int, default=10,     help='Total epochs (default: 10)')
parser.add_argument('--batch',    type=int, default=32,     help='Batch size (default: 32)')
parser.add_argument('--img_size', type=int, default=224,    help='Image size (default: 224)')
parser.add_argument('--lr',       type=float, default=1e-3, help='Learning rate (default: 0.001)')
args = parser.parse_args()

# ─── Validate dataset ─────────────────────────────────────────────────────────
if not os.path.isdir(args.data_dir):
    print(f"ERROR: Dataset not found: {args.data_dir}")
    sys.exit(1)

classes = sorted([d for d in os.listdir(args.data_dir)
                  if os.path.isdir(os.path.join(args.data_dir, d))])
print(f"\nFound {len(classes)} classes in {args.data_dir}")
for c in classes:
    n = len(list(Path(os.path.join(args.data_dir, c)).glob('*')))
    print(f"  {c}: {n} images")

# ─── Import PyTorch ───────────────────────────────────────────────────────────
print("\nLoading PyTorch...")
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, random_split
from torchvision import datasets, transforms, models

print(f"PyTorch version : {torch.__version__}")
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
if torch.cuda.is_available():
    print(f"GPU             : {torch.cuda.get_device_name(0)}")
    print(f"VRAM            : {torch.cuda.get_device_properties(0).total_memory/1024**3:.1f} GB")
else:
    print("GPU             : Not available — using CPU (slower)")
print(f"Device          : {device}\n")

IMG_SIZE  = args.img_size
BATCH     = args.batch
NUM_CLASS = len(classes)
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

# ─── Data Transforms ─────────────────────────────────────────────────────────
train_tf = transforms.Compose([
    transforms.RandomResizedCrop(IMG_SIZE, scale=(0.8, 1.0)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomVerticalFlip(),
    transforms.RandomRotation(15),
    transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.1),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std= [0.229, 0.224, 0.225]),   # ImageNet stats
])
val_tf = transforms.Compose([
    transforms.Resize(int(IMG_SIZE * 1.1)),
    transforms.CenterCrop(IMG_SIZE),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std= [0.229, 0.224, 0.225]),
])

# ─── Dataset ─────────────────────────────────────────────────────────────────
print("Loading dataset...")
full_ds = datasets.ImageFolder(args.data_dir)

# Save class names (must match folder order from ImageFolder)
classes_sorted = [c for c, _ in sorted(full_ds.class_to_idx.items(), key=lambda x: x[1])]
classes_path   = os.path.join(SCRIPT_DIR, 'plant_disease_classes.json')
with open(classes_path, 'w') as f:
    json.dump(classes_sorted, f, indent=2)
print(f"Classes saved   : {classes_path}")
print(f"Total images    : {len(full_ds)}")

# 80/20 train/val split
val_size   = int(len(full_ds) * 0.2)
train_size = len(full_ds) - val_size
train_ds, val_ds = random_split(full_ds, [train_size, val_size],
                                 generator=torch.Generator().manual_seed(42))

# Apply separate transforms
class DatasetWithTransform(torch.utils.data.Dataset):
    def __init__(self, subset, transform):
        self.subset    = subset
        self.transform = transform
    def __len__(self):  return len(self.subset)
    def __getitem__(self, idx):
        img, label = self.subset[idx]
        # img is a PIL Image here since we haven't applied ToTensor yet
        return self.transform(img), label

# Reload as PIL for transform application
full_pil = datasets.ImageFolder(args.data_dir)  # no transform = PIL images
train_pil, val_pil = random_split(full_pil, [train_size, val_size],
                                   generator=torch.Generator().manual_seed(42))
train_dataset = DatasetWithTransform(train_pil, train_tf)
val_dataset   = DatasetWithTransform(val_pil,   val_tf)

train_loader = DataLoader(train_dataset, batch_size=BATCH, shuffle=True,
                          num_workers=0, pin_memory=torch.cuda.is_available())
val_loader   = DataLoader(val_dataset,   batch_size=BATCH, shuffle=False,
                          num_workers=0, pin_memory=torch.cuda.is_available())

print(f"Train batches   : {len(train_loader)} ({train_size} images)")
print(f"Val batches     : {len(val_loader)}   ({val_size} images)")

# ─── Model: MobileNetV2 with transfer learning ───────────────────────────────
print("\nBuilding MobileNetV2 (ImageNet pretrained)...")
model = models.mobilenet_v2(weights=models.MobileNet_V2_Weights.IMAGENET1K_V1)

# Replace classifier head for our number of classes
model.classifier = nn.Sequential(
    nn.Dropout(p=0.4),
    nn.Linear(model.last_channel, 256),
    nn.ReLU(),
    nn.Dropout(p=0.3),
    nn.Linear(256, NUM_CLASS),
)

model = model.to(device)

total_params     = sum(p.numel() for p in model.parameters())
trainable_params = sum(p.numel() for p in model.parameters() if p.requires_grad)
print(f"Total params    : {total_params:,}")
print(f"Trainable       : {trainable_params:,}")

# ─── Loss & Optimizer ─────────────────────────────────────────────────────────
criterion = nn.CrossEntropyLoss(label_smoothing=0.1)

# ─── Helper: one epoch ────────────────────────────────────────────────────────
def run_epoch(loader, train=True, optimizer=None):
    model.train(train)
    total_loss, correct, top3_correct, total = 0., 0, 0, 0
    with torch.set_grad_enabled(train):
        for batch_idx, (imgs, labels) in enumerate(loader):
            imgs, labels = imgs.to(device), labels.to(device)
            outputs = model(imgs)
            loss    = criterion(outputs, labels)
            if train:
                optimizer.zero_grad()
                loss.backward()
                optimizer.step()
            total_loss += loss.item() * imgs.size(0)
            _, preds   = outputs.max(1)
            correct    += preds.eq(labels).sum().item()
            # Top-3
            top3       = outputs.topk(min(3, NUM_CLASS), dim=1)[1]
            top3_correct += top3.eq(labels.unsqueeze(1)).any(1).sum().item()
            total      += imgs.size(0)
            # Progress
            if train and (batch_idx + 1) % 10 == 0:
                pct = (batch_idx + 1) / len(loader) * 100
                acc = correct / total * 100
                print(f"  [{batch_idx+1:3d}/{len(loader)}] {pct:5.1f}% | "
                      f"loss={total_loss/total:.4f} acc={acc:.2f}%", flush=True)
    return total_loss / total, correct / total, top3_correct / total

# ─── Phase 1: Freeze backbone, train head only ───────────────────────────────
print(f"\n{'='*60}")
print("PHASE 1: Training classifier head (backbone frozen)")
print(f"{'='*60}")
for param in model.features.parameters():
    param.requires_grad = False
trainable_params = sum(p.numel() for p in model.parameters() if p.requires_grad)
print(f"Trainable params: {trainable_params:,}")

optimizer1 = optim.Adam(filter(lambda p: p.requires_grad, model.parameters()),
                         lr=args.lr, weight_decay=1e-4)
scheduler1 = optim.lr_scheduler.StepLR(optimizer1, step_size=2, gamma=0.5)

phase1_epochs = min(5, args.epochs // 2)
best_val_acc  = 0.0
best_path     = os.path.join(SCRIPT_DIR, 'plant_disease_best.pth')

for epoch in range(1, phase1_epochs + 1):
    t0 = time.time()
    tr_loss, tr_acc, _ = run_epoch(train_loader, train=True,  optimizer=optimizer1)
    vl_loss, vl_acc, vl_top3 = run_epoch(val_loader,   train=False)
    scheduler1.step()
    elapsed = time.time() - t0
    print(f"\nEpoch {epoch}/{phase1_epochs} — {elapsed:.0f}s | "
          f"train_loss={tr_loss:.4f} train_acc={tr_acc*100:.2f}% | "
          f"val_acc={vl_acc*100:.2f}% val_top3={vl_top3*100:.2f}%")
    if vl_acc > best_val_acc:
        best_val_acc = vl_acc
        torch.save(model.state_dict(), best_path)
        print(f"  ✓ Best model saved ({vl_acc*100:.2f}%)")

# ─── Phase 2: Unfreeze top layers for fine-tuning ────────────────────────────
print(f"\n{'='*60}")
print("PHASE 2: Fine-tuning full model")
print(f"{'='*60}")
for param in model.parameters():
    param.requires_grad = True

optimizer2 = optim.Adam(model.parameters(), lr=args.lr * 0.1, weight_decay=1e-4)
scheduler2 = optim.lr_scheduler.CosineAnnealingLR(optimizer2, T_max=args.epochs)

for epoch in range(1, args.epochs + 1):
    t0 = time.time()
    tr_loss, tr_acc, _ = run_epoch(train_loader, train=True,  optimizer=optimizer2)
    vl_loss, vl_acc, vl_top3 = run_epoch(val_loader,   train=False)
    scheduler2.step()
    elapsed = time.time() - t0
    print(f"\nEpoch {epoch}/{args.epochs} — {elapsed:.0f}s | "
          f"train_loss={tr_loss:.4f} train_acc={tr_acc*100:.2f}% | "
          f"val_acc={vl_acc*100:.2f}% val_top3={vl_top3*100:.2f}%")
    if vl_acc > best_val_acc:
        best_val_acc = vl_acc
        torch.save(model.state_dict(), best_path)
        print(f"  ✓ Best model saved ({vl_acc*100:.2f}%)")

# ─── Load best weights ────────────────────────────────────────────────────────
print(f"\nLoading best weights (val_acc={best_val_acc*100:.2f}%)...")
model.load_state_dict(torch.load(best_path, map_location=device))
model.eval()

# ─── Export to ONNX ──────────────────────────────────────────────────────────
print("Exporting to ONNX...")
onnx_path  = os.path.join(SCRIPT_DIR, 'plant_disease_model.onnx')
dummy_input = torch.randn(1, 3, IMG_SIZE, IMG_SIZE, device=device)

torch.onnx.export(
    model, dummy_input, onnx_path,
    input_names=['input'],
    output_names=['output'],
    dynamic_axes={'input': {0: 'batch'}, 'output': {0: 'batch'}},
    opset_version=17,
    do_constant_folding=True,
)

onnx_size_mb = os.path.getsize(onnx_path) / (1024 * 1024)
print(f"ONNX model saved: {onnx_path} ({onnx_size_mb:.1f} MB)")

# ─── Cleanup temp file ────────────────────────────────────────────────────────
if os.path.exists(best_path):
    os.remove(best_path)

# ─── Final summary ────────────────────────────────────────────────────────────
print(f"\n{'='*60}")
print("TRAINING COMPLETE")
print(f"{'='*60}")
print(f"  Classes         : {NUM_CLASS}")
print(f"  Best Val Acc    : {best_val_acc*100:.2f}%")
print(f"  ONNX model      : {onnx_path} ({onnx_size_mb:.1f} MB)")
print(f"  Classes JSON    : {classes_path}")
print(f"\n  Restart the Flask server — CNN is auto-detected!")
print(f"{'='*60}")
