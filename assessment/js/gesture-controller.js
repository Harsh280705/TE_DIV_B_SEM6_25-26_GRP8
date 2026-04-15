/**
 * Gesture Controller for Assessment System
 * 
 * This module handles real-time gesture recognition using:
 * - Webcam video capture
 * - Communication with Flask backend (gesture_server.py)
 * - Gesture-to-action mapping for assessment navigation
 * 
 * Supported Gestures:
 * - YES: Select "Yes" answer
 * - NO: Select "No" answer
 * - SKIP: Skip current question
 * - REPEAT: Repeat/re-read current question
 * - IDLE: Do nothing (no active gesture)
 */

class GestureController {
    constructor() {
        this.isActive = false;
        this.videoStream = null;
        this.videoElement = null;
        this.canvasElement = null;
        this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Backend API configuration
        this.apiUrl = 'http://localhost:5000/api';
        this.predictionInterval = null;
        this.predictionRate = 600; // ms between predictions (reduced for better performance)
        
        // Gesture state
        this.currentGesture = null;
        this.lastActionTime = 0;
        this.actionCooldown = 1500; // ms between actions for YES/NO
        this.repeatCooldown = 800; // ms between REPEAT actions (shorter for usability)
        this.lastRepeatTime = 0; // Track REPEAT separately
        this.lastProcessedGesture = null;
        this.gestureStabilityCount = 0;
        this.requiredStability = 3; // Require 3 consecutive same gestures
        
        // Audio preference
        this.audioEnabled = null; // null = not asked yet, true/false = user choice
        this.audioPreferenceAsked = false;
        
        // UI elements
        this.gestureIndicator = null;
        this.confidenceBar = null;
        this.statusText = null;
        
        // Callbacks
        this.onGestureDetected = null;
    }
    
    /**
     * Initialize gesture controller and check backend availability
     */
    async init() {
        try {
            // Check if backend is available
            const response = await fetch(`${this.apiUrl}/health`);
            const data = await response.json();
            
            if (data.status !== 'ok' || !data.model_loaded) {
                console.error('❌ Gesture backend not ready');
                return false;
            }
            
            console.log('✅ Gesture backend ready. Supported gestures:', data.gestures);
            return true;
            
        } catch (error) {
            console.error('❌ Failed to connect to gesture backend:', error);
            console.log('Make sure Flask server is running: python src/ml/gesture_server.py');
            return false;
        }
    }
    
    /**
     * Create gesture control UI in the assessment page
     */
    createUI() {
        // Main gesture control container
        const container = document.createElement('div');
        container.id = 'gesture-control-container';
        container.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.85);
            border: 2px solid #4CAF50;
            border-radius: 12px;
            padding: 15px;
            z-index: 1000;
            min-width: 300px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        `;
        
        container.innerHTML = `
            <div style="margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <h4 style="margin: 0; color: #4CAF50; font-size: 16px;">
                        ✋ Gesture Control
                    </h4>
                    <button id="gesture-toggle-btn" class="btn btn-sm btn-danger" style="padding: 4px 12px;">
                        Stop
                    </button>
                </div>
                
                <!-- Video preview (hidden by default) -->
                <div id="gesture-video-container" style="display: none; margin-bottom: 10px;">
                    <video id="gesture-video" autoplay playsinline style="width: 100%; max-height: 200px; border-radius: 8px; background: #000;"></video>
                    <canvas id="gesture-canvas" style="display: none;"></canvas>
                </div>
                
                <!-- Gesture indicator -->
                <div style="background: rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 12px; margin-bottom: 10px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                        <span style="color: #ccc; font-size: 13px;">Current Gesture:</span>
                        <span id="gesture-status-text" style="color: #fff; font-weight: bold; font-size: 16px;">
                            Not Active
                        </span>
                    </div>
                    
                    <div style="background: rgba(0, 0, 0, 0.3); height: 8px; border-radius: 4px; overflow: hidden;">
                        <div id="gesture-confidence-bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #4CAF50, #8BC34A); transition: width 0.3s;"></div>
                    </div>
                    
                    <div style="color: #888; font-size: 11px; margin-top: 5px;" id="gesture-confidence-text">
                        Confidence: 0%
                    </div>
                </div>
                
