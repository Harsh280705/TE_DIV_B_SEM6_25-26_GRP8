import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from sklearn.model_selection import train_test_split
from sklearn.utils.class_weight import compute_class_weight

# ================= CONFIG =================
GESTURES = ["yes", "no", "skip", "repeat", "idle"]
MODEL_PATH = "gesture_landmark_model.h5"
EPOCHS = 100
BATCH_SIZE = 32
LEARNING_RATE = 0.001
# =========================================

# Load data
X = np.load("X_landmarks.npy")
y = np.load("y_landmarks.npy")

print(f"Dataset shape: {X.shape}")
print(f"Labels shape: {y.shape}")
print(f"Class distribution: {np.bincount(y)}")

# Data augmentation for landmarks
def augment_landmarks(landmarks, augmentation_factor=3):
    """
    Augment landmark data by applying small random transformations
    """
    augmented_X = []
    augmented_y = []
    
    for i in range(len(landmarks)):
        lm = landmarks[i].reshape(21, 3)
        label = y[i]
        
        # Original sample
        augmented_X.append(landmarks[i])
        augmented_y.append(label)
        
        # Create augmented versions
        for _ in range(augmentation_factor):
            # Small random rotation around Z-axis
            angle = np.random.uniform(-0.2, 0.2)  # radians
            cos_a, sin_a = np.cos(angle), np.sin(angle)
            rotation_matrix = np.array([
                [cos_a, -sin_a, 0],
                [sin_a, cos_a, 0],
                [0, 0, 1]
            ])
            
            # Apply rotation
            rotated = lm @ rotation_matrix.T
            
            # Small random scaling
            scale = np.random.uniform(0.95, 1.05)
            scaled = rotated * scale
            
            # Small random translation
            translation = np.random.uniform(-0.05, 0.05, size=3)
            translated = scaled + translation
            
            # Add small noise
            noise = np.random.normal(0, 0.01, size=translated.shape)
            augmented = translated + noise
            
            augmented_X.append(augmented.flatten())
            augmented_y.append(label)
    
    return np.array(augmented_X, dtype=np.float32), np.array(augmented_y, dtype=np.int32)

# Apply augmentation
print("\nApplying data augmentation...")
X_aug, y_aug = augment_landmarks(X, augmentation_factor=2)
print(f"Augmented dataset shape: {X_aug.shape}")
print(f"Augmented class distribution: {np.bincount(y_aug)}")

# Train-validation split
X_train, X_val, y_train, y_val = train_test_split(
    X_aug, y_aug,
    test_size=0.15,
    random_state=42,
    stratify=y_aug
)

print(f"\nTrain samples: {len(X_train)}")
print(f"Validation samples: {len(X_val)}")

# Compute class weights for imbalanced data
class_weights = compute_class_weight(
    'balanced',
    classes=np.unique(y_train),
    y=y_train
)
class_weight_dict = dict(enumerate(class_weights))
print(f"\nClass weights: {class_weight_dict}")

# Build improved model
def create_model():
    model = keras.Sequential([
        layers.Input(shape=(63,)),  # 21 landmarks * 3 coordinates
        
        # First block
        layers.Dense(256, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.4),
        
        # Second block
        layers.Dense(128, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.3),
        
        # Third block
        layers.Dense(64, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.2),
        
        # Fourth block
        layers.Dense(32, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.2),
        
        # Output layer
        layers.Dense(len(GESTURES), activation='softmax')
    ])
    
    return model

model = create_model()
model.summary()

# Compile model
optimizer = keras.optimizers.Adam(learning_rate=LEARNING_RATE)
model.compile(
    optimizer=optimizer,
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Callbacks
callbacks = [
    keras.callbacks.EarlyStopping(
        monitor='val_loss',
        patience=15,
        restore_best_weights=True,
        verbose=1
    ),
    keras.callbacks.ReduceLROnPlateau(
        monitor='val_loss',
        factor=0.5,
        patience=7,
        min_lr=1e-6,
        verbose=1
    ),
    keras.callbacks.ModelCheckpoint(
        MODEL_PATH,
        monitor='val_accuracy',
        save_best_only=True,
        verbose=1
    )
]

# Train model
print("\n" + "="*50)
print("Starting training...")
print("="*50 + "\n")

history = model.fit(
    X_train, y_train,
    validation_data=(X_val, y_val),
    epochs=EPOCHS,
    batch_size=BATCH_SIZE,
    class_weight=class_weight_dict,
    callbacks=callbacks,
    verbose=1
)

# Evaluate
print("\n" + "="*50)
print("Final Evaluation")
print("="*50)

train_loss, train_acc = model.evaluate(X_train, y_train, verbose=0)
val_loss, val_acc = model.evaluate(X_val, y_val, verbose=0)

print(f"\nTrain Accuracy: {train_acc*100:.2f}%")
print(f"Validation Accuracy: {val_acc*100:.2f}%")

# Detailed per-class accuracy
y_pred = np.argmax(model.predict(X_val, verbose=0), axis=1)
from sklearn.metrics import classification_report, confusion_matrix

print("\n" + "="*50)
print("Classification Report")
print("="*50)
print(classification_report(y_val, y_pred, target_names=GESTURES))

print("\n" + "="*50)
print("Confusion Matrix")
print("="*50)
cm = confusion_matrix(y_val, y_pred)
print(cm)

print("\n✅ Training complete! Model saved to:", MODEL_PATH)