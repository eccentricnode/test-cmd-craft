
// Simple router for handling page navigation
document.addEventListener('DOMContentLoaded', function() {
  // Set up router
  setupRouter();
  
  // Initial route
  handleRoute(window.location.pathname);
});

function setupRouter() {
  // Handle clicks on links with data-route attributes
  document.addEventListener('click', e => {
    const link = e.target.closest('a[data-route]');
    if (link) {
      e.preventDefault();
      const href = link.getAttribute('href');
      navigateTo(href);
    }
  });
  
  // Handle browser back/forward buttons
  window.addEventListener('popstate', () => {
    handleRoute(window.location.pathname);
  });
}

function navigateTo(path) {
  // Update browser history
  window.history.pushState({ path }, '', path);
  
  // Handle the new route
  handleRoute(path);
}

function handleRoute(path) {
  // Close mobile menu if open
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu && mobileMenu.classList.contains('active')) {
    mobileMenu.classList.remove('active');
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle && menuToggle.querySelector('i')) {
      const icon = menuToggle.querySelector('i');
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  }
  
  // Extract route and parameters
  const parts = path.split('/').filter(Boolean);
  const route = parts[0] || 'home';
  const param = parts[1];
  const subParam = parts[2];
  
  // Define route handlers
  const routes = {
    'home': loadHomePage,
    'tracks': loadTracksPage,
    'about': loadAboutPage,
    'login': loadLoginPage,
    'signup': loadSignupPage,
    'dashboard': loadDashboardPage
  };
  
  // Special case for track details and lab details
  if (route === 'tracks' && param && !subParam) {
    loadTrackDetailPage(param);
    return;
  }
  
  // Special case for lab detail
  if (route === 'tracks' && param && subParam === 'labs' && parts[3]) {
    loadLabDetailPage(param, parts[3]);
    return;
  }
  
  // Execute the route handler or show 404
  if (routes[route]) {
    routes[route]();
  } else {
    loadNotFoundPage();
  }
  
  // Scroll back to top
  window.scrollTo(0, 0);
}

// Page loaders
function loadHomePage() {
  const appContainer = document.getElementById('app');
  appContainer.innerHTML = `
    <div class="hero-section">
      <div class="container">
        <div class="page-header">
          <div class="page-title-container">
            <i class="fa-regular fa-terminal terminal-icon text-argo-purple"></i>
            <h1 class="page-title text-argo-purple">Kubernetes Command Craft</h1>
            <span class="cursor"></span>
          </div>
          <div class="terminal-prompt">
            <p class="terminal-text typing-animation">
              $ sudo apt-get install advanced-kubernetes-skills
            </p>
          </div>
        </div>
        
        <div id="featuresSection"></div>
      </div>
    </div>
  `;
  
  // Load features section
  loadFeaturesSection();
}

