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

// Smooth loading effect for paragraphs
document.querySelectorAll('.body-paragraph').forEach((paragraph, index) => {
  paragraph.style.animationDelay = `${(index + 1) * 150}ms`;
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