// src/pages/how-it-works.js

export function renderHowItWorks() {
  return `
    <main class="container" style="color: #ffffff; padding: 2rem 0; max-width: 800px; margin: 0 auto;">
      <h1 style="font-size: 2.25rem; font-weight: 700; margin-bottom: 1.5rem; color: #ffffff;">How It Works</h1>
      
      <p style="font-size: 1.125rem; line-height: 1.6; margin-bottom: 2rem; color: #e2e8f0;">
        Our platform empowers individuals with disabilities to explore meaningful career paths through personalized guidance and real-world inspiration.
      </p>

      <div style="display: flex; flex-direction: column; gap: 1.75rem;">
        <div style="background: rgba(255, 255, 255, 0.08); padding: 1.5rem; border-radius: 12px; border-left: 4px solid #3b82f6;">
          <h2 style="font-size: 1.25rem; margin: 0 0 0.75rem; color: #ffffff;">1. Explore Success Stories</h2>
          <p style="margin: 0; color: #cbd5e1; line-height: 1.6;">
            Read real-life journeys of people with diverse abilities who have built successful careers. Get inspired by their challenges, strategies, and achievements.
          </p>
        </div>

        <div style="background: rgba(255, 255, 255, 0.08); padding: 1.5rem; border-radius: 12px; border-left: 4px solid #10b981;">
          <h2 style="font-size: 1.25rem; margin: 0 0 0.75rem; color: #ffffff;">2. Take a Personalized Assessment</h2>
          <p style="margin: 0; color: #cbd5e1; line-height: 1.6;">
            Complete our inclusive, accessible career assessment that considers your strengths, interests, support needs, and goals.
          </p>
        </div>

        <div style="background: rgba(255, 255, 255, 0.08); padding: 1.5rem; border-radius: 12px; border-left: 4px solid #8b5cf6;">
          <h2 style="font-size: 1.25rem; margin: 0 0 0.75rem; color: #ffffff;">3. Discover Career Matches</h2>
          <p style="margin: 0; color: #cbd5e1; line-height: 1.6;">
            Receive tailored career recommendations based on your unique profile, including job roles, required skills, and growth opportunities.
          </p>
        </div>

        <div style="background: rgba(255, 255, 255, 0.08); padding: 1.5rem; border-radius: 12px; border-left: 4px solid #f59e0b;">
          <h2 style="font-size: 1.25rem; margin: 0 0 0.75rem; color: #ffffff;">4. Connect & Grow</h2>
          <p style="margin: 0; color: #cbd5e1; line-height: 1.6;">
            Access mentorship, training resources, and community support to help you take your next step with confidence.
          </p>
        </div>
      </div>

      <div style="margin-top: 2.5rem; text-align: center;">
        <a href="#/register" class="btn btn-primary" style="display: inline-block; padding: 0.75rem 2rem; background: #3b82f6; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
          Get Started Today
        </a>
      </div>
    </main>
  `;
}