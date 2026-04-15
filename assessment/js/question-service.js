// Question Service - Future-ready question loading from Firestore
// Falls back to hard-coded questions if Firestore unavailable

class QuestionService {
  constructor() {
    this.questionsCache = {
      universal: null,
      disability: {}
    };
    this.firestoreAvailable = false;
  }

  // Initialize and check Firestore availability
  async initialize() {
    try {
      if (window.firebaseService) {
        this.firestoreAvailable = true;
      }
    } catch (error) {
      console.warn('Firestore not available, using hard-coded questions');
      this.firestoreAvailable = false;
    }
  }

  // Load universal questions (40 questions)
  async loadUniversalQuestions() {
    // Check cache first
    if (this.questionsCache.universal) {
      return this.questionsCache.universal;
    }

    // Try to load from Firestore
    if (this.firestoreAvailable) {
      try {
        const questions = await this.loadQuestionsFromFirestore('universal');
        if (questions && questions.length > 0) {
          this.questionsCache.universal = questions;
          return questions;
        }
      } catch (error) {
        console.warn('Failed to load questions from Firestore:', error);
      }
    }

    // Fallback to hard-coded questions
    return this.getHardCodedUniversalQuestions();
  }

  // Load disability-specific questions
  async loadDisabilityQuestions(disabilityKey) {
    // Check cache first
    if (this.questionsCache.disability[disabilityKey]) {
      return this.questionsCache.disability[disabilityKey];
    }

    // Try to load from Firestore
    if (this.firestoreAvailable) {
      try {
        const questions = await this.loadQuestionsFromFirestore('disability-specific', disabilityKey);
        if (questions && questions.length > 0) {
          this.questionsCache.disability[disabilityKey] = questions;
          return questions;
        }
      } catch (error) {
        console.warn('Failed to load questions from Firestore:', error);
      }
    }

    // Fallback to hard-coded questions
    return this.getHardCodedDisabilityQuestions(disabilityKey);
  }

  // Load questions from Firestore
  async loadQuestionsFromFirestore(questionType, disabilityKey = null) {
    try {
      const { getDbInstance } = await import('../js/firebase-service.js');
      const db = await getDbInstance();
      const { collection, query, where, orderBy, getDocs } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
      
      let q;
      if (questionType === 'universal') {
        q = query(
          collection(db, 'assessmentQuestions'),
          where('questionType', '==', 'universal'),
          where('isActive', '==', true),
          orderBy('questionNumber', 'asc')
        );
      } else {
        q = query(
          collection(db, 'assessmentQuestions'),
          where('questionType', '==', 'disability-specific'),
          where('disabilityKey', '==', disabilityKey),
          where('isActive', '==', true),
          orderBy('questionNumber', 'asc')
        );
      }

      const querySnapshot = await getDocs(q);
      const questions = [];
      
      querySnapshot.forEach(doc => {
        questions.push({
          id: doc.id,
          text: doc.data().questionText,
          number: doc.data().questionNumber,
          weight: doc.data().weight || 1,
          ...doc.data()
        });
      });

      return questions.length > 0 ? questions.map(q => q.text) : null;
    } catch (error) {
      console.error('Error loading questions from Firestore:', error);
      return null;
    }
  }

  // Hard-coded universal questions (fallback) - Improved functional assessment questions
  getHardCodedUniversalQuestions() {
    return [
      // Sensory Domain (Questions 1-8)
      "Do bright lights or glare make it hard for you to see clearly?",
      "Do you have trouble reading small print, like on labels or signs?",
      "Do you bump into things or miss steps because you can't see them well?",
      "Do you struggle to hear people talking in noisy places, like markets?",
      "Do you often ask people to repeat what they said because you didn't hear?",
      "Does touching certain textures, like rough cloth, bother you a lot?",
      "Do you feel dizzy or like the room is spinning when you stand up?",
      "Do you lose your balance easily on uneven ground or stairs?",
      
      // Movement Domain (Questions 9-16)
      "Do you have trouble walking long distances without resting?",
      "Does your leg or foot drag when you walk?",
      "Do you drop things often because your hands shake or feel weak?",
      "Is it hard to button clothes or pick up small objects like coins?",
      "Do your arms or legs feel too weak to lift everyday items?",
      "Do parts of your body shake or tremble when you're trying to hold still?",
      "Do you need to hold onto things to stand up from a chair?",
      "Does stiffness in your joints make moving painful?",
      
      // Thinking/Learning Domain (Questions 17-24)
      "Do you forget what you were going to do right after thinking of it?",
      "Do you often lose track of what you're doing because your mind wanders?",
      "Is it hard to plan simple steps, like making a meal?",
      "Do new tasks, like using a phone app, take you much longer to learn?",
      "Do you mix up days of the week or important dates often?",
      "Is it tough to focus on one thing when there are noises or distractions?",
      "Do math problems, like counting change, feel confusing?",
      "Do instructions with more than 2 steps make you unsure what to do first?",
      
      // Communication Domain (Questions 25-30)
      "Do people say you speak too softly or unclearly?",
      "Do you have trouble finding the right words when talking?",
      "Is it hard to understand what others say if they talk fast?",
      "Do you struggle to read simple signs or messages?",
      "Is writing a short note or filling forms slow and difficult for you?",
      "Do conversations with groups of people feel overwhelming?",
      
      // Daily Living Domain (Questions 31-36)
      "Do you need help washing or dressing yourself?",
      "Is cooking a simple meal or cleaning hard without assistance?",
      "Do you avoid going to shops or buses because it's challenging?",
      "Is it tough to manage money or pay bills on time?",
      "Do work or study tasks take you much longer than others?",
      "Do you need reminders for daily routines like eating or sleeping?",
      
      // Health/Symptoms Domain (Questions 37-40)
      "Do you have ongoing pain that doesn't go away with rest?",
      "Do you feel very tired most days, even after sleeping?",
      "Are you taking medicines or treatments every day for health issues?",
      "Have you stayed in a hospital overnight in the last year?"
    ];
  }

  // Hard-coded disability questions (fallback) - will be loaded from assessment.html
  getHardCodedDisabilityQuestions(disabilityKey) {
    // This will be populated from the existing disabilityData in assessment.html
    // For now, return empty array - will be handled by assessment.html
    return [];
  }

  // Clear cache (useful for testing or when questions are updated)
  clearCache() {
    this.questionsCache = {
      universal: null,
      disability: {}
    };
  }
}

// Export singleton instance
window.questionService = new QuestionService();

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  window.questionService.initialize();
});
