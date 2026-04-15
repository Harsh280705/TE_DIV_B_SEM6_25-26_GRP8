// Results and Recommendations page
import { mockCareers } from '../data/mockData.js';
import { calculateScores, determineCategories, getRecommendedCareers, getDomainDisplayName } from '../utils/scoring.js';

export function renderResults(assessmentData) {
    // Calculate results using new scoring system
    const scores = calculateScores(assessmentData.responses || {});
    const categories = determineCategories(scores);
    const recommendedCareerIds = getRecommendedCareers(categories, scores);
    const recommendedCareers = mockCareers.filter(c => recommendedCareerIds.includes(c.id));
    
    // Get user interests
    const interests = assessmentData.interests || [];
    const interestCareers = mockCareers.filter(c => 
        interests.some(interest => c.category.toLowerCase().includes(interest) || 
        c.title.toLowerCase().includes(interest))
    ).slice(0, 5);

    // Build domain summaries
    const domainSummaries = Object.keys(scores.domainScores).map(domain => {
        const displayName = getDomainDisplayName(domain);
        const level = scores.domainLevels[domain];
        return {
            domain: displayName,
            level: level,
            score: scores.domainScores[domain]
        };
    }).filter(d => d.score > 0); // Only show domains with scores > 0

    return `
        <main role="main" aria-labelledby="results-heading">
            <div class="container" style="padding: 2rem 20px;">
                <h1 id="results-heading">Your Assessment Results</h1>
                
                <!-- Important Notice -->
                <div class="card mb-4" style="background-color: var(--accent-primary-light); border-left: 4px solid var(--accent-primary); border-color: var(--accent-primary);">
                    <h2 style="margin-top: 0; color: var(--text-primary);">Important Notice</h2>
                    <p style="font-size: 1.1rem; margin-bottom: 0; color: var(--text-secondary);">
                        <strong>This is not a diagnosis, only a guide.</strong> This assessment provides general information based on your responses. 
                        Please consult healthcare professionals for proper evaluation and diagnosis.
                    </p>
                </div>

                <!-- Domain Summaries -->
                <div class="card mb-4">
                    <h2>Your Assessment Summary</h2>
                    ${domainSummaries.length > 0 ? `
                        <p style="margin-bottom: 1.5rem;">Based on your responses, here is a summary of your difficulties across different functional domains:</p>
                        <div style="margin-bottom: 1.5rem;">
                            ${domainSummaries.map(d => `
                                <div style="margin-bottom: 1rem; padding: 1rem; background-color: var(--bg-surface); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                                    <p style="font-size: 1.1rem; margin: 0; color: var(--text-primary);">
                                        <strong>Your difficulty with ${d.domain} seems ${d.level}.</strong>
                                    </p>
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <p>Based on your responses, you reported minimal difficulties across the assessed domains.</p>
                    `}
                </div>

                <!-- Indicator-Based Recommendations -->
                <div class="card mb-4">
                    <h2>Recommendations Based on Your Responses</h2>
                    <div style="margin-top: 1rem;">
                        ${scores.indicators.visionIndicator ? `
                            <div style="margin-bottom: 1rem; padding: 1rem; background-color: var(--accent-primary-light); border-left: 4px solid var(--accent-primary); border-radius: var(--radius-md); border: 1px solid var(--accent-primary);">
                                <p style="margin: 0; font-size: 1.05rem; color: var(--text-primary);">
                                    <strong>Vision Support:</strong> You may benefit from visual support and accessible technology.
                                </p>
                            </div>
                        ` : ''}
                        
                        ${scores.indicators.hearingIndicator ? `
                            <div style="margin-bottom: 1rem; padding: 1rem; background-color: var(--accent-primary-light); border-left: 4px solid var(--accent-primary); border-radius: var(--radius-md); border: 1px solid var(--accent-primary);">
                                <p style="margin: 0; font-size: 1.05rem; color: var(--text-primary);">
                                    <strong>Hearing Support:</strong> You may benefit from visual and text-based communication options.
                                </p>
                            </div>
                        ` : ''}
                        
                        ${scores.indicators.mobilityIndicator ? `
                            <div style="margin-bottom: 1rem; padding: 1rem; background-color: var(--accent-primary-light); border-left: 4px solid var(--accent-primary); border-radius: var(--radius-md); border: 1px solid var(--accent-primary);">
                                <p style="margin: 0; font-size: 1.05rem; color: var(--text-primary);">
                                    <strong>Mobility Support:</strong> Desk-based or remote work may suit your physical needs.
                                </p>
                            </div>
                        ` : ''}
                        
                        ${scores.indicators.neurocognitiveIndicator ? `
                            <div style="margin-bottom: 1rem; padding: 1rem; background-color: var(--accent-primary-light); border-left: 4px solid var(--accent-primary); border-radius: var(--radius-md); border: 1px solid var(--accent-primary);">
                                <p style="margin: 0; font-size: 1.05rem; color: var(--text-primary);">
                                    <strong>Learning Support:</strong> Structured environments and extra learning support may help you.
                                </p>
                            </div>
                        ` : ''}
                        
                        ${!scores.indicators.visionIndicator && !scores.indicators.hearingIndicator && 
                          !scores.indicators.mobilityIndicator && !scores.indicators.neurocognitiveIndicator ? `
                            <p>Based on your responses, you may benefit from exploring various career options that match your interests and skills.</p>
                        ` : ''}
                    </div>
                </div>

                <!-- Impact & Goals Summary -->
                ${scores.impactData ? `
                    <div class="card mb-4">
                        <h2>Impact & Goals</h2>
                        ${scores.impactData.duration ? `
                            <p><strong>Duration of difficulties:</strong> ${scores.impactData.duration}</p>
                        ` : ''}
                        ${scores.impactData.impact ? `
                            <p><strong>Impact on daily activities:</strong> ${scores.impactData.impact}</p>
                        ` : ''}
                        ${scores.impactData.currentSupport && scores.impactData.currentSupport.length > 0 ? `
                            <p><strong>Current support:</strong> ${scores.impactData.currentSupport.join(', ')}</p>
                        ` : ''}
                        ${scores.impactData.desiredSupport && scores.impactData.desiredSupport.length > 0 ? `
                            <p><strong>Desired support:</strong> ${scores.impactData.desiredSupport.join(', ')}</p>
                        ` : ''}
                        ${scores.impactData.openText ? `
                            <div style="margin-top: 1rem;">
                                <p><strong>Your words:</strong></p>
                                <p style="font-style: italic; padding: 1rem; background-color: var(--bg-surface); border-radius: var(--radius-md); color: var(--text-secondary); border: 1px solid var(--border-color);">
                                    "${scores.impactData.openText}"
                                </p>
                            </div>
                        ` : ''}
                    </div>
                ` : ''}

                <!-- Category Details (for reference) -->
                <div class="card mb-4">
                    <h2>Detailed Analysis</h2>
                    ${categories.map(cat => `
                        <div style="margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-color);">
                            <h3 style="color: var(--text-primary);">${cat.category}</h3>
                            <p style="color: var(--text-secondary);">${cat.description}</p>
                            <div style="margin-top: 0.5rem;">
                                <span class="recommendation-badge">Level: ${cat.level}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- AI Recommended Paths -->
                <div class="mb-4">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                        <h2>Recommended Career Paths</h2>
                        <div class="filters">
                            <select id="career-filter" onchange="filterCareers()" aria-label="Filter careers">
                                <option value="all">All Careers</option>
                                <option value="high">High Recommendation</option>
                                <option value="medium">Medium Recommendation</option>
                            </select>
                            <select id="career-sort" onchange="sortCareers()" aria-label="Sort careers">
                                <option value="recommendation">Sort by Recommendation</option>
                                <option value="title">Sort by Title</option>
                            </select>
                        </div>
                    </div>
                    ${recommendedCareers.length > 0 ? `
                        <div id="recommended-careers">
                            ${recommendedCareers.map(career => `
                                <div class="career-card" data-recommendation="${career.recommendedLevel.toLowerCase()}" tabindex="0" role="article" onclick="viewCareerPath(${career.id})" onkeypress="if(event.key==='Enter') viewCareerPath(${career.id})">
                                    <h3 class="card-title">${career.title}</h3>
                                    <p class="card-text">${career.description}</p>
                                    <p class="card-text"><strong>Suitable for:</strong> ${career.suitableFor.join(', ')}</p>
                                    <span class="recommendation-badge">${career.recommendedLevel} Recommendation</span>
                                    <div style="margin-top: 1rem;">
                                        <button class="btn btn-primary" onclick="event.stopPropagation(); viewCareerPath(${career.id})" aria-label="View full career path for ${career.title}">View Full Path</button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <p>No specific career recommendations based on your assessment. Please explore careers matching your interests below.</p>
                    `}
                </div>

                <!-- Selected Interests -->
                ${interestCareers.length > 0 ? `
                    <div class="mb-4">
                        <h2>Careers Matching Your Interests</h2>
                        <div id="interest-careers">
                            ${interestCareers.map(career => `
                                <div class="career-card" tabindex="0" role="article" onclick="viewCareerPath(${career.id})" onkeypress="if(event.key==='Enter') viewCareerPath(${career.id})">
                                    <h3 class="card-title">${career.title}</h3>
                                    <p class="card-text">${career.description}</p>
                                    <p class="card-text"><strong>Suitable for:</strong> ${career.suitableFor.join(', ')}</p>
                                    <div style="margin-top: 1rem;">
                                        <button class="btn btn-primary" onclick="event.stopPropagation(); viewCareerPath(${career.id})" aria-label="View full career path for ${career.title}">View Full Path</button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Actions -->
                <div class="card text-center">
                    <h2>Next Steps</h2>
                    <p>Explore the career paths above to learn more about training, resources, and opportunities.</p>
                    <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem; flex-wrap: wrap;">
                        <a href="#/success-stories" class="btn btn-outline" role="button" aria-label="View success stories">View Success Stories</a>
                        <a href="#/dashboard" class="btn btn-primary" role="button" aria-label="Go to dashboard">Back to Dashboard</a>
                    </div>
                </div>
            </div>
        </main>
    `;
}
