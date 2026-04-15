// Forgot Password page component
export function renderForgotPassword() {
    return `
        <main role="main" aria-labelledby="forgot-password-heading">
            <div class="container" style="max-width: 500px; padding: 2rem 20px;">
                <h1 id="forgot-password-heading" class="text-center mb-4">Reset Your Password</h1>
                <div class="card">
                    <p class="text-center mb-4">Enter your email address and we'll send you a link to reset your password.</p>
                    <form id="forgot-password-form" onsubmit="handleForgotPassword(event)">
                        <div class="form-group">
                            <label for="reset-email">Email <span aria-label="required">*</span></label>
                            <input 
                                type="email" 
                                id="reset-email" 
                                name="email" 
                                required 
                                aria-required="true" 
                                aria-label="Your email address" 
                                autocomplete="email"
                            >
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%;" aria-label="Send password reset email">
                            Send Reset Link
                        </button>
                    </form>
                    <p class="text-center mt-3">
                        <a href="#/login" aria-label="Go back to login page">Back to Login</a>
                    </p>
                </div>
            </div>
        </main>
    `;
}