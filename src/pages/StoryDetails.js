// Story Detail Page Component
import { getStoryById } from '../data/mockData.js';

export function renderStoryDetail(storyId) {
    const story = getStoryById(storyId);
    
    if (!story) {
        return `
            <main class="container" style="padding: 2rem 20px;">
                <div class="card text-center">
                    <h1>Story Not Found</h1>
                    <p>The story you're looking for doesn't exist.</p>
                    <button class="btn btn-primary" onclick="window.location.hash = '#/success-stories'">
                        Back to Success Stories
                    </button>
                </div>
            </main>
        `;
    }

    return `
        <main role="main" aria-labelledby="story-title">
            <div class="container" style="padding: 2rem 20px; max-width: 900px;">
                <!-- Back Button -->
                <button class="btn btn-outline" onclick="window.history.back()" style="margin-bottom: 20px;">
                    ← Back
                </button>

                <!-- Story Header -->
                <article class="card" style="padding: 40px;">
                    <div style="display: flex; gap: 15px; margin-bottom: 20px; flex-wrap: wrap;">
                        <span class="story-badge">${story.disabilityType}</span>
                        <span class="story-badge" style="background: #2563eb;">${story.domain}</span>
                    </div>

                    <h1 id="story-title" style="margin-bottom: 10px; font-size: 2.5rem; line-height: 1.2;">
                        ${story.name}
                    </h1>
                    
                    <p style="font-size: 1.25rem; color: #1e40af; font-weight: 600; margin-bottom: 5px;">
                        ${story.title}
                    </p>
                    
                    <p style="color: #151414; margin-bottom: 30px;">
                        <strong>📍 ${story.location}</strong>
                    </p>

                    <!-- Short Description -->
                    <div style="background: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; margin-bottom: 30px;">
                        <p style="font-size: 1.1rem; margin: 0; line-height: 1.6;">
                            ${story.description}
                        </p>
                    </div>

                    <!-- Full Story -->
                    <div style="line-height: 1.8; font-size: 1.05rem; color: #333;">
                        <h2 style="margin-top: 30px; margin-bottom: 15px;">The Journey</h2>
                        ${story.fullStory.split('\n\n').map(para => 
                            `<p style="margin-bottom: 20px; text-align: justify;">${para}</p>`
                        ).join('')}
                    </div>

                    <!-- Key Achievements -->
                    <div style="margin-top: 40px;">
                        <h2 style="margin-bottom: 20px;">Key Achievements</h2>
                        <div style="display: grid; gap: 15px;">
                            ${story.achievements.map(achievement => `
                                <div style="display: flex; align-items: start; gap: 12px; padding: 15px; background: #f8fafc; border-radius: 8px; border-left: 3px solid #10b981;">
                                    <span style="color: #10b981; font-size: 1.5rem;">✓</span>
                                    <span style="font-size: 1.05rem;">${achievement}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Share Section -->
                    <div style="margin-top: 40px; padding-top: 30px; border-top: 2px solid #e5e7eb;">
                        <h3 style="margin-bottom: 15px;">Share this inspiring story</h3>
                        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                            <button class="btn btn-outline" onclick="shareStory('twitter', '${story.name}')">
                                Share on Twitter
                            </button>
                            <button class="btn btn-outline" onclick="shareStory('facebook', '${story.name}')">
                                Share on Facebook
                            </button>
                            <button class="btn btn-outline" onclick="shareStory('whatsapp', '${story.name}')">
                                Share on WhatsApp
                            </button>
                            <button class="btn btn-outline" onclick="copyStoryLink()">
                                Copy Link
                            </button>
                        </div>
                    </div>

                    <!-- Navigation -->
                    <div style="margin-top: 30px; text-align: center;">
                        <button class="btn btn-primary" onclick="window.location.hash = '#/success-stories'">
                            Read More Success Stories
                        </button>
                    </div>
                </article>
            </div>
        </main>

        <script>
            // Share functionality
            window.shareStory = function(platform, name) {
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent(\`Inspired by \${name}'s incredible journey! Check out this success story.\`);
                
                let shareUrl;
                switch(platform) {
                    case 'twitter':
                        shareUrl = \`https://twitter.com/intent/tweet?text=\${text}&url=\${url}\`;
                        break;
                    case 'facebook':
                        shareUrl = \`https://www.facebook.com/sharer/sharer.php?u=\${url}\`;
                        break;
                    case 'whatsapp':
                        shareUrl = \`https://wa.me/?text=\${text}%20\${url}\`;
                        break;
                }
                
                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            };

            // Copy link functionality
            window.copyStoryLink = function() {
                const url = window.location.href;
                
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(url).then(() => {
                        alert('Link copied to clipboard!');
                    }).catch(err => {
                        console.error('Failed to copy:', err);
                        fallbackCopy(url);
                    });
                } else {
                    fallbackCopy(url);
                }
            };

            function fallbackCopy(text) {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    document.execCommand('copy');
                    alert('Link copied to clipboard!');
                } catch (err) {
                    alert('Failed to copy link. Please copy manually: ' + text);
                }
                document.body.removeChild(textarea);
            }

            // Print functionality
            window.printStory = function() {
                window.print();
            };
        </script>

        <style>
            @media print {
                .btn, button {
                    display: none !important;
                }
                
                .story-badge {
                    border: 1px solid #000 !important;
                    background: white !important;
                    color: #000 !important;
                }
            }

            .story-badge {
                display: inline-block;
                padding: 6px 16px;
                background: #10b981;
                color: white;
                border-radius: 20px;
                font-size: 0.85rem;
                font-weight: 600;
            }
        </style>
    `;
}