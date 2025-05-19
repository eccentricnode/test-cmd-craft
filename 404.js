
document.addEventListener('DOMContentLoaded', function() {
  // Add blinking cursor effect
  const blinkCursor = document.querySelector('.blink-cursor');
  if (blinkCursor) {
    setInterval(function() {
      blinkCursor.style.opacity = blinkCursor.style.opacity === '0' ? '1' : '0';
    }, 600);
  }
  
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
});