// Custom element for the site navbar
class NavbarComponent extends HTMLElement {
  constructor() {
    super();
    // Use open mode to allow external styles to affect the component
    this.attachShadow({ mode: 'open' });
    
    // Bind methods to preserve 'this' context and allow for proper event removal
    this.handleViewportChange = this.handleViewportChange.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.highlightCurrentPage();
  }
  
  disconnectedCallback() {
    // Clean up event listeners to prevent memory leaks
    window.removeEventListener('resize', this.handleViewportChange);
    window.removeEventListener('orientationchange', this.handleViewportChange);
    
    // Clean up the toggle click handler if it exists
    if (this.navToggle) {
      this.navToggle.removeEventListener('click', this.handleToggleClick);
    }
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
          z-index: 110; /* Ensure toggle is above other elements */
          margin-left: 1rem; /* Add some spacing */
          padding: 0.5rem; /* Increase touch target size */
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
            transition: transform 0.3s ease, opacity 0.3s ease, max-height 0.3s ease;
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
        
        /* Handle landscape orientation on mobile */
        @media (orientation: landscape) and (max-width: 768px) {
          .navbar-menu {
            max-height: 80vh;
            overflow-y: auto;
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
          <button class="navbar-toggle" id="nav-toggle" aria-label="Toggle navigation">
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
      // Store references to DOM elements as instance properties
      this.navToggle = navToggle;
      this.navMenu = navMenu;
      
      // Use the bound method as event handler
      navToggle.addEventListener('click', this.handleToggleClick);
    }

    // Handle orientation and resize events
    window.addEventListener('resize', this.handleViewportChange);
    window.addEventListener('orientationchange', this.handleViewportChange);
  }
  
  handleToggleClick() {
    // These references use the instance properties
    this.navToggle.classList.toggle('active');
    this.navMenu.classList.toggle('active');
  }

  handleViewportChange() {
    // Check if we're on desktop view
    if (window.innerWidth > 768) {
      // Reset mobile menu when switching to desktop
      this.navMenu.classList.remove('active');
      this.navToggle.classList.remove('active');
    }
    
    // For accessibility - keep menu visible during transitions if it was open
    if (window.innerWidth <= 768 && this.navMenu.classList.contains('active')) {
      this.navMenu.style.opacity = '1';
      this.navMenu.style.transform = 'translateY(0)';
    }
  }

  highlightCurrentPage() {
    // Get current page path
    const currentPath = window.location.pathname;
    const filename = currentPath.split('/').pop() || 'index.html';
    
    // Find the matching link in shadow DOM and add active class
    const links = this.shadowRoot.querySelectorAll('.nav-link');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === filename) {
        link.classList.add('active');
      }
    });
  }
}

// Register the custom element
customElements.define('navbar-component', NavbarComponent);
