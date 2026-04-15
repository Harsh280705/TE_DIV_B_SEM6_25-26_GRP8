// Login page component
export function renderLogin() {
    return `
        <main role="main" aria-labelledby="login-heading">
            <div class="container" style="max-width: 500px; padding: 2rem 20px;">
                <h1 id="login-heading" class="text-center mb-4">Login to Your Account</h1>
                <div class="card">
                    <form id="login-form" onsubmit="handleLogin(event)">
                        <div class="form-group">
                            <label for="login-email">Email <span aria-label="required">*</span></label>
                            <input type="email" id="login-email" name="email" required aria-required="true" aria-label="Your email address" autocomplete="email">
                        </div>
                        <div class="form-group">
                            <label for="login-password">Password <span aria-label="required">*</span></label>
                            <input type="password" id="login-password" name="password" required aria-required="true" aria-label="Your password" autocomplete="current-password">
                        </div>
                        <div class="form-group">
                            <div class="checkbox-group">
                                <input type="checkbox" id="remember-me" name="rememberMe" aria-label="Remember me on this device">
                                <label for="remember-me">Remember me</label>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%;" aria-label="Login to your account">Login</button>
                    </form>
                    <p class="text-center mt-3">
                        Don't have an account? <a href="#/register" aria-label="Go to registration page">Register here</a>
                    </p>
                    <p class="text-center mt-2">
                        <a href="#/forgot-password" aria-label="Forgot password">Forgot your password?</a>
                    </p>
                </div>
            </div>
        </main>
    `;
}
