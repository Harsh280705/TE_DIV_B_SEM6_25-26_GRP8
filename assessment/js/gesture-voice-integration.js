/**
 * Gesture and Voice Integration Layer
 * 
 * This module integrates gesture recognition and voice input/output
 * with the existing question-answer system WITHOUT modifying existing code.
 * 
 * Features:
 * - Extended gesture recognition (Yes, No, Skip, Repeat, Idle)
 * - Text-to-Speech for automatic question reading
 * - Speech-to-Text as fallback when gesture is Idle
 * - Gesture action mapping to question navigation
 * 
 * IMPORTANT NOTES:
 * - Yes/No gestures: Already supported by existing model
 * - Skip/Repeat gestures: Model needs to be retrained to include "Skip" and "Repeat" classes
 *   Until then, keyboard shortcuts are available: 'S' for Skip, 'R' for Repeat
 * - Idle gesture: Uses existing "No Gesture" class from model
 * - Voice recognition: Activates automatically when gesture is Idle for 2+ seconds
 * - Automatic TTS: Reads questions when they become active/visible
 */

// ============================================================================
// GESTURE INTEGRATION LAYER
// ============================================================================

/**
 * Gesture Action Handler
 * Maps recognized gestures to question actions without modifying existing logic
 */
class GestureActionHandler {
  constructor() {
    this.currentQuestionIndex = null;
    this.currentQuestionType = null; // 'universal' or 'disability'
    this.isListening = false;
    this.lastGestureTime = 0;
    this.gestureCooldown = 1200; // ms
  }

  /**
   * Handle gesture action - routes to appropriate handler
   * @param {string} gesture - Recognized gesture: 'Yes', 'No', 'Skip', 'Repeat', 'Idle'
   */
  handleGesture(gesture) {
    const now = Date.now();
    
    // Prevent rapid-fire gestures
    if (now - this.lastGestureTime < this.gestureCooldown) {
      return;
    }

    this.lastGestureTime = now;

    switch (gesture) {
      case 'Yes':
        this.handleYes();
        break;
      case 'No':
        this.handleNo();
        break;
      case 'Skip':
        this.handleSkip();
        break;
      case 'Repeat':
        this.handleRepeat();
        break;
      case 'Idle':
        this.handleIdle();
        break;
    }
  }

  /**
   * Handle Yes gesture - select Yes answer
   */
  handleYes() {
    this.updateCurrentQuestion();
    if (this.currentQuestionIndex === null) return;

    if (this.currentQuestionType === 'universal') {
      const radioId = `uq${this.currentQuestionIndex}-yes`;
      const radio = document.getElementById(radioId);
      if (radio && !radio.checked) {
        radio.click();
        this.showFeedback('YES Selected', '#4caf50');
      }
    } else if (this.currentQuestionType === 'disability') {
      const radioId = `q${this.currentQuestionIndex}-yes`;
      const radio = document.getElementById(radioId);
      if (radio && !radio.checked) {
        radio.click();
        this.showFeedback('YES Selected', '#4caf50');
      }
    }
  }

  /**
   * Handle No gesture - select No answer
   */
  handleNo() {
    this.updateCurrentQuestion();
    if (this.currentQuestionIndex === null) return;

    if (this.currentQuestionType === 'universal') {
      const radioId = `uq${this.currentQuestionIndex}-no`;
      const radio = document.getElementById(radioId);
      if (radio && !radio.checked) {
        radio.click();
        this.showFeedback('NO Selected', '#f44336');
      }
    } else if (this.currentQuestionType === 'disability') {
      const radioId = `q${this.currentQuestionIndex}-no`;
      const radio = document.getElementById(radioId);
      if (radio && !radio.checked) {
        radio.click();
        this.showFeedback('NO Selected', '#f44336');
      }
    }
  }