function loadFeaturesSection() {
  const featuresElement = document.getElementById('featuresSection');
  if (!featuresElement) return;
  
  // Define features
  const features = [
    {
      icon: 'fa-terminal',
      title: 'Command-Line Interface',
      description: 'Practice with real CLI commands that mimic production environments and challenges'
    },
    {
      icon: 'fa-database',
      title: 'Production Simulation',
      description: 'Labs designed to simulate real-world scenarios that DevOps professionals face daily'
    },
    {
      icon: 'fa-check-double',
      title: 'Progress Tracking',
      description: 'Monitor your advancement through each learning track with completion indicators'
    },
    {
      icon: 'fa-clock',
      title: 'Async Learning',
      description: 'Complete labs on your own schedule, picking up where you left off'
    },
    {
      icon: 'fa-server',
      title: 'Multiple Tracks',
      description: 'Specialized paths for NGINX Ingress, Database Administration, and Argo CD deployment'
    },
    {
      icon: 'fa-shield-halved',
      title: 'Advanced Content',
      description: 'Designed for experienced Kubernetes users looking to deepen their expertise'
    }
  ];
  
  // Build features HTML
  let featuresHTML = `
    <div class="features-section">
      <div class="container">
        <div class="text-center mb-16">
          <div class="flex-center mb-4">
            <i class="fa-regular fa-terminal text-green-400 mr-2"></i>
            <h2 class="text-3xl font-bold text-white">
              SYS::<span class="text-argo-purple">FEATURES</span>
            </h2>
          </div>
          <div class="terminal-prompt">
            <p class="terminal-text">
              > Kubernetes expertise through hands-on challenges
            </p>
          </div>
        </div>
        
        <div class="features-grid">
  `;
  
  // Add each feature
  features.forEach(feature => {
    featuresHTML += `
      <div class="feature-card fade-in">
        <div class="feature-icon">
          <i class="fa-solid ${feature.icon}"></i>
        </div>
        <h3 class="feature-title">${feature.title}</h3>
        <p class="feature-description">${feature.description}</p>
      </div>
    `;
  });
  
  // Close HTML
  featuresHTML += `
        </div>
      </div>
    </div>
  `;
  
  // Insert into the page
  featuresElement.innerHTML = featuresHTML;
  
  // Add fade-in animation with staggered delay
  const featureCards = featuresElement.querySelectorAll('.feature-card');
  featureCards.forEach((card, index) => {
    card.classList.add(`fade-in-${index % 5 + 1}`);
  });
}

