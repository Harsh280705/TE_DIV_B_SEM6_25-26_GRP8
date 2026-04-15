import os
import cv2
import numpy as np
import mediapipe as mp
from collections import defaultdict

DATASET_DIR = "dataset"
GESTURES = ["yes", "no", "skip", "repeat", "idle"]

print("="*60)
print("Dataset Quality Analysis")
print("="*60)

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=True, max_num_hands=1)

stats = defaultdict(lambda: {
    'total': 0,
    'no_hand_detected': 0,
    'blurry': 0,
    'too_small': 0,
    'too_large': 0,
    'valid': 0,
    'avg_confidence': []
})

def calculate_blur(image):
    """Calculate Laplacian variance to detect blur"""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    return cv2.Laplacian(gray, cv2.CV_64F).var()

def calculate_hand_size(landmarks, img_shape):
    """Calculate hand bounding box size"""
    h, w = img_shape[:2]
    x_coords = [lm.x * w for lm in landmarks.landmark]
    y_coords = [lm.y * h for lm in landmarks.landmark]
    
    width = max(x_coords) - min(x_coords)
    height = max(y_coords) - min(y_coords)
    
    return width, height

print("\nAnalyzing dataset...")
print("-" * 60)

for gesture in GESTURES:
    folder = os.path.join(DATASET_DIR, gesture)
    
    if not os.path.exists(folder):
        print(f"⚠️  Folder not found: {gesture}")
        continue
    
    print(f"\nAnalyzing: {gesture.upper()}")
    
    for img_name in os.listdir(folder):
        img_path = os.path.join(folder, img_name)
        img = cv2.imread(img_path)
        
        stats[gesture]['total'] += 1
        
        if img is None:
            print(f"  ⚠️  Corrupted image: {img_name}")
            continue
        
        # Check blur
        blur_score = calculate_blur(img)
        if blur_score < 100:
            stats[gesture]['blurry'] += 1
        
        # Process with MediaPipe
        rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        result = hands.process(rgb)
        
        if not result.multi_hand_landmarks:
            stats[gesture]['no_hand_detected'] += 1
        else:
            lm = result.multi_hand_landmarks[0]
            
            # Calculate hand size
            width, height = calculate_hand_size(lm, img.shape)
            hand_area = width * height
            img_area = img.shape[0] * img.shape[1]
            hand_ratio = hand_area / img_area
            
            if hand_ratio < 0.05:
                stats[gesture]['too_small'] += 1
            elif hand_ratio > 0.8:
                stats[gesture]['too_large'] += 1
            else:
                stats[gesture]['valid'] += 1
            
            # Get detection confidence if available
            if hasattr(result, 'multi_handedness') and result.multi_handedness:
                confidence = result.multi_handedness[0].classification[0].score
                stats[gesture]['avg_confidence'].append(confidence)
    
    # Print gesture stats
    total = stats[gesture]['total']
    valid = stats[gesture]['valid']
    no_hand = stats[gesture]['no_hand_detected']
    blurry = stats[gesture]['blurry']
    too_small = stats[gesture]['too_small']
    too_large = stats[gesture]['too_large']
    
    print(f"  Total images: {total}")
    print(f"  Valid: {valid} ({valid/total*100:.1f}%)")
    print(f"  No hand detected: {no_hand} ({no_hand/total*100:.1f}%)")
    print(f"  Blurry: {blurry} ({blurry/total*100:.1f}%)")
    print(f"  Hand too small: {too_small} ({too_small/total*100:.1f}%)")
    print(f"  Hand too large: {too_large} ({too_large/total*100:.1f}%)")
    
    if stats[gesture]['avg_confidence']:
        avg_conf = np.mean(stats[gesture]['avg_confidence'])
        print(f"  Avg detection confidence: {avg_conf:.2%}")

# Summary
print("\n" + "="*60)
print("SUMMARY")
print("="*60)

total_images = sum(s['total'] for s in stats.values())
total_valid = sum(s['valid'] for s in stats.values())
total_no_hand = sum(s['no_hand_detected'] for s in stats.values())
total_blurry = sum(s['blurry'] for s in stats.values())

print(f"\nTotal images: {total_images}")
print(f"Valid images: {total_valid} ({total_valid/total_images*100:.1f}%)")
print(f"No hand detected: {total_no_hand} ({total_no_hand/total_images*100:.1f}%)")
print(f"Blurry images: {total_blurry} ({total_blurry/total_images*100:.1f}%)")

# Recommendations
print("\n" + "="*60)
print("RECOMMENDATIONS")
print("="*60)

issues_found = False

for gesture in GESTURES:
    if gesture not in stats:
        continue
    
    total = stats[gesture]['total']
    valid = stats[gesture]['valid']
    no_hand = stats[gesture]['no_hand_detected']
    
    if total < 800:
        print(f"⚠️  {gesture}: Only {total} samples (recommended: 1000+)")
        issues_found = True
    
    if valid / total < 0.90:
        print(f"⚠️  {gesture}: Only {valid/total*100:.0f}% valid samples (recommended: >95%)")
        print(f"   → Re-collect {gesture} with better hand visibility")
        issues_found = True
    
    if no_hand / total > 0.10:
        print(f"⚠️  {gesture}: {no_hand/total*100:.0f}% images have no hand detected")
        print(f"   → Ensure hand is clearly visible and well-lit")
        issues_found = True

# Check class balance
sample_counts = [stats[g]['total'] for g in GESTURES if g in stats]
if sample_counts:
    min_count = min(sample_counts)
    max_count = max(sample_counts)
    
    if max_count / min_count > 1.5:
        print(f"⚠️  Class imbalance detected:")
        for gesture in GESTURES:
            if gesture in stats:
                count = stats[gesture]['total']
                print(f"   {gesture}: {count} samples")
        print(f"   → Try to balance classes (difference should be <30%)")
        issues_found = True

if not issues_found:
    print("✅ Dataset looks good! Proceed with training.")
else:
    print("\n💡 Fix these issues for better model performance.")

print("\n" + "="*60)