import os
import cv2
import numpy as np
from sklearn.model_selection import train_test_split

# ================= CONFIG =================
DATASET_DIR = "dataset"
IMG_SIZE = 224
GESTURES = ["yes", "no", "skip", "repeat", "idle"]
# =========================================

X = []
y = []

label_map = {g: i for i, g in enumerate(GESTURES)}
print("Label Map:", label_map)

for gesture in GESTURES:
    folder = os.path.join(DATASET_DIR, gesture)
    label = label_map[gesture]

    for img_name in os.listdir(folder):
        img_path = os.path.join(folder, img_name)
        img = cv2.imread(img_path)

        if img is None:
            continue

        img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
        img = img / 255.0

        X.append(img)
        y.append(label)

X = np.array(X, dtype=np.float32)
y = np.array(y, dtype=np.int32)

print("Total samples:", len(X))

X_train, X_val, y_train, y_val = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

np.save("X_train.npy", X_train)
np.save("X_val.npy", X_val)
np.save("y_train.npy", y_train)
np.save("y_val.npy", y_val)

print("✅ Preprocessing done")
print("Train:", X_train.shape)
print("Validation:", X_val.shape)
