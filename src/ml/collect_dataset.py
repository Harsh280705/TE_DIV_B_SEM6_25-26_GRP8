import cv2
import os
import numpy as np
import mediapipe as mp

# ================= CONFIG =================
DATASET_DIR = "dataset"
GESTURES = ["yes", "no", "skip", "repeat", "idle"]
IMG_SIZE = 224
SAMPLES_PER_GESTURE = 1000
CONFIRM_FRAMES = 5
# =========================================

os.makedirs(DATASET_DIR, exist_ok=True)
for g in GESTURES:
    os.makedirs(os.path.join(DATASET_DIR, g), exist_ok=True)

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils

hands = mp_hands.Hands(
    static_image_mode=False,
    max_num_hands=1,
    min_detection_confidence=0.7,
    min_tracking_confidence=0.7
)

cap = cv2.VideoCapture(0)

current_label = None
frame_buffer = []

def valid_landmarks(hand):
    return len(hand.landmark) == 21

def get_label():
    print("\nSelect gesture to record:")
    print("y = yes | n = no | s = skip | r = repeat | i = idle | q = quit")
    key = input("Enter: ").lower()
    return {
        "y": "yes",
        "n": "no",
        "s": "skip",
        "r": "repeat",
        "i": "idle"
    }.get(key, None)

current_label = get_label()
count = 0

while cap.isOpened() and current_label:
    ret, frame = cap.read()
    if not ret:
        break

    img = cv2.flip(frame, 1)
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    result = hands.process(rgb)

    status = "REJECT"

    if result.multi_hand_landmarks:
        hand = result.multi_hand_landmarks[0]

        if valid_landmarks(hand):
            frame_buffer.append(img)
            status = "DETECTING"

            if len(frame_buffer) >= CONFIRM_FRAMES:
                save_img = cv2.resize(frame_buffer[-1], (IMG_SIZE, IMG_SIZE))
                path = os.path.join(DATASET_DIR, current_label, f"{count}.jpg")
                cv2.imwrite(path, save_img)
                count += 1
                frame_buffer = []
                status = "SAVED"

    else:
        if current_label == "idle":
            save_img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
            path = os.path.join(DATASET_DIR, "idle", f"{count}.jpg")
            cv2.imwrite(path, save_img)
            count += 1
            status = "IDLE SAVED"

    cv2.putText(img, f"Gesture: {current_label}", (20, 40),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2)
    cv2.putText(img, f"Count: {count}", (20, 80),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (255,0,0), 2)
    cv2.putText(img, status, (20, 120),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 2)

    cv2.imshow("Dataset Collection", img)

    if count >= SAMPLES_PER_GESTURE:
        current_label = get_label()
        count = 0

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