                <!-- Gesture legend -->
                <div style="font-size: 12px; color: #ccc; line-height: 1.6;">
                    <div style="font-weight: bold; color: #4CAF50; margin-bottom: 5px;">Gestures:</div>
                    <div>👍 <strong>YES</strong> - Select Yes</div>
                    <div>👎 <strong>NO</strong> - Select No</div>
                    <div>👉 <strong>SKIP</strong> - Skip question</div>
                    <div>🔁 <strong>REPEAT</strong> - Repeat question</div>
                    <div>✋ <strong>IDLE</strong> - No action</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(container);
        
        // Store references
        this.gestureIndicator = container;
        this.confidenceBar = document.getElementById('gesture-confidence-bar');
        this.statusText = document.getElementById('gesture-status-text');
        this.videoElement = document.getElementById('gesture-video');
        this.canvasElement = document.getElementById('gesture-canvas');
        
        // Setup toggle button
        const toggleBtn = document.getElementById('gesture-toggle-btn');
        toggleBtn.addEventListener('click', () => this.toggle());
        
        // Auto-start gesture control on page load (IMMEDIATE, NON-BLOCKING)
        // Start immediately without artificial delays
        this.start();
    }
    
    /**
     * Toggle gesture control on/off
     */
    async toggle() {
        if (this.isActive) {
            await this.stop();
        } else {
            await this.start();
        }
    }
    
    /**
     * Start gesture recognition
     */
    async start() {
        if (this.isActive) return;
        
        try {
            // Show loading state
            this.statusText.textContent = 'Starting camera...';
            this.statusText.style.color = '#FFA500';
            
            // Request webcam access (async, non-blocking)
            this.videoStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    facingMode: 'user'
                }
            });
            
            this.videoElement.srcObject = this.videoStream;
            
            // Show video preview
            document.getElementById('gesture-video-container').style.display = 'block';
            
            // Wait for video to be ready (async)
            await new Promise(resolve => {
                this.videoElement.onloadedmetadata = () => {
                    this.videoElement.play();
                    resolve();
                };
            });
            
            // Reset session on backend (async, don't wait)
            fetch(`${this.apiUrl}/reset_session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ session_id: this.sessionId })
            }).catch(err => console.log('Session reset failed:', err));
            
            // Start prediction loop
            this.isActive = true;
            this.startPredictionLoop();
            
            // Update UI
            document.getElementById('gesture-toggle-btn').textContent = 'Stop';
            document.getElementById('gesture-toggle-btn').classList.replace('btn-success', 'btn-danger');
            this.statusText.textContent = 'Initializing...';
            this.statusText.style.color = '#FFA500';
            
            console.log('✅ Gesture control started');
            
        } catch (error) {
            console.error('❌ Failed to start gesture control:', error);
            alert('Failed to access webcam. Please grant camera permissions.');
            await this.stop();
        }
    }
    
    /**
     * Stop gesture recognition
     */
    async stop() {
        if (!this.isActive) return;
        
        this.isActive = false;
        
        // Stop prediction loop
        if (this.predictionInterval) {
            clearInterval(this.predictionInterval);
            this.predictionInterval = null;
        }
        
        // Stop video stream
        if (this.videoStream) {
            this.videoStream.getTracks().forEach(track => track.stop());
            this.videoStream = null;
        }
        
        // Hide video preview
        document.getElementById('gesture-video-container').style.display = 'none';
        
        // Update UI
        document.getElementById('gesture-toggle-btn').textContent = 'Start';
        document.getElementById('gesture-toggle-btn').classList.replace('btn-danger', 'btn-success');
        this.statusText.textContent = 'Not Active';
        this.statusText.style.color = '#ccc';
        this.confidenceBar.style.width = '0%';
        
        console.log('✅ Gesture control stopped');
    }
    
    /**
     * Start prediction loop
     */
    startPredictionLoop() {
        this.predictionInterval = setInterval(async () => {
            if (!this.isActive) return;
            
            try {
                await this.captureAndPredict();
            } catch (error) {
                console.error('Prediction error:', error);
            }
        }, this.predictionRate);
    }
    
    /**
     * Capture frame and get prediction from backend
     */
    async captureAndPredict() {
        if (!this.videoElement || !this.canvasElement) return;
        
        // Draw video frame to canvas
        const ctx = this.canvasElement.getContext('2d');
        this.canvasElement.width = this.videoElement.videoWidth;
        this.canvasElement.height = this.videoElement.videoHeight;
        ctx.drawImage(this.videoElement, 0, 0);
        
        // Convert canvas to base64
        const imageData = this.canvasElement.toDataURL('image/jpeg', 0.8);
        
        // Send to backend
        try {
            const response = await fetch(`${this.apiUrl}/predict`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image: imageData,
                    session_id: this.sessionId
                })
            });
            
            const result = await response.json();
            
            if (result.error) {
                console.error('Prediction error:', result.error);
                return;
            }
            
            // Update UI
            this.updateUI(result);
            
            // Handle gesture action
            this.handleGesture(result);
            
        } catch (error) {
            console.error('Failed to get prediction:', error);
        }
    }
    
    /**
     * Update gesture UI with prediction results
     */
    updateUI(result) {
        const gesture = result.gesture;
        const confidence = result.confidence;
        
        // Update gesture text
        this.statusText.textContent = gesture;
        
        // Update confidence bar
        this.confidenceBar.style.width = `${confidence * 100}%`;
        document.getElementById('gesture-confidence-text').textContent = 
            `Confidence: ${(confidence * 100).toFixed(1)}%`;
        
        // Update colors based on gesture
        if (!result.hand_detected) {
            this.statusText.style.color = '#888';
        } else if (gesture === 'DETECTING...' || gesture === 'IDLE') {
            this.statusText.style.color = '#FFA500';
        } else if (['YES', 'NO', 'SKIP', 'REPEAT'].includes(gesture)) {
            this.statusText.style.color = '#4CAF50';
        } else {
            this.statusText.style.color = '#ccc';
        }
    }
    
    /**
     * Handle detected gesture and trigger appropriate action
     */
    handleGesture(result) {
        const gesture = result.gesture;
        const confidence = result.confidence;
        
        // Debug logging for all gestures
        console.log(`Gesture detected: ${gesture}, Confidence: ${(confidence * 100).toFixed(1)}%, Hand: ${result.hand_detected}`);
        
        // Only process high-confidence, actionable gestures
        if (!result.hand_detected || confidence < 0.7) {
            this.gestureStabilityCount = 0;
            this.lastProcessedGesture = null;
            return;
        }
        if (!['YES', 'NO', 'SKIP', 'REPEAT'].includes(gesture)) {
            this.gestureStabilityCount = 0;
            this.lastProcessedGesture = null;
            return;
        }
        
        console.log(`👍 Actionable gesture: ${gesture}, Stability: ${this.gestureStabilityCount}/${this.requiredStability}`);
        
        // Check for gesture stability (require same gesture multiple times)
        if (gesture === this.lastProcessedGesture) {
            this.gestureStabilityCount++;
        } else {
            this.gestureStabilityCount = 1;
            this.lastProcessedGesture = gesture;
        }
        
        // Only trigger action if gesture is stable
        if (this.gestureStabilityCount < this.requiredStability) {
            console.log(`⏳ Waiting for stability: ${this.gestureStabilityCount}/${this.requiredStability}`);
            return;
        }
        
        // Check cooldown to prevent rapid-fire actions
        const now = Date.now();
        
        // REPEAT has its own shorter cooldown for better usability
        if (gesture === 'REPEAT') {
            if (now - this.lastRepeatTime < this.repeatCooldown) {
                console.log(`⏰ REPEAT cooldown active: ${now - this.lastRepeatTime}ms / ${this.repeatCooldown}ms`);
                return;
            }
        } else {
            // YES/NO/SKIP use standard cooldown
            if (now - this.lastActionTime < this.actionCooldown) {
                console.log(`⏰ Cooldown active: ${now - this.lastActionTime}ms / ${this.actionCooldown}ms`);
                return;
            }
        }
        
        console.log(`✅ Triggering action for: ${gesture}`);
        
        // Reset stability counter after triggering
        this.gestureStabilityCount = 0;
        
        // Update appropriate timestamp
        if (gesture === 'REPEAT') {
            this.lastRepeatTime = now;
        } else {
            this.lastActionTime = now;
        }
        
        this.currentGesture = gesture;
        
        // Handle audio preference question first (if not asked yet)
        if (!this.audioPreferenceAsked) {
            this.handleAudioPreference(gesture);
            return;
        }
        
        // Trigger action based on gesture
        switch (gesture) {
            case 'YES':
                this.triggerYesAction();
                break;
            case 'NO':
                this.triggerNoAction();
                break;
            case 'SKIP':
                this.triggerSkipAction();
                break;
            case 'REPEAT':
                this.triggerRepeatAction();
                break;
        }
        
        // Show visual feedback
        this.showActionFeedback(gesture);
        
        // Callback if registered
        if (this.onGestureDetected) {
            this.onGestureDetected(gesture, confidence);
        }
    }
    
    /**
     * Handle audio preference question at start
     */
    handleAudioPreference(gesture) {
        if (gesture === 'YES') {
            this.audioEnabled = true;
            this.audioPreferenceAsked = true;
            this.speakText('Audio support enabled. Questions will be read aloud automatically.');
            this.showActionFeedback('AUDIO ENABLED');
            
            // Store preference
            sessionStorage.setItem('audioEnabled', 'true');
            
            // Remove prompt
            this.removeAudioPreferencePrompt();
            
            // Read first question IMMEDIATELY (within 5 second requirement)
            // Use requestAnimationFrame to avoid blocking, but no artificial delay
            requestAnimationFrame(() => {
                this.readCurrentQuestionAuto();
            });
            
        } else if (gesture === 'NO') {
            this.audioEnabled = false;
            this.audioPreferenceAsked = true;
            this.speakText('Audio support disabled. You can still use gestures to answer.');
            this.showActionFeedback('AUDIO DISABLED');
            
            // Store preference
            sessionStorage.setItem('audioEnabled', 'false');
            
            // Remove prompt
            this.removeAudioPreferencePrompt();
        }
    }
    
    /**
     * Ask audio preference question
     */
    askAudioPreference() {
        const text = 'Do you need audio support for all questions? Show thumbs up for Yes, thumbs down for No.';
        this.speakText(text);
        
        // Show visual prompt
        const prompt = document.createElement('div');
        prompt.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.95);
            color: white;
            padding: 40px 60px;
            border-radius: 20px;
            font-size: 24px;
            font-weight: bold;
            z-index: 10001;
            text-align: center;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
            border: 3px solid #4CAF50;
        `;
        prompt.innerHTML = `
            <div style="font-size: 48px; margin-bottom: 20px;">🔊</div>
            <div style="margin-bottom: 30px;">Do you need audio support for all questions?</div>
            <div style="display: flex; gap: 40px; justify-content: center; font-size: 18px;">
                <div style="text-align: center;">
                    <div style="font-size: 60px;">👍</div>
                    <div>YES - Enable Audio</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 60px;">👎</div>
                    <div>NO - Disable Audio</div>
                </div>
            </div>
        `;
        prompt.id = 'audio-preference-prompt';
        document.body.appendChild(prompt);
    }
    
    /**
     * Remove audio preference prompt
     */
    removeAudioPreferencePrompt() {
        const prompt = document.getElementById('audio-preference-prompt');
        if (prompt) {
            prompt.style.opacity = '0';
            setTimeout(() => prompt.remove(), 500);
        }
    }
    
    /**
     * Trigger YES action - select Yes answer for current question
     */
    triggerYesAction() {
        // Remove audio preference prompt if showing
        this.removeAudioPreferencePrompt();
        
        // Use existing simulateAnswer function if available
        if (typeof window.simulateAnswer === 'function') {
            window.simulateAnswer(true);
            console.log('✅ YES gesture → simulateAnswer(true)');
        } else {
            // Fallback: Find and click Yes radio button
            this.clickAnswerButton(true);
        }
        
        // Read next question if audio enabled (IMMEDIATE)
        if (this.audioEnabled) {
            // Use requestAnimationFrame for immediate but non-blocking execution
            requestAnimationFrame(() => this.readCurrentQuestionAuto());
        }
    }
    
    /**
     * Trigger NO action - select No answer for current question
     */
    triggerNoAction() {
        // Remove audio preference prompt if showing
        this.removeAudioPreferencePrompt();
        
        // Use existing simulateAnswer function if available
        if (typeof window.simulateAnswer === 'function') {
            window.simulateAnswer(false);
            console.log('✅ NO gesture → simulateAnswer(false)');
        } else {
            // Fallback: Find and click No radio button
            this.clickAnswerButton(false);
        }
        
        // Read next question if audio enabled (IMMEDIATE)
        if (this.audioEnabled) {
            // Use requestAnimationFrame for immediate but non-blocking execution
            requestAnimationFrame(() => this.readCurrentQuestionAuto());
        }
    }
    
    /**
     * Click answer button (fallback method)
     */
    clickAnswerButton(isYes) {
        // Try to find current unanswered question
        const step = window.state?.step;
        
        if (step === 'universal-assessment') {
            const answers = window.state?.universalAnswers || [];
            const index = answers.findIndex(a => a === null);
            if (index !== -1) {
                const radioId = `uq${index}-${isYes ? 'yes' : 'no'}`;
                const radio = document.getElementById(radioId);
                if (radio) {
                    radio.click();
                    console.log(`✅ Clicked ${radioId}`);
                    return;
                }
            }
        } else if (step === 'assessment') {
            const disabilities = window.state?.detectedDisabilities || [];
            const currentIndex = window.state?.currentDisabilityIndex || 0;
            const disabilityKey = disabilities[currentIndex]?.disKey;
            
            if (disabilityKey && window.state?.disabilityAnswers?.[disabilityKey]) {
                const answers = window.state.disabilityAnswers[disabilityKey];
                const index = answers.findIndex(a => a === null);
                if (index !== -1) {
                    const radioId = `q${index}-${isYes ? 'yes' : 'no'}`;
                    const radio = document.getElementById(radioId);
                    if (radio) {
                        radio.click();
                        console.log(`✅ Clicked ${radioId}`);
                        return;
                    }
                }
            }
        }
        
        // Ultimate fallback: find any unchecked radio
        const value = isYes ? '1' : '0';
        const radios = document.querySelectorAll(`input[type="radio"][value="${value}"]:not(:checked)`);
        if (radios.length > 0) {
            radios[0].click();
            console.log(`✅ Fallback clicked radio`);
        }
    }
    
    /**
     * Trigger SKIP action - skip current question
     */
    triggerSkipAction() {
        console.log('⏭️ SKIP gesture detected (DISABLED per requirements)');
        // SKIP is DISABLED per requirements - do nothing
        // Do not change question, do not move forward
        return;
    }
    
    /**
     * Scroll to next unanswered question
     */
    scrollToNextQuestion() {
        const step = window.state?.step;
        let nextIndex = -1;
        let cardId = '';
        
        if (step === 'universal-assessment') {
            const answers = window.state?.universalAnswers || [];
            const currentIndex = answers.findIndex(a => a === null);
            nextIndex = currentIndex !== -1 ? currentIndex + 1 : -1;
            
            if (nextIndex !== -1 && nextIndex < answers.length) {
                cardId = `q-card-${nextIndex}`;
            }
        } else if (step === 'assessment') {
            const disabilityKey = window.state?.detectedDisabilities?.[window.state?.currentDisabilityIndex]?.disKey;
            if (disabilityKey && window.state?.disabilityAnswers?.[disabilityKey]) {
                const answers = window.state.disabilityAnswers[disabilityKey];
                const currentIndex = answers.findIndex(a => a === null);
                nextIndex = currentIndex !== -1 ? currentIndex + 1 : -1;
                
                if (nextIndex !== -1 && nextIndex < answers.length) {
                    cardId = `q-card-${nextIndex}`;
                }
            }
        }
        
        if (cardId) {
            const card = document.getElementById(cardId);
            if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Highlight briefly
                card.style.border = '3px solid #FFD700';
                card.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.6)';
                setTimeout(() => {
                    card.style.border = '';
                    card.style.boxShadow = '';
                }, 2000);
            }
        }
    }
    
    /**
     * Trigger REPEAT action - replay current question audio
     * IMPORTANT: REPEAT works regardless of audioEnabled setting
     * Uses direct, synchronous approach for maximum reliability
     */
    triggerRepeatAction() {
        console.log('🔁 ========== REPEAT GESTURE TRIGGERED ==========');
        
        // Get current question index and type
        const step = window.state?.step;
        let questionIndex = -1;
        let questionType = null;
        let questionText = null;
        
        // Find current question
        if (step === 'universal-assessment') {
            const answers = window.state?.universalAnswers || [];
            questionIndex = answers.findIndex(a => a === null);
            questionType = 'universal';
            
            if (questionIndex !== -1 && window.universalQuestions) {
                questionText = window.universalQuestions[questionIndex];
                console.log(`✅ Found universal question ${questionIndex}:`, questionText?.substring(0, 50));
            }
        } else if (step === 'assessment') {
            const disabilityKey = window.state?.detectedDisabilities?.[window.state?.currentDisabilityIndex]?.disKey;
            
            if (disabilityKey && window.state?.disabilityAnswers?.[disabilityKey]) {
                const answers = window.state.disabilityAnswers[disabilityKey];
                questionIndex = answers.findIndex(a => a === null);
                questionType = 'disability';
                
                if (questionIndex !== -1 && window.disabilityData?.[disabilityKey]?.questions) {
                    questionText = window.disabilityData[disabilityKey].questions[questionIndex];
                    console.log(`✅ Found disability question ${questionIndex}:`, questionText?.substring(0, 50));
                }
            }
        }
        
        // Validate we have question text
        if (!questionText) {
            console.error('❌ No question text found. Step:', step, 'Index:', questionIndex);
            console.log('State:', window.state);
            return;
        }
        
        // DIRECT SPEECH SYNTHESIS - Most reliable method
        console.log('🔊 Speaking question directly with browser speech synthesis...');
        
        try {
            // Cancel any ongoing speech
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
                
                // Small delay to ensure cancel completes
                setTimeout(() => {
                    const utterance = new SpeechSynthesisUtterance(questionText);
                    utterance.rate = 0.9;
                    utterance.pitch = 1.0;
                    utterance.volume = 1.0;
                    
                    // Success/error handlers
                    utterance.onstart = () => {
                        console.log('✅ Speech started successfully');
                    };
                    
                    utterance.onend = () => {
                        console.log('✅ Speech completed');
                    };
                    
                    utterance.onerror = (event) => {
                        console.error('❌ Speech error:', event.error);
                    };
                    
                    // Speak it!
                    window.speechSynthesis.speak(utterance);
                    console.log('✅ REPEAT: Audio playback initiated');
                }, 50);
            } else {
                console.error('❌ speechSynthesis not available in this browser');
            }
        } catch (error) {
            console.error('❌ Error in REPEAT audio playback:', error);
        }
        
        console.log('🔁 ========== REPEAT COMPLETE ==========');
    }
    
    /**
     * Find the TTS button for current question
     */
    findCurrentTTSButton() {
        console.log('🔍 Finding TTS button for current question...');
        const step = window.state?.step;
        let questionIndex = -1;
        
        if (step === 'universal-assessment') {
            const answers = window.state?.universalAnswers || [];
            questionIndex = answers.findIndex(a => a === null);
            console.log(`Step: universal-assessment, Question index: ${questionIndex}`);
        } else if (step === 'assessment') {
            const disabilityKey = window.state?.detectedDisabilities?.[window.state?.currentDisabilityIndex]?.disKey;
            if (disabilityKey && window.state?.disabilityAnswers?.[disabilityKey]) {
                const answers = window.state.disabilityAnswers[disabilityKey];
                questionIndex = answers.findIndex(a => a === null);
                console.log(`Step: assessment, Disability: ${disabilityKey}, Question index: ${questionIndex}`);
            }
        }
        
        if (questionIndex === -1) {
            console.log('❌ No unanswered question found (questionIndex = -1)');
            return null;
        }
        
        // Try to find TTS button by various selectors
        const selectors = [
            `#q-card-${questionIndex} .tts-btn`,
            `.question-card:nth-child(${questionIndex + 1}) .tts-btn`,
            `.tts-btn[onclick*="${questionIndex}"]`
        ];
        
        console.log('Trying selectors:', selectors);
        
        for (const selector of selectors) {
            const button = document.querySelector(selector);
            if (button) {
                console.log(`✅ Found TTS button with selector: ${selector}`);
                return button;
            }
        }
        
        // Fallback: find any visible TTS button
        const allButtons = document.querySelectorAll('.tts-btn');
        console.log(`Total TTS buttons found: ${allButtons.length}`);
        if (allButtons.length > questionIndex) {
            console.log(`✅ Using fallback: TTS button at index ${questionIndex}`);
            return allButtons[questionIndex];
        }
        
        console.log('❌ No TTS button found with any method');
        return null;
    }
    
    /**
     * Read current question aloud (for auto-reading after answer)
     * Uses existing speakQuestion function or Web Speech API
     */
    readCurrentQuestionAuto() {
        // Find current question index and type
        const step = window.state?.step;
        let questionIndex = -1;
        let questionType = null;
        
        if (step === 'universal-assessment') {
            const answers = window.state?.universalAnswers || [];
            questionIndex = answers.findIndex(a => a === null);
            questionType = 'universal';
        } else if (step === 'assessment') {
            const disabilityKey = window.state?.detectedDisabilities?.[window.state?.currentDisabilityIndex]?.disKey;
            if (disabilityKey && window.state?.disabilityAnswers?.[disabilityKey]) {
                const answers = window.state.disabilityAnswers[disabilityKey];
                questionIndex = answers.findIndex(a => a === null);
                questionType = 'disability';
            }
        }
        
        if (questionIndex === -1 || !questionType) {
            console.log('⚠️ No unanswered question found');
            return;
        }
        
        // Cancel any ongoing speech
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
        
        // Speak IMMEDIATELY - no delays (5 second requirement)
        // Use existing speakQuestion function if available
        if (typeof window.speakQuestion === 'function') {
            // Create a fake event object to satisfy the function
            const fakeEvent = {
                target: { closest: () => null }
            };
            window.speakQuestion(questionIndex, questionType, fakeEvent);
            console.log(`🔊 Auto-reading question ${questionIndex} (${questionType})`);
        } else {
            // Fallback to Web Speech API
            const questionText = this.getCurrentQuestionText();
            if (questionText && 'speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(questionText);
                utterance.rate = 0.9;
                utterance.pitch = 1;
                utterance.volume = 1;
                window.speechSynthesis.speak(utterance);
                console.log('🔊 Auto-reading via fallback TTS');
            }
        }
    }
    
    /**
     * Read current question directly (used by REPEAT via TTS button click)
     * Fallback if TTS button not found
     */
    readCurrentQuestionDirect() {
        // Find current question index and type
        const step = window.state?.step;
        let questionIndex = -1;
        let questionType = null;
        
        if (step === 'universal-assessment') {
            const answers = window.state?.universalAnswers || [];
            questionIndex = answers.findIndex(a => a === null);
            questionType = 'universal';
        } else if (step === 'assessment') {
            const disabilityKey = window.state?.detectedDisabilities?.[window.state?.currentDisabilityIndex]?.disKey;
            if (disabilityKey && window.state?.disabilityAnswers?.[disabilityKey]) {
                const answers = window.state.disabilityAnswers[disabilityKey];
                questionIndex = answers.findIndex(a => a === null);
                questionType = 'disability';
            }
        }
        
        if (questionIndex === -1 || !questionType) return;
        
        // Use existing speakQuestion function
        if (typeof window.speakQuestion === 'function') {
            const fakeEvent = {
                target: { closest: () => null }
            };
            window.speakQuestion(questionIndex, questionType, fakeEvent);
        } else {
            // Ultimate fallback
            const questionText = this.getCurrentQuestionText();
            if (questionText && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(questionText);
                utterance.rate = 0.9;
                utterance.pitch = 1;
                utterance.volume = 1;
                window.speechSynthesis.speak(utterance);
            }
        }
    }
    
    /**
     * Read current question aloud
     */
    readCurrentQuestion() {
        if (!('speechSynthesis' in window)) {
            console.log('⚠️ TTS not supported');
            return;
        }
        
        // Try to use existing speakQuestion function
        if (typeof window.speakQuestion === 'function') {
            const step = window.state?.step;
            let currentIndex = -1;
            
            if (step === 'universal-assessment') {
                const answers = window.state?.universalAnswers || [];
                currentIndex = answers.findIndex(a => a === null);
            } else if (step === 'assessment') {
                const disabilityKey = window.state?.detectedDisabilities?.[window.state?.currentDisabilityIndex]?.disKey;
                if (disabilityKey && window.state?.disabilityAnswers?.[disabilityKey]) {
                    const answers = window.state.disabilityAnswers[disabilityKey];
                    currentIndex = answers.findIndex(a => a === null);
                }
            }
            
            if (currentIndex !== -1) {
                window.speakQuestion(currentIndex, step, { target: { closest: () => null } });
                return;
            }
        }
        
        // Fallback: Find and read question text from DOM
        const questionText = this.getCurrentQuestionText();
        if (questionText) {
            this.speakText(questionText);
        }
    }
    
    /**
     * Get current question text from DOM
     */
    getCurrentQuestionText() {
        const step = window.state?.step;
        let questionIndex = -1;
        
        if (step === 'universal-assessment') {
            const answers = window.state?.universalAnswers || [];
            questionIndex = answers.findIndex(a => a === null);
        } else if (step === 'assessment') {
            const disabilityKey = window.state?.detectedDisabilities?.[window.state?.currentDisabilityIndex]?.disKey;
            if (disabilityKey && window.state?.disabilityAnswers?.[disabilityKey]) {
                const answers = window.state.disabilityAnswers[disabilityKey];
                questionIndex = answers.findIndex(a => a === null);
            }
        }
        
        if (questionIndex === -1) return null;
        
        // Try multiple selectors to find question text
        const selectors = [
            `#q-card-${questionIndex} h4`,
            `#q-card-${questionIndex} h5`,
            `#q-card-${questionIndex} .question-text`,
            `.question-card:nth-child(${questionIndex + 1}) h4`,
            `.question-card:nth-child(${questionIndex + 1}) h5`
        ];
        
        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) {
                return element.textContent.trim();
            }
        }
        
        return null;
    }
    
    /**
     * Speak text using Web Speech API
     */
    speakText(text) {
        if (!('speechSynthesis' in window)) return;
        
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        window.speechSynthesis.speak(utterance);
    }
    
    /**
     * Show visual feedback for gesture action
     */
    showActionFeedback(gesture) {
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 30px 50px;
            border-radius: 15px;
            font-size: 32px;
            font-weight: bold;
            z-index: 10000;
            text-align: center;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
            animation: fadeInOut 1.5s ease-in-out;
        `;
        
        const icons = {
            'YES': '👍',
            'NO': '👎',
            'SKIP': '⏭️',
            'REPEAT': '🔁'
        };
        
        feedback.innerHTML = `
            <div style="font-size: 60px; margin-bottom: 10px;">${icons[gesture] || '✋'}</div>
            <div>${gesture}</div>
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.style.opacity = '0';
            setTimeout(() => feedback.remove(), 500);
        }, 1000);
    }
    
    /**
     * Register callback for gesture detection
     */
    onGesture(callback) {
        this.onGestureDetected = callback;
    }
}

