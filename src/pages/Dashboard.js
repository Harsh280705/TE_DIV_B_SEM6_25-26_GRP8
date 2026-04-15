// Dashboard page component (post-login)
import { mockCareers, mockStories } from '../data/mockData.js';

// Helper function to get domains dynamically from domain-extractor
// Falls back to default domains if domain-extractor is not available
function getDomains() {
    // Try to get domains from window.domainExtractor (loaded via script tag)
    // Note: domainExtractor may not be available at module load time,
    // so we'll also add a script to update domains after page load
    if (typeof window !== 'undefined' && window.domainExtractor) {
        try {
            const allDomains = window.domainExtractor.getHardCodedDomains();
            // Convert to dashboard format with default stats
            return Object.entries(allDomains).map(([id, domain]) => ({
                id: id,
                name: domain.name,
                icon: domain.icon,
                careers: 25, // Default stat - can be enhanced later
                growth: "35%" // Default stat - can be enhanced later
            }));
        } catch (error) {
            console.warn('Error loading domains from domainExtractor:', error);
        }
    }
    
    // Fallback to default domains (backward compatibility)
    // This ensures the page renders even if domainExtractor isn't loaded yet
    return [
        { id: "education", name: "Education & Academia", icon: "🎓", careers: 30, growth: "35%" },
        { id: "jobs", name: "Jobs & Employment", icon: "💼", careers: 40, growth: "40%" },
        { id: "business", name: "Business & Entrepreneurship", icon: "📈", careers: 20, growth: "45%" },
        { id: "sports", name: "Sports & Adaptive Fitness", icon: "⚽", careers: 15, growth: "30%" },
        { id: "entertainment", name: "Entertainment & Media", icon: "🎬", careers: 30, growth: "40%" },
        { id: "content", name: "Content Creation", icon: "✍️", careers: 25, growth: "50%" },
        { id: "gaming", name: "Gaming & Esports", icon: "🎮", careers: 18, growth: "60%" },
        { id: "arts", name: "Creative Arts", icon: "🎨", careers: 22, growth: "35%" },
        { id: "health", name: "Health & Wellness", icon: "❤️", careers: 20, growth: "30%" },
        { id: "government", name: "Government & NGO", icon: "🏛️", careers: 35, growth: "25%" },
        { id: "agriculture", name: "Agriculture & Rural", icon: "🌱", careers: 15, growth: "20%" },
        { id: "freelancing", name: "Freelancing & Gig Economy", icon: "💻", careers: 28, growth: "55%" }
    ];
}

