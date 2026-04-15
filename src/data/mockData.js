// Complete Mock Data File with ALL Exports

// Disability Categories
export const disabilityCategories = [
    'Visual Impairment',
    'Hearing Impairment',
    'Locomotor Disability',
    'Intellectual Disability',
    'Mental Illness',
    'Cerebral Palsy',
    'Autism',
    'Multiple Disabilities',
    'Acid Attack Victim',
    'Muscular Dystrophy'
];

// Indian States
export const states = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi',
    'Jammu and Kashmir',
    'Ladakh',
    'Lakshadweep',
    'Puducherry'
];

// Career Paths
export const mockCareers = [
    {
        id: 1,
        title: 'Software Development',
        category: 'Technology',
        description: 'Build applications, websites, and software solutions using programming languages and frameworks.',
        suitableFor: ['Visual Impairment', 'Hearing Impairment', 'Locomotor Disability', 'Autism'],
        skills: ['Programming', 'Problem Solving', 'Logical Thinking', 'Creativity'],
        roadmap: [
            'Learn programming fundamentals (Python/JavaScript)',
            'Master web development (HTML, CSS, JavaScript)',
            'Build projects and create portfolio',
            'Learn frameworks (React, Node.js)',
            'Contribute to open source',
            'Apply for internships and jobs'
        ],
        resources: [
            'freeCodeCamp - Free coding bootcamp',
            'Codecademy - Interactive coding lessons',
            'GitHub - Version control and collaboration',
            'Stack Overflow - Developer community'
        ],
        salary: '₹3-15 LPA',
        demand: 'Very High'
    },
    {
        id: 2,
        title: 'Digital Marketing',
        category: 'Marketing',
        description: 'Promote products and services through online channels including social media, SEO, and content marketing.',
        suitableFor: ['Visual Impairment', 'Hearing Impairment', 'Locomotor Disability'],
        skills: ['Communication', 'Creativity', 'Analytics', 'Social Media'],
        roadmap: [
            'Learn digital marketing basics',
            'Master SEO and SEM',
            'Learn social media marketing',
            'Content marketing and copywriting',
            'Analytics and data interpretation',
            'Get certified (Google, HubSpot)'
        ],
        resources: [
            'Google Digital Garage - Free courses',
            'HubSpot Academy - Marketing certification',
            'SEMrush Academy - SEO training',
            'Facebook Blueprint - Social media marketing'
        ],
        salary: '₹2.5-10 LPA',
        demand: 'High'
    },
    {
        id: 3,
        title: 'Graphic Design',
        category: 'Creative',
        description: 'Create visual content for brands, websites, and marketing materials using design software.',
        suitableFor: ['Hearing Impairment', 'Locomotor Disability'],
        skills: ['Creativity', 'Visual Communication', 'Software Skills', 'Attention to Detail'],
        roadmap: [
            'Learn design principles and theory',
            'Master Adobe Creative Suite (Photoshop, Illustrator)',
            'Study typography and color theory',
            'Build a strong portfolio',
            'Learn UI/UX design basics',
            'Freelance or apply for design roles'
        ],
        resources: [
            'Canva Design School - Free design courses',
            'Adobe Creative Cloud tutorials',
            'Behance - Portfolio showcase',
            'Dribbble - Design inspiration'
        ],
        salary: '₹2-8 LPA',
        demand: 'Medium-High'
    },
    {
        id: 4,
        title: 'Content Writing',
        category: 'Writing',
        description: 'Write articles, blogs, website copy, and marketing content for various industries and platforms.',
        suitableFor: ['Visual Impairment', 'Hearing Impairment', 'Locomotor Disability', 'Mental Illness'],
        skills: ['Writing', 'Research', 'Creativity', 'Grammar', 'SEO'],
        roadmap: [
            'Improve writing and grammar skills',
            'Learn content writing basics',
            'Understand SEO writing',
            'Build writing portfolio',
            'Join content platforms (Upwork, Fiverr)',
            'Pitch to companies and blogs'
        ],
        resources: [
            'Grammarly - Writing assistant',
            'Hemingway Editor - Readability tool',
            'Contently - Content marketing platform',
            'Medium - Publishing platform'
        ],
        salary: '₹2-7 LPA',
        demand: 'High'
    },
    {
        id: 5,
        title: 'Data Entry & Administration',
        category: 'Administration',
        description: 'Handle data entry, document management, and administrative tasks for organizations.',
        suitableFor: ['Hearing Impairment', 'Locomotor Disability', 'Visual Impairment'],
        skills: ['Typing', 'Attention to Detail', 'Organization', 'MS Office'],
        roadmap: [
            'Learn MS Office Suite',
            'Improve typing speed (40+ WPM)',
            'Learn data management tools',
            'Understand business processes',
            'Get certified in MS Office',
            'Apply for entry-level positions'
        ],
        resources: [
            'Microsoft Learn - Free Office training',
            'TypingClub - Typing practice',
            'Coursera - Business administration courses',
            'LinkedIn Learning - Office skills'
        ],
        salary: '₹1.5-4 LPA',
        demand: 'Medium'
    },
    {
        id: 6,
        title: 'Customer Support',
        category: 'Service',
        description: 'Provide customer service through phone, email, or chat supporting customer needs and resolving issues.',
        suitableFor: ['Locomotor Disability', 'Visual Impairment'],
        skills: ['Communication', 'Problem Solving', 'Patience', 'Empathy'],
        roadmap: [
            'Develop communication skills',
            'Learn customer service fundamentals',
            'Master CRM software',
            'Practice conflict resolution',
            'Get certified in customer service',
            'Apply to BPO/KPO companies'
        ],
        resources: [
            'Zendesk Academy - Customer service training',
            'HubSpot Service Hub - Support tools',
            'Coursera - Customer service courses',
            'LinkedIn Learning - Communication skills'
        ],
        salary: '₹2-5 LPA',
        demand: 'High'
    },
    {
        id: 7,
        title: 'Teaching & Tutoring',
        category: 'Education',
        description: 'Teach students online or offline, create educational content, and help others learn.',
        suitableFor: ['Hearing Impairment', 'Locomotor Disability', 'Visual Impairment'],
        skills: ['Subject Knowledge', 'Communication', 'Patience', 'Creativity'],
        roadmap: [
            'Master your subject area',
            'Learn teaching methodologies',
            'Get teaching certification (B.Ed/D.Ed)',
            'Join online tutoring platforms',
            'Create educational content',
            'Build reputation and student base'
        ],
        resources: [
            'Unacademy - Teaching platform',
            'Vedantu - Online tutoring',
            'BYJU\'S - Education technology',
            'Coursera - Teaching certification'
        ],
        salary: '₹2-8 LPA',
        demand: 'Medium-High'
    },
    {
        id: 8,
        title: 'Accounting & Finance',
        category: 'Finance',
        description: 'Manage financial records, prepare reports, handle bookkeeping and taxation.',
        suitableFor: ['Hearing Impairment', 'Locomotor Disability', 'Visual Impairment'],
        skills: ['Mathematics', 'Analytical Thinking', 'Attention to Detail', 'Software Skills'],
        roadmap: [
            'Complete B.Com or related degree',
            'Learn Tally and accounting software',
            'Pursue CA/CMA/CS certification',
            'Understand taxation and compliance',
            'Gain practical experience through internships',
            'Apply for accounting positions'
        ],
        resources: [
            'Tally Education - Accounting software',
            'ICAI - Chartered Accountancy',
            'Udemy - Finance courses',
            'Khan Academy - Finance basics'
        ],
        salary: '₹2.5-12 LPA',
        demand: 'High'
    },
    {
        id: 9,
        title: 'E-commerce & Online Business',
        category: 'Entrepreneurship',
        description: 'Start and manage online stores, sell products through platforms like Amazon, Flipkart.',
        suitableFor: ['Hearing Impairment', 'Locomotor Disability', 'Visual Impairment'],
        skills: ['Business Acumen', 'Marketing', 'Customer Service', 'Digital Literacy'],
        roadmap: [
            'Research product and market',
            'Learn e-commerce platforms',
            'Set up online store (Amazon, Shopify)',
            'Master digital marketing',
            'Manage inventory and logistics',
            'Scale and optimize business'
        ],
        resources: [
            'Amazon Seller University',
            'Shopify Academy',
            'Google Digital Garage',
            'Facebook Business'
        ],
        salary: 'Variable (₹3-20+ LPA)',
        demand: 'High'
    },
    {
        id: 10,
        title: 'Government Jobs (Clerk/Assistant)',
        category: 'Government',
        description: 'Secure government positions through SSC, Banking, Railway exams with reservation benefits.',
        suitableFor: ['Visual Impairment', 'Hearing Impairment', 'Locomotor Disability', 'Multiple Disabilities'],
        skills: ['General Knowledge', 'Aptitude', 'Reasoning', 'English'],
        roadmap: [
            'Complete graduation (any stream)',
            'Understand exam patterns (SSC CGL, IBPS, RRB)',
            'Prepare for competitive exams',
            'Apply using PWD reservation (4% quota)',
            'Clear written exam and interview',
            'Join government service'
        ],
        resources: [
            'SSC Official Website',
            'IBPS Banking Exams',
            'Unacademy - Govt exam prep',
            'Testbook - Mock tests'
        ],
        salary: '₹2.5-7 LPA',
        demand: 'High'
    }
];

