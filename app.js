
// Main application logic
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('currentYear').innerText = new Date().getFullYear();
  
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      
      // Toggle menu icon between bars and X
      const icon = menuToggle.querySelector('i');
      if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  }
  
  // Handle logout buttons
  const logoutButtons = [
    document.getElementById('logoutBtn'),
    document.getElementById('mobileLogoutBtn')
  ];
  
  logoutButtons.forEach(button => {
    if (button) {
      button.addEventListener('click', function() {
        handleLogout();
      });
    }
  });

  // Check authentication status and update UI
  checkAuthStatus();
});

// Mock auth functions (would be replaced with real auth in production)
function checkAuthStatus() {
  const user = localStorage.getItem('user');
  const authLinks = document.querySelectorAll('.auth-link');
  const userLinks = document.querySelectorAll('.user-link');
  
  if (user) {
    // User is logged in
    authLinks.forEach(link => link.style.display = 'none');
    userLinks.forEach(link => link.style.display = 'inline-flex');
  } else {
    // User is not logged in
    authLinks.forEach(link => link.style.display = 'inline-flex');
    userLinks.forEach(link => link.style.display = 'none');
  }
}

function handleLogin(email, password) {
  // This is a mock login function
  if (email && password) {
    const mockUser = {
      id: 'user123',
      email: email,
      name: 'Demo User'
    };
    
    // Save to localStorage (in a real app, this would be a JWT token)
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    // Update UI
    checkAuthStatus();
    return true;
  }
  return false;
}

function handleSignup(email, password) {
  // This is a mock signup function
  if (email && password && password.length >= 6) {
    // In a real app, would make an API call to create user
    return true;
  }
  return false;
}

function handleLogout() {
  localStorage.removeItem('user');
  checkAuthStatus();
  // Redirect to home
  navigateTo('/');
}

// Data functions
function fetchTracks() {
  // Mock data
  return [
    {
      id: 'nginx-ingress',
      title: 'NGINX Ingress',
      description: 'Learn how to configure and deploy NGINX Ingress Controllers in Kubernetes',
      image: 'nginx.png',
      labCount: 10
    },
    {
      id: 'database-admin',
      title: 'Database Administration',
      description: 'Master Kubernetes database management with StatefulSets and Operators',
      image: 'database.png',
      labCount: 10
    },
    {
      id: 'argocd',
      title: 'Argo CD in Production',
      description: 'Deploy and manage Argo CD in production environments',
      image: 'argocd.png',
      labCount: 10
    }
  ];
}

function fetchTrack(trackId) {
  const tracks = fetchTracks();
  return tracks.find(track => track.id === trackId) || null;
}

function fetchLabsForTrack(trackId) {
  // Mock labs data
  const labTitles = {
    'nginx-ingress': [
      'Installing NGINX Ingress Controller',
      'Configuring Basic Routing',
      'TLS Termination',
      'Path-Based Routing',
      'Host-Based Routing',
      'Rate Limiting',
      'Custom Headers',
      'WebSocket Support',
      'Canary Deployments',
      'Advanced Configuration'
    ],
    'database-admin': [
      'StatefulSet Basics',
      'Persistent Volume Claims',
      'Database Replication',
      'Backup and Restore',
      'High Availability Setup',
      'Database Migration',
      'Performance Tuning',
      'Using Operators',
      'Monitoring Databases',
      'Disaster Recovery'
    ],
    'argocd': [
      'ArgoCD Installation',
      'App of Apps Pattern',
      'GitOps Workflows',
      'Syncing Policies',
      'RBAC Configuration',
      'Multi-Cluster Deployment',
      'CI Integration',
      'Secrets Management',
      'Notification System',
      'Scaling Considerations'
    ]
  };
  
  const titles = labTitles[trackId] || [];
  
  return titles.map((title, index) => ({
    id: `${trackId}-lab-${index + 1}`,
    title: title,
    description: `Learn advanced concepts about ${title} in Kubernetes environments.`,
    isPublic: index < 2 // First two labs are public
  }));
}

// Helper functions
function getUser() {
  const userJson = localStorage.getItem('user');
  return userJson ? JSON.parse(userJson) : null;
}

function getUserProgress() {
  const user = getUser();
  if (!user) {
    return {};
  }
  
  // In a real app, this would fetch from a database
  // For demo, we'll use localStorage
  const progressJson = localStorage.getItem(`progress_${user.id}`);
  return progressJson ? JSON.parse(progressJson) : {
    'nginx-ingress': 3,
    'database-admin': 1,
    'argocd': 5
  };
}

function getCompletedLabs() {
  const user = getUser();
  if (!user) {
    return {};
  }
  
  // In a real app, this would fetch from a database
  const completedJson = localStorage.getItem(`completed_labs_${user.id}`);
  return completedJson ? JSON.parse(completedJson) : {
    'nginx-ingress-lab-1': true,
    'nginx-ingress-lab-2': true,
    'nginx-ingress-lab-3': true,
    'database-admin-lab-1': true,
    'argocd-lab-1': true,
    'argocd-lab-2': true,
    'argocd-lab-3': true,
    'argocd-lab-4': true,
    'argocd-lab-5': true
  };
}

// Export functions to global scope for use in other scripts
window.app = {
  checkAuthStatus,
  handleLogin,
  handleSignup,
  handleLogout,
  fetchTracks,
  fetchTrack,
  fetchLabsForTrack,
  getUser,
  getUserProgress,
  getCompletedLabs
};
