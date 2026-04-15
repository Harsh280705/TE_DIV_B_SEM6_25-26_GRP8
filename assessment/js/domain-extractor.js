// Domain Extractor Service
// Extracts and manages career domains from Word documents or manual mapping
// Supports loading from Firestore for dynamic updates

class DomainExtractor {
  constructor() {
    this.domains = null;
    this.firestoreAvailable = false;
  }

  async initialize() {
    try {
      if (window.firebaseService) {
        this.firestoreAvailable = true;
      }
    } catch (error) {
      console.warn('Firestore not available, using hard-coded domains');
      this.firestoreAvailable = false;
    }
  }

  // Load domains from Firestore or use hard-coded fallback
  async loadDomains() {
    if (this.domains) {
      return this.domains;
    }

    // Try Firestore first
    if (this.firestoreAvailable) {
      try {
        const domains = await this.loadDomainsFromFirestore();
        if (domains && Object.keys(domains).length > 0) {
          this.domains = domains;
          return domains;
        }
      } catch (error) {
        console.warn('Failed to load domains from Firestore:', error);
      }
    }

    // Fallback to hard-coded domains
    this.domains = this.getHardCodedDomains();
    return this.domains;
  }

  // Load domains from Firestore
  async loadDomainsFromFirestore() {
    try {
      const { getDbInstance } = await import('../js/firebase-service.js');
      const db = await getDbInstance();
      const { collection, query, where, getDocs } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
      
      const q = query(
        collection(db, 'careerDomains'),
        where('isActive', '==', true)
      );

      const querySnapshot = await getDocs(q);
      const domains = {};
      
      querySnapshot.forEach(doc => {
        const data = doc.data();
        domains[data.domainKey] = {
          name: data.name,
          description: data.description,
          icon: data.icon || '📁',
          accessibilityNote: data.accessibilityNote,
          compatibleDisabilities: data.compatibleDisabilities || [],
          interestTags: data.interestTags || []
        };
      });

      return Object.keys(domains).length > 0 ? domains : null;
    } catch (error) {
      console.error('Error loading domains from Firestore:', error);
      return null;
    }
  }