export function renderDashboard(user) {
    const userName = user?.name || 'User';
    const hasCompletedAssessment = user?.assessmentCompleted || false;
    
    // Get domains dynamically from domain-extractor (includes all 22 domains)
    const domains = getDomains();
    
    // Success stories preview (moved from assessment/index.html)
    const testimonials = [
        {
            text: "As a blind person, I never thought voice acting was possible. UDCOE showed me the path, connected me with ADIP for equipment, and now I earn ₹45,000/month!",
            author: "Priya M., Voice Artist (Maharashtra)"
        },
        {
            text: "The freelancing roadmap helped me become a virtual assistant. With NDFDC loan support, I set up my home office and now work with international clients.",
            author: "Arjun K., Virtual Assistant (Karnataka)"
        }
    ];
    
    // Show all career paths for exploration
    const featuredCareers = mockCareers.slice(0, 6);
    
    return `
        <main role="main" aria-labelledby="dashboard-heading">
            <div class="container" style="padding: 2rem 20px;">
                <div style="margin-bottom: 2rem;">
                    <h1 id="dashboard-heading" style="font-size: 2.5rem; margin-bottom: 0.5rem;">Welcome back, ${userName}! 👋</h1>
                    <p style="font-size: 1.1rem; color: var(--text-secondary);">Explore career paths and discover opportunities tailored for you</p>
                </div>

                <!-- Assessment Banner -->
                <section aria-labelledby="assessment-heading" style="margin-bottom: 3rem;">
                    <div class="card" style="background: linear-gradient(135deg, rgba(46, 125, 50, 0.1) 0%, rgba(27, 94, 32, 0.1) 100%); border: 2px solid var(--primary-color);">
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem;">
                            <div style="flex: 1; min-width: 300px;">
                                <h2 id="assessment-heading" style="margin-bottom: 1rem; color: var(--accent-primary); font-size: 1.75rem;">
                                    ${hasCompletedAssessment ? '📊 Your Assessment' : '🎯 Take Your Assessment'}
                                </h2>
                                ${hasCompletedAssessment ? `
                                    <p style="margin-bottom: 1.5rem; font-size: 1.1rem;">
                                        You've completed the assessment! View your personalized results and recommendations.
                                    </p>
                                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                                        <a href="#/results" class="btn btn-primary" role="button" aria-label="View assessment results">
                                            View Results
                                        </a>
                                        <a href="#/assessment" class="btn btn-outline" role="button" aria-label="Retake assessment">
                                            Retake Assessment
                                        </a>
                                    </div>
                                ` : `
                                    <p style="margin-bottom: 1.5rem; font-size: 1.1rem;">
                                        Complete our personalized assessment to discover your strengths and get career recommendations tailored specifically for you.
                                    </p>
                                    <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; color: var(--text-secondary);">
                                        <li>Identify your strengths and areas for support</li>
                                        <li>Get personalized career recommendations</li>
                                        <li>Access resources and training programs</li>
                                        <li>Learn about government schemes and benefits</li>
                                    </ul>
                                    <button type="button" class="btn btn-primary" role="button"
                                        onclick="window.location.href='assessment/assessment.html'"
                                        aria-label="Start your career assessment"
                                        style="font-size: 1.1rem; padding: 14px 28px;">
                                        Start Assessment →
                                    </button>
                                `}
                            </div>
                            <div style="flex: 0 0 auto; text-align: center;">
                                <div style="font-size: 4rem; margin-bottom: 0.5rem;">${hasCompletedAssessment ? '📊' : '🎯'}</div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Career Journey Section (moved from assessment/index.html) -->
                <section aria-labelledby="journey-heading" style="margin-bottom: 3rem;">
                    <div class="card" style="background: linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%); border: 2px solid #2E7D32; padding: 2.5rem; border-radius: 15px;">
                        <h2 id="journey-heading" class="text-center" style="font-size: 2rem; margin-bottom: 2rem; color: #FFFFFF; font-weight: 700;">Your Personalized Career Journey</h2>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
                            <div style="text-align: center; padding: 1.5rem; background: #FFFFFF; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border: 2px solid #2E7D32;">
                                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #2E7D32, #1B5E20); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: bold; margin: 0 auto 1rem;">1</div>
                                <div style="font-weight: 700; font-size: 1.2rem; margin-bottom: 0.5rem; color: #1a1a1a;">Assess Your Abilities</div>
                                <div style="font-size: 0.95rem; color: #333333; line-height: 1.5;">Complete our comprehensive screening for up to 21 disabilities recognized under RPwD Act, 2016.</div>
                            </div>
                            <div style="text-align: center; padding: 1.5rem; background: #FFFFFF; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border: 2px solid #2E7D32;">
                                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #2E7D32, #1B5E20); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: bold; margin: 0 auto 1rem;">2</div>
                                <div style="font-weight: 700; font-size: 1.2rem; margin-bottom: 0.5rem; color: #1a1a1a;">Discover Domains</div>
                                <div style="font-size: 0.95rem; color: #333333; line-height: 1.5;">Explore ${domains.length} career domains with roles adapted to your specific disability profile.</div>
                            </div>
                            <div style="text-align: center; padding: 1.5rem; background: #FFFFFF; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border: 2px solid #2E7D32;">
                                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #2E7D32, #1B5E20); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: bold; margin: 0 auto 1rem;">3</div>
                                <div style="font-weight: 700; font-size: 1.2rem; margin-bottom: 0.5rem; color: #1a1a1a;">Build Your Pathway</div>
                                <div style="font-size: 0.95rem; color: #333333; line-height: 1.5;">Get a 6-month roadmap with daily routines, training, and income projections.</div>
                            </div>
                            <div style="text-align: center; padding: 1.5rem; background: #FFFFFF; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border: 2px solid #2E7D32;">
                                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #2E7D32, #1B5E20); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: bold; margin: 0 auto 1rem;">4</div>
                                <div style="font-weight: 700; font-size: 1.2rem; margin-bottom: 0.5rem; color: #1a1a1a;">Access Support</div>
                                <div style="font-size: 0.95rem; color: #333333; line-height: 1.5;">Connect with government schemes, assistive tools, and mentors.</div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- UDCOE Overview Stats Section (moved from assessment/index.html) -->
                <section aria-labelledby="stats-heading" style="margin-bottom: 3rem;">
                    <div class="card" style="background: linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%); border: 2px solid #2E7D32; padding: 2rem; border-radius: 15px;">
                        <h2 id="stats-heading" class="text-center" style="font-size: 1.8rem; margin-bottom: 1.5rem; color: #FFFFFF; font-weight: 700;">Universal Disability Career & Opportunity Engine</h2>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
                            <div style="text-align: center; background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: all 0.3s ease;"
                                 onmouseover="this.style.boxShadow='0 8px 20px rgba(46, 125, 50, 0.2)'; this.style.transform='translateY(-3px)'"
                                 onmouseout="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'; this.style.transform='translateY(0)'">
                                <div style="font-size: 2.2rem; font-weight: 700; margin-bottom: 0.5rem; color: #2E7D32;">21</div>
                                <div style="font-size: 0.95rem; color: #333333; font-weight: 600;">Disabilities Covered</div>
                            </div>
                            <div style="text-align: center; background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: all 0.3s ease;"
                                 onmouseover="this.style.boxShadow='0 8px 20px rgba(46, 125, 50, 0.2)'; this.style.transform='translateY(-3px)'"
                                 onmouseout="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'; this.style.transform='translateY(0)'">
                                <div style="font-size: 2.2rem; font-weight: 700; margin-bottom: 0.5rem; color: #2E7D32;">20+</div>
                                <div style="font-size: 0.95rem; color: #333333; font-weight: 600;">Industries Explored</div>
                            </div>
                            <div style="text-align: center; background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: all 0.3s ease;"
                                 onmouseover="this.style.boxShadow='0 8px 20px rgba(46, 125, 50, 0.2)'; this.style.transform='translateY(-3px)'"
                                 onmouseout="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'; this.style.transform='translateY(0)'">
                                <div style="font-size: 2.2rem; font-weight: 700; margin-bottom: 0.5rem; color: #2E7D32;">500+</div>
                                <div style="font-size: 0.95rem; color: #333333; font-weight: 600;">Career Options</div>
                            </div>
                            <div style="text-align: center; background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: all 0.3s ease;"
                                 onmouseover="this.style.boxShadow='0 8px 20px rgba(46, 125, 50, 0.2)'; this.style.transform='translateY(-3px)'"
                                 onmouseout="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'; this.style.transform='translateY(0)'">
                                <div style="font-size: 2.2rem; font-weight: 700; margin-bottom: 0.5rem; color: #2E7D32;">100%</div>
                                <div style="font-size: 0.95rem; color: #333333; font-weight: 600;">Accessible Design</div>
                            </div>
                        </div>
                        <div class="text-center">
                            <a href="assessment/resources.html" style="background: linear-gradient(135deg, #2E7D32, #1B5E20); color: white; padding: 14px 35px; border-radius: 8px; font-weight: 600; text-decoration: none; display: inline-block; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(46, 125, 50, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(46, 125, 50, 0.3)'" role="button" aria-label="View government schemes">
                                View Government Schemes
                            </a>
                        </div>
                    </div>
                </section>

                <!-- Explore Domains Section -->
                <section aria-labelledby="domains-heading" style="margin-bottom: 3rem;">
                    <div style="background: linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%); border-radius: 12px; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 4px 15px rgba(46, 125, 50, 0.3);">
                        <h2 id="domains-heading" style="font-size: 1.8rem; font-weight: 700; color: #FFFFFF; margin-bottom: 0.5rem;">🎯 Explore Career Domains</h2>
                        <p style="color: #e0e0e0; margin: 0; font-size: 1rem;">Click any domain to discover roles, compatibility, and growth opportunities tailored to your profile.</p>
                    </div>
                    
                    <div id="domains-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1.5rem;">
                        ${domains.map(domain => `
                            <div class="card" style="text-align: center; padding: 1.5rem; cursor: pointer; transition: all 0.3s ease; border: 2px solid #2E7D32; background: #FFFFFF; border-radius: 12px;" 
                                 onmouseover="this.style.boxShadow='0 8px 25px rgba(46, 125, 50, 0.3)'; this.style.transform='translateY(-5px)'"
                                 onmouseout="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'; this.style.transform='translateY(0)'"
                                 onclick="window.location.href='assessment/domain.html?domain=${domain.id}'"
                                 onkeypress="if(event.key==='Enter') window.location.href='assessment/domain.html?domain=${domain.id}'"
                                 tabindex="0"
                                 role="button"
                                 aria-label="Explore ${domain.name} domain">
                                <div style="font-size: 3rem; margin-bottom: 1rem;">${domain.icon}</div>
                                <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem; color: #1a1a1a;">${domain.name}</h3>
                                <p style="color: #333333; margin-bottom: 1rem; font-size: 0.9rem; line-height: 1.5;">
                                    ${domain.careers}+ careers · ${domain.growth}
                                </p>
                                <div style="display: flex; justify-content: center; gap: 0.5rem; flex-wrap: wrap;">
                                    <span style="padding: 5px 12px; background: linear-gradient(135deg, #2E7D32, #1B5E20); color: white; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">
                                        Explore →
                                    </span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <!-- Success Stories Section (moved from assessment/index.html) -->
                <section aria-labelledby="stories-heading" style="margin-bottom: 3rem;">
                    <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); border-radius: 12px; padding: 2rem; margin-bottom: 2rem;">
                        <h2 id="stories-heading" style="font-size: 1.8rem; font-weight: 700; color: #FFFFFF; margin-bottom: 0.5rem;">✨ Success Stories</h2>
                        <p style="color: #e0e0e0; margin: 0; font-size: 1rem;">See how others have discovered their strengths and built meaningful careers.</p>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                        ${testimonials.map((testimonial, idx) => `
                            <div class="card" style="padding: 1.5rem; border-left: 5px solid #2E7D32; background: #FFFFFF; border-radius: 12px; box-shadow: 0 4px 12px rgba(46, 125, 50, 0.15); transition: all 0.3s ease;"
                                 onmouseover="this.style.boxShadow='0 8px 25px rgba(46, 125, 50, 0.25)'"
                                 onmouseout="this.style.boxShadow='0 4px 12px rgba(46, 125, 50, 0.15)'">
                                <p style="font-style: italic; margin-bottom: 1rem; color: #333333; line-height: 1.6; font-size: 0.95rem;">
                                    "${testimonial.text}"
                                </p>
                                <div style="font-weight: 700; color: #2E7D32;">
                                    — ${testimonial.author}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="text-center">
                        <a href="#/success-stories" class="btn" style="background: linear-gradient(135deg, #2E7D32, #1B5E20); color: white; padding: 12px 30px; border-radius: 8px; font-weight: 600; text-decoration: none; display: inline-block; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'" role="button" aria-label="View all success stories">
                            View All Success Stories →
                        </a>
                    </div>
                </section>

                <!-- Quick Actions -->
                <section aria-labelledby="quick-actions-heading" style="margin-bottom: 2rem;">
                    <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); border-radius: 12px; padding: 2rem; margin-bottom: 2rem;">
                        <h2 id="quick-actions-heading" style="font-size: 1.8rem; font-weight: 700; color: #FFFFFF; margin: 0;">⚡ Quick Actions</h2>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
                        <div class="card" style="text-align: center; padding: 2rem; cursor: pointer; background: linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%); color: white; border-radius: 12px; transition: all 0.3s ease; border: none;"
                             onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(46, 125, 50, 0.4)'"
                             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(46, 125, 50, 0.3)'"
                             onclick="window.location.href='#/resources'" 
                             onkeypress="if(event.key==='Enter') window.location.href='#/resources'" 
                             tabindex="0" 
                             role="button" 
                             aria-label="Go to resources page">
                            <div style="font-size: 3rem; margin-bottom: 1rem;">📚</div>
                            <h3 style="margin-bottom: 0.75rem; font-weight: 700; font-size: 1.3rem;">Resources</h3>
                            <p style="margin-bottom: 1rem; font-size: 0.95rem; line-height: 1.5;">
                                Access job portals, training programs, and career support
                            </p>
                            <span style="font-weight: 600; font-size: 0.95rem;">Explore →</span>
                        </div>
                        <div class="card" style="text-align: center; padding: 2rem; background: linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%); color: white; border-radius: 12px; transition: all 0.3s ease; border: none;"
                             onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(27, 94, 32, 0.4)'"
                             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(27, 94, 32, 0.3)'"
                             tabindex="0">
                            <div style="font-size: 3rem; margin-bottom: 1rem;">💼</div>
                            <h3 style="margin-bottom: 0.75rem; font-weight: 700; font-size: 1.3rem;">Career Guidance</h3>
                            <p style="margin-bottom: 1rem; font-size: 0.95rem; line-height: 1.5;">
                                Get personalized guidance and explore career opportunities
                            </p>
                            <span style="font-weight: 600; font-size: 0.95rem;">Learn More →</span>
                        </div>
                        <div class="card" style="text-align: center; padding: 2rem; cursor: pointer; background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%); color: white; border-radius: 12px; transition: all 0.3s ease; border: none;"
                             onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(76, 175, 80, 0.4)'"
                             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(76, 175, 80, 0.3)'"
                             onclick="window.location.href='assessment/resources.html'" 
                             onkeypress="if(event.key==='Enter') window.location.href='assessment/resources.html'" 
                             tabindex="0" 
                             role="button" 
                             aria-label="Go to support page">
                            <div style="font-size: 3rem; margin-bottom: 1rem;">🤝</div>
                            <h3 style="margin-bottom: 0.75rem; font-weight: 700; font-size: 1.3rem;">Support</h3>
                            <p style="margin-bottom: 1rem; font-size: 0.95rem; line-height: 1.5;">
                                Connect with mentors, get help, and find support programs
                            </p>
                            <span style="font-weight: 600; font-size: 0.95rem;">Connect →</span>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    `; 
}