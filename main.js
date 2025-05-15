
document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('main-nav');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Add terminal-like cursor blink animation
  const cursors = document.querySelectorAll('.cursor-blink');
  cursors.forEach(cursor => {
    // Already styled in CSS with animation
  });

  // Add terminal icons
  const terminalIcons = document.querySelectorAll('.terminal-icon');
  terminalIcons.forEach(icon => {
    if (!icon.textContent) {
      icon.textContent = '$';
    }
  });

  // Feature icons
  const featureIcons = {
    'terminal-icon': '⌨️',
    'database-icon': '🗄️',
    'check-icon': '✅',
    'clock-icon': '⏰',
    'server-icon': '🖥️',
    'shield-icon': '🛡️'
  };

  document.querySelectorAll('.feature-icon').forEach(icon => {
    Object.entries(featureIcons).forEach(([className, emoji]) => {
      if (icon.classList.contains(className)) {
        icon.textContent = emoji;
      }
    });
  });
});
