// src/config/firebase.js
// Firebase configuration for modular SDK (v9+)
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

  // ✅ Import only needed modular functions
  const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
  const { getAuth, setPersistence, browserSessionPersistence } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
  const { getFirestore } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');

  // ✅ Initialize app
  app = initializeApp(firebaseConfig);

  // ✅ Get auth and set persistence
  auth = getAuth(app);
  await setPersistence(auth, browserSessionPersistence);

  // ✅ Get Firestore
  db = getFirestore(app);

  return { app, auth, db };
}

export async function initializeFirebase() {
  return await ensureInitialized();
}

export async function getAuthInstance() {
  const { auth: authInstance } = await ensureInitialized();
  return authInstance;
}

export async function getDbInstance() {
  const { db: dbInstance } = await ensureInitialized();
  return dbInstance;
}