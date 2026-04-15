// Main application file with routing and state management
import { renderNavbar } from '../components/Navbar.js';
import { createFooter } from '../components/Footer.js';
import { renderHome } from '../pages/Home.js';
import { renderRegister } from '../pages/Register.js';
import { renderLogin } from '../pages/Login.js';
import { renderDashboard } from '../pages/Dashboard.js';
import { renderAssessment } from '../pages/Assessment.js';
import { renderResults } from '../pages/Results.js';
import { renderCareerPath } from '../pages/CareerPath.js';
import { renderSuccessStories } from '../pages/SuccessStories.js';
import { renderStoryDetail } from '../pages/StoryDetails.js';
import { renderAbout } from '../pages/About.js';
import { renderContact } from '../pages/Contact.js';
import { renderPrivacyPage } from '../pages/privacy.js';
import { renderAccessibilityPage } from '../pages/accessibility.js';
import { renderTermsPage } from '../pages/terms.js';
import { renderHowItWorks } from '../pages/how-it-works.js';
import { renderResources } from '../pages/Resources.js';
import { mockStories } from '../data/mockData.js';
import { registerUser, loginUser, logoutUser, onAuthStateChange, getUserData, updateUserData } from '../services/authService.js';
import { saveAssessment, getUserAssessment } from '../services/dbService.js';

// >>>>>>>>>>>>>>>>>> GLOBAL HANDLERS DEFINED EARLY <<<<<<<<<<<<<<<<<<<<
window.viewCareerPath = (careerId) => {
    window.location.hash = `/career-path?id=${careerId}`;
};

