"""
Flask Backend Server for Hand Gesture Recognition
Uses gesture_landmark_model.h5 with MediaPipe landmarks
Supports real-time predictions via webcam frames
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
import mediapipe as mp
import cv2
import base64
from collections import deque, Counter

# ================= CONFIG =================
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model", "gesture_landmark_model.h5")

GESTURES = ["yes", "no", "skip", "repeat", "idle"]

# Confidence thresholds
CONF_THRESHOLD = 0.70
IDLE_THRESHOLD = 0.50
LOW_CONF_THRESHOLD = 0.40

# Temporal smoothing per session
SMOOTHING_FRAMES = 5
REQUIRED_MATCHES = 3
# =========================================

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Load model
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("✅ Gesture model loaded successfully")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None

# MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    static_image_mode=True,
    max_num_hands=1,
    min_detection_confidence=0.7,
    min_tracking_confidence=0.7
)

# Session-based prediction buffers (stored per client session ID)
session_buffers = {}

def normalize_landmarks(landmarks):
    """
    Normalize landmarks same as training
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

def get_smoothed_prediction(session_id):
    """
    Get temporally smoothed prediction for a session
    """
    if session_id not in session_buffers:
        return "DETECTING...", 0.0
    
    pred_buffer = session_buffers[session_id]['predictions']
    conf_buffer = session_buffers[session_id]['confidences']
    
    if len(pred_buffer) < REQUIRED_MATCHES:
        return "DETECTING...", 0.0
    
    # Weighted voting
    weighted_votes = {}
    for pred, conf in zip(pred_buffer, conf_buffer):
        if pred not in weighted_votes:
            weighted_votes[pred] = 0
        weighted_votes[pred] += conf
    
    if not weighted_votes:
        return "NO PREDICTION", 0.0
    
    best_pred = max(weighted_votes, key=weighted_votes.get)
    avg_conf = weighted_votes[best_pred] / len(pred_buffer)
    
    # Count consecutive occurrences
    counter = Counter(pred_buffer)
    count = counter[best_pred]
    
    if count >= REQUIRED_MATCHES and best_pred != "IGNORED":
        return best_pred, avg_conf
    else:
        return "DETECTING...", avg_conf

@app.route('/api/health', methods=['GET'])
def health_check():
    """
    Health check endpoint
    """
    return jsonify({
        'status': 'ok',
        'model_loaded': model is not None,
        'gestures': GESTURES
    })

@app.route('/api/predict', methods=['POST'])
def predict_gesture():
    """
    Predict gesture from base64 encoded image
    
    Request JSON:
    {
        "image": "base64_encoded_image_data",
        "session_id": "unique_session_identifier"
    }
    
    Response JSON:
    {
        "gesture": "YES",
        "confidence": 0.95,
        "hand_detected": true,
        "all_probabilities": {...}
    }
    """
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500
    
    try:
        data = request.get_json()
        
        if not data or 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400
        
        session_id = data.get('session_id', 'default')
        
        # Initialize session buffer if needed
        if session_id not in session_buffers:
            session_buffers[session_id] = {
                'predictions': deque(maxlen=SMOOTHING_FRAMES),
                'confidences': deque(maxlen=SMOOTHING_FRAMES)
            }
        
        # Decode base64 image
        image_data = data['image'].split(',')[1] if ',' in data['image'] else data['image']
        image_bytes = base64.b64decode(image_data)
        nparr = np.frombuffer(image_bytes, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if frame is None:
            return jsonify({'error': 'Failed to decode image'}), 400
        
        # Process with MediaPipe
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        result = hands.process(rgb)
        
        if not result.multi_hand_landmarks:
            # No hand detected
            session_buffers[session_id]['predictions'].append("NO_HAND")
            session_buffers[session_id]['confidences'].append(0.0)
            
            return jsonify({
                'gesture': 'NO_HAND',
                'confidence': 0.0,
                'hand_detected': False,
                'message': 'No hand detected in frame'
            })
        
        # Extract landmarks
        hand_landmarks = result.multi_hand_landmarks[0]
        raw_landmarks = []
        for p in hand_landmarks.landmark:
            raw_landmarks.append([p.x, p.y, p.z])
        raw_landmarks = np.array(raw_landmarks)
        
        # Normalize landmarks
        normalized = normalize_landmarks(raw_landmarks)
        
        if normalized is None:
            return jsonify({
                'gesture': 'INVALID',
                'confidence': 0.0,
                'hand_detected': True,
                'message': 'Failed to normalize landmarks'
            })
        
        # Predict
        normalized = normalized.reshape(1, -1)
        predictions = model.predict(normalized, verbose=0)[0]
        
        predicted_idx = np.argmax(predictions)
        predicted_conf = predictions[predicted_idx]
        predicted_gesture = GESTURES[predicted_idx]
        
        # Build all probabilities dict
        all_probs = {GESTURES[i]: float(predictions[i]) for i in range(len(GESTURES))}
        
        # Decision logic with confidence thresholds
        if predicted_conf < LOW_CONF_THRESHOLD:
            session_buffers[session_id]['predictions'].append("IGNORED")
            session_buffers[session_id]['confidences'].append(0.0)
        elif predicted_gesture == "idle":
            if predicted_conf > IDLE_THRESHOLD:
                session_buffers[session_id]['predictions'].append("IDLE")
                session_buffers[session_id]['confidences'].append(predicted_conf)
            else:
                session_buffers[session_id]['predictions'].append("IGNORED")
                session_buffers[session_id]['confidences'].append(0.0)
        else:
            if predicted_conf > CONF_THRESHOLD:
                session_buffers[session_id]['predictions'].append(predicted_gesture.upper())
                session_buffers[session_id]['confidences'].append(predicted_conf)
            else:
                session_buffers[session_id]['predictions'].append("UNCERTAIN")
                session_buffers[session_id]['confidences'].append(predicted_conf)
        
        # Get smoothed prediction
        display_label, smoothed_conf = get_smoothed_prediction(session_id)
        
        return jsonify({
            'gesture': display_label,
            'confidence': float(smoothed_conf),
            'hand_detected': True,
            'raw_gesture': predicted_gesture.upper(),
            'raw_confidence': float(predicted_conf),
            'all_probabilities': all_probs,
            'buffer_size': len(session_buffers[session_id]['predictions'])
        })
        
    except Exception as e:
        print(f"Error in prediction: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/reset_session', methods=['POST'])
def reset_session():
    """
    Reset prediction buffer for a session
    
    Request JSON:
    {
        "session_id": "unique_session_identifier"
    }
    """
    try:
        data = request.get_json()
        session_id = data.get('session_id', 'default')
        
        if session_id in session_buffers:
            del session_buffers[session_id]
        
        return jsonify({'status': 'ok', 'message': f'Session {session_id} reset'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🚀 Gesture Recognition Server Starting...")
    print("="*60)
    print(f"Model Path: {MODEL_PATH}")
    print(f"Model Loaded: {model is not None}")
    print(f"Supported Gestures: {', '.join(GESTURES)}")
    print("="*60)
    print("\n🌐 Server will run on http://localhost:5000")
    print("📡 CORS enabled for frontend communication")
    print("\nEndpoints:")
    print("  GET  /api/health - Health check")
    print("  POST /api/predict - Gesture prediction")
    print("  POST /api/reset_session - Reset session buffer")
    print("\n" + "="*60 + "\n")
    
    app.run(host='0.0.0.0', port=5000, debug=True, threaded=True)
