// Authentication handler functions
// Handle login
window.handleLogin = function(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const rememberMe = form.rememberMe?.checked || false;
    
    // Mock authentication - replace with real API call
    const mockUser = {
        id: 1,
        name: 'John Doe',
        email: email,
        assessmentCompleted: false,
        mentorInfo: null // or mentor data if they have one
    };
    
    // Store user session
    if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('isLoggedIn', 'true');
    } else {
        sessionStorage.setItem('user', JSON.stringify(mockUser));
        sessionStorage.setItem('isLoggedIn', 'true');
    }
    
    // FIXED: Replace history entry so back button doesn't return to login
    window.history.replaceState(null, '', '#/dashboard');
    window.location.hash = '/dashboard';
};

// Handle logout
window.handleLogout = function() {
    // Confirm logout
    if (confirm('Are you sure you want to logout?')) {
        // Clear all session data
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('isLoggedIn');
        
        // FIXED: Replace history entry so back button doesn't return to dashboard
        window.history.replaceState(null, '', '#/');
        window.location.hash = '/';
    }
};

// Check if user is logged in
window.checkAuth = function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || 
                      sessionStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
        const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
        return { isLoggedIn: true, user };
    }
    
    return { isLoggedIn: false, user: null };
};

// FIXED: Removed popstate event listener that was causing circular redirects
// The route protection is now handled in app.js handleRoute() function

// Handle registration with mentor
window.handleMentorRegistration = function(event) {
    event.preventDefault();
    
    const form = event.target;
    const mentorData = {
        name: form.mentorName.value,
        relation: form.mentorRelation.value,
        phone: form.mentorPhone.value,
        email: form.mentorEmail.value,
        password: form.mentorPassword.value,
        consent: form.mentorConsent.checked
    };
    
    // Store mentor info temporarily
    sessionStorage.setItem('pendingMentorInfo', JSON.stringify(mentorData));
    
    // Show success message
    alert('Mentor information saved. Please complete user profile information below.');
    
    // Scroll to user form
    document.getElementById('user-registration-form')?.scrollIntoView({ behavior: 'smooth' });
};

// Handle user registration
window.handleUserRegistration = function(event) {
    event.preventDefault();
    
    const form = event.target;
    const mentorInfo = sessionStorage.getItem('pendingMentorInfo') 
        ? JSON.parse(sessionStorage.getItem('pendingMentorInfo')) 
        : null;
    
    const userData = {
        id: Date.now(),
        name: form.userName.value,
        age: form.userAge.value,
        gender: form.userGender.value,
        state: form.userState.value,
        city: form.userCity.value,
        contact: form.userContact.value,
        email: form.userEmail.value,
        password: form.userPassword.value,
        screenVisibility: form.screenVisibility.value,
        screenReader: form.screenReader?.checked || false,
        preferredLanguage: form.preferredLanguage.value,
        assessmentCompleted: false,
        mentorInfo: mentorInfo
    };
    
    // Clear temporary mentor data
    sessionStorage.removeItem('pendingMentorInfo');
    
    // Store user
    sessionStorage.setItem('user', JSON.stringify(userData));
    sessionStorage.setItem('isLoggedIn', 'true');
    
    // FIXED: Replace history entry so back button doesn't return to registration
    window.history.replaceState(null, '', '#/dashboard');
    window.location.hash = '/dashboard';
};

// Toggle mentor form visibility
window.toggleMentorForm = function(show) {
    const mentorForm = document.getElementById('mentor-form');
    if (mentorForm) {
        mentorForm.style.display = show ? 'block' : 'none';
        
        // Update form fields required status
        const inputs = mentorForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            if (show) {
                input.setAttribute('required', 'true');
            } else {
                input.removeAttribute('required');
            }
        });
    }
};

// Update cities based on state selection (placeholder)
window.updateCities = function(state) {
    // This would typically fetch cities for the selected state
    // For now, it's just a placeholder
    console.log('Selected state:', state);
};