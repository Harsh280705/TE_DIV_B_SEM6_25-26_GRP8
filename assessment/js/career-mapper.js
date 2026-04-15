// Career Mapping Engine
// Generates personalized career paths based on disability combinations

class CareerMapper {
  constructor() {
    this.domains = this.initializeDomains();
    this.careers = this.initializeCareers();
    this.schemes = this.initializeSchemes();
  }

  // Initialize career domains
  // Aligned with domain.html to ensure 1:1 consistency (all 12 domains)
  initializeDomains() {
    return {
      education: {
        name: "Education & Academia",
        description: "Teaching, training, research, and educational administration roles",
        icon: "🎓",
        accessibilityNote: "Flexible schedules, remote options, assistive tech friendly"
      },
      jobs: {
        name: "Jobs & Employment",
        description: "Corporate roles, government positions, NGO work, and specialized professional careers with disability accommodations",
        icon: "💼",
        accessibilityNote: "Reservation benefits, accessible workplaces, assistive tech support"
      },
      business: {
        name: "Business & Entrepreneurship",
        description: "Startups, small business, franchising, consultancy",
        icon: "📈",
        accessibilityNote: "Flexible hours, remote work, self-paced growth"
      },
      sports: {
        name: "Sports & Adaptive Fitness",
        description: "Paralympic sports, coaching, sports administration, adaptive training",
        icon: "⚽",
        accessibilityNote: "Adaptive equipment, inclusive environments, specialized training"
      },
      entertainment: {
        name: "Entertainment & Media",
        description: "Content creation, voice acting, writing, production",
        icon: "🎬",
        accessibilityNote: "Remote production, voice-first roles, flexible schedules"
      },
      content: {
        name: "Content Creation",
        description: "Blogging, vlogging, podcasting, social media management",
        icon: "✍️",
        accessibilityNote: "Remote work, flexible schedules, multiple formats"
      },
      gaming: {
        name: "Gaming & Esports",
        description: "Game development, esports, streaming, game testing",
        icon: "🎮",
        accessibilityNote: "Remote work, adaptive controllers, accessible game design"
      },
      arts: {
        name: "Creative Arts",
        description: "Visual arts, performing arts, creative writing, design",
        icon: "🎨",
        accessibilityNote: "Adaptive tools, inclusive spaces, diverse expression"
      },
      health: {
        name: "Health & Wellness",
        description: "Counseling, peer support, health advocacy, wellness coaching",
        icon: "❤️",
        accessibilityNote: "Remote counseling, flexible schedules, lived experience valued"
      },
      government: {
        name: "Government & NGO",
        description: "IAS, IPS, IFS, state services with reservation benefits, NGO work, disability advocacy",
        icon: "🏛️",
        accessibilityNote: "Reservation benefits, exam relaxations, accessible workplaces, inclusive culture"
      },
      agriculture: {
        name: "Agriculture & Rural",
        description: "Farming, agricultural services, rural entrepreneurship, agri-tech",
        icon: "🌱",
        accessibilityNote: "Adaptive tools, rural accessibility, flexible schedules"
      },
      freelancing: {
        name: "Freelancing & Gig Economy",
        description: "Remote consulting, online services, freelance projects",
        icon: "💻",
        accessibilityNote: "100% remote, flexible hours, self-managed"
      },
      // NEW DOMAINS - Added to support all career domains
      it: {
        name: "IT & Technology",
        description: "Software development, IT services, system administration, cybersecurity, data science",
        icon: "💻",
        accessibilityNote: "Remote work options, accessible IDEs, screen readers, assistive tech support"
      },
      law: {
        name: "Law & Legal Services",
        description: "Legal practice, advocacy, legal research, paralegal work, legal consulting",
        icon: "⚖️",
        accessibilityNote: "Accessible courtrooms, assistive tech for legal research, flexible schedules"
      },
      media: {
        name: "Media & Communications",
        description: "Journalism, broadcasting, digital media, public relations, media production",
        icon: "📺",
        accessibilityNote: "Remote production, accessible media tools, flexible schedules, captioning support"
      },
      ngo: {
        name: "NGO & Social Impact",
        description: "Non-profit work, social impact, community development, advocacy, humanitarian work",
        icon: "🤝",
        accessibilityNote: "Inclusive work environments, flexible schedules, mission-driven culture"
      },
      research: {
        name: "Research & Development",
        description: "Academic research, scientific research, market research, policy research, data analysis",
        icon: "🔬",
        accessibilityNote: "Flexible schedules, accessible research tools, remote research options"
      },
      "customer-service": {
        name: "Customer Service & Support",
        description: "Customer support, call centers, help desk, client relations, service coordination",
        icon: "📞",
        accessibilityNote: "Remote work options, accessible communication tools, flexible schedules"
      },
      administration: {
        name: "Administration & Management",
        description: "Administrative roles, office management, operations, coordination, executive support",
        icon: "📋",
        accessibilityNote: "Accessible office tools, flexible schedules, assistive tech support"
      },
      training: {
        name: "Training & Development",
        description: "Corporate training, skill development, vocational training, instructional design, coaching",
        icon: "📚",
        accessibilityNote: "Flexible schedules, remote training options, accessible training materials"
      },
      "performing-arts": {
        name: "Performing Arts",
        description: "Theater, dance, music performance, acting, stage production, entertainment",
        icon: "🎭",
        accessibilityNote: "Inclusive performance spaces, adaptive techniques, accessible venues"
      },
      policy: {
        name: "Policy & Governance",
        description: "Policy development, governance, public policy, regulatory affairs, policy analysis",
        icon: "📜",
        accessibilityNote: "Flexible schedules, accessible research tools, inclusive policy development"
      }
    };
  }