// Success Stories
export const mockStories = [
    {
        id: 1,
        name: 'Srikanth Bolla',
        disabilityType: 'Visual Impairment',
        domain: 'Entrepreneurship',
        title: 'Founder & CEO, Bollant Industries',
        location: 'Hyderabad, India',
        description: 'First blind student admitted to MIT, founded a company worth ₹300+ crores employing thousands.',
        fullStory: `Srikanth Bolla was born blind in a small village in Andhra Pradesh. Despite being advised by teachers to settle for a simple life, he pursued his dreams relentlessly. He scored 98% in his Class 10 exams but was denied admission to science stream due to his disability.

After fighting a legal battle, he became the first international blind student to study at MIT's Sloan School of Management. In 2012, he founded Bollant Industries, which manufactures eco-friendly, disposable consumer packaging products.

Today, Bollant Industries is valued at over ₹300 crores and employs more than 500+ people, with 60% being differently-abled or from economically disadvantaged backgrounds. His story has inspired millions across India and the world.

"If the world looks at me and says, 'Srikanth, you can do nothing,' I look back at the world and say, 'I can do anything.'"`,
        achievements: [
            'First blind student at MIT',
            'Founded ₹300+ crore company',
            'Employs 500+ people',
            'Featured in Forbes'
        ]
    },
    {
        id: 2,
        name: 'Arunima Sinha',
        disabilityType: 'Locomotor Disability',
        domain: 'Sports',
        title: 'First Female Amputee to Climb Mt. Everest',
        location: 'Delhi, India',
        description: 'International volleyball player who lost her leg but conquered Mt. Everest and all 7 summits.',
        fullStory: `Arunima Sinha was a national level volleyball player whose life changed dramatically in 2011 when she was thrown from a moving train by robbers, resulting in the amputation of her left leg below the knee.

Instead of giving up, she decided to climb Mt. Everest with a prosthetic leg. On May 21, 2013, she became the first female amputee to climb Mt. Everest. She didn't stop there - she went on to climb all seven highest peaks across seven continents, including Mt. Kilimanjaro, Mt. Elbrus, Mt. Kosciusko, and Mt. Aconcagua.

She was awarded the Padma Shri in 2015 for her remarkable achievements. Today, she runs a free sports academy for differently-abled people in Unnao, Uttar Pradesh.

"When you fall, you learn. When you get up, you conquer."`,
        achievements: [
            'First female amputee to summit Everest',
            'Climbed all 7 continents highest peaks',
            'Padma Shri awardee',
            'Runs sports academy for disabled'
        ]
    },
    {
        id: 3,
        name: 'Preethi Srinivasan',
        disabilityType: 'Locomotor Disability',
        domain: 'Sports',
        title: 'International Swimmer & Founder, Soulfree',
        location: 'Chennai, India',
        description: 'Became quadriplegic after accident, now international swimmer and disability rights advocate.',
        fullStory: `Preethi Srinivasan was a state-level basketball player when a swimming pool accident in 2008 left her quadriplegic at age 18. Doctors said she would never walk again.

Rather than accepting defeat, Preethi took to adaptive sports with determination. She became an international swimmer, representing India at multiple para-swimming championships. She won silver at the Para Swimming World Series and competed at the Asian Para Games.

In 2013, she founded Soulfree, India's first adventure sports academy for people with disabilities, offering activities like scuba diving, surfing, and rock climbing. Through Soulfree, she has empowered thousands of people with disabilities to experience the thrill of adventure sports.

"Disability is not inability. It's just a different way of doing things."`,
        achievements: [
            'International para-swimmer',
            'Silver medalist at World Series',
            'Founded Soulfree adventure academy',
            'Inspired 1000+ disabled individuals'
        ]
    },
    {
        id: 4,
        name: 'Girish Sharma',
        disabilityType: 'Locomotor Disability',
        domain: 'Government Job',
        title: 'IAS Officer',
        location: 'Rajasthan, India',
        description: 'First wheelchair-bound IAS officer who cracked UPSC despite 95% disability.',
        fullStory: `Girish Sharma was diagnosed with polio at a young age, which left him with 95% locomotor disability. Despite his condition requiring him to use a wheelchair, he never let it define his capabilities.

In 2018, after multiple attempts, he cleared the UPSC Civil Services Examination and became an IAS officer. He is one of the first wheelchair-bound IAS officers in India, breaking barriers and inspiring thousands of aspirants with disabilities.

During his training at the Lal Bahadur Shastri National Academy of Administration in Mussoorie, he completed all physical training modules with modifications, proving that determination trumps physical limitations.

Currently serving in Rajasthan, he focuses on disability rights, accessibility, and inclusive governance.

"Never underestimate the power of determination over disability."`,
        achievements: [
            'Cleared UPSC with 95% disability',
            'First wheelchair-bound IAS officer',
            'Disability rights advocate',
            'Role model for UPSC aspirants'
        ]
    },
    {
        id: 5,
        name: 'Deepa Malik',
        disabilityType: 'Locomotor Disability',
        domain: 'Sports',
        title: 'Paralympic Medalist',
        location: 'Haryana, India',
        description: 'First Indian woman to win Paralympic medal, won silver at Rio 2016.',
        fullStory: `Deepa Malik's life took a drastic turn in 1999 when a spinal tumor surgery left her paralyzed from chest down. As a mother of two and an army officer's wife, she refused to let disability stop her.

She started her sports journey in 2009 and quickly excelled in multiple para-sports including swimming, javelin, shot put, and discus throw. In 2016, at the Rio Paralympics, she won a silver medal in shot put, becoming the first Indian woman to win a Paralympic medal.

She continued competing and won gold at the 2018 Para Athletics Grand Prix in Dubai. Beyond sports, she is a motivational speaker, author, and president of the Paralympic Committee of India.

In 2017, she was awarded the Padma Shri and in 2021, the Rajiv Gandhi Khel Ratna Award (now Major Dhyan Chand Khel Ratna).

"I don't have a disability, I have a different ability."`,
        achievements: [
            'First Indian woman Paralympic medalist',
            'Silver at Rio 2016',
            'Padma Shri & Khel Ratna awardee',
            'President, Paralympic Committee'
        ]
    },
    {
        id: 6,
        name: 'Anmol Gada',
        disabilityType: 'Visual Impairment',
        domain: 'Education',
        title: 'Software Engineer, Microsoft',
        location: 'Mumbai, India',
        description: 'Blind software engineer working at Microsoft, graduated from IIT Bombay.',
        fullStory: `Born with congenital visual impairment, Anmol Gada never let his disability stop him from pursuing his passion for technology. He learned coding using screen readers and assistive technologies.

He cleared the JEE Advanced exam and secured admission to IIT Bombay, one of India's most prestigious engineering institutes. During his time at IIT, he developed multiple accessible applications and contributed to open-source projects.

After graduation, he joined Microsoft as a software engineer, where he works on making technology more accessible for people with disabilities. He is also actively involved in mentoring students with visual impairments who want to pursue careers in technology.

His story has been featured in multiple publications and he regularly speaks at conferences about accessibility in tech.

"Technology should empower everyone, regardless of their abilities."`,
        achievements: [
            'Graduated from IIT Bombay',
            'Software Engineer at Microsoft',
            'Accessibility advocate',
            'Open-source contributor'
        ]
    },
    {
        id: 7,
        name: 'Satendra Singh',
        disabilityType: 'Locomotor Disability',
        domain: 'Government Job',
        title: 'IPS Officer',
        location: 'Uttar Pradesh, India',
        description: 'First wheelchair-bound IPS officer in India, serving as SP in Uttar Pradesh.',
        fullStory: `Satendra Singh met with a life-altering accident during his college days that left him paralyzed below the waist. Despite being confined to a wheelchair, he refused to give up on his dreams of serving the nation.

In 2009, he cleared the UPSC Civil Services Examination and opted for the Indian Police Service. He became India's first wheelchair-bound IPS officer, breaking all stereotypes about what people with disabilities can achieve.

During his service, he has handled multiple challenging assignments and has been known for his innovative approach to policing. He has also been a strong advocate for accessibility in government buildings and police stations.

His story has inspired countless people with disabilities to aim for civil services, showing that physical limitations cannot stop a determined mind.

"Your wheelchair is just a tool, not your identity."`,
        achievements: [
            'First wheelchair-bound IPS officer',
            'Cleared UPSC Civil Services',
            'Serving as SP in UP',
            'Disability rights champion'
        ]
    },
    {
        id: 8,
        name: 'Malathi Holla',
        disabilityType: 'Locomotor Disability',
        domain: 'Sports',
        title: 'Paralympic Athlete',
        location: 'Bangalore, India',
        description: 'Won 300+ medals including Paralympic medals, founded sports academy.',
        fullStory: `Born with a condition that affected her legs, Malathi Holla took to sports at a young age and never looked back. Over a career spanning more than three decades, she has won over 300 medals at national and international competitions.

She has represented India at multiple Paralympic Games and Asian Para Games, winning numerous medals in track and field events. In 2001, she received the Arjuna Award for her outstanding achievements in sports.

Beyond her sporting achievements, she founded the Mathru Foundation, which runs residential schools and sports academies for children with disabilities. The foundation has trained hundreds of athletes who have gone on to represent India at various levels.

She is also the first Indian woman with disability to complete a marathon, finishing the Bangalore Marathon in 2006.

"Every child with a disability has the right to dream and achieve."`,
        achievements: [
            '300+ medals in athletics',
            'Multiple Paralympic Games',
            'Arjuna Award winner',
            'Founded Mathru Foundation'
        ]
    },
    {
        id: 9,
        name: 'Nikhil Srivastava',
        disabilityType: 'Visual Impairment',
        domain: 'Government Job',
        title: 'IAS Officer',
        location: 'Madhya Pradesh, India',
        description: '100% blind IAS officer who cleared UPSC in his first attempt.',
        fullStory: `Nikhil Srivastava lost his eyesight at the age of 10 due to glaucoma. Instead of letting this setback define him, he excelled academically and graduated from Delhi University with honors.

In 2019, he cleared the UPSC Civil Services Examination in his very first attempt, securing All India Rank 286. He became an IAS officer and is currently serving in Madhya Pradesh.

During his preparation, he used screen reader software and audio materials, studying for 12-14 hours daily. His determination and strategic approach to the exam have made him a role model for thousands of aspirants with visual impairments.

He actively promotes inclusive education and has been working on making government services more accessible for people with disabilities.

"Disability is not a barrier to success; mindset is."`,
        achievements: [
            'Cleared UPSC in first attempt',
            'AIR 286 in 2019',
            'IAS officer in MP',
            'Advocate for accessible education'
        ]
    },
    {
        id: 10,
        name: 'Dilip Kumar Viswas',
        disabilityType: 'Visual Impairment',
        domain: 'Government Job',
        title: 'IAS Officer',
        location: 'Rajasthan, India',
        description: 'Visually impaired IAS officer serving in Rajasthan cadre.',
        fullStory: `Dilip Kumar Viswas lost his vision during his school years but never let it hinder his academic pursuits. He completed his graduation and post-graduation with distinction, using Braille and audio materials.

He cleared the UPSC Civil Services Examination and joined the IAS, choosing the Rajasthan cadre. Throughout his career, he has held various important positions and has been known for his administrative efficiency and innovative solutions.

He has been particularly focused on improving accessibility in government offices and ensuring that policies are disability-inclusive. His work has set new standards for how administrators with disabilities can excel in their roles.

He is also a mentor to many aspirants with visual impairments, guiding them through the UPSC preparation journey.

"Vision is not just about what you see with your eyes."`,
        achievements: [
            'IAS officer, Rajasthan cadre',
            'Champion of accessible governance',
            'Mentor for UPSC aspirants',
            'Administrative excellence awards'
        ]
    },
    {
        id: 11,
        name: 'Virali Modi',
        disabilityType: 'Locomotor Disability',
        domain: 'Entrepreneurship',
        title: 'Founder, Zyeta & Diversity Dialogs',
        location: 'Mumbai, India',
        description: 'Wheelchair user, entrepreneur, disability rights advocate, and TEDx speaker.',
        fullStory: `Virali Modi was born with spinal muscular atrophy, a condition that confines her to a wheelchair. Despite the physical challenges, she pursued her education with determination and graduated in Mass Media from Mumbai University.

She founded Zyeta, an online directory of accessible places in India, helping people with disabilities find wheelchair-friendly restaurants, hotels, and tourist spots. She also co-founded Diversity Dialogs, a consulting firm that helps organizations become more inclusive.

Virali is a prominent disability rights activist and has given multiple TEDx talks on inclusion and accessibility. She has consulted with major corporations and government bodies on making India more accessible.

She also works as a content strategist and writer, proving that disability is no barrier to professional success in creative fields.

"Accessibility is not a favor, it's a fundamental right."`,
        achievements: [
            'Founded Zyeta',
            'TEDx speaker',
            'Disability rights activist',
            'Inclusion consultant'
        ]
    },
    {
        id: 12,
        name: 'Devika Malik',
        disabilityType: 'Locomotor Disability',
        domain: 'Sports',
        title: 'Paralympic Swimmer',
        location: 'Delhi, India',
        description: 'International para-swimmer and disability sports advocate.',
        fullStory: `Devika Malik was a national-level basketball player before a car accident in 2002 left her with a spinal cord injury. After years of rehabilitation, she took to para-swimming and never looked back.

She has represented India at multiple international para-swimming championships and has won numerous medals. She is also passionate about promoting para-sports in India and works with various organizations to provide opportunities for athletes with disabilities.

Beyond sports, Devika is a motivational speaker and consultant on disability inclusion. She works with corporate organizations and educational institutions to create awareness about accessibility and inclusion.

She is married to Deepa Malik (another Paralympic medalist), and together they have become India's most inspiring power couple in para-sports.

"Sports taught me that limitations are only in the mind."`,
        achievements: [
            'International para-swimmer',
            'Multiple championship medals',
            'Motivational speaker',
            'Disability inclusion consultant'
        ]
    }
];