  /**
   * Handle Skip gesture - move to next unanswered question
   */
  handleSkip() {
    this.updateCurrentQuestion();
    this.showFeedback('SKIP - Moving to next question', '#ff9800');
    
    // Scroll to next unanswered question
    if (this.currentQuestionType === 'universal') {
      const answers = window.state?.universalAnswers || [];
      let nextIndex = (this.currentQuestionIndex || 0) + 1;
      while (nextIndex < answers.length && answers[nextIndex] !== null) {
        nextIndex++;
      }
      if (nextIndex < answers.length) {
        this.scrollToQuestion(`q-card-${nextIndex}`);
      }
    } else if (this.currentQuestionType === 'disability') {
      const disabilityKey = window.state?.detectedDisabilities?.[window.state?.currentDisabilityIndex]?.disKey;
      if (disabilityKey && window.state?.disabilityAnswers?.[disabilityKey]) {
        const answers = window.state.disabilityAnswers[disabilityKey];
        let nextIndex = (this.currentQuestionIndex || 0) + 1;
        while (nextIndex < answers.length && answers[nextIndex] !== null) {
          nextIndex++;
        }
        if (nextIndex < answers.length) {
          this.scrollToQuestion(`q-card-${nextIndex}`);
        }
      }
    }
  }

  /**
   * Handle Repeat gesture - repeat current question via TTS
   */
  handleRepeat() {
    this.updateCurrentQuestion();
    if (this.currentQuestionIndex === null) return;

    this.showFeedback('REPEAT - Reading question again', '#2196f3');
    
    // Use existing speakQuestion function or integration's question reader
    if (typeof window.speakQuestion === 'function') {
      window.speakQuestion(this.currentQuestionIndex, this.currentQuestionType, { target: { closest: () => null } });
    } else if (window.gestureVoiceIntegration?.questionReader) {
      window.gestureVoiceIntegration.questionReader.readCurrentQuestion();
    }
  }

  /**
   * Handle Idle gesture - activate voice recognition fallback
   */
  handleIdle() {
    // Only activate voice recognition if gesture has been idle for a while
    // This prevents interference with gesture detection
    if (!this.isListening && typeof window.voiceRecognitionManager !== 'undefined') {
      // Voice recognition will be handled by VoiceRecognitionManager
      // when it detects Idle state
    }
  }

  /**
   * Update current question index based on DOM state
   */
  updateCurrentQuestion() {
    // Determine current step
    const step = window.state?.step;
    
    if (step === 'universal-assessment') {
      this.currentQuestionType = 'universal';
      const answers = window.state?.universalAnswers || [];
      const firstUnanswered = answers.findIndex(a => a === null);
      this.currentQuestionIndex = firstUnanswered !== -1 ? firstUnanswered : answers.length - 1;
    } else if (step === 'assessment') {
      this.currentQuestionType = 'disability';
      const disabilityKey = window.state?.detectedDisabilities?.[window.state?.currentDisabilityIndex]?.disKey;
      if (disabilityKey && window.state?.disabilityAnswers?.[disabilityKey]) {
        const answers = window.state.disabilityAnswers[disabilityKey];
        const firstUnanswered = answers.findIndex(a => a === null);
        this.currentQuestionIndex = firstUnanswered !== -1 ? firstUnanswered : answers.length - 1;
      }
    }
  }

