// Custom element for the site navbar
class NavbarComponent extends HTMLElement {
  constructor() {
    super();
    // Use open mode to allow external styles to affect the component
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
        /* Navbar-specific styles only */
        .navbar {
          background-color: rgba(12, 12, 14, 0.9);
          padding: 1rem 0;
          border-bottom: 1px solid rgba(74, 222, 128, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(10px);
        }

        .navbar .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-brand {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .logo {
          font-family: 'Courier New', monospace;
          color: var(--foreground);
          font-weight: bold;
          letter-spacing: 1px;
          text-decoration: none;
        }

        .text-green-400 {
          color: var(--green-400);
        }

        .navbar-menu {
          display: flex;
          align-items: center;
        }

        .navbar-links {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          margin-right: 2rem;
        }

        .navbar-links li {
          margin-left: 1.5rem;
        }

        .nav-link {
          color: var(--foreground);
          position: relative;
          text-decoration: none;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--green-400);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .navbar-auth {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .navbar-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          width: 2rem;
          height: 1.5rem;
          position: relative;
        }

        .navbar-toggle span {
          display: block;
          width: 100%;
          height: 2px;
          background-color: var(--foreground);
          position: absolute;
          transition: all 0.3s ease;
        }

        .navbar-toggle span:nth-child(1) {
          top: 0;
        }

        .navbar-toggle span:nth-child(2) {
          top: 50%;
          transform: translateY(-50%);
        }

        .navbar-toggle span:nth-child(3) {
          bottom: 0;
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          .navbar-menu {
            position: fixed;
            top: 64px;
            left: 0;
            right: 0;
            flex-direction: column;
            background-color: var(--background);
            padding: 1.5rem;
            border-bottom: 1px solid var(--border);
            transform: translateY(-100%);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
            z-index: 90;
          }
          
          .navbar-menu.active {
            transform: translateY(0);
            opacity: 1;
          }
          
          .navbar-links {
            flex-direction: column;
            margin-right: 0;
            margin-bottom: 1.5rem;
            width: 100%;
          }
          
          .navbar-links li {
            margin-left: 0;
            margin-bottom: 1rem;
            width: 100%;
            text-align: center;
          }
          
          .navbar-toggle {
            display: block;
          }
          
          .navbar-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 7px);
          }
          
          .navbar-toggle.active span:nth-child(2) {
            opacity: 0;
          }
          
          .navbar-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -7px);
          }
        }
      </style>

      <nav class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <a href="index.html" class="logo">
              <span class="text-green-400">K8S</span>_CRAFT
            </a>
          </div>
          <div class="navbar-menu" id="main-nav">
            <ul class="navbar-links">
              <li><a href="index.html" class="nav-link">Home</a></li>
              <li><a href="tracks.html" class="nav-link">Tracks</a></li>
              <li><a href="about.html" class="nav-link">About</a></li>
            </ul>
            <div class="navbar-auth">
                <a href="login.html" class="argo-button-outline">Login</a>
                <a href="signup.html" class="argo-button-primary">Sign Up</a>
            </div>
          </div>
          <button class="navbar-toggle" id="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    `;
  }

  setupEventListeners() {
    // Mobile navigation toggle
    const navToggle = this.shadowRoot.getElementById('nav-toggle');
    const navMenu = this.shadowRoot.getElementById('main-nav');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
      });
    }
  }
}

// Register the custom element
customElements.define('navbar-component', NavbarComponent);
