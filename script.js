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

// Typewriter effect for paragraphs - with 2.5s total time limit
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
  
  // Delay start based on paragraph index - reduced to fit within 2.5s total
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
        }, 8); // Adjusted for faster typing
      }
    }
    
    typePart();
  }, index * 200); // Reduced delay between paragraphs to fit within 2.5s
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

// Add this at the beginning of your script.js
document.addEventListener('DOMContentLoaded', function() {
  const powerButton = document.getElementById('power-button');
  const wrapper = document.querySelector('.wrapper');
  const content = document.querySelector('.content');
  let isPowered = false;

  // Initially hide content
  content.style.visibility = 'hidden';
  content.style.opacity = '0';
  content.style.transition = 'visibility 0s, opacity 1s ease-in-out';

  powerButton.addEventListener('click', function() {
    isPowered = !isPowered;
    
    if (isPowered) {
      // Power on
      powerButton.classList.add('powered-on');
      wrapper.classList.remove('screen-off');
      wrapper.classList.add('power-on-animation');
      
      // Play power on sound
      const powerOnSound = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
      powerOnSound.volume = 0.2;
      powerOnSound.play().catch(() => {});
      
      // Show content with delay
      setTimeout(() => {
        content.style.visibility = 'visible';
        content.style.opacity = '1';
        
        // Start the typewriter effect after power on
        startTypewriterEffect();
      }, 500);
    } else {
      // Power off
      powerButton.classList.remove('powered-on');
      wrapper.classList.add('screen-off');
      wrapper.classList.remove('power-on-animation');
      content.style.visibility = 'hidden';
      content.style.opacity = '0';
      
      // Play power off sound
      const powerOffSound = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
      powerOffSound.volume = 0.2;
      powerOffSound.play().catch(() => {});
    }
  });
});

// Wrap your existing typewriter effect in a function
function startTypewriterEffect() {
  // Your existing typewriter code here
  document.querySelectorAll('.body-paragraph').forEach((paragraph, index) => {
    // ... rest of your existing typewriter code ...
  });
}