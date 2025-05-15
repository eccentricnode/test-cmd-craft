
document.addEventListener('DOMContentLoaded', function() {
  const tracksGrid = document.getElementById('tracks-grid');
  const tracksLoader = document.getElementById('tracks-loader');
  
  // Mock data for tracks
  const tracks = [
    {
      id: 'nginx',
      title: 'NGINX Ingress',
      description: 'Learn how to configure and deploy NGINX Ingress Controllers in Kubernetes',
      labCount: 10,
      completedCount: 3
    },
    {
      id: 'database',
      title: 'Database Administration',
      description: 'Master Kubernetes database management with StatefulSets and Operators',
      labCount: 10,
      completedCount: 1
    },
    {
      id: 'argocd',
      title: 'Argo CD in Production',
      description: 'Deploy and manage Argo CD in production environments',
      labCount: 10,
      completedCount: 5
    },
    {
      id: 'monitoring',
      title: 'Monitoring with Prometheus',
      description: 'Set up comprehensive Kubernetes monitoring and alerting',
      labCount: 10,
      completedCount: 0
    },
    {
      id: 'security',
      title: 'Kubernetes Security',
      description: 'Learn best practices for securing your Kubernetes clusters',
      labCount: 10,
      completedCount: 2
    },
    {
      id: 'networking',
      title: 'Advanced Networking',
      description: 'Master complex Kubernetes networking scenarios and troubleshooting',
      labCount: 10,
      completedCount: 7
    }
  ];
  
  // Simulate loading
  setTimeout(() => {
    if (tracksLoader) {
      tracksLoader.style.display = 'none';
    }
    
    renderTracks();
  }, 800);
  
  function renderTracks() {
    if (!tracksGrid) return;
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('user') !== null;
    
    tracks.forEach(track => {
      const trackCard = document.createElement('div');
      trackCard.className = 'track-card';
      
      const progressPercentage = isLoggedIn ? Math.round((track.completedCount / track.labCount) * 100) : 80; // Default 80% for visual
      
      trackCard.innerHTML = `
        <div class="track-card-header">
          <div class="track-card-terminal">
            <span class="terminal-icon">$</span>
            <div class="track-card-progress-bar">
              <div class="track-card-progress-fill" style="width: 80%"></div>
            </div>
          </div>
          <h3 class="track-card-title">${track.title}</h3>
        </div>
        <div class="track-card-content">
          <p class="track-card-desc">${track.description}</p>
          
          ${isLoggedIn ? `
          <div class="track-progress">
            <div class="track-progress-header">
              <span class="track-progress-label">chmod +x</span>
              <span class="track-progress-count">${track.completedCount}/${track.labCount}</span>
            </div>
            <div class="track-progress-bar">
              <div class="track-progress-fill" style="width: ${progressPercentage}%"></div>
            </div>
          </div>
          ` : ''}
        </div>
        <div class="track-card-footer">
          <a href="track-detail.html?id=${track.id}" class="argo-button-outline" style="width: 100%;">
            <span>$</span> ./execute ${track.id}
          </a>
        </div>
      `;
      
      tracksGrid.appendChild(trackCard);
    });
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const tracksGrid = document.getElementById('tracks-grid');
  const tracksLoader = document.getElementById('tracks-loader');
  
  // Mock data for tracks
  const tracks = [
    {
      id: 'nginx',
      title: 'NGINX Ingress',
      description: 'Learn how to configure and deploy NGINX Ingress Controllers in Kubernetes',
      labCount: 10,
      completedCount: 3
    },
    {
      id: 'database',
      title: 'Database Administration',
      description: 'Master Kubernetes database management with StatefulSets and Operators',
      labCount: 10,
      completedCount: 1
    },
    {
      id: 'argocd',
      title: 'Argo CD in Production',
      description: 'Deploy and manage Argo CD in production environments',
      labCount: 10,
      completedCount: 5
    },
    {
      id: 'monitoring',
      title: 'Monitoring with Prometheus',
      description: 'Set up comprehensive Kubernetes monitoring and alerting',
      labCount: 10,
      completedCount: 0
    },
    {
      id: 'security',
      title: 'Kubernetes Security',
      description: 'Learn best practices for securing your Kubernetes clusters',
      labCount: 10,
      completedCount: 2
    },
    {
      id: 'networking',
      title: 'Advanced Networking',
      description: 'Master complex Kubernetes networking scenarios and troubleshooting',
      labCount: 10,
      completedCount: 7
    }
  ];
  
  // Simulate loading
  setTimeout(() => {
    if (tracksLoader) {
      tracksLoader.style.display = 'none';
    }
    
    renderTracks();
  }, 800);
  
  function renderTracks() {
    if (!tracksGrid) return;
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('user') !== null;
    
    tracks.forEach(track => {
      const trackCard = document.createElement('div');
      trackCard.className = 'track-card';
      
      const progressPercentage = isLoggedIn ? Math.round((track.completedCount / track.labCount) * 100) : 80; // Default 80% for visual
      
      trackCard.innerHTML = `
        <div class="track-card-header">
          <div class="track-card-terminal">
            <span class="terminal-icon">$</span>
            <div class="track-card-progress-bar">
              <div class="track-card-progress-fill" style="width: 80%"></div>
            </div>
          </div>
          <h3 class="track-card-title">${track.title}</h3>
        </div>
        <div class="track-card-content">
          <p class="track-card-desc">${track.description}</p>
          
          ${isLoggedIn ? `
          <div class="track-progress">
            <div class="track-progress-header">
              <span class="track-progress-label">chmod +x</span>
              <span class="track-progress-count">${track.completedCount}/${track.labCount}</span>
            </div>
            <div class="track-progress-bar">
              <div class="track-progress-fill" style="width: ${progressPercentage}%"></div>
            </div>
          </div>
          ` : ''}
        </div>
        <div class="track-card-footer">
          <a href="track-detail.html?id=${track.id}" class="argo-button-outline" style="width: 100%;">
            <span>$</span> ./execute ${track.id}
          </a>
        </div>
      `;
      
      tracksGrid.appendChild(trackCard);
    });
  }
});
