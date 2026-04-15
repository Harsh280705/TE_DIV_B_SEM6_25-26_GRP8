// src/pages/Contact.js

export function renderContact() {
  return `
    <main role="main" aria-labelledby="contact-heading">
      <div class="container" style="max-width: 800px; padding: 2rem 20px;">
        <h1 id="contact-heading" style="margin-bottom: 2rem; color: var(--accent-primary);">Contact Us</h1>
        
        <div class="card" style="margin-bottom: 2rem; padding: 1.5rem;">
          <h2 style="color: var(--accent-primary); margin-bottom: 1rem;">Get in Touch</h2>
          
          <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="font-size: 1.25rem;">📧</span>
              <span><strong>Email Support:</strong> support@careerdiscovery.org</span>
            </div>
            
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="font-size: 1.25rem;">📞</span>
              <span><strong>Helpline:</strong> +91 98765 43210 (Mon-Fri, 9 AM - 6 PM)</span>
            </div>
            
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="font-size: 1.25rem;">♿</span>
              <span><strong>Accessible Support:</strong> Hi</span>
            </div>
            
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="font-size: 1.25rem;">🎓</span>
              <span><strong>Career Guidance Helpdesk:</strong> career-help@careerdiscovery.org</span>
            </div>
          </div>
        </div>

        <div class="card" style="padding: 1.5rem;">
          <h2 style="color: var(--accent-primary); margin-bottom: 1.5rem;">Send Us a Message</h2>
          
          <form id="contact-form" onsubmit="handleContactSubmit(event)" novalidate>
            <div class="form-group" style="margin-bottom: 1rem;">
              <label for="contact-name" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Full Name <span aria-label="required">*</span></label>
              <input 
                type="text" 
                id="contact-name" 
                name="name" 
                required 
                aria-required="true"
                style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-surface); color: var(--text-primary);"
              >
            </div>

            <div class="form-group" style="margin-bottom: 1rem;">
              <label for="contact-email" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Email <span aria-label="required">*</span></label>
              <input 
                type="email" 
                id="contact-email" 
                name="email" 
                required 
                aria-required="true"
                style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-surface); color: var(--text-primary);"
              >
            </div>

            <div class="form-group" style="margin-bottom: 1rem;">
              <label for="contact-subject" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Subject <span aria-label="required">*</span></label>
              <select 
                id="contact-subject" 
                name="subject" 
                required 
                aria-required="true"
                style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-surface); color: var(--text-primary);"
              >
                <option value="">-- Select --</option>
                <option value="career-guidance">Career Guidance</option>
                <option value="technical-issue">Technical Issue</option>
                <option value="accessibility-feedback">Accessibility Feedback</option>
                <option value="partnership">Partnership Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="form-group" style="margin-bottom: 1.5rem;">
              <label for="contact-message" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Message <span aria-label="required">*</span></label>
              <textarea 
                id="contact-message" 
                name="message" 
                rows="5" 
                required 
                aria-required="true"
                style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-surface); color: var(--text-primary); resize: vertical;"
              ></textarea>
            </div>

            <button 
              type="submit" 
              class="btn btn-primary"
              style="width: 100%; padding: 0.75rem; font-weight: bold;"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  `;
}