window.viewStoryDetail = (storyId) => {
    const story = mockStories.find(s => s.id === storyId);
    if (story) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', 'story-modal-title');
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" onclick="this.closest('.modal').remove()" aria-label="Close dialog">&times;</button>
                <h2 id="story-modal-title">${story.name}'s Story</h2>
                <p><span class="story-badge">${story.disabilityType}</span></p>
                <p><strong>${story.title}</strong> - ${story.domain}</p>
                <p><strong>Location:</strong> ${story.location}</p>
                <p style="margin-top: 1rem;">${story.fullStory}</p>
                <button class="btn btn-primary mt-3" onclick="this.closest('.modal').remove()" aria-label="Close dialog">Close</button>
            </div>
        `;
        document.body.appendChild(modal);
        
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modal.remove();
            }
        });
    }
};

// >>>>>>>>>>>>>>>>>> GLOBAL NAVIGATION HELPER <<<<<<<<<<<<<<<<<<<<
window.navigate = function(path) {
    window.location.hash = path;
};
// >>>>>>>>>>>>>>>>>> END GLOBAL NAVIGATION <<<<<<<<<<<<<<<<<<<<

// Application state
let currentUser = null;
let assessmentData = null;
let currentStep = 0;
const totalSteps = 6;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    let initialAuthResolved = false;

    onAuthStateChange(async (firebaseUser) => {
        if (firebaseUser) {
            const userData = await getUserData(firebaseUser.uid);
            if (userData) {
                currentUser = userData;
                const assessment = await getUserAssessment(firebaseUser.uid);
                if (assessment) {
                    currentUser.assessmentCompleted = true;
                    assessmentData = assessment;
                }
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }
        } else {
            currentUser = null;
            assessmentData = null;
            localStorage.removeItem('currentUser');
        }

        if (!initialAuthResolved) {
            initialAuthResolved = true;
            handleRoute();
        } else {
            handleRoute();
        }
    });

    initRouter();
});

// Router setup
function initRouter() {
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', function(event) {
        handleRoute();
    });
}

let isHandlingRoute = false;
let lastSuccessfulRoute = null;

function handleRoute() {
    if (isHandlingRoute) return;
    isHandlingRoute = true;

    try {
        const hash = window.location.hash.slice(1) || '/';
        const path = hash.split('?')[0];
        const params = new URLSearchParams(hash.split('?')[1] || '');
        const app = document.getElementById('app');

        const protectedRoutes = ['/dashboard', '/profile', '/edit-profile', '/mentor-details', '/assessment', '/results'];
        const authRoutes = ['/login', '/register'];
        
        if (protectedRoutes.includes(path) && !currentUser) {
            window.history.replaceState(null, '', '#/login');
            window.location.hash = '/login';
            return;
        }
        
        if (authRoutes.includes(path) && currentUser) {
            window.history.replaceState(null, '', '#/dashboard');
            window.location.hash = '/dashboard';
            return;
        }

        lastSuccessfulRoute = path;

        if (!authRoutes.includes(path)) {
            renderLayout();
        } else {
            const navbarContainer = document.getElementById('navbar-container');
            const footerContainer = document.getElementById('footer-container');
            if (navbarContainer) navbarContainer.remove();
            if (footerContainer) footerContainer.remove();
        }

        switch(path) {
            case '/':
                app.innerHTML = currentUser ? renderDashboard(currentUser) : renderHome();
                if (currentUser) {
                    updateDashboardDomains();
                }
                break;
            case '/register':
                app.innerHTML = renderRegister();
                initRegisterHandlers();
                break;
            case '/login':
                app.innerHTML = renderLogin();
                initLoginHandlers();
                break;
            case '/dashboard':
                app.innerHTML = renderDashboard(currentUser);
                updateDashboardDomains();
                break;
            case '/profile':
                app.innerHTML = renderProfile(currentUser);
                break;
            case '/edit-profile':
                app.innerHTML = renderEditProfile(currentUser);
                initEditProfileHandlers();
                break;
            case '/mentor-details':
                app.innerHTML = renderMentorDetails(currentUser);
                break;
            case '/assessment':
                app.innerHTML = renderAssessment();
                initAssessmentHandlers();
                break;
            case '/story':
                const storyIdParam = params.get('id') || hash.split('/')[2];
                const storyId = parseInt(storyIdParam, 10);
                if (!isNaN(storyId)) {
                    app.innerHTML = renderStoryDetail(storyId);
                } else {
                    app.innerHTML = '<main class="container"><p>Invalid story ID.</p><a href="#/success-stories" class="btn">Back to Stories</a></main>';
                }
                break;
            case '/results':
                if (!assessmentData) {
                    window.location.hash = '/assessment';
                    return;
                }
                app.innerHTML = renderResults(assessmentData);
                initResultsHandlers();
                break;
            case '/career-path':
                const careerId = params.get('id');
                app.innerHTML = renderCareerPath(careerId);
                break;
            case '/resources':
                app.innerHTML = renderResources();
                break;
            case '/success-stories':
                app.innerHTML = renderSuccessStories();
                initStoriesHandlers();
                break;
            case '/about':
                app.innerHTML = renderAbout();
                break;
            case '/contact':
                app.innerHTML = renderContact();
                initContactHandlers();
                break;
            case '/privacy':
                app.innerHTML = renderPrivacyPage();
                break;
            case '/accessibility':
                app.innerHTML = renderAccessibilityPage();
                break;
            case '/terms':
                app.innerHTML = renderTermsPage();
                break;
            case '/how-it-works':
                app.innerHTML = renderHowItWorks();
                break;
            default:
                app.innerHTML = '<main><div class="container"><h1>Page Not Found</h1><p>The page you are looking for does not exist.</p><a href="#/" class="btn btn-primary">Go Home</a></div></main>';
        }
    } finally {
        isHandlingRoute = false;
    }
}

function renderLayout() {
    const app = document.getElementById('app');
    
    let navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer) {
        navbarContainer = document.createElement('div');
        navbarContainer.id = 'navbar-container';
        app.insertAdjacentElement('beforebegin', navbarContainer);
    }
    navbarContainer.innerHTML = renderNavbar(!!currentUser, currentUser);

    let footerContainer = document.getElementById('footer-container');
    if (!footerContainer) {
        footerContainer = document.createElement('div');
        footerContainer.id = 'footer-container';
        document.body.appendChild(footerContainer);
    }
    footerContainer.innerHTML = createFooter();
    
    initProfileDropdown();
}

function initProfileDropdown() {
    window.toggleProfileMenu = function() {
        const menu = document.getElementById('profile-menu');
        const button = document.querySelector('.profile-btn');
        
        if (menu && button) {
            const isOpen = menu.classList.contains('show');
            
            if (isOpen) {
                menu.classList.remove('show');
                button.setAttribute('aria-expanded', 'false');
            } else {
                menu.classList.add('show');
                button.setAttribute('aria-expanded', 'true');
            }
        }
    };
    
    document.addEventListener('click', function(event) {
        const profileDropdown = document.querySelector('.profile-dropdown');
        const profileMenu = document.getElementById('profile-menu');
        
        if (profileDropdown && profileMenu && !profileDropdown.contains(event.target)) {
            profileMenu.classList.remove('show');
            const button = document.querySelector('.profile-btn');
            if (button) {
                button.setAttribute('aria-expanded', 'false');
            }
        }
    });
}

function renderProfile(user) {
    if (!user) {
        return '<main class="container"><h1>Please log in</h1></main>';
    }
    
    return `
        <main role="main" aria-labelledby="profile-heading">
            <div class="container" style="max-width: 800px; padding: 2rem 20px;">
                <h1 id="profile-heading" style="margin-bottom: 2rem;">Profile Settings</h1>
                
                <div class="card" style="margin-bottom: 2rem;">
                    <h2 style="color: var(--accent-primary); margin-bottom: 1.5rem;">Personal Information</h2>
                    <div style="display: grid; gap: 1rem;">
                        <div style="display: flex; justify-content: space-between; padding: 1rem; background: var(--bg-surface); border-radius: var(--radius-md);">
                            <span style="font-weight: 600; color: var(--text-secondary);">Name:</span>
                            <span style="color: var(--text-primary);">${user.name || 'N/A'}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 1rem; background: var(--bg-surface); border-radius: var(--radius-md);">
                            <span style="font-weight: 600; color: var(--text-secondary);">Email:</span>
                            <span style="color: var(--text-primary);">${user.email || 'N/A'}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 1rem; background: var(--bg-surface); border-radius: var(--radius-md);">
                            <span style="font-weight: 600; color: var(--text-secondary);">Age:</span>
                            <span style="color: var(--text-primary);">${user.age || 'N/A'}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 1rem; background: var(--bg-surface); border-radius: var(--radius-md);">
                            <span style="font-weight: 600; color: var(--text-secondary);">Gender:</span>
                            <span style="color: var(--text-primary);">${user.gender || 'N/A'}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 1rem; background: var(--bg-surface); border-radius: var(--radius-md);">
                            <span style="font-weight: 600; color: var(--text-secondary);">Location:</span>
                            <span style="color: var(--text-primary);">${user.city || 'N/A'}, ${user.state || 'N/A'}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 1rem; background: var(--bg-surface); border-radius: var(--radius-md);">
                            <span style="font-weight: 600; color: var(--text-secondary);">Contact:</span>
                            <span style="color: var(--text-primary);">${user.contact || 'N/A'}</span>
                        </div>
                    </div>
                    <div style="margin-top: 2rem;">
                        <a href="#/edit-profile" class="btn btn-primary" aria-label="Edit your profile">Edit Profile</a>
                    </div>
                </div>
                
                <div class="card">
                    <h2 style="color: var(--accent-primary); margin-bottom: 1.5rem;">Accessibility Preferences</h2>
                    <div style="display: grid; gap: 1rem;">
                        <div style="display: flex; justify-content: space-between; padding: 1rem; background: var(--bg-surface); border-radius: var(--radius-md);">
                            <span style="font-weight: 600; color: var(--text-secondary);">Screen Visibility:</span>
                            <span style="color: var(--text-primary);">${user.screenVisibility || 'N/A'}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 1rem; background: var(--bg-surface); border-radius: var(--radius-md);">
                            <span style="font-weight: 600; color: var(--text-secondary);">Screen Reader:</span>
                            <span style="color: var(--text-primary);">${user.screenReader ? 'Yes' : 'No'}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 1rem; background: var(--bg-surface); border-radius: var(--radius-md);">
                            <span style="font-weight: 600; color: var(--text-secondary);">Preferred Language:</span>
                            <span style="color: var(--text-primary);">${user.preferredLanguage || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    `;
}

function renderEditProfile(user) {
    if (!user) {
        return '<main class="container"><h1>Please log in</h1></main>';
    }
    
    return `
        <main role="main" aria-labelledby="edit-profile-heading">
            <div class="container" style="max-width: 600px; padding: 2rem 20px;">
                <h1 id="edit-profile-heading" style="margin-bottom: 2rem;">Edit Profile</h1>
                
                <div class="card">
                    <form id="edit-profile-form" onsubmit="handleEditProfile(event)">
                        <div class="form-group">
                            <label for="edit-name">Full Name <span aria-label="required">*</span></label>
                            <input type="text" id="edit-name" name="name" value="${user.name || ''}" required aria-required="true">
                        </div>
                        <div class="form-group">
                            <label for="edit-age">Age <span aria-label="required">*</span></label>
                            <input type="number" id="edit-age" name="age" value="${user.age || ''}" min="1" max="120" required aria-required="true">
                        </div>
                        <div class="form-group">
                            <label for="edit-contact">Contact Number <span aria-label="required">*</span></label>
                            <input type="tel" id="edit-contact" name="contact" value="${user.contact || ''}" required aria-required="true">
                        </div>
                        <div class="form-group">
                            <label for="edit-city">City <span aria-label="required">*</span></label>
                            <input type="text" id="edit-city" name="city" value="${user.city || ''}" required aria-required="true">
                        </div>
                        <div class="form-group">
                            <label for="edit-state">State <span aria-label="required">*</span></label>
                            <input type="text" id="edit-state" name="state" value="${user.state || ''}" required aria-required="true">
                        </div>
                        <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                            <button type="submit" class="btn btn-primary" style="flex: 1;">Save Changes</button>
                            <a href="#/profile" class="btn btn-outline" style="flex: 1; text-align: center; line-height: 1.5;">Cancel</a>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    `;
}

function renderMentorDetails(user) {
    if (!user) {
        return '<main class="container"><h1>Please log in</h1></main>';
    }
    
    if (!user.mentorInfo) {
        return `
            <main role="main" aria-labelledby="mentor-heading">
                <div class="container" style="max-width: 800px; padding: 2rem 20px;">
                    <h1 id="mentor-heading" style="margin-bottom: 2rem;">Mentor Details</h1>
                    <div class="card" style="text-align: center; padding: 3rem;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">👥</div>
                        <h2 style="margin-bottom: 1rem;">No Mentor Information</h2>
                        <p style="color: var(--text-secondary); margin-bottom: 2rem;">You don't have any mentor or guardian information associated with your account.</p>
                        <a href="#/dashboard" class="btn btn-primary">Return to Dashboard</a>
                    </div>
                </div>
            </main>
        `;
    }
    
    return `
        <main role="main" aria-labelledby="mentor-heading">
            <div class="container" style="max-width: 800px; padding: 2rem 20px;">
                <h1 id="mentor-heading" style="margin-bottom: 2rem;">Mentor/Guardian Details</h1>
                
                <div class="card">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
                        <div style="font-size: 3rem;">👥</div>
                        <div>
                            <h2 style="margin-bottom: 0.25rem; color: var(--accent-primary);">Mentor Information</h2>
                            <p style="color: var(--text-secondary); margin: 0;">Your registered mentor or guardian</p>
                        </div>
                    </div>
                    
                    <div style="display: grid; gap: 1rem;">
                        <div style="display: flex; justify-content: space-between; padding: 1rem; background: var(--bg-surface); border-radius: var(--radius-md);">
                            <span style="font-weight: 600; color: var(--text-secondary);">Name:</span>
                            <span style="color: var(--text-primary);">${user.mentorInfo.name || 'N/A'}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 1rem; background: var(--bg-surface); border-radius: var(--radius-md);">
                            <span style="font-weight: 600; color: var(--text-secondary);">Relation:</span>
                            <span style="color: var(--text-primary);">${user.mentorInfo.relation || 'N/A'}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 1rem; background: var(--bg-surface); border-radius: var(--radius-md);">
                            <span style="font-weight: 600; color: var(--text-secondary);">Phone:</span>
                            <span style="color: var(--text-primary);">${user.mentorInfo.phone || 'N/A'}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 1rem; background: var(--bg-surface); border-radius: var(--radius-md);">
                            <span style="font-weight: 600; color: var(--text-secondary);">Email:</span>
                            <span style="color: var(--text-primary);">${user.mentorInfo.email || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    `;
}

function initEditProfileHandlers() {
    window.handleEditProfile = async function(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        
        const updatedData = {
            name: formData.get('name'),
            age: formData.get('age'),
            contact: formData.get('contact'),
            city: formData.get('city'),
            state: formData.get('state')
        };
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Saving...';
        
        try {
            if (currentUser && currentUser.uid) {
                const result = await updateUserData(currentUser.uid, updatedData);
                
                if (result.success) {
                    Object.assign(currentUser, updatedData);
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    
                    alert('Profile updated successfully!');
                    window.location.hash = '/profile';
                } else {
                    alert('Update failed: ' + result.error);
                }
            }
        } catch (error) {
            alert('An error occurred: ' + error.message);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    };
}

function initRegisterHandlers() {
    window.toggleMentorForm = (show) => {
        const mentorForm = document.getElementById('mentor-form');
        if (mentorForm) {
            mentorForm.style.display = show ? 'block' : 'none';
        }
    };

    window.handleMentorRegistration = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const mentorData = {
            name: formData.get('mentorName'),
            relation: formData.get('mentorRelation'),
            phone: formData.get('mentorPhone'),
            email: formData.get('mentorEmail'),
            password: formData.get('mentorPassword'),
            consent: formData.get('mentorConsent')
        };
        
        sessionStorage.setItem('pendingMentorInfo', JSON.stringify(mentorData));
        
        alert('Mentor information saved. Please complete user profile information below.');
        document.getElementById('user-registration-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    window.handleUserRegistration = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        
        const mentorInfo = sessionStorage.getItem('pendingMentorInfo') 
            ? JSON.parse(sessionStorage.getItem('pendingMentorInfo')) 
            : null;
        
        const userData = {
            name: formData.get('userName'),
            age: formData.get('userAge'),
            gender: formData.get('userGender'),
            state: formData.get('userState'),
            city: formData.get('userCity'),
            contact: formData.get('userContact'),
            email: formData.get('userEmail'),
            password: formData.get('userPassword'),
            screenVisibility: formData.get('screenVisibility'),
            screenReader: formData.get('screenReader') === 'on',
            preferredLanguage: formData.get('preferredLanguage'),
            mentorInfo: mentorInfo
        };
        
        const submitBtn = event.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating Account...';
        
        try {
            const result = await registerUser(userData, false);
            if (result.success) {
                sessionStorage.removeItem('pendingMentorInfo');
                window.location.hash = '/dashboard';
            } else {
                alert('Registration failed: ' + result.error);
            }
        } catch (error) {
            alert('An error occurred: ' + error.message);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    };

    window.updateCities = (state) => {
        console.log('Selected state:', state);
    };
}

function initLoginHandlers() {
    window.handleLogin = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        
        const submitBtn = event.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Logging in...';
        
        try {
            const result = await loginUser(email, password);
            if (result.success) {
                window.location.hash = '/dashboard';
            } else {
                alert('Login failed: ' + result.error);
            }
        } catch (error) {
            alert('An error occurred: ' + error.message);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    };
}

function initAssessmentHandlers() {
    currentStep = 0;
    updateProgress();
    
    window.nextStep = () => {
        if (currentStep < totalSteps - 1) {
            const currentStepEl = document.querySelector('.assessment-step.active');
            if (currentStepEl) {
                const form = currentStepEl.querySelector('form') || document.getElementById('assessment-form');
                if (form && !form.checkValidity()) {
                    form.reportValidity();
                    return;
                }
            }
            
            currentStep++;
            showStep(currentStep);
            updateProgress();
        }
    };
    
    window.prevStep = () => {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
            updateProgress();
        }
    };
    
    window.showSummary = () => {
        const form = document.getElementById('assessment-form');
        const formData = new FormData(form);
        
        const responses = {};
        const interests = [];
        
        formData.forEach((value, key) => {
            if (key === 'interests') {
                interests.push(value);
            } else if (key !== 'name' && key !== 'age') {
                if (key.startsWith('impact-current-support') || key.startsWith('impact-desired-support')) {
                    if (!responses[key]) {
                        responses[key] = [];
                    }
                    responses[key].push(value);
                } else {
                    responses[key] = value;
                }
            }
        });
        
        const summaryContent = document.getElementById('summary-content');
        if (summaryContent) {
            const questionCount = Object.keys(responses).filter(k => !Array.isArray(responses[k])).length;
            const currentSupport = formData.getAll('impact-current-support') || [];
            const desiredSupport = formData.getAll('impact-desired-support') || [];
            const openText = formData.get('impact-opentext') || '';
            
            summaryContent.innerHTML = `
                <div class="card mb-3">
                    <h3>Basic Information</h3>
                    <p><strong>Name:</strong> ${formData.get('name')}</p>
                    <p><strong>Age:</strong> ${formData.get('age')}</p>
                    <p><strong>Interests:</strong> ${interests.join(', ') || 'None selected'}</p>
                </div>
                <div class="card mb-3">
                    <h3>Assessment Responses</h3>
                    <p>You have answered ${questionCount} questions across 9 functional domains (Vision, Hearing, Mobility, Hand Use, Learning, Communication, Behavior, Self-Care, Daily Activities).</p>
                </div>
                ${openText ? `
                    <div class="card">
                        <h3>Your Words</h3>
                        <p style="font-style: italic;">"${openText}"</p>
                    </div>
                ` : ''}
            `;
        }
        
        currentStep = totalSteps - 1;
        showStep(currentStep);
        updateProgress();
    };
    
    window.handleAssessmentSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        
        const responses = {};
        const interests = [];
        
        formData.forEach((value, key) => {
            if (key === 'interests') {
                interests.push(value);
            } else if (key !== 'name' && key !== 'age') {
                responses[key] = value;
            }
        });
        
        const currentSupportValues = formData.getAll('impact-current-support');
        const desiredSupportValues = formData.getAll('impact-desired-support');
        if (currentSupportValues.length > 0) {
            responses['impact-current-support'] = currentSupportValues;
        }
        if (desiredSupportValues.length > 0) {
            responses['impact-desired-support'] = desiredSupportValues;
        }
        
        assessmentData = {
            name: formData.get('name'),
            age: formData.get('age'),
            interests: interests,
            responses: responses
        };
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Saving...';
        
        try {
            if (currentUser && currentUser.uid) {
                const result = await saveAssessment(currentUser.uid, assessmentData);
                if (result.success) {
                    currentUser.assessmentCompleted = true;
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                }
            }
            
            window.location.hash = '/results';
        } catch (error) {
            alert('An error occurred while saving: ' + error.message);
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    };
    
    function showStep(step) {
        const steps = document.querySelectorAll('.assessment-step');
        steps.forEach((s, index) => {
            if (index === step) {
                s.classList.add('active');
                s.style.display = 'block';
            } else {
                s.classList.remove('active');
                s.style.display = 'none';
            }
        });
    }
    
    function updateProgress() {
        const progressFill = document.getElementById('progress-fill');
        const progressBar = document.querySelector('.progress-bar');
        if (progressFill && progressBar) {
            const percentage = ((currentStep + 1) / totalSteps) * 100;
            progressFill.style.width = percentage + '%';
            progressBar.setAttribute('aria-valuenow', currentStep + 1);
        }
    }
}

function initResultsHandlers() {
    window.filterCareers = () => {
        const filter = document.getElementById('career-filter').value;
        const cards = document.querySelectorAll('#recommended-careers .career-card');
        cards.forEach(card => {
            if (filter === 'all' || card.dataset.recommendation === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    };
    
    window.sortCareers = () => {
        const sortBy = document.getElementById('career-sort').value;
        const container = document.getElementById('recommended-careers');
        const cards = Array.from(container.querySelectorAll('.career-card'));
        
        cards.sort((a, b) => {
            if (sortBy === 'title') {
                return a.querySelector('.card-title').textContent.localeCompare(b.querySelector('.card-title').textContent);
            }
            return 0;
        });
        
        cards.forEach(card => container.appendChild(card));
    };
}

// Stories handlers — FIXED: Proper newline handling for fullStory
function initStoriesHandlers() {
    const container = document.querySelector('#stories-container');
    const noResults = document.getElementById('no-results');
    const statusDiv = document.getElementById('filter-status');

    // Handle "Read Full Story" clicks — opens in new tab with full story
    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('read-full-story')) {
            const storyId = parseInt(e.target.dataset.id);
            const story = mockStories.find(s => s.id === storyId);
            if (!story) {
                alert('Story not found.');
                return;
            }

            // Fix: Properly split on \n (not literal line breaks)
            const paragraphs = (story.fullStory || '')
                .replace(/\r\n/g, '\n') // Normalize Windows line endings
                .split('\n')
                .map(p => p.trim())
                .filter(p => p)
                .map(p => `<p>${p}</p>`)
                .join('');

            const pageHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>${story.name}'s Success Story</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f8fafc;
            margin: 0;
            padding: 20px;
            color: #1e293b;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        .badge {
            display: inline-block;
            background-color: #10b981;
            color: white;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }
        h1 {
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
            color: #0f172a;
        }
        .meta {
            color: #475569;
            margin: 0.5rem 0;
            line-height: 1.5;
        }
        .close-btn {
            display: inline-block;
            margin-top: 2rem;
            padding: 8px 16px;
            background: #f1f5f9;
            color: #2563eb;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
        }
        .close-btn:hover {
            background: #e2e8f0;
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="javascript:window.close()" class="close-btn">← Close Window</a>
        <div class="badge">${story.disabilityType}</div>
        <h1>${story.name}'s Story</h1>
        <div class="meta"><strong>${story.title}</strong> – ${story.domain}</div>
        <div class="meta"><strong>Location:</strong> ${story.location}</div>
        <div class="story-content">
            ${paragraphs}
        </div>
    </div>
</body>
</html>`;

            const newTab = window.open();
            newTab.document.write(pageHTML);
            newTab.document.close();
        }
    });

    // Helper: Apply filters
    function applyFilters() {
        const disabilityFilter = document.getElementById('filter-disability')?.value || 'all';
        const domainFilter = document.getElementById('filter-domain')?.value || 'all';
        const cards = container.querySelectorAll('.story-card');
        let visibleCount = 0;

        cards.forEach(card => {
            const cardDisability = card.dataset.disability;
            const cardDomain = card.dataset.domain;
            const matches = (
                (disabilityFilter === 'all' || cardDisability === disabilityFilter) &&
                (domainFilter === 'all' || cardDomain === domainFilter)
            );

            if (matches) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (visibleCount === 0) {
            noResults.style.display = 'block';
            container.style.display = 'none';
            statusDiv.textContent = 'No stories match your filters.';
        } else {
            noResults.style.display = 'none';
            container.style.display = 'grid';
            statusDiv.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? 'story' : 'stories'}`;
        }
    }

    document.getElementById('filter-disability')?.addEventListener('change', applyFilters);
    document.getElementById('filter-domain')?.addEventListener('change', applyFilters);
    document.getElementById('reset-filters')?.addEventListener('click', () => {
        document.getElementById('filter-disability').value = 'all';
        document.getElementById('filter-domain').value = 'all';
        applyFilters();
    });
    document.getElementById('reset-filters-2')?.addEventListener('click', () => {
        document.getElementById('filter-disability').value = 'all';
        document.getElementById('filter-domain').value = 'all';
        applyFilters();
    });

    applyFilters();
}

function initContactHandlers() {
    window.handleContactSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        
        const formData = new FormData(form);
        const contactData = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            const { saveContactMessage } = await import('../services/dbService.js');
            const result = await saveContactMessage(contactData);
            
            if (result.success) {
                alert('Thank you! Your message has been sent successfully.');
                form.reset();
            } else {
                alert('Sorry, there was an error sending your message. Please try again later.');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            alert('An unexpected error occurred. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    };
}

window.handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
        try {
            await logoutUser();
            window.location.hash = '/';
        } catch (error) {
            alert('Logout failed: ' + error.message);
        }
    }
};

// Update dashboard domains dynamically if domainExtractor becomes available
function updateDashboardDomains() {
    function updateDomainsIfAvailable() {
        if (typeof window !== 'undefined' && window.domainExtractor) {
            try {
                const allDomains = window.domainExtractor.getHardCodedDomains();
                const domainsGrid = document.getElementById('domains-grid');
                if (domainsGrid && Object.keys(allDomains).length > 12) {
                    // Only update if we have more domains than the fallback
                    const newDomains = Object.entries(allDomains).map(([id, domain]) => ({
                        id: id,
                        name: domain.name,
                        icon: domain.icon,
                        careers: 25,
                        growth: "35%"
                    }));
                    
                    domainsGrid.innerHTML = newDomains.map(domain => `
                        <div class="card" style="text-align: center; padding: 2rem; cursor: pointer; transition: all 0.3s ease; border: 1px solid rgba(0,0,0,0.1);" 
                             onclick="window.location.href='assessment/domain.html?domain=${domain.id}'"
                             onkeypress="if(event.key==='Enter') window.location.href='assessment/domain.html?domain=${domain.id}'"
                             tabindex="0"
                             role="button"
                             aria-label="Explore ${domain.name} domain">
                            <div style="font-size: 3.5rem; margin-bottom: 1rem;">${domain.icon}</div>
                            <h3 style="font-size: 1.4rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--primary-color);">${domain.name}</h3>
                            <p style="color: var(--text-secondary); margin-bottom: 1rem; font-size: 0.95rem; line-height: 1.6;">
                                Explore ${domain.careers}+ careers with ${domain.growth} growth potential.
                            </p>
                            <div style="display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap;">
                                <span style="padding: 4px 12px; background: rgba(25, 118, 210, 0.1); color: var(--primary-color); border-radius: 20px; font-size: 0.85rem; font-weight: 600;">
                                    ${domain.careers}+ Careers
                                </span>
                                <span style="padding: 4px 12px; background: rgba(76, 175, 80, 0.1); color: var(--success); border-radius: 20px; font-size: 0.85rem; font-weight: 600;">
                                    ${domain.growth}
                                </span>
                            </div>
                        </div>
                    `).join('');
                }
            } catch (error) {
                console.warn('Error updating domains:', error);
            }
        }
    }
    
    // Try immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateDomainsIfAvailable);
    } else {
        updateDomainsIfAvailable();
    }
    
    // Also try after a short delay in case domainExtractor loads asynchronously
    setTimeout(updateDomainsIfAvailable, 500);
}