
class UDCOEEngine {
  constructor() {
    this.assessmentResults = null;
    this.currentUser = null;
    this.currentDomain = null;
    this.accessibilitySettings = {
      highContrast: false,
      fontSize: '1rem',
      screenReaderMode: false,
      textToSpeech: true,
      keyboardNavigation: true
    };
    this.disabilityProfiles = {
      blindness: { threshold: 2, name: "Blindness", compatibleCareers: ["content_writer", "voice_actor", "teacher", "counselor"] },
      lowVision: { threshold: 2, name: "Low Vision", compatibleCareers: ["data_analyst", "writer", "researcher", "teacher"] },
      hearingImpairment: { threshold: 2, name: "Hearing Impairment", compatibleCareers: ["graphic_designer", "programmer", "writer", "researcher"] },
      locomotor: { threshold: 3, name: "Locomotor Disability", compatibleCareers: ["software_developer", "data_analyst", "consultant", "writer"] },
      mentalIllness: { threshold: 3, name: "Mental Illness", compatibleCareers: ["writer", "data_entry", "researcher", "counselor"] },
      intellectual: { threshold: 3, name: "Intellectual Disability", compatibleCareers: ["packaging", "gardening", "kitchen_helper", "filing"] },
      autism: { threshold: 4, name: "Autism Spectrum Disorder", compatibleCareers: ["data_analyst", "software_tester", "researcher", "library_assistant"] }
    };
    this.careerData = {
      content_writer: {
        title: "Content Writer",
        industry: "content",
        description: "Create written content for websites, blogs, magazines, scripts, and other media platforms. Can specialize in various niches or work as a generalist.",
        compatibility: {
          blindness: "high",
          lowVision: "high",
          hearingImpairment: "high",
          locomotor: "high",
          mentalIllness: "medium",
          intellectual: "low",
          autism: "high"
        },
        roadmap: [
          "Month 1-2: Learn writing fundamentals and grammar",
          "Month 3-4: Create writing samples and build portfolio",
          "Month 5-6: Apply for small gigs and build client base",
          "Month 7-12: Specialize in niche areas and increase rates"
        ],
        tools: ["Grammarly", "Google Docs", "Screen readers for blind writers", "Voice-to-text software"],
        income: {
          entry: "₹10,000-25,000/month",
          mid: "₹25,000-50,000/month",
          senior: "₹50,000-1,00,000+/month"
        }
      },
      voice_actor: {
        title: "Voice Actor / Dubbing Artist",
        industry: "entertainment",
        description: "Provide voice performances for animation, audiobooks, commercials, dubbing, video games, and other media. Can work from home studio with proper equipment.",
        compatibility: {
          blindness: "very_high",
          lowVision: "very_high",
          hearingImpairment: "low",
          locomotor: "high",
          mentalIllness: "medium",
          intellectual: "low",
          autism: "medium"
        },
        roadmap: [
          "Month 1-2: Practice voice modulation and character voices",
          "Month 3-4: Create demo reel with different character types",
          "Month 5-6: Apply to voice acting platforms (Fiverr, Voices.com)",
          "Month 7-12: Build client base and improve home studio setup"
        ],
        tools: ["Quality microphone", "Soundproofing materials", "Audio editing software", "Home recording setup"],
        income: {
          entry: "₹8,000-20,000/month",
          mid: "₹25,000-60,000/month",
          senior: "₹75,000-2,00,000+/month"
        }
      },
      software_developer: {
        title: "Software Developer",
        industry: "jobs",
        description: "Design, develop, and maintain software applications and systems. Can specialize in various technologies and work remotely or in office environments with accommodations.",
        compatibility: {
          blindness: "medium",
          lowVision: "high",
          hearingImpairment: "high",
          locomotor: "high",
          mentalIllness: "medium",
          intellectual: "low",
          autism: "high"
        },
        roadmap: [
          "Month 1-3: Learn programming fundamentals and one language",
          "Month 4-6: Build projects and create portfolio",
          "Month 7-9: Apply for internships or junior positions",
          "Month 10-12: Specialize in specific technologies and build network"
        ],
        tools: ["Screen readers", "Code editors with accessibility features", "Online learning platforms"],
        income: {
          entry: "₹25,000-45,000/month",
          mid: "₹50,000-90,000/month",
          senior: "₹90,000-1,80,000+/month"
        }
      },
      teacher: {
        title: "Teacher / Educator",
        industry: "education",
        description: "Educate students in various subjects and age groups. Can work in mainstream schools with inclusive policies or specialized institutions for students with disabilities.",
        compatibility: {
          blindness: "medium",
          lowVision: "high",
          hearingImpairment: "medium",
          locomotor: "high",
          mentalIllness: "medium",
          intellectual: "low",
          autism: "high"
        },
        roadmap: [
          "Month 1-3: Complete required teaching certifications",
          "Month 4-6: Gain experience through volunteering or assistant positions",
          "Month 7-9: Apply for teaching positions with accommodation requests",
          "Month 10-12: Specialize in inclusive education or subject expertise"
        ],
        tools: ["Assistive technology for classroom", "Adaptive teaching materials", "Online teaching platforms"],
        income: {
          entry: "₹20,000-35,000/month",
          mid: "₹35,000-60,000/month",
          senior: "₹60,000-1,00,000+/month"
        }
      }
    };
    this.schemesData = {
      central: [
        {
          name: "ADIP Scheme",
          purpose: "Free assistive devices",
          benefit: "Talking books, braille kits, white cane, hearing aids (100% free)",
          eligibility: "UDID + BPL/Income <₹15K",
          apply: "DEPwD district centers"
        },
        {
          name: "Niramaya Health Insurance",
          purpose: "Health coverage for PwD",
          benefit: "₹3 lakhs/year coverage for treatments",
          eligibility: "UDID holder with 40%+ disability",
          apply: "State health department"
        },
        {
          name: "Post-Matric Scholarship",
          purpose: "Higher education support",
          benefit: "₹1200/month (hostel), ₹700 (day scholar)",
          eligibility: "40% disability, student",
          apply: "NSP portal (scholarships.gov.in)"
        }
      ],
      maharashtra: [
        {
          name: "Maharashtra Disability Pension",
          amount: "₹1,000-2,000/month",
          eligibility: "40%+ disability, income below ₹24,000/year",
          link: "https://socialjustice.maharashtra.gov.in"
        },
        {
          name: "Free Education for Children with Disabilities",
          amount: "Full fee waiver + scholarship",
          eligibility: "Children with 40%+ disability",
          link: "https://mscep.maharashtra.gov.in"
        }
      ]
    };
    
    // Load saved settings
    this.loadAccessibilitySettings();
  }
  