function loadTracksPage() {
  const appContainer = document.getElementById('app');
  
  // First show loading state
  appContainer.innerHTML = `
    <div class="page-section">
      <div class="container">
        <div class="page-header">
          <div class="page-title-container">
            <i class="fa-solid fa-server text-argo-purple"></i>
            <h1 class="page-title text-white">
              <span class="text-argo-purple border-r-2 border-argo-purple pr-2 mr-2">TRACKS</span>
            </h1>
            <span class="cursor"></span>
          </div>
          <div class="terminal-prompt">
            <p class="terminal-text">
              > SELECT track FROM kubernetes_skills WHERE expertise_level = 'advanced'
            </p>
          </div>
        </div>
        
        <div class="spinner-container">
          <div class="spinner">
            <span class="spinner-outer"></span>
            <span class="spinner-inner"></span>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Simulate loading
  setTimeout(() => {
    // Fetch tracks data
    const tracks = window.app.fetchTracks();
    const userProgress = window.app.getUserProgress();
    const user = window.app.getUser();
    
    // Build tracks HTML
    let tracksHTML = `
      <div class="grid">
    `;
    
    tracks.forEach(track => {
      const completedCount = user ? (userProgress[track.id] || 0) : null;
      const progress = completedCount !== null ? (completedCount / track.labCount) * 100 : null;
      
      tracksHTML += `
        <div class="card cyber-container fade-in">
          <div class="card-header">
            <div class="card-terminal-header">
              <i class="fa-regular fa-terminal text-green-500"></i>
              <div class="progress-bar">
                <div class="progress-bar-fill"></div>
              </div>
            </div>
            <h3 class="card-title">${track.title}</h3>
          </div>
          <div class="card-content">
            <p class="card-description">${track.description}</p>
            
            ${progress !== null ? `
              <div class="card-progress">
                <div class="progress-header">
                  <span class="progress-label">chmod +x</span>
                  <span class="progress-value">${completedCount}/${track.labCount}</span>
                </div>
                <div class="progress-track">
                  <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
              </div>
            ` : ''}
          </div>
          <div class="card-footer">
            <a href="/tracks/${track.id}" data-route="track-detail" data-id="${track.id}" class="btn btn-outline btn-full-width">
              <span class="mr-1">$</span> ./execute ${track.id}
            </a>
          </div>
        </div>
      `;
    });
    
    // Close HTML
    tracksHTML += `
      </div>
    `;
    
    // Update the container with tracks
    const container = document.querySelector('.page-section .container');
    if (container) {
      // Keep the header, replace the spinner with tracks
      const header = container.querySelector('.page-header');
      container.innerHTML = '';
      container.appendChild(header);
      container.insertAdjacentHTML('beforeend', tracksHTML);
      
      // Add fade-in animation with staggered delay
      const trackCards = container.querySelectorAll('.card');
      trackCards.forEach((card, index) => {
        card.classList.add(`fade-in-${index % 5 + 1}`);
      });
    }
  }, 800); // Simulate network delay
}

function loadTrackDetailPage(trackId) {
  const appContainer = document.getElementById('app');
  
  // First show loading state
  appContainer.innerHTML = `
    <div class="page-section">
      <div class="container">
        <div class="spinner-container">
          <div class="spinner">
            <span class="spinner-outer"></span>
            <span class="spinner-inner"></span>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Simulate loading
  setTimeout(() => {
    // Fetch track and labs data
    const track = window.app.fetchTrack(trackId);
    if (!track) {
      loadNotFoundPage();
      return;
    }
    
    const labs = window.app.fetchLabsForTrack(trackId);
    const user = window.app.getUser();
    const completedLabs = window.app.getCompletedLabs();
    
    // Build page HTML
    let pageHTML = `
      <div class="page-section">
        <div class="container">
          <div class="mb-12">
            <h1 class="text-3xl font-bold text-white mb-4">
              ${track.title}
            </h1>
            <p class="text-xl text-gray-300">${track.description}</p>
    `;
    
    if (user) {
      const labCount = labs.length;
      const completedCount = labs.filter(lab => completedLabs[lab.id]).length;
      const percentage = (completedCount / labCount) * 100;
      
      pageHTML += `
        <div class="mt-6 dashboard-card">
          <div class="progress-header">
            <span class="progress-label">Your Progress</span>
            <span class="progress-value">${completedCount}/${labCount} labs completed</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill animate-progress" style="width: ${percentage}%"></div>
          </div>
        </div>
      `;
    }
    
    pageHTML += `
          </div>
          
          <div class="grid">
    `;
    
    // Add labs
    labs.forEach((lab, index) => {
      const isPublic = index < 2; // First two labs are public
      const isLocked = !isPublic && !user;
      const isCompleted = user && completedLabs[lab.id];
      
      pageHTML += `
        <div class="lab-card ${isCompleted ? 'lab-completed' : ''} ${isLocked ? 'lab-locked' : ''}">
          <div class="lab-card-header">
            <h3 class="lab-card-title">
              ${lab.title}
              ${isLocked ? '<span class="lab-badge">Login Required</span>' : ''}
            </h3>
            ${isCompleted ? '<div class="completion-check"><i class="fa-solid fa-check"></i></div>' : ''}
          </div>
          <div class="lab-card-content">
            <p class="lab-card-description">${lab.description}</p>
          </div>
          <div class="lab-card-footer">
            ${isLocked ? 
              `<a href="/signup" data-route="signup" class="btn btn-primary btn-full-width">
                Unlock Lab
              </a>` : 
              `<a href="/tracks/${trackId}/labs/${lab.id}" data-route="lab-detail" data-track="${trackId}" data-lab="${lab.id}" class="btn btn-primary btn-full-width">
                ${isCompleted ? 'Review Lab' : 'Start Lab'}
              </a>`
            }
          </div>
        </div>
      `;
    });
    
    // Close HTML
    pageHTML += `
          </div>
        </div>
      </div>
    `;
    
    // Update the page
    appContainer.innerHTML = pageHTML;
    
    // Add fade-in animation
    const labCards = appContainer.querySelectorAll('.lab-card');
    labCards.forEach((card, index) => {
      card.classList.add('fade-in');
      card.classList.add(`fade-in-${index % 5 + 1}`);
    });
  }, 800); // Simulate network delay
}