  // Initialize career paths with detailed information
  initializeCareers() {
    return {
      // Education Domain Careers
      "school-teacher": {
        title: "School Teacher",
        domain: "education",
        subdomain: "school-teaching",
        description: "Teach students in primary, secondary, or higher secondary schools. Can specialize in subjects like languages, mathematics, science, or social studies.",
        eligibility: {
          education: "Bachelor's degree + B.Ed. or D.Ed.",
          skills: ["Communication", "Patience", "Subject expertise", "Classroom management"],
          certifications: ["B.Ed./D.Ed.", "State Teacher Eligibility Test (TET)"]
        },
        assistiveTools: {
          devices: ["Screen readers", "Magnifiers", "Voice amplifiers"],
          software: ["Text-to-speech", "Screen reading software", "Accessible presentation tools"],
          humanAssistance: ["Teaching assistant", "Note-taker"],
          policySupport: ["UDID card", "Reservation in teaching posts"]
        },
        employmentType: ["Government", "Private", "NGO"],
        growthPath: {
          entry: "Assistant Teacher (₹20,000-35,000/month)",
          mid: "Senior Teacher (₹35,000-60,000/month)",
          senior: "Principal/Education Officer (₹60,000-1,00,000+/month)"
        },
        indiaFeasibility: {
          govtReservation: "4% reservation in government schools",
          examRelaxations: "Extra time, scribe, separate room",
          institutions: ["Government schools", "Private schools", "Special schools"],
          accessibility: "Ramps, accessible classrooms, assistive tech support"
        },
        roadmap: {
          phase1: {
            title: "Foundation",
            steps: [
              "Complete Bachelor's degree in chosen subject",
              "Complete B.Ed. or D.Ed. program",
              "Understand inclusive education principles"
            ]
          },
          phase2: {
            title: "Skill Development",
            steps: [
              "Clear State TET exam",
              "Learn assistive technology for teaching",
              "Complete inclusive education training"
            ]
          },
          phase3: {
            title: "Practice & Exposure",
            steps: [
              "Complete teaching internship",
              "Volunteer at schools",
              "Build teaching portfolio"
            ]
          },
          phase4: {
            title: "Employment",
            steps: [
              "Apply for government/private school positions",
              "Utilize reservation benefits",
              "Request workplace accommodations"
            ]
          },
          expectedOutcome: "Assistant Teacher position",
          timeframe: "2-3 years"
        },
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism", "speechLanguage"]
      },
      
      "online-teacher": {
        title: "Online Teacher / Tutor",
        domain: "education",
        subdomain: "online-teaching",
        description: "Teach students online through video platforms, create educational content, and provide personalized tutoring services.",
        eligibility: {
          education: "Bachelor's degree (subject expertise)",
          skills: ["Online communication", "Content creation", "Time management"],
          certifications: ["Online teaching certification (optional)"]
        },
        assistiveTools: {
          devices: ["Computer/laptop", "Webcam", "Microphone"],
          software: ["Video conferencing tools", "Screen sharing", "Accessible LMS"],
          humanAssistance: ["Technical support"],
          policySupport: ["UDID for business registration benefits"]
        },
        employmentType: ["Self-Employed", "Private"],
        growthPath: {
          entry: "Part-time Tutor (₹15,000-30,000/month)",
          mid: "Full-time Online Teacher (₹30,000-60,000/month)",
          senior: "Educational Content Creator (₹60,000-1,50,000+/month)"
        },
        indiaFeasibility: {
          govtReservation: "N/A (self-employed)",
          examRelaxations: "N/A",
          institutions: ["Online platforms", "Coaching centers", "Self-employed"],
          accessibility: "100% remote, flexible hours, home-based"
        },
        roadmap: {
          phase1: {
            title: "Foundation",
            steps: [
              "Complete education in subject area",
              "Learn online teaching platforms",
              "Set up home teaching space"
            ]
          },
          phase2: {
            title: "Skill Development",
            steps: [
              "Complete online teaching course",
              "Learn video editing basics",
              "Practice with demo sessions"
            ]
          },
          phase3: {
            title: "Practice & Exposure",
            steps: [
              "Start with free tutoring",
              "Create educational content",
              "Build student testimonials"
            ]
          },
          phase4: {
            title: "Employment/Setup",
            steps: [
              "Join online teaching platforms",
              "Set up own tutoring business",
              "Market services online"
            ]
          },
          expectedOutcome: "Established online teaching practice",
          timeframe: "6-12 months"
        },
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism", "speechLanguage", "dwarfism"]
      },

      // IT Domain Careers
      "software-developer": {
        title: "Software Developer",
        domain: "jobs", // IT jobs mapped to Jobs & Employment domain
        subdomain: "software-development",
        description: "Design, develop, and maintain software applications. Can work remotely with assistive technology support.",
        eligibility: {
          education: "B.Tech/B.E./MCA or equivalent",
          skills: ["Programming", "Problem-solving", "Logical thinking"],
          certifications: ["Industry certifications (optional)"]
        },
        assistiveTools: {
          devices: ["Screen readers", "Braille displays", "Ergonomic keyboards"],
          software: ["Accessible IDEs", "Screen reading software", "Voice coding tools"],
          humanAssistance: ["Code review support"],
          policySupport: ["UDID card", "Reservation in IT companies"]
        },
        employmentType: ["Government", "Private", "Self-Employed"],
        growthPath: {
          entry: "Junior Developer (₹25,000-45,000/month)",
          mid: "Senior Developer (₹50,000-90,000/month)",
          senior: "Tech Lead/Architect (₹90,000-1,80,000+/month)"
        },
        indiaFeasibility: {
          govtReservation: "4% reservation in government IT",
          examRelaxations: "Extra time, assistive tech",
          institutions: ["IT companies", "Government IT departments", "Startups"],
          accessibility: "Remote work options, accessible IDEs, assistive tech"
        },
        roadmap: {
          phase1: {
            title: "Foundation",
            steps: [
              "Learn programming fundamentals",
              "Choose programming language",
              "Understand software development lifecycle"
            ]
          },
          phase2: {
            title: "Skill Development",
            steps: [
              "Build projects and portfolio",
              "Learn frameworks and tools",
              "Master assistive coding tools"
            ]
          },
          phase3: {
            title: "Practice & Exposure",
            steps: [
              "Contribute to open source",
              "Complete internships",
              "Build GitHub portfolio"
            ]
          },
          phase4: {
            title: "Employment",
            steps: [
              "Apply for developer positions",
              "Prepare for technical interviews",
              "Request workplace accommodations"
            ]
          },
          expectedOutcome: "Junior Developer position",
          timeframe: "1-2 years"
        },
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "autism", "mentalIllness"]
      },

      // Media Domain Careers
      "content-writer": {
        title: "Content Writer",
        domain: "content",
        subdomain: "writing",
        description: "Create written content for websites, blogs, marketing materials, and publications. Can work remotely.",
        eligibility: {
          education: "Bachelor's degree (any stream)",
          skills: ["Writing", "Research", "Grammar", "SEO"],
          certifications: ["Content writing certification (optional)"]
        },
        assistiveTools: {
          devices: ["Computer", "Screen readers", "Voice-to-text"],
          software: ["Word processors", "Grammar checkers", "Screen readers"],
          humanAssistance: ["Editor support"],
          policySupport: ["UDID for business benefits"]
        },
        employmentType: ["Private", "Self-Employed", "NGO"],
        growthPath: {
          entry: "Junior Writer (₹15,000-25,000/month)",
          mid: "Content Writer (₹25,000-50,000/month)",
          senior: "Content Manager (₹50,000-1,00,000+/month)"
        },
        indiaFeasibility: {
          govtReservation: "N/A",
          examRelaxations: "N/A",
          institutions: ["Content agencies", "Media companies", "Freelance platforms"],
          accessibility: "100% remote, flexible hours, assistive tech"
        },
        roadmap: {
          phase1: {
            title: "Foundation",
            steps: [
              "Improve writing skills",
              "Learn grammar and style",
              "Read diverse content"
            ]
          },
          phase2: {
            title: "Skill Development",
            steps: [
              "Learn SEO basics",
              "Practice different writing styles",
              "Build writing portfolio"
            ]
          },
          phase3: {
            title: "Practice & Exposure",
            steps: [
              "Start blog or website",
              "Take small freelance projects",
              "Get client testimonials"
            ]
          },
          phase4: {
            title: "Employment/Setup",
            steps: [
              "Apply to content agencies",
              "Join freelance platforms",
              "Build client base"
            ]
          },
          expectedOutcome: "Established content writing career",
          timeframe: "6-12 months"
        },
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism", "speechLanguage"]
      },

      "voice-actor": {
        title: "Voice Actor / Dubbing Artist",
        domain: "entertainment", // Media mapped to Entertainment & Media domain
        subdomain: "voice-work",
        description: "Provide voice performances for animation, audiobooks, commercials, dubbing, and video games. Can work from home studio.",
        eligibility: {
          education: "No specific requirement",
          skills: ["Voice modulation", "Character voices", "Emotional expression"],
          certifications: ["Voice acting course (optional)"]
        },
        assistiveTools: {
          devices: ["Quality microphone", "Soundproofing", "Audio interface"],
          software: ["Audio editing software", "Recording software"],
          humanAssistance: ["Director guidance"],
          policySupport: ["UDID for business registration"]
        },
        employmentType: ["Self-Employed", "Private"],
        growthPath: {
          entry: "Beginner Voice Actor (₹8,000-20,000/month)",
          mid: "Professional Voice Actor (₹25,000-60,000/month)",
          senior: "Established Voice Artist (₹75,000-2,00,000+/month)"
        },
        indiaFeasibility: {
          govtReservation: "N/A",
          examRelaxations: "N/A",
          institutions: ["Production houses", "Dubbing studios", "Freelance platforms"],
          accessibility: "Home studio, flexible hours, voice-first role"
        },
        roadmap: {
          phase1: {
            title: "Foundation",
            steps: [
              "Practice voice modulation",
              "Study character voices",
              "Learn voice acting basics"
            ]
          },
          phase2: {
            title: "Skill Development",
            steps: [
              "Create demo reel",
              "Set up home studio",
              "Learn audio editing"
            ]
          },
          phase3: {
            title: "Practice & Exposure",
            steps: [
              "Record sample projects",
              "Join voice acting communities",
              "Get feedback from professionals"
            ]
          },
          phase4: {
            title: "Employment/Setup",
            steps: [
              "Apply to dubbing studios",
              "Join freelance platforms",
              "Build client network"
            ]
          },
          expectedOutcome: "Working voice actor",
          timeframe: "6-12 months"
        },
        compatibleDisabilities: ["blindness", "lowVision", "locomotor", "mentalIllness", "autism", "dwarfism"]
      },

      // Government Domain Careers
      "civil-services": {
        title: "Civil Services (IAS/IPS/IFS)",
        domain: "government",
        subdomain: "civil-services",
        description: "Serve in Indian Administrative Service, Indian Police Service, or Indian Foreign Service. Work in policy-making, administration, and public service.",
        eligibility: {
          education: "Bachelor's degree in any stream",
          skills: ["Leadership", "Analytical thinking", "Communication", "Decision-making"],
          certifications: ["UPSC Civil Services Examination"]
        },
        assistiveTools: {
          devices: ["Screen readers", "Braille displays", "Ergonomic furniture"],
          software: ["Accessible exam software", "Screen reading software"],
          humanAssistance: ["Scribe for exams", "Reader assistance"],
          policySupport: ["4% reservation", "Extra time in exams", "Separate room"]
        },
        employmentType: ["Government"],
        growthPath: {
          entry: "Probationary Officer (₹56,100-1,32,000/month)",
          mid: "Deputy Secretary (₹1,31,100-2,16,600/month)",
          senior: "Secretary/Chief Secretary (₹2,25,000+/month)"
        },
        indiaFeasibility: {
          govtReservation: "4% reservation for PwD in all civil services",
          examRelaxations: "Extra time (20 minutes per hour), scribe, separate room",
          institutions: ["UPSC", "State PSC", "Government departments"],
          accessibility: "Accessible offices, assistive tech support, reasonable accommodations"
        },
        roadmap: {
          phase1: {
            title: "Foundation",
            steps: [
              "Complete Bachelor's degree",
              "Understand UPSC exam pattern",
              "Study current affairs and general knowledge"
            ]
          },
          phase2: {
            title: "Skill Development",
            steps: [
              "Prepare for UPSC prelims and mains",
              "Practice answer writing",
              "Learn assistive technology for exams"
            ]
          },
          phase3: {
            title: "Practice & Exposure",
            steps: [
              "Take mock tests",
              "Join coaching (optional)",
              "Apply for exam accommodations"
            ]
          },
          phase4: {
            title: "Employment",
            steps: [
              "Clear UPSC examination",
              "Complete training at LBSNAA",
              "Join assigned cadre"
            ]
          },
          expectedOutcome: "Civil Services Officer",
          timeframe: "2-3 years of preparation"
        },
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism"]
      },

      // Freelancing Domain Careers
      "freelance-consultant": {
        title: "Freelance Consultant",
        domain: "freelancing",
        subdomain: "consulting",
        description: "Provide expert advice and consulting services in your area of expertise. Work independently with flexible hours and remote options.",
        eligibility: {
          education: "Bachelor's degree or equivalent experience",
          skills: ["Expertise in field", "Communication", "Project management", "Client relations"],
          certifications: ["Industry certifications (optional)"]
        },
        assistiveTools: {
          devices: ["Computer", "Screen readers", "Video conferencing equipment"],
          software: ["Project management tools", "Communication platforms", "Screen readers"],
          humanAssistance: ["Virtual assistant (optional)"],
          policySupport: ["UDID for business registration benefits"]
        },
        employmentType: ["Self-Employed"],
        growthPath: {
          entry: "Junior Consultant (₹20,000-40,000/month)",
          mid: "Senior Consultant (₹50,000-1,00,000/month)",
          senior: "Expert Consultant (₹1,00,000-3,00,000+/month)"
        },
        indiaFeasibility: {
          govtReservation: "N/A (self-employed)",
          examRelaxations: "N/A",
          institutions: ["Freelance platforms", "Direct clients", "Consulting firms"],
          accessibility: "100% remote, flexible hours, self-managed workspace"
        },
        roadmap: {
          phase1: {
            title: "Foundation",
            steps: [
              "Identify your area of expertise",
              "Build knowledge and skills",
              "Understand consulting business model"
            ]
          },
          phase2: {
            title: "Skill Development",
            steps: [
              "Get certifications (if needed)",
              "Learn project management",
              "Develop communication skills"
            ]
          },
          phase3: {
            title: "Practice & Exposure",
            steps: [
              "Start with small projects",
              "Build client testimonials",
              "Create professional portfolio"
            ]
          },
          phase4: {
            title: "Employment/Setup",
            steps: [
              "Register as consultant",
              "Join freelance platforms",
              "Build client network"
            ]
          },
          expectedOutcome: "Established consulting practice",
          timeframe: "6-18 months"
        },
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism", "speechLanguage", "dwarfism"]
      },

      // Finance Domain Careers
      "accountant": {
        title: "Accountant / Bookkeeper",
        domain: "jobs",
        subdomain: "accounting",
        description: "Manage financial records, prepare accounts, handle tax filings, and provide financial advice. Can work remotely or in office.",
        eligibility: {
          education: "B.Com/M.Com/CA/CMA",
          skills: ["Numerical ability", "Attention to detail", "Accounting software", "Tax knowledge"],
          certifications: ["CA/CMA (optional)", "Tally certification"]
        },
        assistiveTools: {
          devices: ["Computer", "Screen readers", "Braille displays"],
          software: ["Tally", "Excel", "Screen reading software", "Voice-to-text"],
          humanAssistance: ["Reader for documents"],
          policySupport: ["UDID card", "Reservation in government accounting"]
        },
        employmentType: ["Government", "Private", "Self-Employed"],
        growthPath: {
          entry: "Junior Accountant (₹18,000-30,000/month)",
          mid: "Senior Accountant (₹35,000-60,000/month)",
          senior: "Chief Accountant/CFO (₹70,000-1,50,000+/month)"
        },
        indiaFeasibility: {
          govtReservation: "4% reservation in government accounting",
          examRelaxations: "Extra time, scribe, separate room",
          institutions: ["CA firms", "Companies", "Government departments"],
          accessibility: "Remote work options, accessible accounting software, screen readers"
        },
        roadmap: {
          phase1: {
            title: "Foundation",
            steps: [
              "Complete commerce degree",
              "Learn accounting fundamentals",
              "Understand tax laws"
            ]
          },
          phase2: {
            title: "Skill Development",
            steps: [
              "Learn Tally and accounting software",
              "Master assistive tech for accounting",
              "Get Tally certification"
            ]
          },
          phase3: {
            title: "Practice & Exposure",
            steps: [
              "Complete accounting internship",
              "Practice with real accounts",
              "Build portfolio"
            ]
          },
          phase4: {
            title: "Employment",
            steps: [
              "Apply for accounting positions",
              "Utilize reservation benefits",
              "Request workplace accommodations"
            ]
          },
          expectedOutcome: "Junior Accountant position",
          timeframe: "1-2 years"
        },
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism"]
      },

      // ============= EXPANDED CAREERS - ARTS & CREATIVE DOMAIN =============
      "graphic-designer": {
        title: "Graphic Designer",
        domain: "arts",
        subdomain: "visual-design",
        description: "Create visual concepts using computer software or by hand to communicate ideas that inspire, inform, and captivate consumers.",
        eligibility: {
          education: "Bachelor's in Fine Arts, Graphic Design, or equivalent",
          skills: ["Creativity", "Design software proficiency", "Color theory", "Typography"],
          certifications: ["Adobe Certified Professional (optional)"]
        },
        assistiveTools: {
          devices: ["Graphics tablet", "Ergonomic mouse", "High-resolution monitor"],
          software: ["Adobe Creative Suite", "Screen magnifiers", "Voice-controlled design tools"],
          humanAssistance: ["Design assistant for detailed work"],
          policySupport: ["UDID card", "Business registration benefits"]
        },
        employmentType: ["Private", "Self-Employed", "Freelance"],
        growthPath: {
          entry: "Junior Designer (₹15,000-30,000/month)",
          mid: "Senior Designer (₹35,000-70,000/month)",
          senior: "Creative Director (₹80,000-1,50,000+/month)"
        },
        indiaFeasibility: {
          govtReservation: "N/A (mostly private sector)",
          examRelaxations: "N/A",
          institutions: ["Design agencies", "Advertising companies", "Freelance platforms"],
          accessibility: "Remote work options, flexible hours, assistive design tools"
        },
        roadmap: {
          phase1: {
            title: "Foundation",
            steps: [
              "Learn design fundamentals",
              "Study color theory and typography",
              "Build basic design skills"
            ]
          },
          phase2: {
            title: "Skill Development",
            steps: [
              "Master Adobe Creative Suite",
              "Learn accessible design tools",
              "Build design portfolio"
            ]
          },
          phase3: {
            title: "Practice & Exposure",
            steps: [
              "Take freelance projects",
              "Participate in design challenges",
              "Get client testimonials"
            ]
          },
          phase4: {
            title: "Employment/Setup",
            steps: [
              "Join design agencies",
              "Start freelance business",
              "Market design services online"
            ]
          },
          expectedOutcome: "Working graphic designer",
          timeframe: "1-2 years"
        },
        compatibleDisabilities: ["hearingImpairment", "locomotor", "mentalIllness", "autism", "dwarfism", "cerebralPalsy"]
      },

      "musician": {
        title: "Musician / Music Producer",
        domain: "arts",
        subdomain: "performing-arts",
        description: "Create, perform, and produce music across various genres. Can work as performer, composer, or music producer.",
        eligibility: {
          education: "Music degree (optional), natural talent and training",
          skills: ["Musical ability", "Instrument proficiency", "Audio editing", "Music theory"],
          certifications: ["Music certification from recognized institutions (optional)"]
        },
        assistiveTools: {
          devices: ["Adapted musical instruments", "MIDI controllers", "Audio interfaces"],
          software: ["Digital Audio Workstations", "Music notation software", "Accessible DAWs"],
          humanAssistance: ["Technical assistant for setup"],
          policySupport: ["UDID card", "Cultural grants"]
        },
        employmentType: ["Self-Employed", "Private", "Freelance"],
        growthPath: {
          entry: "Session Musician (₹10,000-25,000/month)",
          mid: "Professional Musician (₹30,000-80,000/month)",
          senior: "Established Artist/Producer (₹1,00,000-5,00,000+/month)"
        },
        indiaFeasibility: {
          govtReservation: "N/A",
          examRelaxations: "N/A",
          institutions: ["Music studios", "Recording labels", "Independent platforms"],
          accessibility: "Home studio setup, flexible schedules, adaptive instruments"
        },
        roadmap: {
          phase1: {
            title: "Foundation",
            steps: [
              "Learn music fundamentals",
              "Master an instrument",
              "Study music theory"
            ]
          },
          phase2: {
            title: "Skill Development",
            steps: [
              "Learn music production software",
              "Practice composition",
              "Build music portfolio"
            ]
          },
          phase3: {
            title: "Practice & Exposure",
            steps: [
              "Perform at local venues",
              "Release music online",
              "Collaborate with artists"
            ]
          },
          phase4: {
            title: "Career Launch",
            steps: [
              "Build online presence",
              "Get music label deals",
              "Teach music as additional income"
            ]
          },
          expectedOutcome: "Working musician/producer",
          timeframe: "2-4 years"
        },
        compatibleDisabilities: ["blindness", "lowVision", "locomotor", "mentalIllness", "autism", "cerebralPalsy", "dwarfism"]
      },

      // ============= BUSINESS & ENTREPRENEURSHIP DOMAIN =============
      "ecommerce-seller": {
        title: "E-commerce Seller / Online Store Owner",
        domain: "business",
        subdomain: "e-commerce",
        description: "Sell products online through platforms like Amazon, Flipkart, or own website. Manage inventory, marketing, and customer service.",
        eligibility: {
          education: "No specific requirement (business knowledge helpful)",
          skills: ["Digital marketing", "Product sourcing", "Customer service", "Basic accounting"],
          certifications: ["Digital marketing certification (optional)"]
        },
        assistiveTools: {
          devices: ["Computer/smartphone", "Screen readers", "Voice assistants"],
          software: ["E-commerce platforms", "Inventory management", "Accessible analytics tools"],
          humanAssistance: ["Packaging assistant", "Delivery coordination support"],
          policySupport: ["UDID card", "MSME registration benefits", "Startup India schemes"]
        },
        employmentType: ["Self-Employed"],
        growthPath: {
          entry: "Home-based Seller (₹10,000-30,000/month)",
          mid: "Established Seller (₹40,000-1,00,000/month)",
          senior: "E-commerce Business Owner (₹1,00,000-5,00,000+/month)"
        },
        indiaFeasibility: {
          govtReservation: "N/A",
          examRelaxations: "N/A",
          institutions: ["Amazon", "Flipkart", "Meesho", "Own website"],
          accessibility: "100% remote, home-based, flexible hours, accessible platforms"
        },
        roadmap: {
          phase1: {
            title: "Foundation",
            steps: [
              "Research profitable products",
              "Study e-commerce platforms",
              "Learn basic digital marketing"
            ]
          },
          phase2: {
            title: "Setup",
            steps: [
              "Register as seller on platforms",
              "Source products/create inventory",
              "Set up payment and shipping"
            ]
          },
          phase3: {
            title: "Launch & Growth",
            steps: [
              "List products with good descriptions",
              "Run promotional campaigns",
              "Build customer reviews"
            ]
          },
          phase4: {
            title: "Scale",
            steps: [
              "Expand product range",
              "Optimize operations",
              "Consider own website/brand"
            ]
          },
          expectedOutcome: "Profitable online store",
          timeframe: "6-12 months"
        },
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism", "cerebralPalsy", "dwarfism", "speechLanguage"]
      },

      "business-consultant": {
        title: "Business Consultant / Advisor",
        domain: "business",
        subdomain: "consulting",
        description: "Provide expert advice to businesses on strategy, operations, marketing, or finance. Work independently or with consulting firms.",
        eligibility: {
          education: "MBA or relevant business degree",
          skills: ["Business analysis", "Strategic thinking", "Communication", "Problem-solving"],
          certifications: ["Industry certifications (optional)"]
        },
        assistiveTools: {
          devices: ["Laptop", "Video conferencing equipment", "Screen readers"],
          software: ["Business analytics tools", "Presentation software", "Accessible collaboration tools"],
          humanAssistance: ["Research assistant (optional)"],
          policySupport: ["UDID card", "Business registration benefits"]
        },
        employmentType: ["Self-Employed", "Private"],
        growthPath: {
          entry: "Junior Consultant (₹30,000-60,000/month)",
          mid: "Senior Consultant (₹70,000-1,50,000/month)",
          senior: "Partner/Principal Consultant (₹2,00,000-5,00,000+/month)"
        },
        indiaFeasibility: {
          govtReservation: "N/A",
          examRelaxations: "N/A",
          institutions: ["Consulting firms", "Independent practice", "Corporate clients"],
          accessibility: "Remote consulting available, flexible schedules, virtual meetings"
        },
        roadmap: {
          phase1: {
            title: "Foundation",
            steps: [
              "Complete business education",
              "Gain industry experience",
              "Develop expertise in specific domain"
            ]
          },
          phase2: {
            title: "Skill Development",
            steps: [
              "Learn business frameworks",
              "Master presentation skills",
              "Build analytical capabilities"
            ]
          },
          phase3: {
            title: "Practice",
            steps: [
              "Start with small consulting projects",
              "Build case studies",
              "Network with businesses"
            ]
          },
          phase4: {
            title: "Establishment",
            steps: [
              "Join consulting firm or start practice",
              "Build client portfolio",
              "Establish reputation"
            ]
          },
          expectedOutcome: "Working business consultant",
          timeframe: "2-4 years"
        },
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism", "speechLanguage", "dwarfism"]
      },

      // ============= SPORTS & FITNESS DOMAIN =============
      "sports-coach": {
        title: "Sports Coach / Adaptive Sports Trainer",
        domain: "sports",
        subdomain: "coaching",
        description: "Train athletes in various sports with focus on adaptive sports for people with disabilities. Can work with schools, clubs, or independently.",
        eligibility: {
          education: "Sports science degree or coaching certification",
          skills: ["Sports knowledge", "Training techniques", "Motivation", "First aid"],
          certifications: ["Coaching certification", "Adaptive sports certification"]
        },
        assistiveTools: {
          devices: ["Training equipment", "Communication devices", "Mobility aids"],
          software: ["Training apps", "Performance tracking software"],
          humanAssistance: ["Assistant coach"],
          policySupport: ["UDID card", "Sports authority recognition"]
        },
        employmentType: ["Government", "Private", "Self-Employed"],
        growthPath: {
          entry: "Assistant Coach (₹15,000-30,000/month)",
          mid: "Head Coach (₹35,000-70,000/month)",
          senior: "National Level Coach (₹80,000-2,00,000+/month)"
        },
        indiaFeasibility: {
          govtReservation: "4% in government sports institutions",
          examRelaxations: "Extra time, assistive devices in practical tests",
          institutions: ["Schools", "Sports academies", "Paralympic committees", "Private clubs"],
          accessibility: "Adapted coaching methods, flexible schedules, accessible facilities"
        },
        roadmap: {
          phase1: {
            title: "Foundation",
            steps: [
              "Get sports education/certification",
              "Learn adaptive sports techniques",
              "Understand sports psychology"
            ]
          },
          phase2: {
            title: "Skill Development",
            steps: [
              "Get coaching certification",
              "Specialize in specific sport",
              "Learn first aid and safety"
            ]
          },
          phase3: {
            title: "Experience",
            steps: [
              "Assist experienced coaches",
              "Volunteer at sports events",
              "Build coaching portfolio"
            ]
          },
          phase4: {
            title: "Career Launch",
            steps: [
              "Apply for coaching positions",
              "Start private coaching",
              "Join sports organizations"
            ]
          },
          expectedOutcome: "Working sports coach",
          timeframe: "1-2 years"
        },
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "dwarfism", "cerebralPalsy"]
      },

