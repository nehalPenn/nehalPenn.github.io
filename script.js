const themeSwitch = document.getElementById('theme-switch');
const moonIcon = themeSwitch.querySelector('i');

// Check for saved theme preference, default to dark if none saved
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
moonIcon.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';

// Theme toggle with fade effect
themeSwitch.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  // Add fade effect
  document.body.style.animation = 'theme-fade 0.3s ease';
  
  setTimeout(() => {
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    moonIcon.className = newTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    document.body.style.animation = 'none';
  }, 150);
  
  // Play retro switch sound
  const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
  audio.volume = 0.2;
  audio.play().catch(() => {});
});

// Add hover sound effect to links
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('mouseenter', () => {
    const hoverSound = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
    hoverSound.volume = 0.1;
    hoverSound.play().catch(() => {});
  });
});

// Typewriter effect for paragraphs - moderate speed
document.querySelectorAll('.body-paragraph').forEach((paragraph, index) => {
  // Store the original HTML including links
  const originalHTML = paragraph.innerHTML;
  
  // Get all links from the paragraph
  const links = paragraph.getElementsByTagName('a');
  const linksHTML = Array.from(links).map(link => link.outerHTML);
  
  // Replace links with placeholders
  let textContent = originalHTML;
  Array.from(links).forEach(link => {
    textContent = textContent.replace(link.outerHTML, '|||LINK|||');
  });
  
  // Clear paragraph content
  paragraph.innerHTML = '';
  
  // Split text into parts (text between links)
  const textParts = textContent.split('|||LINK|||');
  let linkIndex = 0;
  
  // Delay start based on paragraph index - reduced from 1000 to 600
  setTimeout(() => {
    let partIndex = 0;
    
    function typePart() {
      if (partIndex < textParts.length) {
        // Type out the text part
        let charIndex = 0;
        const part = textParts[partIndex];
        
        const typeInterval = setInterval(() => {
          if (charIndex < part.length) {
            paragraph.innerHTML += part.charAt(charIndex);
            charIndex++;
          } else {
            clearInterval(typeInterval);
            // Insert link if there is one
            if (linkIndex < linksHTML.length) {
              paragraph.innerHTML += linksHTML[linkIndex];
              linkIndex++;
            }
            partIndex++;
            typePart(); // Start typing next part
          }
        }, 10); // Changed from 20 to 10 - moderately faster typing
      }
    }
    
    typePart();
  }, index * 600); // Changed from 1000 to 600 - moderate delay between paragraphs
});

// Add this to your script.js
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to all text links
    const links = document.querySelectorAll('.text-link');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation(); // Stop event bubbling
            window.open(this.href, '_blank'); // Open link in new tab
        });
    });
});