// Mock Data for general use (if needed by Dashboard)
export const mockData = {
    careers: mockCareers,
    stories: mockStories,
    disabilities: disabilityCategories,
    states: states
};

// Helper Functions
export function getStoryById(id) {
    return mockStories.find(story => story.id === parseInt(id));
}

export function getCareerById(id) {
    return mockCareers.find(career => career.id === parseInt(id));
}

export function filterStories(disabilityType, domain) {
    return mockStories.filter(story => {
        const disabilityMatch = !disabilityType || disabilityType === 'all' || 
                               story.disabilityType.toLowerCase() === disabilityType.toLowerCase();
        const domainMatch = !domain || domain === 'all' || 
                           story.domain.toLowerCase() === domain.toLowerCase();
        return disabilityMatch && domainMatch;
    });
}

// Additional exports that might be needed
export const domains = ['Sports', 'Education', 'Government Job', 'Private Job', 'Entrepreneurship'];

export const educationLevels = [
    'Below 10th',
    '10th Pass',
    '12th Pass',
    'Diploma',
    'Graduate',
    'Post Graduate',
    'Doctorate'
];

export const employmentStatus = [
    'Unemployed',
    'Student',
    'Self-Employed',
    'Private Sector',
    'Government Sector',
    'Freelancer'
];

export function openStoryInNewTab(storyId, confirmMessage = "Do you want to open the story in a new tab?") {
    // This function is meant to be called from a UI event handler (e.g., button onClick)
    // It cannot run independently here due to browser security.
    console.warn('openStoryInNewTab() should be called from a user interaction context (e.g., button click).');
}