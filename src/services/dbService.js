// Firestore Database Service
import { getDbInstance } from '../config/firebase.js';

// Initialize Firebase on first use
async function ensureInitialized() {
    return await getDbInstance();
}

/**
 * Save assessment data
 */
export async function saveAssessment(userId, assessmentData) {
    try {
        const dbInstance = await ensureInitialized();
        const { collection, addDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        
        const assessmentDoc = {
            userId: userId,
            ...assessmentData,
            completedAt: new Date().toISOString(),
            timestamp: new Date()
        };
        
        const docRef = await addDoc(collection(dbInstance, 'assessments'), assessmentDoc);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error saving assessment:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Get user's assessment
 */
export async function getUserAssessment(userId) {
    try {
        const dbInstance = await ensureInitialized();
        const { collection, query, where, orderBy, limit, getDocs } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        
        const q = query(
            collection(dbInstance, 'assessments'),
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

/**
 * Update user profile
 */
export async function updateUserProfile(userId, updates) {
    try {
        const dbInstance = await ensureInitialized();
        const { doc, updateDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        
        const userRef = doc(dbInstance, 'users', userId);
        await updateDoc(userRef, {
            ...updates,
            updatedAt: new Date().toISOString()
        });
        return { success: true };
    } catch (error) {
        console.error('Error updating profile:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Save contact form submission
 */
export async function saveContactForm(contactData) {
    try {
        const dbInstance = await ensureInitialized();
        const { collection, addDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        
        const docRef = await addDoc(collection(dbInstance, 'contacts'), {
            ...contactData,
            submittedAt: new Date().toISOString(),
            timestamp: new Date()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error saving contact form:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Get all career paths (can be stored in Firestore or kept as static)
 */
export async function getCareerPaths() {
    // For now, return mock data
    // TODO: Fetch from Firestore if you store careers there
    return null;
}

// Save contact form submission to Firestore
export async function saveContactMessage(messageData) {
  try {
    const { db } = await import('../config/firebase.js').then(m => m.initializeFirebase());
    const firestoreModule = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
    const { collection, addDoc } = firestoreModule;

    // 1. Save to contactMessages (for your records)
    await addDoc(collection(db, 'contactMessages'), {
      ...messageData,
      timestamp: firestoreModule.serverTimestamp(),
      status: 'new'
    });

    // 2. Trigger email via Firebase Extension
    await addDoc(collection(db, 'mail'), {
      to: 'inclusivecareerhelp@gmail.com', // 👈 REPLACE WITH YOUR EMAIL
      message: {
        subject: `New Contact Form: ${messageData.subject}`,
        html: `
          <h2>New Message from Career Discovery Platform</h2>
          <p><strong>Name:</strong> ${messageData.name}</p>
          <p><strong>Email:</strong> ${messageData.email}</p>
          <p><strong>Subject:</strong> ${messageData.subject}</p>
          <p><strong>Message:</strong></p>
          <blockquote>${messageData.message.replace(/\n/g, '<br>')}</blockquote>
        `
      }
    });

    return { success: true };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error: error.message };
  }
}