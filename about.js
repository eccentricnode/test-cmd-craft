document.addEventListener('DOMContentLoaded', function() {
  // Add terminal typing effect
  const terminalTexts = document.querySelectorAll('.terminal-text');
  
  terminalTexts.forEach(text => {
    const originalText = text.innerHTML;
    text.innerHTML = '';
    
    let i = 0;
    const typingSpeed = 30; // ms per character
    
    function typeWriter() {
      if (i < originalText.length) {
        text.innerHTML += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, typingSpeed);
      }
    }
    
    // Start the typing effect with a small delay for each element
    setTimeout(() => {
      typeWriter();
    }, 200);
  });
  
  // Highlight the "About" link in the navbar
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.textContent === 'About') {
      link.classList.add('active');
    }
  });
});
