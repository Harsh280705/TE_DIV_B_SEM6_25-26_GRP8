import cv2
import os
import numpy as np
import tensorflow as tf
import mediapipe as mp
from collections import deque, Counter

# ================= CONFIG =================
MODEL_PATH = "gesture_landmark_model.h5"
GESTURES = ["yes", "no", "skip", "repeat", "idle"]

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "gesture_landmark_model.h5"
)

# Confidence thresholds
CONF_THRESHOLD = 0.70  # Minimum confidence for non-idle gestures
IDLE_THRESHOLD = 0.50   # Minimum confidence for idle
LOW_CONF_THRESHOLD = 0.40  # Below this, ignore completely

# Temporal smoothing
SMOOTHING_FRAMES = 7    # Number of frames to consider
REQUIRED_MATCHES = 5     # Required consecutive matches for confirmation

# Hand detection
MIN_DETECTION_CONFIDENCE = 0.7
MIN_TRACKING_CONFIDENCE = 0.7
# =========================================

# Load model
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("✅ Model loaded successfully")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    exit(1)

# MediaPipe Hands
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
hands = mp_hands.Hands(
    static_image_mode=False,
    max_num_hands=1,
    min_detection_confidence=MIN_DETECTION_CONFIDENCE,
    min_tracking_confidence=MIN_TRACKING_CONFIDENCE
)

# Prediction buffer for temporal smoothing
pred_buffer = deque(maxlen=SMOOTHING_FRAMES)
conf_buffer = deque(maxlen=SMOOTHING_FRAMES)

# For gesture confirmation
last_confirmed_gesture = None
gesture_hold_frames = 0
HOLD_FRAMES = 15  # Show confirmed gesture for this many frames

def normalize_landmarks(landmarks):
    """
    Same normalization as training
    """
    landmarks = landmarks.reshape(21, 3)
    
    # Center on wrist
    wrist = landmarks[0].copy()
    landmarks = landmarks - wrist
    
    # Scale by palm size
    palm_size = np.linalg.norm(landmarks[9] - landmarks[0])
    
    if palm_size < 1e-6:
        return None
    
    landmarks = landmarks / palm_size
    
    # Clip outliers
    landmarks = np.clip(landmarks, -3, 3)
    
    return landmarks.flatten()

def get_smoothed_prediction():
    """
    Advanced temporal smoothing with confidence weighting
    """
    if len(pred_buffer) < REQUIRED_MATCHES:
        return "DETECTING...", 0.0
    
    # Count predictions weighted by confidence
    weighted_votes = {}
    for pred, conf in zip(pred_buffer, conf_buffer):
        if pred not in weighted_votes:
            weighted_votes[pred] = 0
        weighted_votes[pred] += conf
    
    # Get most common prediction
    if not weighted_votes:
        return "NO PREDICTION", 0.0
    
    best_pred = max(weighted_votes, key=weighted_votes.get)
    avg_conf = weighted_votes[best_pred] / len(pred_buffer)
    
    # Count consecutive occurrences
    counter = Counter(pred_buffer)
    count = counter[best_pred]
    
    # Require minimum consecutive matches
    if count >= REQUIRED_MATCHES and best_pred != "IGNORED":
        return best_pred, avg_conf
    else:
        return "DETECTING...", avg_conf

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

print("\n" + "="*50)
print("Gesture Recognition System - Running")
print("="*50)
print("Press 'q' to quit")
print("="*50 + "\n")

frame_count = 0

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    
    frame_count += 1
    frame = cv2.flip(frame, 1)
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    result = hands.process(rgb)
    
    display_label = "NO HAND DETECTED"
    confidence = 0.0
    color = (0, 0, 255)  # Red
    
    if result.multi_hand_landmarks:
        hand_landmarks = result.multi_hand_landmarks[0]
        
        # Draw hand landmarks
        mp_drawing.draw_landmarks(
            frame,
            hand_landmarks,
            mp_hands.HAND_CONNECTIONS,
            mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=2, circle_radius=2),
            mp_drawing.DrawingSpec(color=(255, 255, 255), thickness=2)
        )
        
        # Extract and normalize landmarks
        raw_landmarks = []
        for p in hand_landmarks.landmark:
            raw_landmarks.append([p.x, p.y, p.z])
        raw_landmarks = np.array(raw_landmarks)
        
        # Normalize
        normalized = normalize_landmarks(raw_landmarks)
        
        if normalized is not None:
            # Predict
            normalized = normalized.reshape(1, -1)
            predictions = model.predict(normalized, verbose=0)[0]
            
            predicted_idx = np.argmax(predictions)
            predicted_conf = predictions[predicted_idx]
            predicted_gesture = GESTURES[predicted_idx]
            
            # Decision logic
            if predicted_conf < LOW_CONF_THRESHOLD:
                pred_buffer.append("IGNORED")
                conf_buffer.append(0.0)
            elif predicted_gesture == "idle":
                if predicted_conf > IDLE_THRESHOLD:
                    pred_buffer.append("IDLE")
                    conf_buffer.append(predicted_conf)
                else:
                    pred_buffer.append("IGNORED")
                    conf_buffer.append(0.0)
            else:
                if predicted_conf > CONF_THRESHOLD:
                    pred_buffer.append(predicted_gesture.upper())
                    conf_buffer.append(predicted_conf)
                else:
                    pred_buffer.append("UNCERTAIN")
                    conf_buffer.append(predicted_conf)
            
            # Get smoothed prediction
            display_label, confidence = get_smoothed_prediction()
            
            # Gesture confirmation logic
            if display_label not in ["NO HAND DETECTED", "DETECTING...", "IGNORED", "UNCERTAIN"]:
                if display_label == last_confirmed_gesture:
                    gesture_hold_frames = HOLD_FRAMES
                else:
                    last_confirmed_gesture = display_label
                    gesture_hold_frames = HOLD_FRAMES
                color = (0, 255, 0)  # Green
            
    else:
        # No hand detected
        pred_buffer.append("NO_HAND")
        conf_buffer.append(0.0)
    
    # Handle gesture hold display
    if gesture_hold_frames > 0:
        display_label = last_confirmed_gesture
        color = (0, 255, 0)
        gesture_hold_frames -= 1
    elif display_label == "DETECTING...":
        color = (255, 165, 0)  # Orange
    
    # Draw info on frame
    h, w = frame.shape[:2]
    
    # Background for text
    cv2.rectangle(frame, (10, 10), (w - 10, 150), (0, 0, 0), -1)
    cv2.rectangle(frame, (10, 10), (w - 10, 150), (255, 255, 255), 2)
    
    # Gesture label
    cv2.putText(
        frame,
        f"Gesture: {display_label}",
        (20, 50),
        cv2.FONT_HERSHEY_SIMPLEX,
        1.2,
        color,
        3
    )
    
    # Confidence
    cv2.putText(
        frame,
        f"Confidence: {confidence:.2%}",
        (20, 90),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.8,
        (255, 255, 255),
        2
    )
    
    # Buffer status
    buffer_status = f"Buffer: {len(pred_buffer)}/{SMOOTHING_FRAMES}"
    cv2.putText(
        frame,
        buffer_status,
        (20, 130),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.6,
        (200, 200, 200),
        2
    )
    
    cv2.imshow("Improved Gesture Recognition", frame)
    
    key = cv2.waitKey(1) & 0xFF
    if key == ord('q'):
        break
    elif key == ord('r'):  # Reset buffers
        pred_buffer.clear()
        conf_buffer.clear()
        last_confirmed_gesture = None
        print("Buffers reset")

cap.release()
cv2.destroyAllWindows()
print("\n✅ Program terminated")