function loadLabDetailPage(trackId, labId) {
  const appContainer = document.getElementById('app');
  
  // Show loading state
  appContainer.innerHTML = `
    <div class="page-section">
      <div class="container">
        <div class="spinner-container">
          <div class="spinner">
            <span class="spinner-outer"></span>
            <span class="spinner-inner"></span>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Simulate loading
  setTimeout(() => {
    // Get track and lab data
    const track = window.app.fetchTrack(trackId);
    if (!track) {
      loadNotFoundPage();
      return;
    }
    
    const labs = window.app.fetchLabsForTrack(trackId);
    const lab = labs.find(l => l.id === labId);
    
    if (!lab) {
      loadNotFoundPage();
      return;
    }
    
    const user = window.app.getUser();
    const isPublic = labs.indexOf(lab) < 2;
    
    // If lab is not public and user is not logged in, redirect to signup
    if (!isPublic && !user) {
      navigateTo('/signup');
      return;
    }
    
    // Build lab page HTML
    const pageHTML = `
      <div class="page-section">
        <div class="container">
          <div class="mb-4">
            <a href="/tracks/${trackId}" data-route="track-detail" data-id="${trackId}" class="btn btn-outline">
              <i class="fa-solid fa-arrow-left"></i>
              Back to ${track.title}
            </a>
          </div>
          
          <h1 class="text-3xl font-bold text-white mb-6">
            ${lab.title}
          </h1>
          
          <div class="dashboard-card mb-8">
            <p class="text-lg text-gray-300 mb-4">${lab.description}</p>
            <p class="text-gray-400">This is where the lab content would be displayed, with interactive terminal sessions, instructions, and completion tracking.</p>
          </div>
          
          <div class="flex justify-between">
            <button class="btn btn-outline">
              <i class="fa-solid fa-flag"></i>
              Mark Complete
            </button>
            
            <button class="btn btn-primary">
              <i class="fa-solid fa-forward"></i>
              Next Lab
            </button>
          </div>
        </div>
      </div>
    `;
    
    appContainer.innerHTML = pageHTML;
  }, 800);
}

function loadAboutPage() {
  const appContainer = document.getElementById('app');
  
  const pageHTML = `
    <div class="page-section">
      <div class="container">
        <div class="page-header">
          <div class="page-title-container">
            <i class="fa-solid fa-shield-halved text-argo-purple"></i>
            <h1 class="page-title text-white">About</h1>
          </div>
          <div class="terminal-prompt">
            <p class="terminal-text">
              > cat /etc/kubernetes-command-craft/about.txt
            </p>
          </div>
        </div>
        
        <div class="dashboard-card">
          <h2 class="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p class="text-gray-300 mb-4">
            Kubernetes Command Craft was built by DevOps engineers who understand the challenges
            of learning advanced Kubernetes concepts. Our platform bridges the gap between
            theoretical knowledge and practical application in production environments.
          </p>
          <p class="text-gray-300">
            Through hands-on labs and real-world scenarios, we help engineers master complex
            Kubernetes patterns, troubleshooting approaches, and best practices for managing
            cloud-native infrastructure at scale.
          </p>
        </div>
        
        <div class="grid mt-8">
          <div class="dashboard-card">
            <h2 class="text-2xl font-bold text-white mb-4">Our Approach</h2>
            <ul class="space-y-2 text-gray-300">
              <li><span class="text-green-400">></span> Practical over theoretical</li>
              <li><span class="text-green-400">></span> Real-world scenarios</li>
              <li><span class="text-green-400">></span> Hands-on terminal sessions</li>
              <li><span class="text-green-400">></span> Production-like challenges</li>
              <li><span class="text-green-400">></span> Advanced topics for experienced users</li>
            </ul>
          </div>
          
          <div class="dashboard-card">
            <h2 class="text-2xl font-bold text-white mb-4">The Team</h2>
            <p class="text-gray-300 mb-4">
              Our team consists of DevOps engineers, SREs, and cloud architects
              with extensive experience managing Kubernetes clusters at scale.
            </p>
            <p class="text-gray-300">
              We've taken our collective knowledge and distilled it into
              practical learning paths that help bridge the gap between theory and
              real-world application.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
  
  appContainer.innerHTML = pageHTML;
}

