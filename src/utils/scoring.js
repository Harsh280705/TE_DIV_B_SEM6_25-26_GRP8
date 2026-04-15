// Rule-based scoring logic for assessment
// TODO: Later ML/NLP models will replace or enhance this rule-based logic

/**
 * Map 4-point scale answers to numeric values
 * No difficulty = 0, Some difficulty = 1, A lot of difficulty = 2, Cannot do = 3
 */
const answerValues = {
    "No difficulty": 0,
    "Some difficulty": 1,
    "A lot of difficulty": 2,
    "Cannot do": 3
};

/**
 * Calculate domain level based on score
 * 0-2 → Mild, 3-6 → Moderate, 7+ → Severe
 */
function getDomainLevel(score) {
    if (score <= 2) return "Mild";
    if (score <= 6) return "Moderate";
    return "Severe";
}

/**
 * Calculate scores for each functional domain based on user responses
 * @param {Object} responses - User's assessment responses
 * @returns {Object} Summary object with domainScores, domainLevels, indicators, and impact data
 */
export function calculateScores(responses) {
    // Initialize domain scores
    const domainScores = {
        vision: 0,
        hearing: 0,
        mobility: 0,
        handUse: 0,
        learning: 0,
        communication: 0,
        behavior: 0,
        selfCare: 0,
        dailyActivities: 0
    };

    // Calculate scores for each domain
    Object.keys(responses).forEach(key => {
        const value = responses[key];
        const numericValue = answerValues[value] || 0;
        
        // Map question IDs to domains
        if (key.startsWith('v')) {
            domainScores.vision += numericValue;
        } else if (key.startsWith('h')) {
            domainScores.hearing += numericValue;
        } else if (key.startsWith('m')) {
            domainScores.mobility += numericValue;
        } else if (key.startsWith('hu')) {
            domainScores.handUse += numericValue;
        } else if (key.startsWith('l')) {
            domainScores.learning += numericValue;
        } else if (key.startsWith('c')) {
            domainScores.communication += numericValue;
        } else if (key.startsWith('b')) {
            domainScores.behavior += numericValue;
        } else if (key.startsWith('sc')) {
            domainScores.selfCare += numericValue;
        } else if (key.startsWith('da')) {
            domainScores.dailyActivities += numericValue;
        }
    });

    // Calculate domain levels
    const domainLevels = {};
    Object.keys(domainScores).forEach(domain => {
        domainLevels[domain] = getDomainLevel(domainScores[domain]);
    });

    // Calculate indicator flags
    // Vision score ≥ 5 → visionIndicator = true
    const visionIndicator = domainScores.vision >= 5;
    
    // Hearing score ≥ 5 → hearingIndicator = true
    const hearingIndicator = domainScores.hearing >= 5;
    
    // Mobility or Self-care score ≥ 5 → mobilityIndicator = true
    const mobilityIndicator = domainScores.mobility >= 5 || domainScores.selfCare >= 5;
    
    // Learning + Communication + Behavior combined ≥ 8 → neurocognitiveIndicator = true
    const neurocognitiveIndicator = (domainScores.learning + domainScores.communication + domainScores.behavior) >= 8;

    const indicators = {
        visionIndicator,
        hearingIndicator,
        mobilityIndicator,
        neurocognitiveIndicator
    };

    // Extract Impact & Goals responses
    // Handle multi-select arrays - they may be arrays or need to be collected
    const currentSupport = responses['impact-current-support'];
    const desiredSupport = responses['impact-desired-support'];
    
    const impactData = {
        duration: responses['impact-duration'] || '',
        impact: responses['impact-impact'] || '',
        currentSupport: Array.isArray(currentSupport) ? currentSupport : (currentSupport ? [currentSupport] : []),
        desiredSupport: Array.isArray(desiredSupport) ? desiredSupport : (desiredSupport ? [desiredSupport] : []),
        openText: responses['impact-opentext'] || ''
    };

    return {
        domainScores,
        domainLevels,
        indicators,
        impactData
    };
}

// Note: Multi-select values are now handled directly as arrays in responses object
// This function is kept for backward compatibility but is no longer used

/**
 * Determine likely disability categories based on scores and indicators
 * This is a non-diagnostic guide for possible disability areas
 * @param {Object} scores - Calculated scores summary object
 * @returns {Array} Array of possible disability areas with descriptions
 */
