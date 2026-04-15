import os
import cv2
import numpy as np
import mediapipe as mp

DATASET_DIR = "dataset"
GESTURES = ["yes", "no", "skip", "repeat", "idle"]

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    static_image_mode=True, 
    max_num_hands=1,
    min_detection_confidence=0.5
)

X = []
y = []

label_map = {g: i for i, g in enumerate(GESTURES)}

def normalize_landmarks(landmarks):
    """
    Improved normalization:
    1. Translate to wrist origin
    2. Scale by palm size
    3. Normalize to [-1, 1] range
    """
    landmarks = np.array(landmarks).reshape(21, 3)
    
    # Center on wrist (landmark 0)
    wrist = landmarks[0].copy()
    landmarks = landmarks - wrist
    
    # Calculate palm size (wrist to middle finger MCP)
    palm_size = np.linalg.norm(landmarks[9] - landmarks[0])
    
    # Avoid division by zero
    if palm_size < 1e-6:
        return None
    
    # Scale by palm size
    landmarks = landmarks / palm_size
    
    # Additional normalization: ensure reasonable bounds
    # Clip to prevent extreme outliers
    landmarks = np.clip(landmarks, -3, 3)
    
    return landmarks.flatten()

skipped_count = 0

for gesture in GESTURES:
    folder = os.path.join(DATASET_DIR, gesture)
    label = label_map[gesture]
    
    gesture_count = 0
    gesture_skipped = 0

    for img_name in os.listdir(folder):
        img_path = os.path.join(folder, img_name)
        img = cv2.imread(img_path)
        if img is None:
            continue

        rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        result = hands.process(rgb)

        if not result.multi_hand_landmarks:
            gesture_skipped += 1
            continue

        lm = result.multi_hand_landmarks[0]

        # Extract raw landmarks
        landmarks = []
        for p in lm.landmark:
            landmarks.extend([p.x, p.y, p.z])

        # Normalize landmarks
        normalized = normalize_landmarks(landmarks)
        
        if normalized is None:
            gesture_skipped += 1
            continue

        X.append(normalized)
        y.append(label)
        gesture_count += 1
    
    print(f"{gesture}: {gesture_count} samples extracted, {gesture_skipped} skipped")
    skipped_count += gesture_skipped

X = np.array(X, dtype=np.float32)
y = np.array(y, dtype=np.int32)

# Save landmarks
np.save("X_landmarks.npy", X)
np.save("y_landmarks.npy", y)

print("\n✅ Landmark extraction done")
print(f"Total samples: {len(X)}")
print(f"Total skipped: {skipped_count}")
print(f"Shape: {X.shape}")
print(f"Label distribution: {np.bincount(y)}")