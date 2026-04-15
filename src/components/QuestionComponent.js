// Reusable question component for assessment
// Props: question text, answer options (4-point scale), current value, onChange
// Ensures keyboard and screen-reader accessibility

/**
 * Renders a single question with 4-point scale options
 * @param {Object} props - Question properties
 * @param {string} props.id - Unique identifier for the question
 * @param {string} props.question - Question text
 * @param {Array<string>} props.options - Answer options (default: 4-point scale)
 * @param {string} props.value - Current selected value
 * @param {Function} props.onChange - Change handler function
 * @param {boolean} props.required - Whether the question is required
 * @returns {string} HTML string for the question
 */
export function renderQuestion({ id, question, options, value = '', onChange, required = true }) {
    const defaultOptions = [
        'No difficulty',
        'Some difficulty',
        'A lot of difficulty',
        'Cannot do'
    ];
    
    const questionOptions = options || defaultOptions;
    const questionId = id || `question-${Date.now()}`;
    
    return `
        <div class="form-group" role="group" aria-labelledby="${questionId}-label">
            <label id="${questionId}-label" for="${questionId}" class="question-label">
                ${question}
                ${required ? '<span aria-label="required">*</span>' : ''}
            </label>
            <div class="radio-group" role="radiogroup" aria-labelledby="${questionId}-label">
                ${questionOptions.map((option, index) => {
                    const optionId = `${questionId}-${index}`;
                    const isChecked = value === option ? 'checked' : '';
                    return `
                        <div class="radio-option">
                            <input 
                                type="radio" 
                                id="${optionId}" 
                                name="${questionId}" 
                                value="${option}" 
                                ${isChecked}
                                ${required ? 'required aria-required="true"' : ''}
                                aria-label="${question} - ${option}"
                                onchange="if(window.handleQuestionChange) window.handleQuestionChange('${questionId}', '${option}')"
                            >
                            <label for="${optionId}" class="radio-label">
                                ${option}
                            </label>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

/**
 * Renders a multi-select checkbox question
 * @param {Object} props - Question properties
 * @param {string} props.id - Unique identifier for the question
 * @param {string} props.question - Question text
 * @param {Array<string>} props.options - Answer options
 * @param {Array<string>} props.values - Currently selected values
 * @param {Function} props.onChange - Change handler function
 * @returns {string} HTML string for the question
 */
export function renderMultiSelectQuestion({ id, question, options, values = [], onChange }) {
    const questionId = id || `question-${Date.now()}`;
    
    return `
        <div class="form-group" role="group" aria-labelledby="${questionId}-label">
            <label id="${questionId}-label" class="question-label">
                ${question}
            </label>
            <div class="checkbox-group" role="group" aria-labelledby="${questionId}-label">
                ${options.map((option, index) => {
                    const optionId = `${questionId}-${index}`;
                    const isChecked = values.includes(option) ? 'checked' : '';
                    return `
                        <div class="checkbox-option">
                            <input 
                                type="checkbox" 
                                id="${optionId}" 
                                name="${questionId}" 
                                value="${option}"
                                ${isChecked}
                                aria-label="${question} - ${option}"
                            >
                            <label for="${optionId}" class="checkbox-label">
                                ${option}
                            </label>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

/**
 * Renders a textarea question
 * @param {Object} props - Question properties
 * @param {string} props.id - Unique identifier for the question
 * @param {string} props.question - Question text
 * @param {string} props.value - Current value
 * @param {number} props.rows - Number of rows for textarea
 * @param {boolean} props.required - Whether the question is required
 * @returns {string} HTML string for the question
 */
export function renderTextareaQuestion({ id, question, value = '', rows = 5, required = false }) {
    const questionId = id || `question-${Date.now()}`;
    
    return `
        <div class="form-group">
            <label for="${questionId}" id="${questionId}-label" class="question-label">
                ${question}
                ${required ? '<span aria-label="required">*</span>' : ''}
            </label>
            <textarea 
                id="${questionId}" 
                name="${questionId}" 
                rows="${rows}"
                ${required ? 'required aria-required="true"' : ''}
                aria-labelledby="${questionId}-label"
                aria-describedby="${questionId}-description"
            >${value}</textarea>
            <div id="${questionId}-description" class="sr-only">
                Enter your response in the text area above
            </div>
        </div>
    `;
}