  // Hard-coded domains (extracted from Word documents concept)
  // These represent domains that would be extracted from 1-6.docx and after6.docx
  // Aligned with domain.html to ensure 1:1 consistency
  getHardCodedDomains() {
    return {
      education: {
        name: "Education & Academia",
        description: "Teaching, training, research, and educational administration roles",
        icon: "🎓",
        accessibilityNote: "Flexible schedules, remote options, assistive tech friendly",
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism", "speechLanguage"],
        interestTags: ["education", "teaching", "research", "academia"]
      },
      jobs: {
        name: "Jobs & Employment",
        description: "Corporate roles, government positions, NGO work, and specialized professional careers with disability accommodations",
        icon: "💼",
        accessibilityNote: "Reservation benefits, accessible workplaces, assistive tech support",
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism", "speechLanguage", "dwarfism"],
        interestTags: ["jobs", "employment", "corporate", "professional", "work", "technology", "tech", "business"]
      },
      business: {
        name: "Business & Entrepreneurship",
        description: "Startups, small business, franchising, consultancy",
        icon: "📈",
        accessibilityNote: "Flexible hours, remote work, self-paced growth",
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism", "speechLanguage", "dwarfism"],
        interestTags: ["business", "entrepreneurship", "startup", "consulting"]
      },
      sports: {
        name: "Sports & Adaptive Fitness",
        description: "Paralympic sports, coaching, sports administration, adaptive training",
        icon: "⚽",
        accessibilityNote: "Adaptive equipment, inclusive environments, specialized training",
        compatibleDisabilities: ["locomotor", "blindness", "lowVision", "hearingImpairment"],
        interestTags: ["sports", "fitness", "coaching", "athletics"]
      },
      entertainment: {
        name: "Entertainment & Media",
        description: "Content creation, voice acting, writing, production",
        icon: "🎬",
        accessibilityNote: "Remote production, voice-first roles, flexible schedules",
        compatibleDisabilities: ["blindness", "lowVision", "locomotor", "mentalIllness", "autism", "dwarfism"],
        interestTags: ["media", "entertainment", "content creation", "writing", "voice acting", "arts", "creative"]
      },
      content: {
        name: "Content Creation",
        description: "Blogging, vlogging, podcasting, social media management",
        icon: "✍️",
        accessibilityNote: "Remote work, flexible schedules, multiple formats",
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism", "speechLanguage"],
        interestTags: ["content", "blogging", "social media", "writing", "creative", "arts", "media", "technology"]
      },
      gaming: {
        name: "Gaming & Esports",
        description: "Game development, esports, streaming, game testing",
        icon: "🎮",
        accessibilityNote: "Remote work, adaptive controllers, accessible game design",
        compatibleDisabilities: ["locomotor", "mentalIllness", "autism", "hearingImpairment"],
        interestTags: ["gaming", "esports", "game development", "streaming", "technology", "tech"]
      },
      arts: {
        name: "Creative Arts",
        description: "Visual arts, performing arts, creative writing, design",
        icon: "🎨",
        accessibilityNote: "Adaptive tools, inclusive spaces, diverse expression",
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism"],
        interestTags: ["arts", "creative", "drama", "design", "visual arts", "content"]
      },
      health: {
        name: "Health & Wellness",
        description: "Counseling, peer support, health advocacy, wellness coaching",
        icon: "❤️",
        accessibilityNote: "Remote counseling, flexible schedules, lived experience valued",
        compatibleDisabilities: ["mentalIllness", "locomotor", "hearingImpairment", "speechLanguage"],
        interestTags: ["health", "wellness", "counseling", "advocacy", "helping", "healthcare", "social work", "social-work", "research"]
      },
      government: {
        name: "Government & NGO",
        description: "IAS, IPS, IFS, state services with reservation benefits, NGO work, disability advocacy",
        icon: "🏛️",
        accessibilityNote: "Reservation benefits, exam relaxations, accessible workplaces, inclusive culture",
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism", "speechLanguage"],
        interestTags: ["government", "civil services", "public service", "administration", "NGO", "social work", "social-work", "advocacy", "jobs"]
      },
      agriculture: {
        name: "Agriculture & Rural",
        description: "Farming, agricultural services, rural entrepreneurship, agri-tech",
        icon: "🌱",
        accessibilityNote: "Adaptive tools, rural accessibility, flexible schedules",
        compatibleDisabilities: ["locomotor", "hearingImpairment", "mentalIllness", "intellectual", "lowVision"],
        interestTags: ["agriculture", "farming", "rural", "agri-tech", "business"]
      },
      freelancing: {
        name: "Freelancing & Gig Economy",
        description: "Remote consulting, online services, freelance projects",
        icon: "💻",
        accessibilityNote: "100% remote, flexible hours, self-managed",
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism", "speechLanguage", "dwarfism"],
        interestTags: ["freelancing", "remote work", "flexible", "online", "gig economy", "technology", "tech", "business", "content"]
      },
      // NEW DOMAINS - Added to support all career domains
      it: {
        name: "IT & Technology",
        description: "Software development, IT services, system administration, cybersecurity, data science",
        icon: "💻",
        accessibilityNote: "Remote work options, accessible IDEs, screen readers, assistive tech support",
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism", "speechLanguage", "dwarfism"],
        interestTags: ["technology", "tech", "IT", "software", "programming", "jobs"]
      },
      law: {
        name: "Law & Legal Services",
        description: "Legal practice, advocacy, legal research, paralegal work, legal consulting",
        icon: "⚖️",
        accessibilityNote: "Accessible courtrooms, assistive tech for legal research, flexible schedules",
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism", "speechLanguage"],
        interestTags: ["law", "legal", "government", "research", "advocacy"]
      },
      media: {
        name: "Media & Communications",
        description: "Journalism, broadcasting, digital media, public relations, media production",
        icon: "📺",
        accessibilityNote: "Remote production, accessible media tools, flexible schedules, captioning support",
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism", "dwarfism"],
        interestTags: ["media", "entertainment", "communications", "journalism", "broadcasting", "arts", "creative"]
      },
      ngo: {
        name: "NGO & Social Impact",
        description: "Non-profit work, social impact, community development, advocacy, humanitarian work",
        icon: "🤝",
        accessibilityNote: "Inclusive work environments, flexible schedules, mission-driven culture",
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism", "speechLanguage", "dwarfism"],
        interestTags: ["social-work", "social work", "NGO", "advocacy", "government", "helping", "healthcare"]
      },
      research: {
        name: "Research & Development",
        description: "Academic research, scientific research, market research, policy research, data analysis",
        icon: "🔬",
        accessibilityNote: "Flexible schedules, accessible research tools, remote research options",
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism", "speechLanguage"],
        interestTags: ["research", "academia", "education", "science", "analysis"]
      },
      "customer-service": {
        name: "Customer Service & Support",
        description: "Customer support, call centers, help desk, client relations, service coordination",
        icon: "📞",
        accessibilityNote: "Remote work options, accessible communication tools, flexible schedules",
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism", "speechLanguage", "dwarfism"],
        interestTags: ["customer service", "support", "jobs", "business", "helping"]
      },
      administration: {
        name: "Administration & Management",
        description: "Administrative roles, office management, operations, coordination, executive support",
        icon: "📋",
        accessibilityNote: "Accessible office tools, flexible schedules, assistive tech support",
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism", "speechLanguage", "dwarfism"],
        interestTags: ["administration", "management", "government", "jobs", "business", "corporate"]
      },
      training: {
        name: "Training & Development",
        description: "Corporate training, skill development, vocational training, instructional design, coaching",
        icon: "📚",
        accessibilityNote: "Flexible schedules, remote training options, accessible training materials",
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism", "speechLanguage"],
        interestTags: ["training", "education", "teaching", "development", "coaching"]
      },
      "performing-arts": {
        name: "Performing Arts",
        description: "Theater, dance, music performance, acting, stage production, entertainment",
        icon: "🎭",
        accessibilityNote: "Inclusive performance spaces, adaptive techniques, accessible venues",
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism", "dwarfism"],
        interestTags: ["performing arts", "arts", "creative", "entertainment", "media", "drama", "theater"]
      },
      policy: {
        name: "Policy & Governance",
        description: "Policy development, governance, public policy, regulatory affairs, policy analysis",
        icon: "📜",
        accessibilityNote: "Flexible schedules, accessible research tools, inclusive policy development",
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism", "speechLanguage"],
        interestTags: ["policy", "governance", "government", "research", "advocacy", "public service"]
      }
    };
  }

