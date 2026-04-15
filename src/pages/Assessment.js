// Assessment page component
//  import { assessmentQuestions } from '../data/mockData.js';
import { renderQuestion, renderMultiSelectQuestion, renderTextareaQuestion } from '../components/QuestionComponent.js';

export function renderAssessment() {
    const totalSteps = 5; // Step 1: Basic Info, Step 2: Vision/Hearing/Mobility/Hand, Step 3: Learning/Communication/Behavior, Step 4: Self-care/Daily, Step 5: Impact & Goals

    // Helper function to render questions for a domain
    const renderDomainQuestions = (domainKey, domainTitle) => {
        const questions = assessmentQuestions[domainKey] || [];
        return questions.map(q => {
            return renderQuestion({
                id: q.id,
                question: q.question,
                options: q.options,
                required: true
            });
        }).join('');
    };

    return `
        <main role="main" aria-labelledby="assessment-heading">
            <div class="container" style="max-width: 800px; padding: 2rem 20px;">
                <h1 id="assessment-heading">Career Assessment</h1>
                <p class="mb-4">This assessment helps us understand your strengths and areas where you may need support. All information is confidential.</p>
                
                <!-- Progress Bar -->
                <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="${totalSteps}" aria-label="Assessment progress">
                    <div class="progress-fill" id="progress-fill" style="width: 0%"></div>
                </div>

                <form id="assessment-form" onsubmit="handleAssessmentSubmit(event)">
                    <!-- Step 1: Core profile confirmation -->
                    <div class="assessment-step active" id="step-1" role="tabpanel" aria-labelledby="step-1-label">
                        <div class="card">
                            <h2 id="step-1-label">Basic Information</h2>
                            <p>Let's start with some basic information about you.</p>
                            <div class="form-group">
                                <label for="assessment-name">Name</label>
                                <input type="text" id="assessment-name" name="name" required aria-required="true" aria-label="Your name">
                            </div>
                            <div class="form-group">
                                <label for="assessment-age">Age</label>
                                <input type="number" id="assessment-age" name="age" min="1" max="120" required aria-required="true" aria-label="Your age">
                            </div>
                            <div class="form-group">
                                <label>What are your main interests? (Select all that apply)</label>
                                <div class="checkbox-group">
                                    <input type="checkbox" id="interest-tech" name="interests" value="technology" aria-label="Technology">
                                    <label for="interest-tech">Technology</label>
                                </div>
                                <div class="checkbox-group">
                                    <input type="checkbox" id="interest-creative" name="interests" value="creative" aria-label="Creative Arts">
                                    <label for="interest-creative">Creative Arts</label>
                                </div>
                                <div class="checkbox-group">
                                    <input type="checkbox" id="interest-business" name="interests" value="business" aria-label="Business">
                                    <label for="interest-business">Business</label>
                                </div>
                                <div class="checkbox-group">
                                    <input type="checkbox" id="interest-education" name="interests" value="education" aria-label="Education">
                                    <label for="interest-education">Education</label>
                                </div>
                                <div class="checkbox-group">
                                    <input type="checkbox" id="interest-sports" name="interests" value="sports" aria-label="Sports">
                                    <label for="interest-sports">Sports</label>
                                </div>
                                <div class="checkbox-group">
                                    <input type="checkbox" id="interest-government" name="interests" value="government" aria-label="Government Jobs">
                                    <label for="interest-government">Government Jobs</label>
                                </div>
                            </div>
                            <button type="button" class="btn btn-primary" onclick="nextStep()" aria-label="Continue to next step">Next</button>
                        </div>
                    </div>

                    <!-- Step 2: Vision, Hearing, Mobility, Hand use -->
                    <div class="assessment-step" id="step-2" role="tabpanel" aria-labelledby="step-2-label" style="display: none;">
                        <div class="card">
                            <h2 id="step-2-label">Vision, Hearing, Mobility & Hand Use</h2>
                            <p>Please answer the following questions honestly. There are no right or wrong answers.</p>
                            
                            <h3 style="margin-top: 2rem; margin-bottom: 1rem;">A. Vision</h3>
                            ${renderDomainQuestions('vision', 'Vision')}
                            
                            <h3 style="margin-top: 2rem; margin-bottom: 1rem;">B. Hearing</h3>
                            ${renderDomainQuestions('hearing', 'Hearing')}
                            
                            <h3 style="margin-top: 2rem; margin-bottom: 1rem;">C. Mobility / Movement</h3>
                            ${renderDomainQuestions('mobility', 'Mobility')}
                            
                            <h3 style="margin-top: 2rem; margin-bottom: 1rem;">D. Hand Use / Fine Motor</h3>
                            ${renderDomainQuestions('handUse', 'Hand Use')}
                            
                            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                                <button type="button" class="btn btn-outline" onclick="prevStep()" aria-label="Go back to previous step">Back</button>
                                <button type="button" class="btn btn-primary" onclick="nextStep()" aria-label="Continue to next step">Next</button>
                            </div>
                        </div>
                    </div>

                    <!-- Step 3: Learning, Communication, Behavior -->
                    <div class="assessment-step" id="step-3" role="tabpanel" aria-labelledby="step-3-label" style="display: none;">
                        <div class="card">
                            <h2 id="step-3-label">Learning, Communication & Behavior</h2>
                            <p>Please answer the following questions honestly. There are no right or wrong answers.</p>
                            
                            <h3 style="margin-top: 2rem; margin-bottom: 1rem;">E. Learning / Understanding / Memory</h3>
                            ${renderDomainQuestions('learning', 'Learning')}
                            
                            <h3 style="margin-top: 2rem; margin-bottom: 1rem;">F. Communication</h3>
                            ${renderDomainQuestions('communication', 'Communication')}
                            
                            <h3 style="margin-top: 2rem; margin-bottom: 1rem;">G. Behavior / Emotions / Social Interaction</h3>
                            ${renderDomainQuestions('behavior', 'Behavior')}
                            
                            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                                <button type="button" class="btn btn-outline" onclick="prevStep()" aria-label="Go back to previous step">Back</button>
                                <button type="button" class="btn btn-primary" onclick="nextStep()" aria-label="Continue to next step">Next</button>
                            </div>
                        </div>
                    </div>

                    <!-- Step 4: Self-care, Daily activities -->
                    <div class="assessment-step" id="step-4" role="tabpanel" aria-labelledby="step-4-label" style="display: none;">
                        <div class="card">
                            <h2 id="step-4-label">Self-Care & Daily Activities</h2>
                            <p>Please answer the following questions honestly. There are no right or wrong answers.</p>
                            
                            <h3 style="margin-top: 2rem; margin-bottom: 1rem;">H. Self-Care</h3>
                            ${renderDomainQuestions('selfCare', 'Self-Care')}
                            
                            <h3 style="margin-top: 2rem; margin-bottom: 1rem;">I. Daily Activities & Work/Study</h3>
                            ${renderDomainQuestions('dailyActivities', 'Daily Activities')}
                            
                            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                                <button type="button" class="btn btn-outline" onclick="prevStep()" aria-label="Go back to previous step">Back</button>
                                <button type="button" class="btn btn-primary" onclick="nextStep()" aria-label="Continue to next step">Next</button>
                            </div>
                        </div>
                    </div>

                    <!-- Step 5: Impact & Goals -->
                    <div class="assessment-step" id="step-5" role="tabpanel" aria-labelledby="step-5-label" style="display: none;">
                        <div class="card">
                            <h2 id="step-5-label">Impact & Goals</h2>
                            <p>Please provide information about the impact of your difficulties and your goals.</p>
                            
                            <h3 style="margin-top: 2rem; margin-bottom: 1rem;">J. Impact & Goals</h3>
                            
                            ${renderQuestion({
                                id: assessmentQuestions.impact.duration.id,
                                question: assessmentQuestions.impact.duration.question,
                                options: assessmentQuestions.impact.duration.options,
                                required: true
                            })}
                            
                            ${renderQuestion({
                                id: assessmentQuestions.impact.impact.id,
                                question: assessmentQuestions.impact.impact.question,
                                options: assessmentQuestions.impact.impact.options,
                                required: true
                            })}
                            
                            ${renderMultiSelectQuestion({
                                id: assessmentQuestions.impact.currentSupport.id,
                                question: assessmentQuestions.impact.currentSupport.question,
                                options: assessmentQuestions.impact.currentSupport.options,
                                values: []
                            })}
                            
                            ${renderMultiSelectQuestion({
                                id: assessmentQuestions.impact.desiredSupport.id,
                                question: assessmentQuestions.impact.desiredSupport.question,
                                options: assessmentQuestions.impact.desiredSupport.options,
                                values: []
                            })}
                            
                            ${renderTextareaQuestion({
                                id: assessmentQuestions.impact.openText.id,
                                question: assessmentQuestions.impact.openText.question,
                                value: '',
                                rows: 5,
                                required: false
                            })}
                            
                            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                                <button type="button" class="btn btn-outline" onclick="prevStep()" aria-label="Go back to previous step">Back</button>
                                <button type="button" class="btn btn-primary" onclick="showSummary()" aria-label="Review your answers">See your summary</button>
                            </div>
                        </div>
                    </div>

                    <!-- Summary Step -->
                    <div class="assessment-step" id="step-summary" role="tabpanel" aria-labelledby="step-summary-label" style="display: none;">
                        <div class="card">
                            <h2 id="step-summary-label">Review Your Answers</h2>
                            <div id="summary-content"></div>
                            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                                <button type="button" class="btn btn-outline" onclick="prevStep()" aria-label="Go back to edit answers">Edit Answers</button>
                                <button type="submit" class="btn btn-primary" aria-label="Submit assessment and generate results">Generate Results</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    `;
}
