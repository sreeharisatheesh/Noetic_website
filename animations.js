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
  const logoImg = document.querySelector('.logo-img');
  if (logoImg) {
    logoImg.addEventListener('error', () => {
      logoImg.style.display = 'none';
      const fallback = logoImg.nextElementSibling;
      if (fallback && fallback.classList.contains('logo-text')) {
        fallback.style.display = 'inline';
      }
    });
  }
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

// DEMO LAZY LOAD
function setupDemoLazyLoad() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const iframe = e.target.querySelector('iframe[data-src]');
        if (iframe && !iframe.src) {
          iframe.src = iframe.dataset.src;
        }
      }
    });
  }, { threshold: 0.3 });
  
  document.querySelectorAll('.demo-phone-frame').forEach(f => obs.observe(f));
}

// PRICING TOGGLE
function setupPricingToggle() {
  const btns = document.querySelectorAll('.price-toggle-btn');
  if (!btns.length) return;
  
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const yearly = btn.dataset.period === 'yearly';
      document.querySelectorAll('.price-monthly').forEach(el => el.style.display = yearly ? 'none' : 'inline');
      document.querySelectorAll('.price-yearly').forEach(el => el.style.display = yearly ? 'inline' : 'none');
    });
  });
}

// INITIALIZE ALL
document.addEventListener('DOMContentLoaded', () => {
  setupScrollReveal();
  setupTiltCards();
  setupNavbarScroll();
  setupSmoothScroll();
  setupAccordion();
  setupHamburgerMenu();
  setupLogoFallback();
  setupOrbParallax();
  setupDemoLazyLoad();
  setupPricingToggle();
});
