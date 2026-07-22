/* ============================================
   BAGMARA UPAZILA - COMPLETE JAVASCRIPT
   Version: 2.0 | Author: SOBUJ RAHMAN
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ============================================
  // NAVIGATION
  // ============================================
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Mobile menu toggle
  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // Navbar scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // ============================================
  // SMOOTH SCROLL
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // SCROLL TO TOP BUTTON
  // ============================================
  const scrollTopBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ============================================
  // HERO STAT COUNTER ANIMATION
  // ============================================
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;
    const heroSection = document.querySelector('.hero');
    const rect = heroSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      statsAnimated = true;
      statNumbers.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        const isDecimal = target % 1 !== 0;
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = target * easeOut;
          if (isDecimal) {
            stat.textContent = current.toFixed(2);
          } else {
            stat.textContent = Math.floor(current).toLocaleString('bn-BD');
          }
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            if (isDecimal) {
              stat.textContent = target.toFixed(2);
            } else {
              stat.textContent = target.toLocaleString('bn-BD');
            }
          }
        }
        requestAnimationFrame(updateCounter);
      });
    }
  }

  window.addEventListener('scroll', animateStats);
  animateStats(); // Check on load

  // ============================================
  // REVEAL ON SCROLL (Intersection Observer)
  // ============================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback for older browsers
    function checkReveal() {
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add('active');
        }
      });
    }
    window.addEventListener('scroll', checkReveal);
    checkReveal();
  }

  // ============================================
  // PROGRESS BAR ANIMATION (Income bars)
  // ============================================
  const incomeBars = document.querySelectorAll('.income-bar div');
  let incomeAnimated = false;

  function animateIncomeBars() {
    if (incomeAnimated) return;
    const economySection = document.getElementById('economy');
    if (!economySection) return;
    const rect = economySection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      incomeAnimated = true;
      incomeBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = width;
        }, index * 200);
      });
    }
  }

  window.addEventListener('scroll', animateIncomeBars);

  // ============================================
  // SANITATION BAR ANIMATION
  // ============================================
  const sanBars = document.querySelectorAll('.san-bar div');
  let sanAnimated = false;

  function animateSanBars() {
    if (sanAnimated) return;
    const healthSection = document.getElementById('health');
    if (!healthSection) return;
    const rect = healthSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      sanAnimated = true;
      sanBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = width;
        }, index * 300);
      });
    }
  }

  window.addEventListener('scroll', animateSanBars);

  // ============================================
  // LITERACY TIMELINE ANIMATION
  // ============================================
  const literacyBars = document.querySelectorAll('.timeline-item .bar div');
  let literacyAnimated = false;

  function animateLiteracyBars() {
    if (literacyAnimated) return;
    const popSection = document.getElementById('population');
    if (!popSection) return;
    const rect = popSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      literacyAnimated = true;
      literacyBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = width;
        }, index * 400);
      });
    }
  }

  window.addEventListener('scroll', animateLiteracyBars);

  // ============================================
  // TABLE ROW STAGGER ANIMATION
  // ============================================
  const unionRows = document.querySelectorAll('.union-table tbody tr');
  let tableAnimated = false;

  function animateTableRows() {
    if (tableAnimated) return;
    const adminSection = document.getElementById('administration');
    if (!adminSection) return;
    const rect = adminSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      tableAnimated = true;
      unionRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        row.style.transition = 'all 0.4s ease';
        setTimeout(() => {
          row.style.opacity = '1';
          row.style.transform = 'translateX(0)';
        }, index * 80);
      });
    }
  }

  window.addEventListener('scroll', animateTableRows);

  // ============================================
  // TIMELINE DOT ANIMATION
  // ============================================
  const timelineDots = document.querySelectorAll('.timeline-dot');
  let dotsAnimated = false;

  function animateTimelineDots() {
    if (dotsAnimated) return;
    const historySection = document.getElementById('history');
    if (!historySection) return;
    const rect = historySection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      dotsAnimated = true;
      timelineDots.forEach((dot, index) => {
        dot.style.transform = 'scale(0)';
        dot.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
          dot.style.transform = 'scale(1)';
        }, index * 300);
      });
    }
  }

  window.addEventListener('scroll', animateTimelineDots);

  // ============================================
  // SWOT CARD STAGGER ANIMATION
  // ============================================
  const swotCards = document.querySelectorAll('.swot-card');
  let swotAnimated = false;

  function animateSwotCards() {
    if (swotAnimated) return;
    const swotSection = document.getElementById('swot');
    if (!swotSection) return;
    const rect = swotSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      swotAnimated = true;
      swotCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) rotateX(10deg)';
        card.style.transition = 'all 0.6s ease';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) rotateX(0)';
        }, index * 200);
      });
    }
  }

  window.addEventListener('scroll', animateSwotCards);

  // ============================================
  // TOURISM CARD HOVER EFFECT
  // ============================================
  const tourismCards = document.querySelectorAll('.tourism-card');
  tourismCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // ============================================
  // CONTACT CARD PULSE EFFECT
  // ============================================
  const contactCards = document.querySelectorAll('.contact-card');
  contactCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.03)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // ============================================
  // KEYBOARD NAVIGATION SUPPORT
  // ============================================
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      navMenu.classList.remove('active');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // ============================================
  // PREFERS REDUCED MOTION
  // ============================================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    // Disable all animations
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('active');
    });
    statNumbers.forEach(stat => {
      const target = parseFloat(stat.getAttribute('data-target'));
      stat.textContent = target % 1 !== 0 ? target.toFixed(2) : target.toLocaleString('bn-BD');
    });
    incomeBars.forEach(bar => {
      bar.style.transition = 'none';
    });
  }

  // ============================================
  // PERFORMANCE: Debounced scroll handler
  // ============================================
  let ticking = false;
  function requestTick(callback) {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Replace scroll listeners with debounced versions
  const scrollCallbacks = [animateStats, animateIncomeBars, animateSanBars, 
                          animateLiteracyBars, animateTableRows, animateTimelineDots, animateSwotCards];

  window.removeEventListener('scroll', animateStats);
  window.removeEventListener('scroll', animateIncomeBars);
  window.removeEventListener('scroll', animateSanBars);
  window.removeEventListener('scroll', animateLiteracyBars);
  window.removeEventListener('scroll', animateTableRows);
  window.removeEventListener('scroll', animateTimelineDots);
  window.removeEventListener('scroll', animateSwotCards);

  window.addEventListener('scroll', function() {
    requestTick(function() {
      scrollCallbacks.forEach(cb => cb());
    });
  });

  // ============================================
  // CONSOLE GREETING
  // ============================================
  console.log('%c🏛️ বাগমারা উপজেলা', 'font-size:24px; font-weight:bold; color:#006a4e;');
  console.log('%cসম্পূর্ণ তথ্যভাণ্ডার | Developed by SOBUJ RAHMAN', 'font-size:14px; color:#4a4a6a;');

}); // End DOMContentLoaded