  // Filter domains by interests
  // If "not-sure" is selected, show ALL domains
  filterDomainsByInterests(domains, interests) {
    if (!interests || interests.length === 0 || interests.includes('not-sure')) {
      return domains; // Show all domains if not-sure or no interests
    }

    const filtered = {};
    Object.entries(domains).forEach(([key, domain]) => {
      // Check if domain matches any interest
      const matchesInterest = interests.some(interest => 
        domain.interestTags && domain.interestTags.some(tag => 
          tag.toLowerCase().includes(interest.toLowerCase())
        )
      );
      
      if (matchesInterest) {
        filtered[key] = domain;
      }
    });

    // If filtering resulted in no domains, return all domains to avoid empty results
    return Object.keys(filtered).length > 0 ? filtered : domains;
  }

  // Filter domains by disabilities
  filterDomainsByDisabilities(domains, disabilities) {
    if (!disabilities || disabilities.length === 0) {
      return domains;
    }

    const disabilityKeys = disabilities.map(d => d.disabilityKey || d);
    const filtered = {};

    Object.entries(domains).forEach(([key, domain]) => {
      // Check if domain is compatible with ALL disabilities
      const isCompatible = disabilityKeys.every(disKey => 
        domain.compatibleDisabilities && domain.compatibleDisabilities.includes(disKey)
      );

      if (isCompatible) {
        filtered[key] = domain;
      }
    });

    return Object.keys(filtered).length > 0 ? filtered : domains;
  }
}

// Export singleton instance
window.domainExtractor = new DomainExtractor();

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  window.domainExtractor.initialize();
});
