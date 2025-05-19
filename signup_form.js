// Custom element for the signup form
class SignupFormComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <!-- Include shared styles -->
      <link rel="stylesheet" href="styles/main.css">
      <link rel="stylesheet" href="styles/common.css">
      
      <style>
        /* Auth form styles */
        .auth-section {
          padding: 3rem 1rem;
        }

        .container {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .auth-card {
          background-color: var(--card, #1a1b26);
          border: 1px solid var(--gray-800, #1f2937);
          border-radius: 0.5rem;
          width: 100%;
          max-width: 28rem;
          padding: 2rem;
        }

        .auth-header {
          margin-bottom: 1.5rem;
        }

        .auth-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--foreground, #e2e8f0);
          margin-bottom: 0.25rem;
        }

        .auth-description {
          color: var(--gray-300, #d1d5db);
          font-size: 0.875rem;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .form-link {
          font-size: 0.75rem;
          color: var(--argo-purple, #9b87f5);
          text-decoration: none;
        }

        .form-link:hover {
          text-decoration: underline;
        }

        .auth-form label {
          font-size: 0.875rem;
          color: var(--foreground, #e2e8f0);
        }

        .auth-form input {
          background-color: var(--input, #0f0f13);
          border: 1px solid var(--gray-700, #374151);
          color: var(--foreground, #e2e8f0);
          padding: 0.75rem 1rem;
          border-radius: 0.375rem;
          width: 100%;
          font-family: inherit;
          box-sizing: border-box;
        }

        .auth-submit-button {
          padding: 0.75rem 1rem;
          background-color: var(--argo-purple, #9b87f5);
          color: var(--foreground, #e2e8f0);
          border: none;
          border-radius: 0.375rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .auth-submit-button:hover {
          background-color: rgba(155, 135, 245, 0.9);
        }

        .auth-loader {
          width: 1rem;
          height: 1rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: var(--foreground, #e2e8f0);
          animation: spin 1s linear infinite;
          margin-left: 0.5rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .auth-error {
          color: var(--red-500, #ef4444);
          font-size: 0.75rem;
          min-height: 1rem;
        }

        .auth-alt-action {
          text-align: center;
          font-size: 0.875rem;
          color: var(--gray-300, #d1d5db);
        }

        .hidden {
          display: none;
        }
      </style>

      <section class="auth-section">
        <div class="container">
          <div class="auth-card">
            <div class="auth-header">
              <h1 class="auth-title">Sign up</h1>
              <p class="auth-description">Create an account to access all Kubernetes labs</p>
            </div>
            <form id="signup-form" class="auth-form">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="you@example.com" required>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
              </div>
              <div class="form-group">
                <label for="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" name="confirm-password" required>
              </div>
              <div id="password-error" class="auth-error"></div>
              <button type="submit" class="auth-submit-button">
                <span id="signup-button-text">Sign up</span>
                <span id="signup-loader" class="auth-loader hidden"></span>
              </button>
              <p class="auth-alt-action">
                Already have an account? <a href="login.html" class="form-link">Log in</a>
              </p>
            </form>
          </div>
        </div>
      </section>
    `;
  }
  

  setupEventListeners() {
    const form = this.shadowRoot.getElementById('signup-form');
    const passwordError = this.shadowRoot.getElementById('password-error');
    const password = this.shadowRoot.getElementById('password');
    const confirmPassword = this.shadowRoot.getElementById('confirm-password');
    const signupButtonText = this.shadowRoot.getElementById('signup-button-text');
    const signupLoader = this.shadowRoot.getElementById('signup-loader');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Clear any previous errors
      passwordError.textContent = '';
      
      // Check if passwords match
      if (password.value !== confirmPassword.value) {
        passwordError.textContent = 'Passwords do not match';
        return;
      }
      
      // Show loading state
      signupButtonText.textContent = 'Signing up...';
      signupLoader.classList.remove('hidden');
      
      // Simulate form submission (in a real app, you'd make an API call here)
      setTimeout(() => {
        // This would trigger a custom event that the parent page could listen for
        const event = new CustomEvent('signup-submitted', {
          bubbles: true,
          composed: true,
          detail: {
            email: this.shadowRoot.getElementById('email').value
          }
        });
        this.dispatchEvent(event);
        
        // Reset loading state (in a real app, this would happen after the API response)
        signupButtonText.textContent = 'Sign up';
        signupLoader.classList.add('hidden');
      }, 1500);
    });
  }
}

// Register the custom element
customElements.define('signup-form-component', SignupFormComponent);
