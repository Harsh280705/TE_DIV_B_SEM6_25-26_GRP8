// Footer component with non-profit style and disclaimer
export function createFooter() {
    return `
        <footer role="contentinfo">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>About</h3>
                        <ul>
                            <li><a href="#/our-mission" aria-label="Our mission">Our Mission</a></li>
                            <li><a href="#/how-it-works" aria-label="How it works">How It Works</a></li>
                            <li><a href="#/success-stories" aria-label="Success stories">Success Stories</a></li>
                            <li><a href="#/contact" aria-label="Contact us">Contact</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Support</h3>
                        <ul>
                            <li><a href="#/assessment" aria-label="Start assessment">Start Assessment</a></li>
                            <li><a href="#/get-support" aria-label="Get support">Get Support</a></li>
                            <li><a href="#/help" aria-label="Help and support">Help Center</a></li>
                            <li><a href="#/faq" aria-label="Frequently asked questions">FAQ</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Legal</h3>
                        <ul>
                            <li><a href="#/privacy" aria-label="Privacy policy">Privacy Policy</a></li>
                            <li><a href="#/terms" aria-label="Terms of service">Terms of Service</a></li>
                            <li><a href="#/accessibility" aria-label="Accessibility statement">Accessibility</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Contact</h3>
                        <ul>
                            <li><a href="mailto:contact@disabilitysupport.in" aria-label="Send email">contact@disabilitysupport.in</a></li>
                            <li><a href="tel:+911234567890" aria-label="Call us">+91 123 456 7890</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} Disability Support Platform. All rights reserved.</p>
                    <div class="footer-disclaimer">
                    <p><strong>Important Notice:</strong> This platform provides guidance and support and is <strong>not intended for medical, psychological, or clinical diagnosis</strong>. 
                        The assessments are designed to help you explore career options and better understand your strengths. 
                        For accurate diagnosis or professional evaluation, please consult qualified healthcare professionals, psychologists, or relevant specialists.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    `;
}
