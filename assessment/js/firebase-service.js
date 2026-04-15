// Firebase service for assessment.html
// Uses Firebase v9+ modular SDK

    ```javascript
    export const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "",
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "",
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "",
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "",
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "",
      appId: process.env.REACT_APP_FIREBASE_APP_ID || "",
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || ""
    };
    ```

let app = null;
let auth = null;
let db = null;

async function ensureInitialized() {
  if (app) return { app, auth, db };

  const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
  const { getAuth, setPersistence, browserSessionPersistence } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
  const { getFirestore, collection, addDoc, query, where, orderBy, limit, getDocs } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');

  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  await setPersistence(auth, browserSessionPersistence);
  db = getFirestore(app);

  return { app, auth, db };
}

// Get current authenticated user ID (REQUIRES AUTHENTICATION)
async function getCurrentUserId() {
  await ensureInitialized();
  
  // First check localStorage (set by main app)
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    try {
      const userData = JSON.parse(storedUser);
      if (userData && userData.uid) {
        return userData.uid;
      }
    } catch (e) {
      console.warn('Error parsing stored user:', e);
    }
  }
  
  // Fallback to Firebase auth currentUser (synchronous check)
  if (auth && auth.currentUser) {
    return auth.currentUser.uid;
  }
  
  throw new Error('User not authenticated. Please login to continue.');
}

// Get current user object
async function getCurrentUser() {
  await ensureInitialized();
  
  // First check localStorage (set by main app)
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    try {
      const userData = JSON.parse(storedUser);
      if (userData && userData.uid) {
        // Return a user-like object
        return {
          uid: userData.uid,
          email: userData.email || null,
          displayName: userData.name || null
        };
      }
    } catch (e) {
      console.warn('Error parsing stored user:', e);
    }
  }
  
  // Fallback to Firebase auth currentUser (synchronous check)
  if (auth && auth.currentUser) {
    return auth.currentUser;
  }
  
  throw new Error('User not authenticated');
}

// Generate unique assessment ID
function generateAssessmentId() {
  return `assessment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Save pre-assessment form data
async function savePreAssessmentData(preAssessmentData) {
  try {
    await ensureInitialized();
    const { collection, addDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
    
    const userId = await getCurrentUserId();
    const assessmentId = generateAssessmentId();
    
    const preAssessmentDoc = {
      userId: userId,
      assessmentId: assessmentId,
      preAssessmentData: preAssessmentData,
      createdAt: new Date(),
      status: 'pre-assessment-complete'
    };
    
    const docRef = await addDoc(collection(db, 'assessments'), preAssessmentDoc);
    console.log('Pre-assessment data saved:', docRef.id);
    
    // Store assessment ID for linking
    localStorage.setItem('currentAssessmentId', assessmentId);
    
    return { success: true, id: docRef.id, assessmentId: assessmentId };
  } catch (error) {
    console.error('Error saving pre-assessment data:', error);
    return { success: false, error: error.message };
  }
}

// Save assessment results to Firebase (linked to pre-assessment)
async function saveAssessmentResults(assessmentData) {
  try {
    await ensureInitialized();
    const { collection, query, where, getDocs, updateDoc, doc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
    
    const userId = await getCurrentUserId();
    const assessmentId = localStorage.getItem('currentAssessmentId') || generateAssessmentId();
    
    // Try to find existing assessment document
    const q = query(
      collection(db, 'assessments'),
      where('userId', '==', userId),
      where('assessmentId', '==', assessmentId)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Update existing document
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        ...assessmentData,
        completedAt: new Date(),
        status: 'completed'
      });
      return { success: true, id: docRef.id, assessmentId: assessmentId };
    } else {
      // Create new document
      const { addDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
      const assessmentDoc = {
        userId: userId,
        assessmentId: assessmentId,
        ...assessmentData,
        completedAt: new Date(),
        createdAt: new Date(),
        status: 'completed'
      };
      
      const docRef = await addDoc(collection(db, 'assessments'), assessmentDoc);
      console.log('Assessment saved with ID:', docRef.id);
      return { success: true, id: docRef.id, assessmentId: assessmentId };
    }
  } catch (error) {
    console.error('Error saving assessment:', error);
    return { success: false, error: error.message };
  }
}

// Get user's latest assessment
async function getUserLatestAssessment() {
  try {
    await ensureInitialized();
    const { collection, query, where, orderBy, limit, getDocs } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
    
    const userId = await getCurrentUserId();
    
    const q = query(
      collection(db, 'assessments'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching assessment:', error);
    return null;
  }
}

// Update user profile with assessment reference
async function updateUserProfile(assessmentId) {
  try {
    await ensureInitialized();
    const { doc, setDoc, getDoc, updateDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
    
    const userId = await getCurrentUserId();
    const userRef = doc(db, 'userProfiles', userId);
    const userDoc = await getDoc(userRef);
    
    const updateData = {
      lastAssessmentAt: new Date(),
      ...(userDoc.exists() ? {} : {
        userId: userId,
        createdAt: new Date()
      })
    };
    
    if (userDoc.exists()) {
      const currentData = userDoc.data();
      const assessments = currentData.assessments || [];
      if (!assessments.includes(assessmentId)) {
        assessments.push(assessmentId);
        updateData.assessments = assessments;
      }
      await updateDoc(userRef, updateData);
    } else {
      updateData.assessments = [assessmentId];
      await setDoc(userRef, updateData);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { success: false, error: error.message };
  }
}

// Export functions
window.firebaseService = {
  saveAssessmentResults,
  savePreAssessmentData,
  getUserLatestAssessment,
  getCurrentUserId,
  getCurrentUser,
  updateUserProfile,
  generateAssessmentId
};
