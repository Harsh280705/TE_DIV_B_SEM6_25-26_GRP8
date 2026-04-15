// src/pages/SuccessStories.js
import { mockStories, disabilityCategories } from '../data/mockData.js';

const DOMAINS = ['Sports', 'Education', 'Government Job', 'Private Job', 'Entrepreneurship'];

export function renderSuccessStories() {
    return `
        <main role="main" aria-labelledby="stories-heading">
            <div class="container" style="padding: 2rem 20px;">
                <h1 id="stories-heading">Success Stories</h1>
                <p class="mb-4">Read inspiring stories of people who have overcome challenges and built successful careers.</p>

                <!-- Filters -->
                <div class="card mb-4">
                    <h2>Filter Stories</h2>
                    <div class="filters">
                        <div class="filter-group">
                            <label for="filter-disability">Disability Type</label>
                            <select id="filter-disability" aria-label="Filter by disability type">
                                <option value="all">All Types</option>
                                ${disabilityCategories.map(type => `
                                    <option value="${type.toLowerCase()}">${type}</option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="filter-group">
                            <label for="filter-domain">Domain</label>
                            <select id="filter-domain" aria-label="Filter by career domain">
                                <option value="all">All Domains</option>
                                ${DOMAINS.map(domain => `
                                    <option value="${domain.toLowerCase()}">${domain}</option>
                                `).join('')}
                            </select>
                        </div>
                        <button id="reset-filters" class="btn btn-outline" style="margin-left: 10px;">
                            Reset Filters
                        </button>
                    </div>
                    <div id="filter-status" style="margin-top: 10px; font-size: 0.9rem; color: #666;" aria-live="polite"></div>
                </div>

                <!-- Stories Grid -->
                <div id="stories-container" class="grid grid-3">
                    ${mockStories.map(story => `
                        <article class="story-card" 
                                 data-disability="${story.disabilityType.toLowerCase().trim()}" 
                                 data-domain="${story.domain.toLowerCase().trim()}"
                                 tabindex="0" 
                                 role="article" 
                                 aria-label="Success story: ${story.name}">
                            <span class="story-badge">${story.disabilityType}</span>
                            <h3 class="card-title">${story.name}</h3>
                            <p class="card-text"><strong>${story.title}</strong></p>
                            <p class="card-text" style="color: #2563eb;"><strong>${story.domain}</strong></p>
                            <p class="card-text"><strong>Location:</strong> ${story.location}</p>
                            <p class="card-text">${story.description}</p>
                            <button class="btn btn-outline" onclick="window.open(window.location.origin + window.location.pathname + '#/story?id=${story.id}', '_blank')">
                                Read Full Story
                            </button>
                        </article>
                    `).join('')}
                </div>

                <div id="no-results" class="card text-center" style="display: none;">
                    <h2>No Stories Found</h2>
                    <p>Try adjusting your filters to see more stories.</p>
                    <button id="reset-filters-2" class="btn btn-primary">Reset Filters</button>
                </div>
            </div>
        </main>
    `;
}
