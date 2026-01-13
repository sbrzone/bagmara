const sections = document.querySelectorAll(".reveal");

// Debounce function for performance optimization
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Function to check if section is in viewport
function checkVisibility() {
  sections.forEach(sec => {
    const sectionTop = sec.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    // Show section when it's 100px from the bottom of viewport
    if (sectionTop < windowHeight - 100) {
      sec.classList.add("active");
    }
  });
}

// Optimized scroll event with debounce
window.addEventListener("scroll", debounce(checkVisibility));

// Initial check on page load
document.addEventListener("DOMContentLoaded", function() {
  checkVisibility();
  
  // Optional: Add smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 20,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Optional: Add intersection observer for better performance
if ('IntersectionObserver' in window) {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    observer.observe(section);
  });
}