function loadLoginPage() {
  const appContainer = document.getElementById('app');
  
  const pageHTML = `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h2 class="auth-title">Log in</h2>
          <p class="auth-description">
            Enter your email and password to access your account
          </p>
        </div>
        <form id="loginForm" class="auth-form">
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <div class="flex justify-between">
              <label for="password" class="form-label">Password</label>
              <a href="#" class="text-sm text-secondary">
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              required
              class="form-input"
            />
          </div>
          <div class="error-message" id="loginError"></div>
          
          <button 
            type="submit" 
            class="btn btn-primary btn-full-width"
            id="loginButton"
          >
            Log in
          </button>
        </form>
        <div class="form-footer">
          <p class="form-link">
            Don't have an account?
            <a href="/signup" data-route="signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  `;
  
  appContainer.innerHTML = pageHTML;
  
  // Set up form handling
  const form = document.getElementById('loginForm');
  const errorElement = document.getElementById('loginError');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      // Update button to loading state
      const button = document.getElementById('loginButton');
      const originalButtonText = button.innerHTML;
      button.disabled = true;
      button.innerHTML = `
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Logging in...
      `;
      
      // Simulate API call delay
      setTimeout(() => {
        const success = window.app.handleLogin(email, password);
        
        if (success) {
          // Redirect to dashboard
          navigateTo('/dashboard');
        } else {
          // Show error
          errorElement.textContent = 'Invalid email or password';
          
          // Reset button
          button.disabled = false;
          button.innerHTML = originalButtonText;
        }
      }, 1000);
    });
  }
}

function loadSignupPage() {
  const appContainer = document.getElementById('app');
  
  const pageHTML = `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h2 class="auth-title">Sign up</h2>
          <p class="auth-description">
            Create an account to access all Kubernetes labs
          </p>
        </div>
        <form id="signupForm" class="auth-form">
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              type="password"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              required
              class="form-input"
            />
          </div>
          <div class="error-message" id="signupError"></div>
          
          <button 
            type="submit" 
            class="btn btn-primary btn-full-width"
            id="signupButton"
          >
            Sign up
          </button>
        </form>
        <div class="form-footer">
          <p class="form-link">
            Already have an account?
            <a href="/login" data-route="login">Log in</a>
          </p>
        </div>
      </div>
    </div>
  `;
  
  appContainer.innerHTML = pageHTML;
  
  // Set up form handling
  const form = document.getElementById('signupForm');
  const errorElement = document.getElementById('signupError');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      
      // Validate passwords
      if (password !== confirmPassword) {
        errorElement.textContent = 'Passwords do not match';
        return;
      }
      
      if (password.length < 6) {
        errorElement.textContent = 'Password must be at least 6 characters';
        return;
      }
      
      // Update button to loading state
      const button = document.getElementById('signupButton');
      const originalButtonText = button.innerHTML;
      button.disabled = true;
      button.innerHTML = `
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Creating account...
      `;
      
      // Simulate API call delay
      setTimeout(() => {
        const success = window.app.handleSignup(email, password);
        
        if (success) {
          // Auto login and redirect
          window.app.handleLogin(email, password);
          navigateTo('/dashboard');
        } else {
          // Show error
          errorElement.textContent = 'Could not create account. Please try again.';
          
          // Reset button
          button.disabled = false;
          button.innerHTML = originalButtonText;
        }
      }, 1000);
    });
  }
}

