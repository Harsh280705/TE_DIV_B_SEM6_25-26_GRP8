// About / Our Mission page - Non-profit style with compassionate content
export function renderAbout() {
    return `
        <main role="main" aria-labelledby="about-heading">
            <div class="container" style="max-width: 900px; padding: var(--spacing-xxl) 20px;">
                <h1 id="about-heading">Our Mission</h1>
                
                <div class="card mb-4">
                    <h2>Who This Is For</h2>
                    <p>
                        This platform is for <strong>people with disabilities, their families, and mentors</strong> who want to 
                        understand strengths, identify challenges, and find pathways to education, employment, and independence.
                    </p>
                    <p>
                        Whether you're exploring career options, looking for support resources, or helping someone on their journey, 
                        we're here to help you every step of the way.
                    </p>
                </div>

                <div class="card mb-4">
                    <h2>What We Offer</h2>
                    <p>Our platform provides:</p>
                    <ul class="mission-bullets" style="margin-top: var(--spacing-md);">
                        <li>
                            <strong>Personalized Assessments:</strong> Answer simple questions about your daily life to get a clear 
                            picture of your challenges and strengths across different functional areas.
                        </li>
                        <li>
                            <strong>Career Guidance:</strong> Explore career paths, training programs, and opportunities that match 
                            your interests, abilities, and accessibility needs.
                        </li>
                        <li>
                            <strong>Support Resources:</strong> Connect with mentors, access training materials, and learn about 
                            government schemes and support programs available for people with disabilities.
                        </li>
                        <li>
                            <strong>Success Stories:</strong> Get inspired by real journeys of people who have discovered their 
                            strengths and built meaningful careers.
                        </li>
                    </ul>
                </div>

                <div class="card mb-4">
                    <h2>The Bigger Goal</h2>
                    <p>
                        Our bigger goal is to promote <strong>inclusion, create opportunities, and support independence</strong> for all. 
                        We believe that every person with a disability has unique strengths, talents, and potential. With the right 
                        guidance, resources, and support, you can achieve great things.
                    </p>
                    <p>
                        We're committed to creating a world where people with disabilities have equal access to education, employment, 
                        and opportunities to thrive. Together, we can build a more inclusive and supportive community.
                    </p>
                </div>

                <div class="card mb-4" style="background-color: #fff3cd; border-left: 4px solid var(--warning-color);">
                    <h2>Important Disclaimer</h2>
                    <p style="margin-bottom: 0;">
                        <strong>Please Note:</strong> The assessments provided on this platform are indicative and designed to help 
                        you explore career options. They are <strong>not a medical diagnosis</strong> and should not replace 
                        professional medical, psychological, or educational evaluations. For proper diagnosis and assessment, 
                        please consult qualified healthcare professionals, psychologists, or specialists as appropriate.
                    </p>
                </div>

                <div class="card mb-4">
                    <h2>Accessibility</h2>
                    <p>
                        We are committed to making our platform accessible to everyone. Our website follows WCAG (Web Content 
                        Accessibility Guidelines) standards and includes features such as:
                    </p>
                    <ul class="mission-bullets" style="margin-top: var(--spacing-md);">
                        <li>Keyboard navigation support</li>
                        <li>Screen reader compatibility</li>
                        <li>High contrast options and large, readable text</li>
                        <li>Clear, simple language</li>
                        <li>Proper heading structure and labels</li>
                        <li>Generous spacing and touch targets</li>
                    </ul>
                </div>

                <div class="card">
                    <h2>Contact Us</h2>
                    <p>Have questions or feedback? We'd love to hear from you!</p>
                    <p style="font-size: 1.25rem; margin-bottom: var(--spacing-md);">
                        <strong>Email:</strong> <a href="mailto:contact@disabilitysupport.in">contact@disabilitysupport.in</a><br>
                        <strong>Phone:</strong> <a href="tel:+911234567890">+91 123 456 7890</a>
                    </p>
                    <a href="#/contact" class="btn btn-primary" role="button" aria-label="Go to contact page">Send us a Message</a>
                </div>
            </div>
        </main>
    `;
}
