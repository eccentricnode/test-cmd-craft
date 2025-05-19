
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

  // Add terminal-like cursor blink animation
  const cursors = document.querySelectorAll('.cursor-blink');
  cursors.forEach(cursor => {
    // Already styled in CSS with animation
  });
  
  // Add terminal typing effect to the error messages
  const terminalTexts = document.querySelectorAll('.terminal-text');
  
  terminalTexts.forEach((text, index) => {
    // Skip the last element (which has the cursor)
    if (text.classList.contains('blink-cursor')) return;
    
    const originalText = text.innerHTML;
    text.innerHTML = '';
    
    let i = 0;
    // Adjust typing speed based on content position
    const typingSpeed = 30 + (index * 10); // ms per character, slower for subsequent lines
    
    function typeWriter() {
      if (i < originalText.length) {
        text.innerHTML += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, typingSpeed);
      }
    }
    
    // Start the typing effect with a delay based on position
    setTimeout(() => {
        typeWriter();
      }, index * 800); // Stagger the start of each line
    });
  }

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
