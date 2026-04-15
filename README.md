# Inclusive Career PAth for Differently Abled People 🎯

An inclusive, web-based career assessment and discovery platform designed to help differently abled individuals identify career opportunities aligned with their strengths and capabilities.

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Configuration](#configuration)
- [Future Improvements](#future-improvements)
- [License](#license)
- [Contributing](#contributing)

---

## 🎯 Overview

The **Career Discovery Platform** is an inclusive web application that empowers individuals with disabilities to explore career paths suited to their unique abilities. The platform features:

- **Interactive Assessments** to evaluate skills and interests
- **Gesture-Based Accessibility** using computer vision for hands-free navigation
- **Career Mapping** system connecting assessments to suitable career domains
- **Personalized Dashboards** displaying results and recommendations
- **Firebase-backed** authentication and data storage

**Use Cases:**
- Students exploring career options post-education
- Career counselors assessing clients' abilities
- Job placement agencies matching individuals to roles
- Organizations promoting inclusive hiring

---

## ✨ Key Features

### 1. **Accessibility-First Design**
- Gesture recognition for hands-free navigation
- Voice integration for control
- Keyboard navigation support
- ARIA labels and semantic HTML

### 2. **Assessment System**
- Multi-question assessment tests
- Score tracking and analytics
- Career domain matching
- Personalized recommendations

### 3. **Career Mapping**
- 20+ career domains and subdomains
- Skill-to-career matching algorithm
- Career pathway visualizations
- Resource links and external guidance

### 4. **User Management**
- Firebase Authentication (email/password, social)
- User profiles with capability tracking
- Persistent data storage
- Privacy controls

### 5. **ML-Powered Gesture Recognition**
- Real-time hand gesture detection using MediaPipe
- TensorFlow-based gesture classification
- Training and prediction pipelines
- Customizable gesture commands

### 6. **Data Visualization**
- Interactive dashboards
- Results export functionality
- Career progression charts

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | Firebase (Auth, Firestore, Storage) |
| **ML/AI** | Python 3.x, TensorFlow 2.13, MediaPipe, OpenCV, Flask |
| **Build/Dev** | Node.js, npm, http-server |
| **UI Components** | Bootstrap CSS, FontAwesome Icons |
| **APIs** | Firebase SDK v12.7.0 |

---

## 📋 Prerequisites

### **For Frontend Development:**
- Node.js (v14 or higher)
- npm (v6 or higher)
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (Firebase Realtime connection)

### **For ML/Gesture Recognition:**
- Python 3.8 or higher
- pip (Python package manager)
- Webcam (for gesture recognition testing)
- TensorFlow-compatible system (CPU or GPU)

### **Optional:**
- VS Code with Live Server extension
- Git for version control

---

## 🚀 Installation & Setup

### **Step 1: Clone the Repository**

```bash
git clone https://github.com/yourusername/career-discovery-platform.git
cd career-discovery-platform
```

### **Step 2: Install Frontend Dependencies**

```bash
npm install
```

This installs:
- `http-server` (local development server)
- `firebase` (database and authentication SDK)

### **Step 3: Install ML/Python Dependencies (Optional)**

If you plan to use gesture recognition features:

```bash
# Navigate to ML directory
cd src/ml

# Create a virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt
```

**Python Packages:**
- `flask` - Web server for gesture predictions
- `tensorflow` - Deep learning framework
- `mediapipe` - Hand gesture detection
- `opencv-python` - Image processing
- `numpy` - Numerical computations
- `flask-cors` - Cross-origin requests

### **Step 4: Configure Firebase**

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Replace the config in `src/config/firebase.js` with your Firebase credentials:

```javascript
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

3. Enable **Authentication** (Email/Password, Google Sign-In)
4. Enable **Firestore Database** (Cloud Firestore)

### **Step 5: Train Gesture Recognition Model (Optional)**

If you want to customize gesture recognition:

```bash
cd src/ml

# Collect dataset
python collect_dataset.py

# Preprocess data
python preprocess_dataset.py

# Extract hand landmarks
python extract_landmarks.py

# Train the model
python train_landmark_model.py
```

---

## 🏃 Running Locally

### **Start Frontend Server**

```bash
npm start
# or
npm run dev
```

This starts a local server at `http://127.0.0.1:8000`

Open in your browser:
```
http://127.0.0.1:8000
```

### **Start Gesture Recognition Server (Optional)**

In a **new terminal**, from the `src/ml` directory:

```bash
# With virtual environment activated
python gesture_server.py
```

This starts the Flask server on `http://localhost:5000`

The frontend will automatically connect if both servers are running.

### **Access the Application**

- **Homepage:** `http://127.0.0.1:8000`
- **Login:** Create account or sign in
- **Assessment:** Take the career assessment test
- **Dashboard:** View results and recommendations
- **Career Paths:** Explore career domains and subdomains

---

## 📁 Project Structure

```
career-discovery-platform/
│
├── 📄 index.html                 # Main entry point
├── 📄 package.json               # Node.js dependencies
│
├── 📂 assessment/                # Assessment pages and logic
│   ├── assessment.html           # Assessment test interface
│   ├── assessment-results.html   # Results display
│   ├── career-domains.html       # Career domain selector
│   ├── career-paths.html         # Career path visualization
│   ├── dashboard.html            # User dashboard
│   ├── css/
│   │   └── bootstrap.min.css     # Styling framework
│   ├── data/
│   │   ├── careers.json          # Career data
│   │   ├── disabilities.json     # Disability definitions
│   │   ├── domains.json          # Career domains
│   │   └── schemes.json          # Classification schemes
│   └── js/
│       ├── career-mapper.js      # Career mapping algorithm
│       ├── accessibility.js      # Accessibility features
│       ├── gesture-controller.js # Gesture recognition logic
│       ├── question-service.js   # Question management
│       └── main.js               # Assessment logic
│
├── 📂 src/                       # Source code
│   ├── 📂 components/            # Reusable UI components
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   └── QuestionComponent.js
│   │
│   ├── 📂 config/
│   │   └── firebase.js           # Firebase configuration
│   │
│   ├── 📂 pages/                 # Page components
│   │   ├── Home.js
│   │   ├── Assessment.js
│   │   ├── CareerPath.js
│   │   ├── Dashboard.js
│   │   ├── Results.js
│   │   └── ... (other pages)
│   │
│   ├── 📂 services/              # API and data services
│   │   ├── authService.js        # Authentication logic
│   │   └── dbService.js          # Database queries
│   │
│   ├── 📂 styles/
│   │   └── main.css              # Global styles
│   │
│   ├── 📂 js/
│   │   ├── app.js                # Main app controller
│   │   └── auth.js               # Auth utilities
│   │
│   ├── 📂 ml/                    # Machine Learning (Gesture Recognition)
│   │   ├── gesture_model.h5      # Trained TensorFlow model
│   │   ├── gesture_server.py     # Flask API for predictions
│   │   ├── realtime_predict_improved.py  # Real-time gesture detection
│   │   ├── requirements.txt       # Python dependencies
│   │   ├── train_landmark_model.py  # Model training script
│   │   ├── collect_dataset.py    # Data collection
│   │   ├── preprocess_dataset.py # Data preprocessing
│   │   ├── X_landmarks.npy       # Training data (landmarks)
│   │   ├── y_landmarks.npy       # Training labels
│   │   └── dataset/              # Raw gesture dataset
│   │
│   ├── 📂 data/
│   │   └── mockData.js           # Test/mock data
│   │
│   └── 📂 utils/
│       └── scoring.js            # Assessment scoring logic
│
├── 📂 assets/                    # Static assets
│   └── fontawesome/              # Font Awesome icons (v6.5.2)
│
└── 📄 .gitignore                 # Git ignore rules
```

### **Key Files Explained:**

| File | Purpose |
|------|---------|
| `assessment/assessment.html` | Main assessment test interface |
| `src/config/firebase.js` | Firebase initialization and configuration |
| `src/ml/gesture_server.py` | Backend API for gesture recognition |
| `assessment/js/career-mapper.js` | Algorithm matching skills to careers |
| `src/services/authService.js` | User authentication logic |
| `assessment/data/careers.json` | Comprehensive career database |

---

## 💡 Usage Guide

### **For End Users:**

1. **Create Account**
   - Visit the homepage
   - Click "Sign Up"
   - Enter email and password
   - Verify email (if configured)

2. **Complete Assessment**
   - Navigate to Assessment page
   - Answer questions about skills and interests
   - System evaluates responses
   - Review personalized results

3. **Explore Career Paths**
   - View recommended careers on dashboard
   - Click to explore specific career domains
   - Review job descriptions and requirements
   - Access external resources

4. **Use Gesture Controls** (Optional)
   - Grant camera access
   - Perform hand gestures for navigation
   - Supported gestures: thumbs up, peace sign, fist, etc.

5. **Export Results**
   - Generate PDF or CSV of assessment results
   - Share with career counselors

### **For Developers:**

#### **Running in Development Mode:**

```bash
npm run dev
```

#### **Adding New Assessments:**

1. Create question in `assessment/data/` JSON file
2. Update `assessment/js/question-service.js`
3. Add scoring logic to `src/utils/scoring.js`

#### **Adding New Career Domains:**

1. Update `assessment/data/domains.json`
2. Modify `assessment/js/career-mapper.js` to include mappings
3. Update `assessment/career-domains.html` UI

#### **Retraining Gesture Model:**

```bash
cd src/ml
python collect_dataset.py    # Record new gestures
python train_landmark_model.py  # Retrain model
python gesture_server.py     # Start server with new model
```

## ⚙️ Configuration

### **Firebase Setup:**

Edit `src/config/firebase.js`:
- Update with your Firebase project credentials
- Configure authentication methods in Firebase Console
- Set Firestore security rules in Firebase Console

### **Gesture Recognition:**

Modify `src/ml/gesture_server.py`:
- Change confidence thresholds
- Add new gestures to model
- Adjust prediction sensitivity

### **Styling:**

- Global styles: `src/styles/main.css`
- Bootstrap customizations: `assessment/css/bootstrap.min.css`
- Theme colors can be adjusted in CSS variables