export function determineCategories(scores) {
    const categories = [];
    const { domainScores, domainLevels, indicators } = scores;

    // Map indicators to possible disability areas (non-diagnostic)
    if (indicators.visionIndicator) {
        categories.push({
            category: "Possible visual disability area",
            description: "Your responses suggest you may benefit from visual support and accessible technology. This is not a diagnosis - please consult healthcare professionals for proper evaluation.",
            confidence: Math.min(100, Math.round((domainScores.vision / 15) * 100)), // Max score is 5 questions * 3 = 15
            level: domainLevels.vision
        });
    }

    if (indicators.hearingIndicator) {
        categories.push({
            category: "Possible hearing disability area",
            description: "Your responses suggest you may benefit from visual and text-based communication options. This is not a diagnosis - please consult healthcare professionals for proper evaluation.",
            confidence: Math.min(100, Math.round((domainScores.hearing / 15) * 100)),
            level: domainLevels.hearing
        });
    }

    if (indicators.mobilityIndicator) {
        categories.push({
            category: "Possible locomotor or multiple disability area",
            description: "Your responses suggest desk-based or remote work may suit your physical needs. This is not a diagnosis - please consult healthcare professionals for proper evaluation.",
            confidence: Math.min(100, Math.round(((domainScores.mobility + domainScores.selfCare) / 30) * 100)),
            level: domainLevels.mobility === "Severe" || domainLevels.selfCare === "Severe" ? "Severe" : 
                   domainLevels.mobility === "Moderate" || domainLevels.selfCare === "Moderate" ? "Moderate" : "Mild"
        });
    }

    if (indicators.neurocognitiveIndicator) {
        categories.push({
            category: "Possible intellectual / specific learning / autism / mental illness area",
            description: "Your responses suggest structured environments and extra learning support may help you. This is not a diagnosis - please consult healthcare professionals for proper evaluation.",
            confidence: Math.min(100, Math.round(((domainScores.learning + domainScores.communication + domainScores.behavior) / 45) * 100)),
            level: "Moderate" // Combined indicator, so default to moderate
        });
    }

    // If no clear category, provide general guidance
    if (categories.length === 0) {
        categories.push({
            category: "General Assessment",
            confidence: 50,
            description: "Based on your responses, you may benefit from a comprehensive assessment by healthcare professionals. This platform can still help you explore career options.",
            level: "Mild"
        });
    }

    // Sort by confidence (highest first)
    categories.sort((a, b) => b.confidence - a.confidence);

    return categories;
}

/**
 * Get recommended careers based on assessment results
 * @param {Array} categories - Determined disability categories
 * @param {Object} scores - Calculated scores summary
 * @returns {Array} Recommended career IDs
 */
export function getRecommendedCareers(categories, scores) {
    // TODO: Replace with ML-based recommendation system
    // For now, use simple rule-based matching based on indicators
    
    const recommendations = [];
    const { indicators } = scores;

    // Match careers based on indicators
    // This is a simplified version - ML model would do better matching
    if (indicators.visionIndicator) {
        recommendations.push(1, 2, 3, 4); // Software Tester, Graphic Designer, Government Job, Content Writer
    }
    
    if (indicators.hearingIndicator) {
        recommendations.push(1, 2, 3, 4, 5); // Most careers suitable
    }
    
    if (indicators.mobilityIndicator) {
        recommendations.push(1, 3, 4, 5); // Desk-based jobs
    }
    
    if (indicators.neurocognitiveIndicator) {
        recommendations.push(4, 5); // Content Writer, Data Entry
    }

    // Remove duplicates and return
    return [...new Set(recommendations)];
}

/**
 * Get domain display name (exported for use in Results page)
 */
export function getDomainDisplayName(domain) {
    const names = {
        vision: 'Vision',
        hearing: 'Hearing',
        mobility: 'Mobility / Movement',
        handUse: 'Hand Use / Fine Motor',
        learning: 'Learning / Understanding / Memory',
        communication: 'Communication',
        behavior: 'Behavior / Emotions / Social Interaction',
        selfCare: 'Self-Care',
        dailyActivities: 'Daily Activities & Work/Study'
    };
    return names[domain] || domain;
}
