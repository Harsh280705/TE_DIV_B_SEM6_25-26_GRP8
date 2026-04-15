// Home page component - Dark theme design for non-profit disability platform
import { mockStories } from '../data/mockData.js';

export function renderHome() {
    const storiesPreview = mockStories.slice(0, 6);
    
    return `
        <a href="#main-content" class="skip-link">Skip to main content</a>
        <main id="main-content" role="main">
            <!-- Hero Section -->
            <section class="hero" aria-labelledby="hero-heading">
                <div class="container">
                    <div class="hero-content">
                        <span class="hero-label">Non-profit initiative</span>
                        <h1 id="hero-heading">We help people with disabilities discover their strengths and build meaningful careers.</h1>
                        <p>Our platform offers personalized assessments, career guidance, and support resources to help you explore opportunities and achieve your goals.</p>
                    </div>
                    <div class="hero-image">
                        <div class="hero-image-placeholder" role="img" aria-label="Illustration representing disability support and career discovery">
                            <span>🎯 Career Discovery Platform</span>
                        </div>
                        <div class="hero-actions" style="display: flex; flex-direction: column; gap: var(--spacing-md); margin-top: var(--spacing-lg); width: 100%;">
                            <a href="#/assessment" class="btn btn-primary" role="button" aria-label="Start your journey with our assessment" style="width: 100%;">Start assessment</a>
                            <a href="#/register" class="btn btn-outline" role="button" aria-label="Register for an account" style="width: 100%;">Register</a>
                            <a href="#/login" class="btn btn-outline" role="button" aria-label="Login to your account" style="width: 100%;">Login</a>
                            <a href="#/success-stories" class="btn btn-outline" role="button" aria-label="Explore success stories" style="width: 100%;">Explore success stories</a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Mission Section -->
            <section class="mission-section section" aria-labelledby="mission-heading">
                <div class="container">
                    <div class="mission-card">
                        <div class="mission-icon" aria-hidden="true">💙</div>
                        <h2 id="mission-heading" class="section-title">Our Mission</h2>
                        <div class="mission-content">
                            <p>
                                We believe that every person with a disability has unique strengths, talents, and potential. 
                                Our mission is to create a supportive platform where you can discover your abilities, explore 
                                career possibilities, and connect with the resources you need to succeed.
                            </p>
                            <p>
                                This platform is for <strong>people with disabilities, their families, and mentors</strong> who 
                                want to understand strengths, identify challenges, and find pathways to education, employment, 
                                and independence.
                            </p>
                            <p>
                                We offer <strong>personalized assessments, career guidance, training resources, and support 
                                connections</strong> to help you build a meaningful future. Our bigger goal is to promote 
                                inclusion, create opportunities, and support independence for all.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- How It Works Section -->
            <section class="how-it-works section section-alt" aria-labelledby="how-it-works-heading">
                <div class="container">
                    <h2 id="how-it-works-heading" class="section-title">How It Works</h2>
                    <p class="section-subtitle">Our simple, supportive process helps you understand your strengths and explore opportunities.</p>
                    <div class="steps">
                        <div class="step">
                            <div class="step-icon" aria-hidden="true">📝</div>
                            <div class="step-number" aria-hidden="true">1</div>
                            <h3>Answer Simple Questions</h3>
                            <p>Answer simple questions about your daily life, challenges, and experiences. There are no right or wrong answers—just honest sharing.</p>
                        </div>
                        <div class="step">
                            <div class="step-icon" aria-hidden="true">📊</div>
                            <div class="step-number" aria-hidden="true">2</div>
                            <h3>Get a Clear Picture</h3>
                            <p>Get a clear picture of your challenges and strengths across different areas like vision, hearing, mobility, learning, and communication.</p>
                        </div>
                        <div class="step">
                            <div class="step-icon" aria-hidden="true">🎯</div>
                            <div class="step-number" aria-hidden="true">3</div>
                            <h3>Explore Career Paths</h3>
                            <p>Explore career paths, support options, and training opportunities that match your interests, strengths, and accessibility needs.</p>
                        </div>
                        <div class="step">
                            <div class="step-icon" aria-hidden="true">🚀</div>
                            <div class="step-number" aria-hidden="true">4</div>
                            <h3>Connect and Grow</h3>
                            <p>Connect with opportunities, resources, and keep growing. We're here to support you every step of the way.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Motivational Quote -->
            <div class="quote" role="note" aria-label="Motivational quote">
                <span style="display: inline-block; margin-left: 2rem;">Every step forward matters. Your abilities are bigger than your barriers.</span>
            </div>

            <!-- Success Stories Section -->
            <section class="section" aria-labelledby="stories-heading">
                <div class="container">
                    <h2 id="stories-heading" class="section-title">Success Stories</h2>
                    <p class="section-subtitle">See how others have discovered their strengths and built meaningful careers.</p>
                    <div class="grid grid-3">
                        ${storiesPreview.map(story => `
                            <article class="story-card" tabindex="0" role="article" aria-label="Success story: ${story.name}" onclick="window.open(window.location.origin + window.location.pathname + '#/story?id=${story.id}', '_blank')" onkeypress="if(event.key==='Enter') window.open(window.location.origin + window.location.pathname + '#/story?id=${story.id}', '_blank')">
                                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                                    <span style="font-size: 1.5rem;" aria-hidden="true">⭐</span>
                                    <span class="story-badge">${story.disabilityType}</span>
                                </div>
                                <h3 class="card-title">${story.name}</h3>
                                <p class="card-text"><strong>${story.title}</strong> - ${story.domain}</p>
                                <p class="card-text">${story.description}</p>
                                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: auto; padding-top: 1rem;">
                                    <span style="padding: 4px 12px; background-color: var(--accent-primary-light); color: var(--accent-primary); border-radius: var(--radius-pill); font-size: 0.875rem; border: 1px solid var(--accent-primary);">${story.domain}</span>
                                </div>
                            </article>
                        `).join('')}
                    </div>
                    <div class="text-center mt-4">
                        <a href="#/success-stories" class="btn btn-outline" role="button" aria-label="See more success stories">See more stories</a>
                    </div>
                </div>
            </section>

            <!-- Get Support / Programs Section -->
            <section class="support-section section section-alt" aria-labelledby="support-heading">
                <div class="container">
                    <h2 id="support-heading" class="section-title">Get Support</h2>
                    <p class="section-subtitle">We offer different types of support to help you on your journey.</p>
                    <div class="grid grid-3">
                        <div class="support-card">
                            <div class="support-icon" aria-hidden="true" style="width: 80px; height: 80px; background-color: var(--accent-primary-light); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin: 0 auto var(--spacing-md); border: 1px solid var(--accent-primary);">📋</div>
                            <h3>Assessment</h3>
                            <p>Take our personalized assessment to understand your strengths and challenges. Get clear, supportive guidance on what might help you succeed.</p>
                        </div>
                        <div class="support-card">
                            <div class="support-icon" aria-hidden="true" style="width: 80px; height: 80px; background-color: var(--accent-primary-light); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin: 0 auto var(--spacing-md); border: 1px solid var(--accent-primary);">🎯</div>
                            <h3>Careers</h3>
                            <p>Explore career paths that match your interests and abilities. Access training programs, courses, and resources to build your skills.</p>
                        </div>
                        <div class="support-card">
                            <div class="support-icon" aria-hidden="true" style="width: 80px; height: 80px; background-color: var(--accent-primary-light); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin: 0 auto var(--spacing-md); border: 1px solid var(--accent-primary);">🤝</div>
                            <h3>Support</h3>
                            <p>Connect with mentors and get support for families. Learn how to navigate challenges and celebrate successes together.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Assessment / Get Started Section -->
            <section class="cta-band" aria-labelledby="cta-heading">
                <div class="container">
                    <div class="card" style="max-width: 600px; margin: 0 auto; text-align: center;">
                        <h2 id="cta-heading">Ready to Get Started?</h2>
                        <p>Take our assessment today and discover your strengths. Your journey begins with a single step.</p>
                        <div style="display: flex; gap: 1rem; justify-content: center; margin-top: var(--spacing-lg); flex-wrap: wrap;">
                            <a href="#/assessment" class="btn btn-primary" role="button" aria-label="Start your assessment">Start assessment</a>
                            <a href="#/about" style="color: var(--accent-primary); text-decoration: underline; padding: 16px 0;" aria-label="Learn more about us">Learn more</a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    `;
}