      // ============= HEALTH & WELLNESS DOMAIN =============
      "counselor": {
        title: "Mental Health Counselor / Therapist",
        domain: "health",
        subdomain: "mental-health",
        description: "Provide counseling and therapy services to individuals dealing with mental health issues, trauma, or life challenges.",
        eligibility: {
          education: "Master's in Psychology, Counseling, or Social Work",
          skills: ["Active listening", "Empathy", "Communication", "Problem-solving"],
          certifications: ["RCI registration", "Counseling certification"]
        },
        assistiveTools: {
          devices: ["Video conferencing equipment", "Screen readers", "Recording devices"],
          software: ["Teletherapy platforms", "Practice management software", "Accessible documentation tools"],
          humanAssistance: ["Sign language interpreter (if needed)"],
          policySupport: ["UDID card", "Professional registration benefits"]
        },
        employmentType: ["Government", "Private", "Self-Employed", "NGO"],
        growthPath: {
          entry: "Junior Counselor (₹20,000-35,000/month)",
          mid: "Clinical Psychologist (₹40,000-80,000/month)",
          senior: "Senior Therapist/Practice Owner (₹1,00,000-2,50,000+/month)"
        },
        indiaFeasibility: {
          govtReservation: "4% in government hospitals and institutions",
          examRelaxations: "Extra time, scribe, separate room",
          institutions: ["Hospitals", "Clinics", "NGOs", "Private practice", "Schools"],
          accessibility: "Remote counseling, flexible hours, accessible practice spaces"
        },
        roadmap: {
          phase1: {
            title: "Foundation",
            steps: [
              "Complete psychology/counseling degree",
              "Learn counseling theories",
              "Understand mental health conditions"
            ]
          },
          phase2: {
            title: "Skill Development",
            steps: [
              "Complete Master's degree",
              "Get RCI registration",
              "Learn therapeutic techniques"
            ]
          },
          phase3: {
            title: "Practice",
            steps: [
              "Complete supervised internship",
              "Work under senior therapist",
              "Build case experience"
            ]
          },
          phase4: {
            title: "Career Launch",
            steps: [
              "Join hospital/clinic/NGO",
              "Start private practice",
              "Build client base"
            ]
          },
          expectedOutcome: "Licensed counselor/therapist",
          timeframe: "3-5 years"
        },
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism", "speechLanguage", "dwarfism"]
      },

