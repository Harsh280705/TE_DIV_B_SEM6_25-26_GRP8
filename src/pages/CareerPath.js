// Career Path Details page
import { mockCareers, mockStories } from '../data/mockData.js';

export function renderCareerPath(careerId) {
    const career = mockCareers.find(c => c.id === parseInt(careerId));
    
    if (!career) {
        return `
            <main role="main">
                <div class="container" style="padding: 2rem 20px;">
                    <div class="card">
                        <h1>Career Path Not Found</h1>
                        <p>The requested career path could not be found.</p>
                        <a href="#/results" class="btn btn-primary" role="button">Back to Results</a>
                    </div>
                </div>
            </main>
        `;
    }

    const relatedStories = mockStories.filter(s => 
        s.domain.toLowerCase() === career.category.toLowerCase() ||
        career.suitableFor.some(suit => s.disabilityType.toLowerCase().includes(suit.toLowerCase().split(' ')[0]))
    ).slice(0, 3);

    return `
        <main role="main" aria-labelledby="career-heading">
            <div class="container" style="max-width: 1000px; padding: 2rem 20px;">
                <div class="mb-4">
                    <a href="#/results" class="btn btn-outline" role="button" aria-label="Back to results">← Back to Results</a>
                </div>
                
                <div class="card mb-4">
                    <h1 id="career-heading">${career.title}</h1>
                    <p style="font-size: 1.1rem; margin-bottom: 1rem;">${career.description}</p>
                    <div>
                        <span class="recommendation-badge">${career.recommendedLevel} Recommendation</span>
                    </div>
                </div>

                <!-- Disability Friendliness -->
                <div class="card mb-4">
                    <h2>Disability Friendliness</h2>
                    <p><strong>Suitable for:</strong> ${career.suitableFor.join(', ')}</p>
                    <p style="margin-top: 1rem;">This career path has been identified as suitable for the listed disability types. Accommodations and assistive technologies can further enhance accessibility.</p>
                </div>

                <!-- Roadmap -->
                <div class="card mb-4">
                    <h2>Career Roadmap</h2>
                    <div class="roadmap">
                        <div class="roadmap-steps">
                            ${career.roadmap.steps.map((step, index) => `
                                <div class="roadmap-step">
                                    <div class="roadmap-step-content">
                                        <h3>${step.title}</h3>
                                        <p>${step.description}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Free Resources -->
                <div class="card mb-4">
                    <h2>Free Resources</h2>
                    <ul style="list-style: none; padding: 0;">
                        ${career.roadmap.resources.map(resource => `
                            <li style="padding: 1rem; margin-bottom: 0.5rem; background: var(--bg-light); border-radius: 6px;">
                                <strong>${resource.title}</strong> - <a href="${resource.url}" target="_blank" rel="noopener noreferrer" aria-label="${resource.title} - opens in new window">${resource.platform}</a>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <!-- Courses -->
                <div class="card mb-4">
                    <h2>Recommended Courses</h2>
                    <div class="grid grid-2">
                        ${career.roadmap.courses.map(course => `
                            <div class="card" style="padding: 1rem;">
                                <h3 class="card-title">${course.title}</h3>
                                <p class="card-text"><strong>Platform:</strong> ${course.platform}</p>
                                <p class="card-text"><strong>Price:</strong> ${course.price}</p>
                                <a href="#" class="btn btn-outline" role="button" aria-label="Enroll in ${course.title}">Learn More</a>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Exam Info -->
                <div class="card mb-4">
                    <h2>Exam / Cut-off / Quota Information</h2>
                    <p>${career.roadmap.examInfo}</p>
                    <p style="margin-top: 1rem; padding: 1rem; background: var(--bg-light); border-radius: 6px;">
                        <strong>Note:</strong> People with Disabilities (PwD) are eligible for reservations and relaxations in various examinations. Check official websites for the latest information.
                    </p>
                </div>

                <!-- Success Stories -->
                ${relatedStories.length > 0 ? `
                    <div class="card">
                        <h2>Success Stories in This Path</h2>
                        <div class="grid grid-3">
                            ${relatedStories.map(story => `
                                <article class="story-card" tabindex="0" role="article" onclick="viewStoryDetail(${story.id})" onkeypress="if(event.key==='Enter') viewStoryDetail(${story.id})">
                                    <span class="story-badge">${story.disabilityType}</span>
                                    <h3 class="card-title">${story.name}</h3>
                                    <p class="card-text"><strong>${story.title}</strong></p>
                                    <p class="card-text">${story.description}</p>
                                </article>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Actions -->
                <div class="card text-center mt-4">
                    <h2>Ready to Start?</h2>
                    <p>Begin your journey by exploring the resources and courses listed above.</p>
                    <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem; flex-wrap: wrap;">
                        <a href="#/success-stories" class="btn btn-outline" role="button" aria-label="View more success stories">View More Stories</a>
                        <a href="#/results" class="btn btn-primary" role="button" aria-label="Back to your results">Back to Results</a>
                    </div>
                </div>
            </div>
        </main>
    `;
}
