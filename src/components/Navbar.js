// Navbar component with profile dropdown
export function renderNavbar(isLoggedIn, user) {
    const showProfileMenu = isLoggedIn && user;
    
    return `
        <header>
            <nav>
                <a href="${isLoggedIn ? '#/dashboard' : '#/'}" class="logo" aria-label="NEuuuuuuuuu Home">
                    🌟 NEuuuuuuuuu
                </a>
                
                <ul class="nav-links" role="navigation" aria-label="Main navigation">
                    <li><a href="${isLoggedIn ? '#/dashboard' : '#/'}" aria-label="Home page">Home</a></li>
                    <li><a href="#/about" aria-label="Our mission page">Our Mission</a></li>
                    <li><a href="#/how-it-works" aria-label="How it works section">How It Works</a></li>
                    <li><a href="#/success-stories" aria-label="Success stories page">Success Stories</a></li>
                    <li><a href="#/contact" aria-label="Get support section">Get Support</a></li>
                    <li><a href="#/contact" aria-label="Contact page">Contact</a></li>
                </ul>

                <div class="nav-actions">
                    ${showProfileMenu ? `
                        <div class="profile-dropdown">
                            <button class="profile-btn btn btn-outline" onclick="toggleProfileMenu()" aria-label="Profile menu" aria-expanded="false" aria-controls="profile-menu">
                                <span>👤 ${user.name}</span>
                                <span class="dropdown-arrow">▼</span>
                            </button>
                            <div id="profile-menu" class="profile-menu" role="menu" aria-label="User profile options">
                                <a href="#/profile" class="profile-menu-item" role="menuitem">
                                    <span class="menu-icon">⚙️</span>
                                    Profile Settings
                                </a>
                                <a href="#/edit-profile" class="profile-menu-item" role="menuitem">
                                    <span class="menu-icon">✏️</span>
                                    Edit Profile
                                </a>
                                ${user.mentorInfo ? `
                                    <a href="#/mentor-details" class="profile-menu-item" role="menuitem">
                                        <span class="menu-icon">👥</span>
                                        Mentor Details
                                    </a>
                                ` : ''}
                                <div class="profile-menu-divider"></div>
                                <button onclick="handleLogout()" class="profile-menu-item logout-btn" role="menuitem">
                                    <span class="menu-icon">🚪</span>
                                    Logout
                                </button>
                            </div>
                        </div>
                    ` : `
                        <a href="#/register" class="btn btn-secondary" role="button" aria-label="Register for an account">Register</a>
                        <a href="#/login" class="btn btn-primary" role="button" aria-label="Login to your account">Login</a>
                    `}
                </div>
            </nav>
        </header>
    `;
}

// Profile dropdown toggle function
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

// Close dropdown when clicking outside
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