  /**
   * Scroll to a specific question card
   */
  scrollToQuestion(cardId) {
    const card = document.getElementById(cardId);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Highlight briefly
      card.style.border = '3px solid #FFD700';
      card.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.5)';
      setTimeout(() => {
        card.style.border = '';
        card.style.boxShadow = '';
      }, 2000);
    }
  }

  /**
   * Show visual feedback for gesture actions
   */
  showFeedback(text, color) {
    // Use existing showGestureFeedback if available
    if (typeof window.showGestureFeedback === 'function') {
      window.showGestureFeedback(text, color);
    } else {
      // Fallback feedback
      const feedback = document.createElement('div');
      feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        background: ${color};
        color: white;
        border-radius: 8px;
        font-weight: bold;
        z-index: 2000;
        animation: fadeIn 0.3s;
      `;
      feedback.textContent = text;
      document.body.appendChild(feedback);
      setTimeout(() => {
        feedback.style.opacity = '0';
        setTimeout(() => feedback.remove(), 500);
      }, 1500);
    }
  }
}

// ============================================================================
// EXTENDED GESTURE DETECTION
// ============================================================================

/**
 * Extended Gesture Detector
 * Extends existing gesture detection to support Skip, Repeat, and Idle
 */
class ExtendedGestureDetector {
  constructor() {
    this.skipFrames = 0;
    this.repeatFrames = 0;
    this.REQUIRED_FRAMES = 3; // Frames needed to confirm Skip/Repeat
  }
}

// ============================================================================
// VOICE RECOGNITION MANAGER (STT - Fallback)
// ============================================================================

/**
 * Voice Recognition Manager
 * Provides Speech-to-Text as fallback when gesture is Idle
 */
class VoiceRecognitionManager {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.isSupported = false;
    this.idleTimeout = null;
    this.IDLE_TIMEOUT_MS = 2000; // Activate voice after 2s of Idle
    
    this.init();
  }

  /**
   * Initialize Web Speech API recognition
   */
  init() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
      
      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        this.handleVoiceInput(transcript);
      };

      this.recognition.onerror = (event) => {
        console.log('Voice recognition error:', event.error);
        this.stopListening();
      };

      this.recognition.onend = () => {
        this.isListening = false;
        // Restart if gesture is still Idle
        if (window.gestureVoiceIntegration?.lastGesture === 'Idle') {
          this.startListening();
        }
      };

      this.isSupported = true;
    }
  }

  /**
   * Start listening for voice input (only when gesture is Idle)
   */
  startListening() {
    if (!this.isSupported || this.isListening) return;
    
    try {
      this.recognition.start();
      this.isListening = true;
      console.log('🎤 Voice recognition activated (gesture is Idle)');
    } catch (error) {
      // Already listening or not available
      console.log('Voice recognition not available:', error);
    }
  }

  /**
   * Stop listening for voice input
   */
  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (error) {
        // Ignore errors when stopping
      }
      this.isListening = false;
    }
    if (this.idleTimeout) {
      clearTimeout(this.idleTimeout);
      this.idleTimeout = null;
    }
  }

  /**
   * Handle voice input - map to Yes/No answers
   */
  handleVoiceInput(transcript) {
    const yesKeywords = ['yes', 'yeah', 'yep', 'correct', 'right', 'true'];
    const noKeywords = ['no', 'nope', 'wrong', 'false', 'incorrect'];

    const isYes = yesKeywords.some(keyword => transcript.includes(keyword));
    const isNo = noKeywords.some(keyword => transcript.includes(keyword));

    if (isYes) {
      window.gestureVoiceIntegration?.actionHandler.handleYes();
      this.stopListening();
    } else if (isNo) {
      window.gestureVoiceIntegration?.actionHandler.handleNo();
      this.stopListening();
    } else {
      // Unrecognized - try again
      console.log('Unrecognized voice input:', transcript);
      this.startListening();
    }
  }

  /**
   * Activate voice recognition when Idle gesture is detected
   */
  activateOnIdle() {
    if (this.idleTimeout) {
      clearTimeout(this.idleTimeout);
    }
    
    this.idleTimeout = setTimeout(() => {
      if (window.gestureVoiceIntegration?.lastGesture === 'Idle') {
        this.startListening();
      }
    }, this.IDLE_TIMEOUT_MS);
  }
}

// ============================================================================
// AUTOMATIC QUESTION READING (TTS)
// ============================================================================

/**
 * Automatic Question Reader
 * Reads questions automatically when they become visible/active
 */
class AutomaticQuestionReader {
  constructor() {
    this.lastReadQuestionIndex = null;
    this.lastReadQuestionType = null;
    this.isEnabled = true;
    this.readDelay = 500; // ms delay before reading
  }

  /**
   * Enable/disable automatic reading
   */
  setEnabled(enabled) {
    this.isEnabled = enabled;
  }

  /**
   * Check and read current question if needed
   */
  checkAndReadQuestion() {
    if (!this.isEnabled) return;
    if (typeof window.speechManager === 'undefined' || !window.speechManager.isSupported) {
      // Fallback to Web Speech API if speechManager not available
      this.readQuestionWithWebSpeech();
      return;
    }

    const actionHandler = window.gestureVoiceIntegration?.actionHandler;
    if (!actionHandler) return;

    actionHandler.updateCurrentQuestion();
    const currentIndex = actionHandler.currentQuestionIndex;
    const currentType = actionHandler.currentQuestionType;

    // Only read if question changed
    if (
      currentIndex !== null &&
      (currentIndex !== this.lastReadQuestionIndex || currentType !== this.lastReadQuestionType)
    ) {
      this.lastReadQuestionIndex = currentIndex;
      this.lastReadQuestionType = currentType;

      // Read question after a short delay
      setTimeout(() => {
        if (typeof window.speakQuestion === 'function') {
          window.speakQuestion(currentIndex, currentType, { target: { closest: () => null } });
        } else {
          this.readQuestionWithWebSpeech();
        }
      }, this.readDelay);
    }
  }

  /**
   * Fallback method to read question using Web Speech API
   */
  readQuestionWithWebSpeech() {
    if (!('speechSynthesis' in window)) return;

    const actionHandler = window.gestureVoiceIntegration?.actionHandler;
    if (!actionHandler) return;

    actionHandler.updateCurrentQuestion();
    const currentIndex = actionHandler.currentQuestionIndex;
    const currentType = actionHandler.currentQuestionType;

    // Only read if question changed
    if (
      currentIndex !== null &&
      (currentIndex !== this.lastReadQuestionIndex || currentType !== this.lastReadQuestionType)
    ) {
      this.lastReadQuestionIndex = currentIndex;
      this.lastReadQuestionType = currentType;

      // Find question text in DOM
      let questionText = '';
      const questionCards = document.querySelectorAll('.question-card, [id^="q-card-"]');
      if (questionCards[currentIndex]) {
        const questionElement = questionCards[currentIndex].querySelector('h4, h5, .question-text');
        if (questionElement) {
          questionText = questionElement.textContent.trim();
        }
      }

      if (questionText) {
        const utterance = new SpeechSynthesisUtterance(questionText);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        window.speechSynthesis.cancel(); // Cancel any ongoing speech
        window.speechSynthesis.speak(utterance);
      }
    }
  }

  /**
   * Manually trigger reading of current question
   */
  readCurrentQuestion() {
    const actionHandler = window.gestureVoiceIntegration?.actionHandler;
    if (!actionHandler) return;

    actionHandler.updateCurrentQuestion();
    const currentIndex = actionHandler.currentQuestionIndex;
    const currentType = actionHandler.currentQuestionType;

    if (currentIndex !== null && typeof window.speakQuestion === 'function') {
      window.speakQuestion(currentIndex, currentType, { target: { closest: () => null } });
    }
  }
}

// ============================================================================
// MAIN INTEGRATION MANAGER
// ============================================================================

/**
 * Gesture Voice Integration Manager
 * Main coordinator for gesture and voice integration
 */
class GestureVoiceIntegrationManager {
  constructor() {
    this.actionHandler = new GestureActionHandler();
    this.gestureDetector = new ExtendedGestureDetector();
    this.voiceRecognition = new VoiceRecognitionManager();
    this.questionReader = new AutomaticQuestionReader();
    
    this.lastGesture = null;
    this.isInitialized = false;
    this.skipFrames = 0;
    this.repeatFrames = 0;
  }

  /**
   * Initialize integration - hooks into existing gesture detection
   */
  init() {
    if (this.isInitialized) return;

    // Override detectGestures to include our extended detection
    this.overrideGestureDetection();

    // Set up question reading on question changes
    this.setupQuestionReading();

    // Set up keyboard shortcuts as fallback for Skip/Repeat
    this.setupKeyboardShortcuts();

    // Make available globally
    window.gestureVoiceIntegration = this;
    window.voiceRecognitionManager = this.voiceRecognition;

    this.isInitialized = true;
    console.log('✅ Gesture-Voice Integration initialized');
  }

  /**
   * Set up keyboard shortcuts as fallback for gestures
   */
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Only activate if gesture control is enabled
      if (!window.gestureEnabled) return;

      // Skip gesture: 'S' key
      if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        this.lastGesture = 'Skip';
        this.actionHandler.handleGesture('Skip');
      }

      // Repeat gesture: 'R' key
      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        this.lastGesture = 'Repeat';
        this.actionHandler.handleGesture('Repeat');
      }
    });
  }

  /**
   * Override existing detectGestures to add extended gesture support
   * Uses a separate monitoring loop that doesn't interfere with existing Yes/No detection
   */
  overrideGestureDetection() {
    const self = this;
    
    // Start separate monitoring loop for extended gestures (Skip/Repeat/Idle)
    // This runs independently and doesn't modify existing detectGestures
    this.startExtendedGestureMonitoring();
  }

  /**
   * Separate monitoring loop for Skip/Repeat/Idle gestures
   * This doesn't interfere with existing Yes/No gesture detection
   */
  startExtendedGestureMonitoring() {
    const self = this;
    
    async function monitorExtendedGestures() {
      // Only monitor if gesture control is enabled
      if (!window.gestureEnabled || !window.tmModel) {
        requestAnimationFrame(monitorExtendedGestures);
        return;
      }

      const video = document.getElementById('webcam');
      const canvas = document.getElementById('gesture-canvas');
      
      if (!video || !canvas) {
        requestAnimationFrame(monitorExtendedGestures);
        return;
      }

      try {
        // Get predictions for extended gesture detection
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        canvas.width = 224;
        canvas.height = 224;
        ctx.drawImage(video, 0, 0, 224, 224);
        const predictions = await window.tmModel.predict(canvas);
        
        // Process extended gestures
        const probs = {};
        predictions.forEach(p => {
          probs[p.className] = p.probability;
        });

        // Check for Skip gesture (if model supports it)
        // NOTE: Model needs to be retrained to include "Skip" class
        if (probs['Skip'] && probs['Skip'] > 0.7) {
          self.skipFrames = (self.skipFrames || 0) + 1;
          if (self.skipFrames >= 3) {
            self.skipFrames = 0;
            self.lastGesture = 'Skip';
            self.actionHandler.handleGesture('Skip');
          }
        } else {
          self.skipFrames = 0;
        }

        // Check for Repeat gesture
        // NOTE: Model needs to be retrained to include "Repeat" class
        if (probs['Repeat'] && probs['Repeat'] > 0.7) {
          self.repeatFrames = (self.repeatFrames || 0) + 1;
          if (self.repeatFrames >= 3) {
            self.repeatFrames = 0;
            self.lastGesture = 'Repeat';
            self.actionHandler.handleGesture('Repeat');
          }
        } else {
          self.repeatFrames = 0;
        }

        // Check for Idle state (No Gesture detected)
        const neutralProb = probs['No Gesture'] || probs['Neutral'] || probs['Background'] || 0;
        if (neutralProb > 0.60) {
          self.lastGesture = 'Idle';
          // Activate voice recognition fallback after Idle timeout
          self.voiceRecognition.activateOnIdle();
        } else {
          // Not idle - stop voice recognition
          self.voiceRecognition.stopListening();
        }
      } catch (error) {
        // Silently handle errors - don't break existing functionality
        console.log('Extended gesture monitoring error:', error);
      }

      // Continue monitoring loop
      requestAnimationFrame(monitorExtendedGestures);
    }

    // Start monitoring loop
    monitorExtendedGestures();
  }

  /**
   * Set up automatic question reading
   */
  setupQuestionReading() {
    // Read question when page loads or step changes
    const checkInterval = setInterval(() => {
      if (window.state?.step === 'universal-assessment' || window.state?.step === 'assessment') {
        this.questionReader.checkAndReadQuestion();
      }
    }, 1000);

    // Also read when answers change (question might have advanced)
    const originalSetUniversalAnswer = window.setUniversalAnswer;
    if (originalSetUniversalAnswer) {
      window.setUniversalAnswer = function(questionIndex, value) {
        originalSetUniversalAnswer(questionIndex, value);
        setTimeout(() => {
          window.gestureVoiceIntegration?.questionReader.checkAndReadQuestion();
        }, 300);
      };
    }

    const originalSetAnswer = window.setAnswer;
    if (originalSetAnswer) {
      window.setAnswer = function(questionIndex, value, disabilityKey) {
        originalSetAnswer(questionIndex, value, disabilityKey);
        setTimeout(() => {
          window.gestureVoiceIntegration?.questionReader.checkAndReadQuestion();
        }, 300);
      };
    }
  }

}

// ============================================================================
// AUTO-INITIALIZE
// ============================================================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      const integration = new GestureVoiceIntegrationManager();
      integration.init();
    }, 1000); // Wait for other scripts to load
  });
} else {
  setTimeout(() => {
    const integration = new GestureVoiceIntegrationManager();
    integration.init();
  }, 1000);
}
