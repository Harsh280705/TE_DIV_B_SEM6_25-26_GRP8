// Firebase Authentication Service
import { initializeFirebase } from '../config/firebase.js';

// Initialize Firebase on first use
async function ensureInitialized() {
    return await initializeFirebase();
}

/**
 * Register a new user
 */
export async function registerUser(userData, isMentor = false, linkedUserId = null) {
    try {
        const { auth: authInstance, db: dbInstance } = await ensureInitialized();
        
        const { createUserWithEmailAndPassword } = await import(
            'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
        );
        const { doc, setDoc } = await import(
            'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
        );
        
        // Create authentication account
        const userCredential = await createUserWithEmailAndPassword(
            authInstance, 
            userData.email, 
            userData.password
        );
        
        const user = userCredential.user;
        
        const userDoc = {
            uid: user.uid,
            name: userData.name,
            email: userData.email,
            isMentor: isMentor,
            createdAt: new Date().toISOString(),

            ...(isMentor && linkedUserId ? { userId: linkedUserId } : {}),
            ...(!isMentor && userData.mentorId ? { mentorId: userData.mentorId } : {}),

            ...(isMentor ? {
                relation: userData.relation,
                phone: userData.phone
            } : {
                age: userData.age,
                gender: userData.gender,
                state: userData.state,
                city: userData.city,
                contact: userData.contact,
                screenVisibility: userData.screenVisibility,
                screenReader: userData.screenReader,
                preferredLanguage: userData.preferredLanguage
            })
        };

        await setDoc(
            doc(dbInstance, isMentor ? 'mentors' : 'users', user.uid),
            userDoc
        );
        
        return { success: true, user, userData: userDoc };
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Login user
 */
export async function loginUser(email, password) {
    try {
        const { auth: authInstance, db: dbInstance } = await ensureInitialized();
        
        const { signInWithEmailAndPassword } = await import(
            'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
        );
        const { doc, getDoc } = await import(
            'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
        );
        
        const userCredential = await signInWithEmailAndPassword(
            authInstance, 
            email, 
            password
        );
        const user = userCredential.user;
        
        const userDocSnap = await getDoc(doc(dbInstance, 'users', user.uid));
        if (userDocSnap.exists()) {
            return {
                success: true,
                user,
                userData: { id: userDocSnap.id, ...userDocSnap.data() }
            };
        }

        const mentorDocSnap = await getDoc(doc(dbInstance, 'mentors', user.uid));
        if (mentorDocSnap.exists()) {
            return {
                success: true,
                user,
                userData: { id: mentorDocSnap.id, ...mentorDocSnap.data() }
            };
        }
        
        return { success: true, user, userData: null };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Logout user
 */
export async function logoutUser() {
    try {
        const { auth: authInstance } = await ensureInitialized();
        const { signOut } = await import(
            'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
        );
        await signOut(authInstance);
        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Update user OR mentor data
 */
export async function updateUserData(uid, userData, collectionName = 'users') {
    const { db: dbInstance } = await ensureInitialized();
    const { doc, updateDoc } = await import(
        'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
    );
    await updateDoc(doc(dbInstance, collectionName, uid), userData);
}

/**
 * Get current user
 */
export async function getCurrentUser() {
    const { auth: authInstance } = await ensureInitialized();
    return authInstance.currentUser;
}

/**
 * Listen to auth state changes
 */
export async function onAuthStateChange(callback) {
    const { auth: authInstance } = await ensureInitialized();
    const { onAuthStateChanged } = await import(
        'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
    );
    return onAuthStateChanged(authInstance, callback);
}

/**
 * Get user data from Firestore
 */
export async function getUserData(uid) {
    try {
        const { db: dbInstance } = await ensureInitialized();
        const { doc, getDoc } = await import(
            'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
        );
        
        const userDoc = await getDoc(doc(dbInstance, 'users', uid));
        if (userDoc.exists()) {
            return { id: userDoc.id, ...userDoc.data() };
        }
        
        const mentorDoc = await getDoc(doc(dbInstance, 'mentors', uid));
        if (mentorDoc.exists()) {
            return { id: mentorDoc.id, ...mentorDoc.data() };
        }
        
        return null;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}