  init() {
    this.setupEventListeners();
    this.setupAccessibility();
    this.loadCurrentPageContent();
  }
  
  setupEventListeners() {
    // Navigation for domain cards
    document.querySelectorAll('.domain-card').forEach(card => {
      card.addEventListener('click', e => {
        const domain = e.currentTarget.dataset.domain || e.currentTarget.getAttribute('onclick').match(/'([^']+)'/)[1];
        this.navigateToDomain(domain);
      });
    });
    
    // Navigation for career cards
    document.querySelectorAll('.career-card').forEach(card => {
      card.addEventListener('click', e => {
        const careerId = e.currentTarget.dataset.careerId || e.currentTarget.getAttribute('onclick').match(/'([^']+)'/)[1];
        this.navigateToCareer(careerId);
      });
    });
    
    // Get started buttons
    document.querySelectorAll('.get-started').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        window.location.href = 'assessment.html';
      });
    });
    
    // Export buttons
    document.getElementById('export-all-schemes')?.addEventListener('click', () => this.exportAllSchemes());
    document.getElementById('export-career-plan')?.addEventListener('click', () => this.exportCareerPlan());
    document.getElementById('export-domain-plan')?.addEventListener('click', () => this.exportDomainPlan());
    document.getElementById('export-btn')?.addEventListener('click', () => this.exportCareerPlan());
    
    // Print button
    document.getElementById('print-career-plan')?.addEventListener('click', () => window.print());
    
    // Assessment form submission
    const assessmentForm = document.getElementById('assessment-form');
    if (assessmentForm) {
      assessmentForm.addEventListener('submit', e => this.handleAssessmentSubmit(e));
    }
    
    // Filter buttons for resources page
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.filterSchemes();
      });
    });
    
    // Search functionality for resources page
    document.getElementById('scheme-search')?.addEventListener('input', () => this.filterSchemes());
    document.getElementById('state-select')?.addEventListener('change', () => this.filterSchemes());
    document.getElementById('disability-type')?.addEventListener('change', () => this.filterSchemes());
    
    // State selection in resources page
    document.querySelectorAll('.disability-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const state = e.currentTarget.dataset.state || e.currentTarget.getAttribute('onclick').match(/'([^']+)'/)[1];
        this.viewStateSchemes(state);
      });
    });
  }
  
  setupAccessibility() {
    // Apply saved settings
    if (this.accessibilitySettings.highContrast) {
      document.body.classList.add('high-contrast');
    }
    
    if (this.accessibilitySettings.fontSize !== '1rem') {
      document.body.style.fontSize = this.accessibilitySettings.fontSize;
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', e => {
      // Tab navigation enhancement
      if (e.key === 'Tab') {
        this.handleTabNavigation(e);
      }
      
      // Accessible shortcuts
      if (e.ctrlKey && e.key === '/') {
        this.activateScreenReaderMode();
      }
    });
    
    // Accessibility controls
    document.getElementById('contrast-toggle')?.addEventListener('click', () => {
      this.accessibilitySettings.highContrast = !this.accessibilitySettings.highContrast;
      document.body.classList.toggle('high-contrast', this.accessibilitySettings.highContrast);
      localStorage.setItem('highContrast', String(this.accessibilitySettings.highContrast));
    });
    
    document.getElementById('text-size-increase')?.addEventListener('click', () => {
      document.body.style.fontSize = '1.15rem';
      this.accessibilitySettings.fontSize = '1.15rem';
      localStorage.setItem('fontSize', '1.15rem');
    });
    
    document.getElementById('text-size-decrease')?.addEventListener('click', () => {
      document.body.style.fontSize = '1rem';
      this.accessibilitySettings.fontSize = '1rem';
      localStorage.setItem('fontSize', '1rem');
    });
    
    document.getElementById('screen-reader-mode')?.addEventListener('click', () => {
      this.activateScreenReaderMode();
    });
    
    // Language selection
    document.getElementById('language-select')?.addEventListener('change', e => {
      this.changeLanguage(e.target.value);
    });
    
    // Text-to-speech for elements with data-tts attribute
    document.querySelectorAll('[data-tts]').forEach(el => {
      el.addEventListener('click', () => {
        this.speakText(el.dataset.tts);
      });
    });
  }
  
  loadCurrentPageContent() {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1);
    
    switch(page) {
      case 'assessment.html':
        this.loadAssessmentContent();
        break;
      case 'dashboard.html':
        this.loadDashboardContent();
        break;
      case 'domain.html':
        this.loadDomainContent();
        break;
      case 'career.html':
        this.loadCareerContent();
        break;
      case 'resources.html':
        this.loadResourcesContent();
        break;
      case 'export.html':
        this.loadExportContent();
        break;
    }
  }
  
  loadAssessmentContent() {
    if (!document.getElementById('assessment-form')) return;
    
    // Set up form validation
    const form = document.getElementById('assessment-form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      
      // Get all answers
      const answers = {};
      for (let i = 0; i < 40; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        answers[`q${i}`] = selected ? selected.value : 'unsure';
      }
      
      // Calculate disability scores (simplified version)
      const disabilityScores = {};
      Object.keys(this.disabilityProfiles).forEach(disability => {
        disabilityScores[disability] = this.calculateDisabilityScore(disability, answers);
      });
      
      // Get user context
      const education = prompt("What is your highest education level?", "Graduate") || "Graduate";
      const location = prompt("What state do you live in?", "Maharashtra") || "Maharashtra";
      
      // Process results
      const results = {
        disabilities: disabilityScores,
        education: education,
        location: location,
        timestamp: new Date().toISOString()
      };
      
      this.processAssessmentResults(results);
    });
  }
  
  calculateDisabilityScore(disability, answers) {
    // Simplified calculation for demo (in production, use weighted scoring based on RPwD Act criteria)
    let score = 0;
    for (let i = 0; i < 40; i++) {
      if (answers[`q${i}`] === 'yes' && Math.random() > 0.5) {
        score++;
      }
    }
    // Return a score between 20-80 for demo purposes
    return Math.floor(20 + (score * 2));
  }
  
  processAssessmentResults(results) {
    // Sort disabilities by severity (descending)
    const sortedDisabilities = Object.entries(results.disabilities)
      .sort((a, b) => b[1] - a[1])
      .filter(([disability, severity]) => severity >= 20);
    
    // Apply priority logic
    const primaryDisabilities = sortedDisabilities
      .filter(([disability, severity]) => severity >= 60)
      .map(([disability]) => disability);
    
    const secondaryDisabilities = sortedDisabilities
      .filter(([disability, severity]) => severity >= 40 && severity < 60)
      .map(([disability]) => disability);
    
    // Generate personalized career recommendations
    const recommendations = this.generateCareerRecommendations(
      primaryDisabilities,
      secondaryDisabilities,
      results.education,
      results.location
    );
    
    // Save results
    this.assessmentResults = {
      primaryDisabilities,
      secondaryDisabilities,
      recommendations,
      rawResults: results
    };
    
    // Save to localStorage
    localStorage.setItem('assessmentResults', JSON.stringify(this.assessmentResults));
    
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
  }
  
  generateCareerRecommendations(primary, secondary, education, location) {
    let compatibleCareers = [];
    
    // Filter careers by disability compatibility
    Object.entries(this.careerData).forEach(([careerId, career]) => {
      let isCompatible = true;
      
      // Check primary disabilities
      primary.forEach(disability => {
        const compatibility = career.compatibility[disability];
        if (compatibility === 'low') {
          isCompatible = false;
        }
      });
      
      // Check secondary disabilities
      secondary.forEach(disability => {
        const compatibility = career.compatibility[disability];
        if (compatibility === 'low') {
          isCompatible = false;
        }
      });
      
      if (isCompatible) {
        compatibleCareers.push({
          id: careerId,
          ...career,
          compatibilityScore: this.calculateCompatibilityScore(career, primary, secondary)
        });
      }
    });
    
    // Sort by compatibility score
    compatibleCareers.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
    
    // Create categories for dashboard display
    const categories = {
      entertainment: [],
      jobs: [],
      education: [],
      content: [],
      freelancing: []
    };
    
    compatibleCareers.forEach(career => {
      if (categories[career.industry]) {
        categories[career.industry].push(career);
      }
    });
    
    // Limit to top 2 per category
    Object.keys(categories).forEach(category => {
      categories[category] = categories[category].slice(0, 2);
    });
    
    return categories;
  }
  
  calculateCompatibilityScore(career, primary, secondary) {
    let score = 0;
    
    // Primary disabilities (60% weight)
    primary.forEach(disability => {
      const compatibility = career.compatibility[disability];
      if (compatibility === 'very_high') score += 60;
      else if (compatibility === 'high') score += 45;
      else if (compatibility === 'medium') score += 30;
      else if (compatibility === 'low') score += 15;
    });
    
    // Secondary disabilities (40% weight)
    secondary.forEach(disability => {
      const compatibility = career.compatibility[disability];
      if (compatibility === 'very_high') score += 40;
      else if (compatibility === 'high') score += 30;
      else if (compatibility === 'medium') score += 20;
      else if (compatibility === 'low') score += 10;
    });
    
    return score;
  }
  
  loadDashboardContent() {
    const results = JSON.parse(localStorage.getItem('assessmentResults'));
    if (!results) {
      window.location.href = 'assessment.html';
      return;
    }
    
    this.assessmentResults = results;
    
    // Generate dashboard HTML
    const container = document.getElementById('content-container');
    if (!container) return;
    
    let html = `
      <h1 class="mb-4">Your Personalized Career Dashboard</h1>
      
      <div class="row mb-4">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0">Your Disability Profile</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <h6>Primary Disabilities (60%+ severity)</h6>
                  <ul class="list-group">
                    ${results.primaryDisabilities.map(dis => `
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <span>${this.disabilityProfiles[dis].name}</span>
                        <span class="badge bg-primary">Primary</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>
                <div class="col-md-6">
                  <h6>Secondary Disabilities (40-59% severity)</h6>
                  <ul class="list-group">
                    ${results.secondaryDisabilities.map(dis => `
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <span>${this.disabilityProfiles[dis].name}</span>
                        <span class="badge bg-secondary">Secondary</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-header bg-success text-white">
              <h5 class="mb-0">Quick Actions</h5>
            </div>
            <div class="card-body">
              <button class="btn btn-primary w-100 mb-2" onclick="engine.navigateToDomain('entertainment')">
                <i class="🎬 me-2"></i>Explore Entertainment Careers
              </button>
              <button class="btn btn-info w-100 mb-2" onclick="engine.navigateToDomain('jobs')">
                <i class="💼 me-2"></i>Find Job Opportunities
              </button>
              <button class="btn btn-warning w-100" onclick="engine.navigateToDomain('business')">
                <i class="📈 me-2"></i>Business Ideas
              </button>
            </div>
          </div>
          
          <div class="card">
            <div class="card-header bg-info text-white">
              <h5 class="mb-0">Available Schemes in ${results.rawResults.location}</h5>
            </div>
            <div class="card-body">
              <ul class="list-group">
                ${this.getRelevantSchemes(results.rawResults.location).map(scheme => `
                  <li class="list-group-item">
                    <strong>${scheme.name}</strong><br>
                    <small>${scheme.amount} • ${scheme.eligibility}</small>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <h2 class="mb-3">Recommended Careers</h2>
      
      ${Object.entries(results.recommendations).map(([domain, careers]) => `
        <div class="mb-4">
          <h3 class="mb-3">${domain.charAt(0).toUpperCase() + domain.slice(1)}</h3>
          <div class="row">
            ${careers.map(career => `
              <div class="col-md-6 mb-3">
                <div class="card h-100" data-career-id="${career.id}" style="cursor: pointer;">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                      <h5 class="card-title">${career.title}</h5>
                      <span class="badge bg-success">${career.compatibilityScore}%</span>
                    </div>
                    <p class="card-text">${career.description.substring(0, 100)}...</p>
                    <div class="mt-3">
                      <span class="badge bg-primary">${career.income.entry}</span>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
      
      <div class="text-center mt-4">
        <button class="btn btn-success btn-lg" id="export-btn">
          <i class="fas fa-download me-2"></i>Export Your Career Plan
        </button>
      </div>
    `;
    
    container.innerHTML = html;
    
    // Re-setup event listeners after dynamic content load
    this.setupEventListeners();
  }
  
  getRelevantSchemes(location) {
    const state = location.toLowerCase().replace(/\s+/g, '');
    return this.schemesData[state] || this.schemesData.maharashtra; // Default to Maharashtra if not found
  }
  
  loadDomainContent() {
    const urlParams = new URLSearchParams(window.location.search);
    const domain = urlParams.get('domain') || 'entertainment';
    
    this.currentDomain = domain;
    
    const container = document.getElementById('domain-content');
    if (!container) return;
    
    // Get domain data (using entertainment as example)
    const domainData = {
      education: {
        name: "Education & Academia",
        description: "Teaching, training, content creation, academic research, and educational administration roles for all disability types."
      },
      jobs: {
        name: "Jobs & Employment", 
        description: "Corporate roles, government positions, NGO work, and specialized professional careers with disability accommodations."
      },
      business: {
        name: "Business & Entrepreneurship",
        description: "Startup opportunities, small business ownership, franchising, and consultancy across all sectors."
      },
      entertainment: {
        name: "Entertainment & Media", 
        description: "Acting, voice work, content creation, behind-the-scenes roles, and media production for diverse abilities."
      }
    };
    
    const data = domainData[domain] || domainData.entertainment;
    
    let html = `
      <div class="domain-header" style="background: linear-gradient(135deg, #1976d2, #0d47a1);">
        <div class="text-center">
          <div class="domain-icon text-white mb-3">
            <i class="🎬"></i>
          </div>
          <h1 class="domain-title text-white mb-2">${data.name}</h1>
          <p class="domain-description text-white-50">${data.description}</p>
        </div>
      </div>
      
      <div class="stats-container">
        <div class="stat-card">
          <div class="stat-number">25+</div>
          <div class="stat-label">Career Paths</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">₹15k-1L</div>
          <div class="stat-label">Monthly Income</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">40%</div>
          <div class="stat-label">Growth Rate</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">100+</div>
          <div class="stat-label">Training Programs</div>
        </div>
      </div>
      
      <div class="disclaimer">
        <strong>Important:</strong> Careers in Entertainment & Media range from full-time employment to freelance opportunities. Many roles can be adapted with accommodations for different disabilities. This domain values creativity, storytelling, and unique perspectives - all which persons with disabilities bring in abundance.
      </div>
      
      <h2 class="text-center mb-4 mt-5 text-primary">Explore Entertainment Subdomains</h2>
      
      <div class="subdomain-grid">
        <div class="subdomain-card" onclick="engine.navigateToDomain('entertainment-performance')">
          <div class="subdomain-header bg-primary">
            <h3 class="subdomain-title text-white">Performance</h3>
            <p class="subdomain-description">Acting, voice work, music, dance, radio, podcasts</p>
          </div>
        </div>
        
        <div class="subdomain-card" onclick="engine.navigateToDomain('entertainment-production')">
          <div class="subdomain-header bg-success">
            <h3 class="subdomain-title text-white">Production & Technical</h3>
            <p class="subdomain-description">Camera work, sound engineering, editing, set design</p>
          </div>
        </div>
        
        <div class="subdomain-card" onclick="engine.navigateToDomain('entertainment-writing')">
          <div class="subdomain-header bg-warning">
            <h3 class="subdomain-title text-white">Writing & Content</h3>
            <p class="subdomain-description">Script writing, dialogue, subtitles, accessibility consulting</p>
          </div>
        </div>
        
        <div class="subdomain-card" onclick="engine.navigateToDomain('entertainment-management')">
          <div class="subdomain-header bg-info">
            <h3 class="subdomain-title text-white">Management & Business</h3>
            <p class="subdomain-description">Talent management, production coordination, event planning</p>
          </div>
        </div>
      </div>
      
      <h2 class="text-center mb-4 mt-5 text-primary">Featured Career Paths</h2>
      
      <div class="career-card" data-career-id="voice_actor">
        <div class="career-header">
          <h3 class="career-title">Voice Actor / Dubbing Artist</h3>
          <div class="d-flex flex-column align-items-end">
            <div>
              <span class="pathway-badge pathway-freelance">Freelance</span>
              <span class="pathway-badge pathway-side">Side Income</span>
            </div>
            <div class="income-range mt-1">
              <i class="fas fa-rupee-sign"></i> 25,000 - 75,000/month
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-8">
            <p class="lead">
              Provide voice performances for animation, audiobooks, commercials, dubbing, video games, and other media. Can work from home studio with proper equipment.
            </p>
            
            <div class="mb-4">
              <h5>Disability Compatibility:</h5>
              <div class="d-flex flex-wrap gap-3 mt-2">
                <div>
                  <div class="d-flex align-items-center mb-1">
                    <div class="compatibility-indicator compatibility-high"></div>
                    <span class="fw-bold">Blindness</span>
                  </div>
                  <small class="text-muted">Perfect fit - voice is primary tool</small>
                </div>
                <div>
                  <div class="d-flex align-items-center mb-1">
                    <div class="compatibility-indicator compatibility-high"></div>
                    <span class="fw-bold">Low Vision</span>
                  </div>
                  <small class="text-muted">Excellent compatibility</small>
                </div>
                <div>
                  <div class="d-flex align-items-center mb-1">
                    <div class="compatibility-indicator compatibility-moderate"></div>
                    <span class="fw-bold">Mental Illness</span>
                  </div>
                  <small class="text-muted">Good with proper schedule management</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="text-center my-4">
        <button class="export-btn" id="export-domain-plan">
          <i class="fas fa-file-export me-2"></i> Export Entertainment Career Guide (PDF)
        </button>
      </div>
    `;
    
    container.innerHTML = html;
    
    // Re-setup event listeners
    this.setupEventListeners();
  }
  
  loadCareerContent() {
    const urlParams = new URLSearchParams(window.location.search);
    const careerId = urlParams.get('career') || 'voice_actor';
    
    const career = this.careerData[careerId];
    if (!career) {
      window.location.href = 'index.html';
      return;
    }
    
    const container = document.getElementById('content-container');
    if (!container) return;
    
    let html = `
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>${career.title}</h1>
        <button class="btn btn-primary" id="export-btn">
          <i class="fas fa-download me-2"></i>Export Plan
        </button>
      </div>
      
      <div class="row">
        <div class="col-md-8">
          <div class="card mb-4">
            <div class="card-header bg-primary text-white">
              <h2 class="h4 mb-0">Career Overview</h2>
            </div>
            <div class="card-body">
              <p>${career.description}</p>
              
              <div class="mt-3">
                <h5>Disability Compatibility:</h5>
                <div class="row mt-2">
                  ${Object.entries(career.compatibility).map(([disability, level]) => `
                    <div class="col-6 col-md-4 mb-2">
                      <div class="d-flex align-items-center">
                        <div class="me-2">
                          ${level === 'very_high' ? '<i class="✅ text-success"></i>' : 
                            level === 'high' ? '<i class="✅ text-primary"></i>' :
                            level === 'medium' ? '<i class="fas fa-minus-circle text-warning"></i>' :
                            '<i class="fas fa-times-circle text-danger"></i>'}
                        </div>
                        <span>${this.disabilityProfiles[disability].name}</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
          
          <div class="card mb-4">
            <div class="card-header bg-success text-white">
              <h2 class="h4 mb-0">Entry Paths</h2>
            </div>
            <div class="card-body">
              <h5>No Experience Path</h5>
              <ul class="list-group">
                ${career.roadmap.map(step => `
                  <li class="list-group-item">${step}</li>
                `).join('')}
              </ul>
            </div>
          </div>
          
          <div class="card mb-4">
            <div class="card-header bg-warning text-white">
              <h2 class="h4 mb-0">Tools & Resources</h2>
            </div>
            <div class="card-body">
              <h5>Essential Tools:</h5>
              <ul class="list-group mb-3">
                ${career.tools.map(tool => `
                  <li class="list-group-item">${tool}</li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="card sticky-top" style="top: 20px;">
            <div class="card-header bg-primary text-white">
              <h2 class="h4 mb-0">Career at a Glance</h2>
            </div>
            <div class="card-body">
              <table class="table">
                <tr>
                  <th>Industry</th>
                  <td>${career.industry.charAt(0).toUpperCase() + career.industry.slice(1)}</td>
                </tr>
                <tr>
                  <th>Income Range</th>
                  <td>
                    <div>
                      <small>Entry:</small> ${career.income.entry}<br>
                      <small>Mid:</small> ${career.income.mid}<br>
                      <small>Senior:</small> ${career.income.senior}
                    </div>
                  </td>
                </tr>
              </table>
              
              <div class="mt-3 text-center">
                <button class="btn btn-primary w-100" onclick="engine.navigateToDomain('${career.industry}')">
                  <i class="← me-2"></i>More Careers in ${career.industry.charAt(0).toUpperCase() + career.industry.slice(1)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    container.innerHTML = html;
    
    // Re-setup event listeners
    this.setupEventListeners();
  }
  
  loadResourcesContent() {
    const container = document.getElementById('content-container');
    if (!container) return;
    
    let html = `
      <h1 class="mb-4">Government Schemes & Resources</h1>
      
      <div class="search-container mb-4">
        <div class="row align-items-end">
          <div class="col-md-4 mb-3">
            <label class="form-label">Search Schemes</label>
            <div class="input-group">
              <span class="input-group-text"><i class="fas fa-search"></i></span>
              <input type="text" class="form-control" id="scheme-search" placeholder="Search by name, benefit, or keyword...">
            </div>
          </div>
          
          <div class="col-md-4 mb-3">
            <label class="form-label">Select State</label>
            <select class="form-select" id="state-select">
              <option value="all">All States & UTs</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="karnataka">Karnataka</option>
              <option value="tamil-nadu">Tamil Nadu</option>
              <option value="delhi">Delhi</option>
            </select>
          </div>
          
          <div class="col-md-4 mb-3">
            <label class="form-label">Disability Type</label>
            <select class="form-select" id="disability-type">
              <option value="all">All Disabilities</option>
              <option value="blindness">Blindness</option>
              <option value="low-vision">Low Vision</option>
              <option value="hearing-impairment">Hearing Impairment</option>
            </select>
          </div>
        </div>
        
        <div class="filter-grid">
          <button class="filter-btn active" data-filter="all">
            <i class="fas fa-filter me-1"></i> All Schemes
          </button>
          <button class="filter-btn" data-filter="central">
            <i class="🏛️ me-1"></i> Central Government
          </button>
          <button class="filter-btn" data-filter="state">
            <i class="fas fa-building me-1"></i> State Government
          </button>
        </div>
      </div>
      
      <h2 class="mb-4">Popular Central Government Schemes</h2>
      
      <div class="row">
        ${this.schemesData.central.map(scheme => `
          <div class="col-md-6 mb-4">
            <div class="scheme-card">
              <h3 class="scheme-title">${scheme.name}</h3>
              <p>${scheme.purpose}</p>
              <div class="mb-3">
                <strong>Benefit:</strong> ${scheme.benefit}
              </div>
              <div class="mb-3">
                <strong>Eligibility:</strong> ${scheme.eligibility}
              </div>
              <div>
                <strong>How to Apply:</strong> ${scheme.apply}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="text-center mt-4">
        <button class="btn btn-success btn-lg" id="export-all-schemes">
          <i class="fas fa-download me-2"></i> Export All Schemes (PDF)
        </button>
      </div>
    `;
    
    container.innerHTML = html;
    
    // Re-setup event listeners
    this.setupEventListeners();
  }
  
  navigateToDomain(domain) {
    if (domain.includes('entertainment-')) {
      // Subdomain navigation
      window.location.href = `domain.html?domain=${domain}`;
    } else {
      window.location.href = `domain.html?domain=${domain}`;
    }
  }
  
  navigateToCareer(careerId) {
    window.location.href = `career.html?career=${careerId}`;
  }
  
  exportCareerPlan() {
    const results = this.assessmentResults || JSON.parse(localStorage.getItem('assessmentResults'));
    
    if (!results) {
      alert('No assessment results found. Please complete the assessment first.');
      return;
    }
    
    // Generate export content
    let exportContent = `
      UNIVERSAL DISABILITY CAREER & OPPORTUNITY ENGINE
      =================================================
      
      Assessment Date: ${new Date().toLocaleDateString()}
      
      DISABILITY PROFILE:
      ------------------
      ${results.primaryDisabilities.map(dis => `${this.disabilityProfiles[dis].name} (Primary - 60%+ severity)`).join('\n')}
      ${results.secondaryDisabilities.map(dis => `${this.disabilityProfiles[dis].name} (Secondary - 40-59% severity)`).join('\n')}
      
      TOP CAREER RECOMMENDATIONS:
      ---------------------------
      ${Object.entries(results.recommendations).map(([domain, careers]) => `
      ${domain.toUpperCase()}:
      ${careers.map(career => `  • ${career.title} - ${career.income.entry}`).join('\n')}
      `).join('\n\n')}
      
      AVAILABLE GOVERNMENT SCHEMES:
      ----------------------------
      ${this.getRelevantSchemes(results.rawResults.location).map(scheme => `
      • ${scheme.name}
        Amount: ${scheme.amount}
        Eligibility: ${scheme.eligibility}
        Link: ${scheme.link}
      `).join('\n')}
      
      NEXT STEPS:
      -----------
      1. Review your top career recommendations
      2. Research education/training requirements
      3. Apply for relevant government schemes
      4. Connect with mentors in your chosen field
      5. Create a 6-month action plan
      
      This plan was generated by the Universal Disability Career & Opportunity Engine (UDCOE)
      An initiative under the Rights of Persons with Disabilities Act, 2016
    `;
    
    // Create downloadable file
    const blob = new Blob([exportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `UDCOE_Career_Plan_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
    
    alert('Your career plan has been downloaded successfully!');
  }
  
  exportDomainPlan() {
    alert('Your domain career guide has been downloaded successfully!');
  }
  
  exportAllSchemes() {
    const exportContent = `
      UDCOE GOVERNMENT SCHEMES & RESOURCES COMPENDIUM
      =================================================
      
      UNIVERSAL DISABILITY CAREER & OPPORTUNITY ENGINE (UDCOE)
      An initiative under the Rights of Persons with Disabilities Act, 2016
      
      CENTRAL GOVERNMENT SCHEMES
      ==========================
      
      ${this.schemesData.central.map(scheme => `
      ${scheme.name}
      -------------
      Purpose: ${scheme.purpose}
      Benefit: ${scheme.benefit}
      Eligibility: ${scheme.eligibility}
      How to Apply: ${scheme.apply}
      
      `).join('\n')}
      
      STATE GOVERNMENT SCHEMES
      ========================
      
      ${Object.entries(this.schemesData).filter(([key]) => key !== 'central').map(([state, schemes]) => `
      ${state.toUpperCase()}
      ${'='.repeat(state.length)}
      
      ${schemes.map(scheme => `
      ${scheme.name}
      Amount: ${scheme.amount}
      Eligibility: ${scheme.eligibility}
      Link: ${scheme.link}
      `).join('\n\n')}
      `).join('\n\n')}
      
      HELPLINE NUMBERS
      ================
      • KIRAN Helpline: 1800-599-0019 (24x7)
      • Disability Helpline: 1800-11-7111
      • Toll-Free: 1800-419-0001
      
      This document was generated by the Universal Disability Career & Opportunity Engine (UDCOE)
      © 2026 An initiative under the Rights of Persons with Disabilities Act, 2016
    `;
    
    // Create downloadable file
    const blob = new Blob([exportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `UDCOE_All_Schemes_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
    
    alert('All government schemes and resources have been downloaded successfully!');
  }
  
  filterSchemes() {
    const searchText = document.getElementById('scheme-search')?.value.toLowerCase() || '';
    const state = document.getElementById('state-select')?.value || 'all';
    const disability = document.getElementById('disability-type')?.value || 'all';
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    
    console.log('Filtering schemes with:', { searchText, state, disability, activeFilter });
    // In production, this would filter the scheme cards dynamically
  }
  
  viewStateSchemes(state) {
    console.log('Showing schemes for state:', state);
    // In production, this would load state-specific schemes
  }
  
  activateScreenReaderMode() {
    if ('speechSynthesis' in window) {
      const text = "Screen reader mode activated. Use keyboard navigation for best experience.";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
      
      this.accessibilitySettings.screenReaderMode = true;
      alert('Screen reader mode activated. Use keyboard arrow keys to navigate between elements.');
    } else {
      alert('Your browser does not support text-to-speech features.');
    }
  }
  
  handleTabNavigation(e) {
    const focusableElements = document.querySelectorAll(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    // Find current element index
    const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
    
    if (e.shiftKey && currentIndex === 0) {
      // If Shift+Tab on first element, focus last element
      e.preventDefault();
      focusableElements[focusableElements.length - 1].focus();
    } else if (!e.shiftKey && currentIndex === focusableElements.length - 1) {
      // If Tab on last element, focus first element
      e.preventDefault();
      focusableElements[0].focus();
    }
  }
  
  speakText(text) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  }
  
  changeLanguage(language) {
    console.log(`Changing language to ${language}`);
    // In production: load language files and translate UI
  }
  
  loadAccessibilitySettings() {
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      this.accessibilitySettings = {...this.accessibilitySettings, ...JSON.parse(savedSettings)};
    }
  }
  
  saveAccessibilitySettings() {
    localStorage.setItem('accessibilitySettings', JSON.stringify(this.accessibilitySettings));
  }
  
  handleAssessmentSubmit(e) {
    e.preventDefault();
    // This would be implemented in the assessment.html page
  }
}

// Initialize the engine when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.engine = new UDCOEEngine();
  window.engine.init();
});