      // ============= GAMING & ESPORTS DOMAIN =============
      "game-developer": {
        title: "Game Developer",
        domain: "gaming",
        subdomain: "game-development",
        description: "Design and develop video games for PC, mobile, or consoles. Work on game mechanics, programming, and testing.",
        eligibility: {
          education: "B.Tech/B.E. in Computer Science or Game Development",
          skills: ["Programming", "Game design", "Problem-solving", "Creativity"],
          certifications: ["Unity/Unreal certification (optional)"]
        },
        assistiveTools: {
          devices: ["Gaming PC", "Screen readers", "Ergonomic keyboards"],
          software: ["Game engines (Unity, Unreal)", "Accessible IDEs", "Version control"],
          humanAssistance: ["QA tester"],
          policySupport: ["UDID card", "Startup benefits"]
        },
        employmentType: ["Private", "Self-Employed"],
        growthPath: {
          entry: "Junior Developer (₹25,000-45,000/month)",
          mid: "Game Developer (₹50,000-1,00,000/month)",
          senior: "Lead Developer/Studio Owner (₹1,20,000-3,00,000+/month)"
        },
        indiaFeasibility: {
          govtReservation: "N/A",
          examRelaxations: "N/A",
          institutions: ["Game studios", "Indie development", "Freelance platforms"],
          accessibility: "Remote work, flexible hours, accessible development tools"
        },
        roadmap: {
          phase1: {
            title: "Foundation",
            steps: [
              "Learn programming fundamentals",
              "Study game design principles",
              "Understand game engines"
            ]
          },
          phase2: {
            title: "Skill Development",
            steps: [
              "Master Unity or Unreal Engine",
              "Learn game programming patterns",
              "Build small game projects"
            ]
          },
          phase3: {
            title: "Portfolio Building",
            steps: [
              "Create complete game projects",
              "Participate in game jams",
              "Publish games on platforms"
            ]
          },
          phase4: {
            title: "Career Launch",
            steps: [
              "Join game studio",
              "Start indie game development",
              "Build gaming career"
            ]
          },
          expectedOutcome: "Working game developer",
          timeframe: "2-3 years"
        },
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "autism", "mentalIllness", "cerebralPalsy"]
      },

      "esports-player": {
        title: "Professional Esports Player / Streamer",
        domain: "gaming",
        subdomain: "esports",
        description: "Compete professionally in esports tournaments or stream gameplay online for audience. Build following and monetize through sponsorships.",
        eligibility: {
          education: "No specific requirement",
          skills: ["Gaming expertise", "Strategic thinking", "Communication", "Entertainment"],
          certifications: ["N/A"]
        },
        assistiveTools: {
          devices: ["Gaming PC/console", "Adaptive controllers", "Streaming equipment"],
          software: ["Streaming software", "Voice chat", "Accessible gaming peripherals"],
          humanAssistance: ["Manager/agent (at professional level)"],
          policySupport: ["UDID card", "Accessible gaming equipment support"]
        },
        employmentType: ["Self-Employed"],
        growthPath: {
          entry: "Amateur Player (₹5,000-20,000/month)",
          mid: "Professional Player/Streamer (₹30,000-1,00,000/month)",
          senior: "Top Esports Pro/Influencer (₹1,00,000-10,00,000+/month)"
        },
        indiaFeasibility: {
          govtReservation: "N/A",
          examRelaxations: "N/A",
          institutions: ["Esports organizations", "Streaming platforms (YouTube, Twitch)", "Tournament organizers"],
          accessibility: "Home-based, flexible hours, adaptive gaming technology"
        },
        roadmap: {
          phase1: {
            title: "Foundation",
            steps: [
              "Choose gaming genre/game",
              "Practice extensively",
              "Learn game strategies"
            ]
          },
          phase2: {
            title: "Skill Development",
            steps: [
              "Reach competitive rank",
              "Learn streaming/content creation",
              "Build gaming setup"
            ]
          },
          phase3: {
            title: "Audience Building",
            steps: [
              "Start streaming regularly",
              "Engage with community",
              "Participate in tournaments"
            ]
          },
          phase4: {
            title: "Monetization",
            steps: [
              "Get sponsorships/partnerships",
              "Join esports team",
              "Build brand and following"
            ]
          },
          expectedOutcome: "Professional gamer/streamer",
          timeframe: "1-3 years"
        },
        compatibleDisabilities: ["blindness", "lowVision", "hearingImpairment", "locomotor", "mentalIllness", "autism", "speechLanguage", "dwarfism", "cerebralPalsy"]
      },

      // ============= AGRICULTURE DOMAIN =============
      "organic-farmer": {
        title: "Organic Farmer / Agricultural Entrepreneur",
        domain: "agriculture",
        subdomain: "organic-farming",
        description: "Grow organic crops and sell directly to consumers or through organic markets. Can also provide consulting on sustainable farming.",
        eligibility: {
          education: "Agricultural degree (helpful but not required)",
          skills: ["Farming knowledge", "Business management", "Marketing", "Sustainability practices"],
          certifications: ["Organic certification"]
        },
        assistiveTools: {
          devices: ["Farming equipment", "Mobility aids", "Automated irrigation systems"],
          software: ["Farm management apps", "Weather forecasting tools"],
          humanAssistance: ["Farm workers", "Agricultural advisor"],
          policySupport: ["UDID card", "Agricultural loans", "Government farming schemes"]
        },
        employmentType: ["Self-Employed"],
        growthPath: {
          entry: "Small-scale Farmer (₹15,000-35,000/month)",
          mid: "Established Farmer (₹40,000-1,00,000/month)",
          senior: "Agricultural Entrepreneur (₹1,00,000-3,00,000+/month)"
        },
        indiaFeasibility: {
          govtReservation: "N/A",
          examRelaxations: "N/A",
          institutions: ["Organic markets", "Direct to consumer", "Agricultural cooperatives"],
          accessibility: "Adapted farming techniques, mechanization support, accessible land"
        },
        roadmap: {
          phase1: {
            title: "Foundation",
            steps: [
              "Learn organic farming principles",
              "Acquire or lease land",
              "Study soil and crop management"
            ]
          },
          phase2: {
            title: "Setup",
            steps: [
              "Prepare land for organic farming",
              "Get organic certification",
              "Set up irrigation and infrastructure"
            ]
          },
          phase3: {
            title: "Production",
            steps: [
              "Start crop cultivation",
              "Implement sustainable practices",
              "Build supply chain"
            ]
          },
          phase4: {
            title: "Marketing & Growth",
            steps: [
              "Connect with organic markets",
              "Build brand and customer base",
              "Scale operations"
            ]
          },
          expectedOutcome: "Successful organic farm",
          timeframe: "2-4 years"
        },
        compatibleDisabilities: ["hearingImpairment", "locomotor", "mentalIllness", "dwarfism", "lowVision"]
      },

      // ============= ENTERTAINMENT & MEDIA DOMAIN =============
      "video-editor": {
        title: "Video Editor / Content Producer",
        domain: "entertainment",
        subdomain: "video-production",
        description: "Edit videos for films, TV shows, YouTube, or corporate content. Work with raw footage to create polished final products.",
        eligibility: {
          education: "Film/media degree or equivalent experience",
          skills: ["Video editing", "Storytelling", "Technical proficiency", "Creativity"],
          certifications: ["Adobe Premiere/Final Cut Pro certification (optional)"]
        },
        assistiveTools: {
          devices: ["High-performance computer", "Large monitors", "Ergonomic setup"],
          software: ["Adobe Premiere Pro", "Final Cut Pro", "DaVinci Resolve", "Accessible editing tools"],
          humanAssistance: ["Assistant editor for detailed work"],
          policySupport: ["UDID card", "Business registration benefits"]
        },
        employmentType: ["Private", "Self-Employed", "Freelance"],
        growthPath: {
          entry: "Junior Editor (₹18,000-35,000/month)",
          mid: "Senior Editor (₹40,000-80,000/month)",
          senior: "Lead Editor/Post-Production Head (₹1,00,000-2,50,000+/month)"
        },
        indiaFeasibility: {
          govtReservation: "N/A",
          examRelaxations: "N/A",
          institutions: ["Production houses", "Media companies", "Freelance platforms", "YouTube creators"],
          accessibility: "Remote work, flexible hours, accessible editing software"
        },
        roadmap: {
          phase1: {
            title: "Foundation",
            steps: [
              "Learn video editing fundamentals",
              "Study visual storytelling",
              "Understand editing workflows"
            ]
          },
          phase2: {
            title: "Skill Development",
            steps: [
              "Master editing software",
              "Learn color grading and audio",
              "Build editing portfolio"
            ]
          },
          phase3: {
            title: "Portfolio Building",
            steps: [
              "Edit sample projects",
              "Take freelance work",
              "Create showreel"
            ]
          },
          phase4: {
            title: "Career Launch",
            steps: [
              "Join production company",
              "Start freelance editing business",
              "Build client network"
            ]
          },
          expectedOutcome: "Working video editor",
          timeframe: "1-2 years"
        },
        compatibleDisabilities: ["hearingImpairment", "locomotor", "mentalIllness", "autism", "dwarfism", "cerebralPalsy"]
      },

      "podcast-host": {
        title: "Podcast Host / Audio Content Creator",
        domain: "entertainment",
        subdomain: "audio-content",
        description: "Create and host podcast shows on topics of interest. Monetize through sponsorships, ads, and listener support.",
        eligibility: {
          education: "No specific requirement",
          skills: ["Communication", "Research", "Audio editing", "Content creation"],
          certifications: ["N/A"]
        },
        assistiveTools: {
          devices: ["Quality microphone", "Audio interface", "Headphones"],
          software: ["Audio editing software", "Recording software", "Podcast hosting platforms"],
          humanAssistance: ["Producer/editor (optional)"],
          policySupport: ["UDID card", "Content creator benefits"]
        },
        employmentType: ["Self-Employed"],
        growthPath: {
          entry: "New Podcaster (₹0-10,000/month)",
          mid: "Established Podcaster (₹15,000-50,000/month)",
          senior: "Popular Podcast Host (₹60,000-2,00,000+/month)"
        },
        indiaFeasibility: {
          govtReservation: "N/A",
          examRelaxations: "N/A",
          institutions: ["Podcast platforms (Spotify, Apple Podcasts)", "YouTube", "Independent hosting"],
          accessibility: "Home studio, flexible schedules, voice-focused work"
        },
        roadmap: {
          phase1: {
            title: "Foundation",
            steps: [
              "Choose podcast niche/topic",
              "Learn podcast basics",
              "Study successful podcasts"
            ]
          },
          phase2: {
            title: "Setup",
            steps: [
              "Set up home recording studio",
              "Learn audio editing",
              "Create podcast branding"
            ]
          },
          phase3: {
            title: "Launch",
            steps: [
              "Record and publish episodes consistently",
              "Promote on social media",
              "Build listener base"
            ]
          },
          phase4: {
            title: "Monetization",
            steps: [
              "Get sponsorships",
              "Join podcast networks",
              "Offer premium content"
            ]
          },
          expectedOutcome: "Successful podcast show",
          timeframe: "6-18 months"
        },
        compatibleDisabilities: ["blindness", "lowVision", "locomotor", "mentalIllness", "autism", "dwarfism", "cerebralPalsy"]
      }
    };
  }

  // Initialize government schemes
  initializeSchemes() {
    return {
      central: [
        {
          name: "ADIP Scheme (Assistance to Disabled Persons)",
          purpose: "Free assistive devices and aids",
          benefit: "Talking books, braille kits, white cane, hearing aids, wheelchairs (100% free)",
          eligibility: "UDID card + BPL/Income <₹15,000 per month",
          apply: "DEPwD district centers or state disability commissioner office"
        },
        {
          name: "Niramaya Health Insurance",
          purpose: "Health coverage for PwD",
          benefit: "₹3 lakhs per year coverage for treatments, surgeries, medications",
          eligibility: "UDID holder with 40%+ disability",
          apply: "State health department or online portal"
        },
        {
          name: "Post-Matric Scholarship for Students with Disabilities",
          purpose: "Higher education support",
          benefit: "₹1,200/month (hostel), ₹700/month (day scholar) + tuition fee waiver",
          eligibility: "40%+ disability, student pursuing higher education",
          apply: "NSP portal (scholarships.gov.in)"
        },
        {
          name: "Skill Development Training (Skill India)",
          purpose: "Vocational training and skill development",
          benefit: "Free training + placement assistance + stipend during training",
          eligibility: "PwD with UDID card, age 18-45 years",
          apply: "Skill India centers or online portal"
        }
      ],
      state: {
        maharashtra: [
          {
            name: "Maharashtra Disability Pension",
            amount: "₹1,000-2,000/month",
            eligibility: "40%+ disability, annual income below ₹24,000",
            link: "https://socialjustice.maharashtra.gov.in"
          },
          {
            name: "Free Education for Children with Disabilities",
            amount: "Full fee waiver + scholarship",
            eligibility: "Children with 40%+ disability",
            link: "https://mscep.maharashtra.gov.in"
          }
        ]
      }
    };
  }

  // Generate career paths based on disability combination and interests
  async generateCareerPaths(disabilities, interests = null) {
    console.log('generateCareerPaths called with:', { disabilities, interests });
    const compatibleCareers = [];
    const disabilityKeys = disabilities.map(d => d.disabilityKey || d);
    console.log('Disability keys:', disabilityKeys);

    // Filter careers compatible with ALL disabilities
    Object.entries(this.careers).forEach(([careerId, career]) => {
      const isCompatible = disabilityKeys.every(disKey => 
        career.compatibleDisabilities.includes(disKey)
      );

      if (isCompatible) {
        compatibleCareers.push({
          ...career,
          id: careerId,
          compatibilityScore: this.calculateCompatibilityScore(career, disabilityKeys)
        });
      }
    });

    // Sort by compatibility score
    compatibleCareers.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

    // Group by domain
    const domainsMap = {};
    compatibleCareers.forEach(career => {
      if (!domainsMap[career.domain]) {
        domainsMap[career.domain] = [];
      }
      domainsMap[career.domain].push(career);
    });

    // Filter domains by interests if provided
    let filteredDomains = domainsMap;
    if (interests && interests.length > 0 && !interests.includes('not-sure')) {
      // Load domains from extractor
      if (window.domainExtractor) {
        await window.domainExtractor.loadDomains();
        const allDomains = window.domainExtractor.getHardCodedDomains();
        
        // Get domains that match interests
        const interestMatchedDomains = window.domainExtractor.filterDomainsByInterests(
          allDomains, 
          interests
        );
        console.log('Interest-matched domains:', Object.keys(interestMatchedDomains));
        console.log('Domains with compatible careers:', Object.keys(domainsMap));
        
        // Now combine: 
        // 1. Domains with compatible careers (from disabilities)
        // 2. Domains that match interests (even if no compatible careers yet)
        const combined = {};
        
        // First, add all domains that match interests
        Object.keys(interestMatchedDomains).forEach(domainKey => {
          // If domain has compatible careers, use those
          if (domainsMap[domainKey]) {
            combined[domainKey] = domainsMap[domainKey];
          } else {
            // If domain matches interest but no compatible careers, 
            // show all careers in that domain (user selected it as interest)
            const allCareersInDomain = [];
            Object.entries(this.careers).forEach(([careerId, career]) => {
              if (career.domain === domainKey) {
                allCareersInDomain.push({
                  ...career,
                  id: careerId,
                  compatibilityScore: this.calculateCompatibilityScore(career, disabilityKeys)
                });
              }
            });
            
            // Sort by compatibility score
            allCareersInDomain.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
            
            if (allCareersInDomain.length > 0) {
              combined[domainKey] = allCareersInDomain;
            }
          }
        });
        
        // If we have interest-matched domains, use those; otherwise use disability-matched
        filteredDomains = Object.keys(combined).length > 0 ? combined : domainsMap;
        console.log('Final filtered domains:', Object.keys(filteredDomains));
        
        // Recalculate total count to include all careers in filtered domains
        let totalCount = 0;
        Object.values(filteredDomains).forEach(careers => {
          totalCount += careers.length;
        });
        console.log('Total careers in filtered domains:', totalCount);
        
        return {
          careers: compatibleCareers,
          domains: filteredDomains,
          totalCount: totalCount,
          interests: interests || []
        };
      }
    }

    return {
      careers: compatibleCareers,
      domains: filteredDomains,
      totalCount: compatibleCareers.length,
      interests: interests || []
    };
  }

  calculateCompatibilityScore(career, disabilityKeys) {
    // Simple scoring: more compatible disabilities = higher score
    let score = 100;
    disabilityKeys.forEach(disKey => {
      if (!career.compatibleDisabilities.includes(disKey)) {
        score -= 50; // Penalty for incompatible
      }
    });
    return Math.max(0, score);
  }

  // Get functional considerations for disability combination
  getFunctionalConsiderations(disabilities) {
    const considerations = {
      mobility: [],
      communication: [],
      sensory: [],
      psychological: [],
      social: []
    };

    disabilities.forEach(dis => {
      const key = dis.disabilityKey || dis;
      
      // Mobility considerations
      if (["locomotor", "cerebralPalsy", "muscularDystrophy", "dwarfism"].includes(key)) {
        considerations.mobility.push("May need wheelchair accessibility, ramps, ergonomic furniture");
      }
      
      // Communication considerations
      if (["hearingImpairment", "speechLanguage", "deafBlindness"].includes(key)) {
        considerations.communication.push("May need sign language, written communication, visual aids");
      }
      
      // Sensory considerations
      if (["blindness", "lowVision", "deafBlindness"].includes(key)) {
        considerations.sensory.push("May need screen readers, magnifiers, audio descriptions");
      }
      
      // Psychological considerations
      if (["mentalIllness", "autism", "intellectual"].includes(key)) {
        considerations.psychological.push("May need flexible schedules, quiet spaces, routine support");
      }
      
      // Social considerations
      if (["autism", "mentalIllness", "acidAttack"].includes(key)) {
        considerations.social.push("May need inclusive environments, anti-discrimination support");
      }
    });

    return considerations;
  }

  // Get relevant schemes for disabilities
  getRelevantSchemes(disabilities, state = "maharashtra") {
    const allSchemes = [...this.schemes.central];
    if (this.schemes.state[state]) {
      allSchemes.push(...this.schemes.state[state]);
    }
    return allSchemes;
  }
}

// Export singleton instance
window.careerMapper = new CareerMapper();
