// SCROLL REVEAL ANIMATION
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all reveal elements on page load
function setupScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-group');
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

// 3D TILT EFFECT
const isHoverDevice = () => window.matchMedia('(hover: hover)').matches;

function setupTiltCards() {
  if (!isHoverDevice()) return;

  const tiltCards = document.querySelectorAll('.tilt-card');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const angleX = (mouseY - centerY) / centerY * 10;
      const angleY = (centerX - mouseX) / centerX * 10;
      
      card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0) rotateY(0)';
    });
  });
}

// NAVBAR SCROLL STATE
function setupNavbarScroll() {
  const nav = document.querySelector('nav');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

// SMOOTH SCROLL FOR ANCHOR LINKS
function setupSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ACCORDION
function setupAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    
    header.addEventListener('click', () => {
      // Close all other items
      accordionItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('open')) {
          otherItem.classList.remove('open');
          const otherContent = otherItem.querySelector('.accordion-content');
          otherContent.style.maxHeight = '0';
        }
      });
      
      // Toggle current item
      item.classList.toggle('open');
      
      if (item.classList.contains('open')) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0';
      }
    });
  });
}

// HAMBURGER MENU
function setupHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMobile = document.querySelector('.nav-mobile');
  const navLinks = document.querySelectorAll('.nav-mobile a');
  
  if (!hamburger) return;
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMobile.classList.toggle('open');
  });
  
  // Close menu when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMobile.classList.remove('open');
    });
  });
  
  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
      hamburger.classList.remove('active');
      navMobile.classList.remove('open');
    }
  });
}

// LOGO FALLBACK
function setupLogoFallback() {
  // Logo fallback is no longer needed as we always display the text
}

// ORB PARALLAX
function setupOrbParallax() {
  const heroSection = document.querySelector('.section-hero');
  if (!heroSection) return;
  
  const orbs = heroSection.querySelectorAll('.orb');
  if (orbs.length === 0) return;
  
  heroSection.addEventListener('mousemove', (e) => {
    if (!isHoverDevice()) return;
    
    const rect = heroSection.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const distX = (mouseX - centerX) / 20;
    const distY = (mouseY - centerY) / 20;
    
    orbs.forEach((orb, index) => {
      const factor = (index + 1) * 0.5;
      orb.style.transform = `translate(${distX * factor}px, ${distY * factor}px)`;
    });
  });
}

// ─────────────────────────────────────────
// SCROLL PROGRESS BAR
// ─────────────────────────────────────────
function setupScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.prepend(bar);

  function update() {
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? Math.min(100, (scrolled / max) * 100) : 0) + '%';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ─────────────────────────────────────────
// CURSOR SPOTLIGHT (desktop only)
// ─────────────────────────────────────────
function setupCursorSpotlight() {
  if (!isHoverDevice()) return;

  const spot = document.createElement('div');
  spot.className = 'cursor-spotlight';
  document.body.appendChild(spot);

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let sx = mx, sy = my;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    spot.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    spot.style.opacity = '0';
  });

  (function tick() {
    sx += (mx - sx) * 0.07;
    sy += (my - sy) * 0.07;
    spot.style.left = sx + 'px';
    spot.style.top  = sy + 'px';
    requestAnimationFrame(tick);
  })();
}

// ─────────────────────────────────────────
// MAGNETIC BUTTONS (desktop only)
// ─────────────────────────────────────────
function setupMagneticButtons() {
  if (!isHoverDevice()) return;

  const btns = document.querySelectorAll('.btn-gradient, .nav-cta');

  btns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) * 0.22;
      const dy = (e.clientY - (r.top  + r.height / 2)) * 0.22;
      btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-2px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ─────────────────────────────────────────
// FEATURE ROW REVEAL ANIMATIONS
// ─────────────────────────────────────────
function setupFeatureAnimations() {
  const rows = document.querySelectorAll('.feature-row');
  if (!rows.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  rows.forEach(row => obs.observe(row));
}

// ─────────────────────────────────────────
// HERO IPHONE — AUTO TAB CYCLER
// ─────────────────────────────────────────
function setupHeroMockup() {
  const mockup = document.querySelector('.iphone-mockup');
  if (!mockup) return;

  const tabs    = mockup.querySelectorAll('.iphone-tab');
  const titleEl = mockup.querySelector('.iphone-card-title');
  if (!tabs.length || !titleEl) return;

  const slides = [
    { tab: 0, text: 'Grammar fixed. Sounds perfect.' },
    { tab: 1, text: 'Tone set to Professional.'       },
    { tab: 2, text: 'Rephrased and clarified.'        },
    { tab: 3, text: 'Summarized to 3 bullets.'        },
    { tab: 4, text: 'Translated to Hindi.'            },
  ];

  let cur = 0;
  titleEl.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

  function cycle() {
    tabs[slides[cur].tab].classList.remove('active');
    cur = (cur + 1) % slides.length;
    tabs[slides[cur].tab].classList.add('active');

    titleEl.style.opacity   = '0';
    titleEl.style.transform = 'translateY(5px)';

    setTimeout(() => {
      titleEl.textContent     = slides[cur].text;
      titleEl.style.opacity   = '1';
      titleEl.style.transform = 'translateY(0)';
    }, 260);
  }

  setInterval(cycle, 2400);
}

// ─────────────────────────────────────────
// PRICING CARD — HOVER GLOW
// ─────────────────────────────────────────
function setupPricingHover() {
  if (!isHoverDevice()) return;

  document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r  = card.getBoundingClientRect();
      const x  = ((e.clientX - r.left) / r.width)  * 100;
      const y  = ((e.clientY - r.top)  / r.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });
}

// ─────────────────────────────────────────
// INITIALIZE ALL
// ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setupScrollReveal();
  setupTiltCards();
  setupNavbarScroll();
  setupSmoothScroll();
  setupAccordion();
  setupHamburgerMenu();
  setupLogoFallback();
  setupOrbParallax();
  // Premium enhancements
  setupScrollProgress();
  setupCursorSpotlight();
  setupMagneticButtons();
  setupFeatureAnimations();
  setupHeroMockup();
  setupPricingHover();
});