// Add animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
`;
document.head.appendChild(style);

// Initialize and export
window.GestureController = GestureController;

// Auto-initialize on page load (IMMEDIATE - NO DELAYS)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        window.gestureController = new GestureController();
        const ready = await window.gestureController.init();
        if (ready) {
            window.gestureController.createUI();
            console.log('✅ Gesture Controller ready');
            
            // Ask audio preference immediately when gesture starts (no 3s delay)
            // Use event listener to catch when isActive becomes true
            const checkAndAsk = () => {
                if (window.gestureController.isActive && !window.gestureController.audioPreferenceAsked) {
                    window.gestureController.askAudioPreference();
                } else if (!window.gestureController.isActive) {
                    // Check again in 100ms if not active yet
                    setTimeout(checkAndAsk, 100);
                }
            };
            checkAndAsk();
        } else {
            console.log('⚠️ Gesture Controller not available (backend not running)');
        }
    });
} else {
    (async () => {
        window.gestureController = new GestureController();
        const ready = await window.gestureController.init();
        if (ready) {
            window.gestureController.createUI();
            console.log('✅ Gesture Controller ready');
            
            // Ask audio preference immediately when gesture starts (no 3s delay)
            const checkAndAsk = () => {
                if (window.gestureController.isActive && !window.gestureController.audioPreferenceAsked) {
                    window.gestureController.askAudioPreference();
                } else if (!window.gestureController.isActive) {
                    // Check again in 100ms if not active yet
                    setTimeout(checkAndAsk, 100);
                }
            };
            checkAndAsk();
        } else {
            console.log('⚠️ Gesture Controller not available (backend not running)');
        }
    })();
}