function loadDashboardPage() {
  const appContainer = document.getElementById('app');
  const user = window.app.getUser();
  
  // Redirect to login if not authenticated
  if (!user) {
    navigateTo('/login');
    return;
  }
  
  const tracks = window.app.fetchTracks();
  const labsCompleted = window.app.getUserProgress();
  
  const pageHTML = `
    <div class="page-section">
      <div class="container">
        <div class="mb-12">
          <h1 class="text-3xl font-bold text-white mb-4">
            Your Dashboard
          </h1>
          <p class="text-xl text-gray-300">
            Track your progress and continue your Kubernetes learning journey
          </p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <!-- Progress Stats -->
          <div class="dashboard-card">
            <h2 class="text-2xl font-bold text-white mb-4">Your Progress</h2>
            
            <div class="space-y-4">
              ${tracks.map(track => {
                const completed = labsCompleted[track.id] || 0;
                const total = 10; // Assuming 10 labs per track
                const percentage = Math.round((completed / total) * 100);
                
                return `
                  <div class="space-y-2">
                    <div class="progress-header">
                      <span class="progress-label">${track.title}</span>
                      <span class="progress-value">${completed}/${total} labs</span>
                    </div>
                    <div class="progress-track">
                      <div class="progress-fill animate-progress" style="width: ${percentage}%"></div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
          
          <!-- Achievement Stats -->
          <div class="dashboard-card">
            <h2 class="text-2xl font-bold text-white mb-4">Achievements</h2>
            
            <div class="stats-grid">
              ${[
                { title: 'Labs Completed', value: Object.values(labsCompleted).reduce((a, b) => a + (b as number), 0), icon: 'fa-trophy' },
                { title: 'Tracks Started', value: Object.keys(labsCompleted).length, icon: 'fa-rocket' },
                { title: 'Tracks Completed', value: Object.entries(labsCompleted).filter(([_, count]) => count === 10).length, icon: 'fa-graduation-cap' },
                { title: 'Days Streak', value: Math.floor(Math.random() * 10) + 1, icon: 'fa-fire' }
              ].map((stat) => `
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="fa-solid ${stat.icon}"></i>
                  </div>
                  <div class="stat-content">
                    <div class="stat-value">${stat.value}</div>
                    <div class="stat-label">${stat.title}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        
        <h2 class="text-2xl font-bold text-white mb-6">Continue Learning</h2>
        
        <div class="grid">
          ${tracks.map(track => {
            const completedCount = labsCompleted[track.id] || 0;
            const progress = (completedCount / track.labCount) * 100;
            
            return `
              <div class="card cyber-container fade-in">
                <div class="card-header">
                  <div class="card-terminal-header">
                    <i class="fa-regular fa-terminal text-green-500"></i>
                    <div class="progress-bar">
                      <div class="progress-bar-fill"></div>
                    </div>
                  </div>
                  <h3 class="card-title">${track.title}</h3>
                </div>
                <div class="card-content">
                  <p class="card-description">${track.description}</p>
                  
                  <div class="card-progress">
                    <div class="progress-header">
                      <span class="progress-label">chmod +x</span>
                      <span class="progress-value">${completedCount}/${track.labCount}</span>
                    </div>
                    <div class="progress-track">
                      <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <a href="/tracks/${track.id}" data-route="track-detail" data-id="${track.id}" class="btn btn-outline btn-full-width">
                    <span class="mr-1">$</span> ./execute ${track.id}
                  </a>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
  
  appContainer.innerHTML = pageHTML;
  
  // Add fade-in animation
  const cards = appContainer.querySelectorAll('.card, .stat-card');
  cards.forEach((card, index) => {
    card.classList.add('fade-in');
    card.classList.add(`fade-in-${index % 5 + 1}`);
  });
}

function loadNotFoundPage() {
  const appContainer = document.getElementById('app');
  
  const pageHTML = `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-card to-background text-white">
      <div class="text-center px-6">
        <h1 class="text-6xl font-bold mb-6 text-argo-purple">404</h1>
        <p class="text-2xl mb-8">Oops! We couldn't find that page</p>
        <p class="text-gray-300 mb-10 max-w-md mx-auto">
          The page you are looking for might have been moved or doesn't exist.
        </p>
        <a href="/" data-route="home" class="btn btn-primary">
          Return to Home
        </a>
      </div>
    </div>
  `;
  
  appContainer.innerHTML = pageHTML;
}

// Expose navigateTo for global use
window.navigateTo = navigateTo;
