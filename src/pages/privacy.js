// src/pages/Privacy.js
export function renderPrivacyPage() {
  return `
    <main role="main" aria-labelledby="privacy-heading">
      <div style="padding: 2rem; color: white; background: #1e1e1e; border-radius: 8px; max-width: 700px; margin: 2rem auto; text-align: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <h1 id="privacy-heading" style="color: #ff7700;">✅ Privacy Policy Test</h1>
        <p>This is a placeholder to confirm the privacy policy page is loading correctly.</p>
        <button 
          onclick="window.navigate('/')"
          style="margin-top: 1.5rem; background: #ff7700; color: black; border: none; padding: 0.6rem 1.2rem; cursor: pointer; border-radius: 6px; font-weight: bold; font-size: 1rem;"
        >
          ← Go Back Home
        </button>
      </div>
    </main>
  `;
}