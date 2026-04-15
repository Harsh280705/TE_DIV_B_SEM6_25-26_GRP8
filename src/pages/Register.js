// src/pages/register.js
import { states } from '../data/mockData.js';
import { registerUser } from '../services/authService.js';
import { getDbInstance } from '../config/firebase.js';

export function renderRegister() {
    return `
        <main role="main" aria-labelledby="register-heading">
            <div class="container" style="max-width: 600px; padding: 2rem 20px;">
                <h1 id="register-heading" class="text-center mb-4">Create Your Account</h1>

                <!-- Mentor/Guardian Question -->
                <div class="card mb-4">
                    <h2>Registration Type</h2>
                    <div class="form-group">
                        <label>Do you have a mentor/guardian to help you fill this form?</label>
                        <div class="radio-group">
                            <input type="radio" id="has-mentor-yes" name="has-mentor" value="yes"
                                onchange="toggleMentorForm(true)">
                            <label for="has-mentor-yes">Yes</label>
                        </div>
                        <div class="radio-group">
                            <input type="radio" id="has-mentor-no" name="has-mentor" value="no" checked
                                onchange="toggleMentorForm(false)">
                            <label for="has-mentor-no">No</label>
                        </div>
                    </div>
                </div>

                <!-- Mentor Form -->
                <div id="mentor-form" class="card mb-4" style="display:none;">
                    <h2>Mentor / Guardian Information</h2>
                    <form id="mentor-registration-form" onsubmit="handleMentorRegistration(event)">
                        <div class="form-group">
                            <label>Full Name *</label>
                            <input type="text" name="mentorName" required>
                        </div>
                        <div class="form-group">
                            <label>Relation *</label>
                            <select name="mentorRelation" required>
                                <option value="">Select</option>
                                <option value="parent">Parent</option>
                                <option value="guardian">Guardian</option>
                                <option value="mentor">Mentor</option>
                                <option value="sibling">Sibling</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Phone *</label>
                            <input type="tel" name="mentorPhone" required>
                        </div>
                        <div class="form-group">
                            <label>Email *</label>
                            <input type="email" name="mentorEmail" required>
                        </div>
                        <div class="form-group">
                            <input type="checkbox" name="mentorConsent" required>
                            <label>I consent to help the user</label>
                        </div>
                        <button class="btn btn-primary" type="submit">
                            Save Mentor Information
                        </button>
                    </form>
                </div>

                <!-- User Form -->
                <div class="card">
                    <h2>User Profile Information</h2>
                    <form id="user-registration-form" onsubmit="handleUserRegistration(event)">
                        <div class="form-group">
                            <label>Full Name *</label>
                            <input type="text" name="userName" required>
                        </div>
                        <div class="form-group">
                            <label>Age *</label>
                            <input type="number" name="userAge" required>
                        </div>
                        <div class="form-group">
                            <label>Gender *</label>
                            <select name="userGender" required>
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>State *</label>
                            <select name="userState" required>
                                <option value="">Select</option>
                                ${states.map(s => `<option value="${s}">${s}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>City *</label>
                            <input type="text" name="userCity" required>
                        </div>
                        <div class="form-group">
                            <label>Contact *</label>
                            <input type="tel" name="userContact" required>
                        </div>
                        <div class="form-group">
                            <label>Email *</label>
                            <input type="email" name="userEmail" required>
                        </div>
                        <div class="form-group">
                            <label>Password *</label>
                            <input type="password" name="userPassword" minlength="8" required>
                        </div>

                        <div class="form-group">
                            <label>Screen Visibility</label>
                            <select name="screenVisibility">
                                <option value="yes">Yes</option>
                                <option value="partially">Partially</option>
                                <option value="no">No</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <input type="checkbox" name="screenReader">
                            <label>Uses screen reader</label>
                        </div>

                        <div class="form-group">
                            <label>Preferred Language *</label>
                            <select name="preferredLanguage" required>
                                <option value="english">English</option>
                                <option value="hindi">Hindi</option>
                                <option value="marathi">Marathi</option>
                            </select>
                        </div>

                        <button class="btn btn-primary" style="width:100%;" type="submit">
                            Create Account
                        </button>
                    </form>
                </div>
            </div>
        </main>
    `;
}

/* ---------------- LOGIC ---------------- */

function toggleMentorForm(show) {
    document.getElementById('mentor-form').style.display = show ? 'block' : 'none';
}

/**
 * Save mentor → Firestore
 */
async function handleMentorRegistration(event) {
    event.preventDefault();
    const f = new FormData(event.target);

    const mentorData = {
        name: f.get('mentorName'),
        relation: f.get('mentorRelation'),
        phone: f.get('mentorPhone'),
        email: f.get('mentorEmail'),
        consent: f.get('mentorConsent') === 'on',
        role: 'mentor',
        createdAt: new Date().toISOString()
    };

    const db = await getDbInstance();
    const { addDoc, collection } = await import(
        'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
    );

    const docRef = await addDoc(collection(db, 'mentors'), mentorData);
    sessionStorage.setItem('mentorDocId', docRef.id);

    alert('Mentor information saved successfully');
    document.getElementById('mentor-form').style.display = 'none';
}

/**
 * Save user → Auth + Firestore
 */
async function handleUserRegistration(event) {
    event.preventDefault();

    const hasMentor = document.getElementById('has-mentor-yes').checked;
    const mentorDocId = sessionStorage.getItem('mentorDocId');

    if (hasMentor && !mentorDocId) {
        alert('Please save mentor information first');
        document.getElementById('mentor-form').scrollIntoView({ behavior: 'smooth' });
        return;
    }

    const f = new FormData(event.target);

    const userData = {
        name: f.get('userName'),
        email: f.get('userEmail'),
        password: f.get('userPassword'),
        age: Number(f.get('userAge')),
        gender: f.get('userGender'),
        state: f.get('userState'),
        city: f.get('userCity'),
        contact: f.get('userContact'),
        screenVisibility: f.get('screenVisibility'),
        screenReader: f.get('screenReader') === 'on',
        preferredLanguage: f.get('preferredLanguage'),
        mentorId: hasMentor ? mentorDocId : null
    };

    const res = await registerUser(userData, false);
    if (!res.success) {
        alert(res.error);
        return;
    }

    // 🔗 Link mentor → user
    if (mentorDocId) {
        const db = await getDbInstance();
        const { doc, updateDoc } = await import(
            'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
        );

        await updateDoc(doc(db, 'mentors', mentorDocId), {
            userId: res.user.uid
        });

        sessionStorage.removeItem('mentorDocId');
    }

    alert('Account created successfully');
    window.location.hash = '/login';
}

/* expose */
window.toggleMentorForm = toggleMentorForm;
window.handleMentorRegistration = handleMentorRegistration;
window.handleUserRegistration = handleUserRegistration;
