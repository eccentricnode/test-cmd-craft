// Custom element for the site footer
class FooterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <script src="main.css"></script>
      <script src="common.css"></script>
      
      <style>
        /* Footer Styles */
        .footer {
          background-color: var(--card, #1a1b26);
          padding: 3rem 0 1.5rem;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .footer-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding-top: 2rem;
          margin-bottom: 2rem;
          border-top: 1px solid var(--border, #2e3440);
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-width: 16rem;
        }

        .footer-logo {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .text-green-400 {
          color: var(--green-400);
        }

        .footer-tagline {
          color: var(--gray-400);
          font-size: 0.875rem;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .footer-links-column h3 {
          font-size: 1rem;
          margin-bottom: 1rem;
          color: var(--foreground);
        }

        .footer-links-column ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links-column li:not(:last-child) {
          margin-bottom: 0.5rem;
        }

        .footer-links-column a {
          color: var(--gray-400);
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-links-column a:hover {
          color: var(--green-400);
        }

        .footer-bottom {
          border-top: 1px solid var(--border);
          padding-top: 1.5rem;
          text-align: center;
          color: var(--gray-400);
          font-size: 0.875rem;
        }

        /* Responsive styles */
        @media (min-width: 768px) {
          .footer-content {
            flex-direction: row;
            justify-content: space-between;
          }
          
          .footer-links {
            flex-direction: row;
            gap: 4rem;
          }
        }
      </style>

      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-brand">
              <div class="footer-logo">
                <span class="text-green-400">K8S</span>_CRAFT
              </div>
              <p class="footer-tagline">Master Kubernetes through practical challenges</p>
            </div>
            <div class="footer-links">
              <div class="footer-links-column">
                <h3>Navigation</h3>
                <ul>
                  <li><a href="index.html">Home</a></li>
                  <li><a href="tracks.html">Tracks</a></li>
                  <li><a href="about.html">About</a></li>
                </ul>
              </div>
              <div class="footer-links-column">
                <h3>Account</h3>
                <ul>
                  <li><a href="login.html">Login</a></li>
                  <li><a href="signup.html">Sign Up</a></li>
                  <li><a href="dashboard.html">Dashboard</a></li>
                </ul>
              </div>
              <div class="footer-links-column">
                <h3>Resources</h3>
                <ul>
                  <li><a href="#">Documentation</a></li>
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Support</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="footer-bottom">
            <p>&copy; 2025 Kubernetes Command Craft. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `;
  }
}

// Register the custom element
customElements.define('footer-component', FooterComponent);
