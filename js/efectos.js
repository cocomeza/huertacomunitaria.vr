// Efectos JavaScript para el home mejorado

document.addEventListener('DOMContentLoaded', function () {
  // Ajustar padding-top según la altura real del navbar
  ajustarPaddingBody();
  window.addEventListener('resize', ajustarPaddingBody);

  initializeEffects();
  setupScrollAnimations();
  setupSmoothScrolling();
  addInteractiveEffects();
});

// Ajusta el padding-top del body según el alto real del navbar
function ajustarPaddingBody() {
  const navbar = document.getElementById('main-navbar');
  if (navbar) {
    document.body.style.paddingTop = navbar.offsetHeight + 'px';
  }
}

// Inicializar todos los efectos
function initializeEffects() {
  setupParallax();
  animateOnLoad();
  setupHoverEffects();
}

// Configurar animaciones de scroll (Intersection Observer)
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.section-reveal').forEach(el => {
    observer.observe(el);
  });
}

// Scroll suave para enlaces internos
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Efecto de paralaje para elementos flotantes
function setupParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.floating-leaf').forEach((leaf, index) => {
      const speed = 0.1 + (index * 0.05);
      const rotation = scrolled * 0.05;
      leaf.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg)`;
    });
    document.querySelectorAll('.floating-circle').forEach((circle, index) => {
      const speed = 0.05 + (index * 0.03);
      circle.style.transform = `translateY(${scrolled * speed}px) scale(${1 + scrolled * 0.0001})`;
    });
  });
}

// Animar elementos al cargar la página
function animateOnLoad() {
  setTimeout(() => {
    document.querySelectorAll('.benefits-section, .contact-section').forEach(el => {
      el.classList.add('active');
    });
  }, 500);
}

// Configurar efectos de hover
function setupHoverEffects() {
  document.querySelectorAll('.taller-card-modern').forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-10px) scale(1.02)';
      const shine = this.querySelector('.taller-shine');
      if (shine) shine.style.left = '100%';
    });
    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
      const shine = this.querySelector('.taller-shine');
      if (shine) shine.style.left = '-100%';
    });
  });

  document.querySelectorAll('.benefit-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-8px) scale(1.02)';
      const emoji = this.querySelector('.benefit-emoji');
      if (emoji) emoji.style.transform = 'scale(1.2) rotate(10deg)';
    });
    item.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
      const emoji = this.querySelector('.benefit-emoji');
      if (emoji) emoji.style.transform = 'scale(1) rotate(0deg)';
    });
  });
}

// Efectos interactivos adicionales
function addInteractiveEffects() {
  // Efecto de ondas en botones
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
      createRippleEffect(e, this);
    });
  });

  // Efecto de partículas en la imagen principal
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    heroImg.addEventListener('click', function () {
      createParticleEffect();
    });
  }

  // Efecto de respiración para el badge de participantes
  const badge = document.querySelector('.participants-badge');
  if (badge) {
    setInterval(() => {
      badge.style.transform = 'scale(1.05)';
      setTimeout(() => {
        badge.style.transform = 'scale(1)';
      }, 500);
    }, 3000);
  }
}

// Crear efecto de ondas en botones
function createRippleEffect(event, element) {
  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
    z-index: 10;
  `;

  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}

// Crear efecto de partículas
function createParticleEffect() {
  const colors = ['#28a745', '#f4a261', '#e76f51', '#2f4f2f', '#a2cfa2'];
  const heroSection = document.querySelector('.hero-section');
  const rect = heroSection.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  for (let i = 0; i < 20; i++) {
    createParticle(centerX, centerY, colors[Math.floor(Math.random() * colors.length)]);
  }
}
function createParticle(x, y, color) {
  const particle = document.createElement('div');
  const size = Math.random() * 6 + 4;

  particle.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: ${color};
    left: ${x}px;
    top: ${y}px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 1000;
    animation: particle 2s ease-out forwards;
  `;

  const randomX = (Math.random() - 0.5) * 400;
  const randomY = (Math.random() - 0.5) * 400;

  particle.style.setProperty('--random-x', randomX + 'px');
  particle.style.setProperty('--random-y', randomY + 'px');

  document.querySelector('.hero-section').appendChild(particle);

  setTimeout(() => particle.remove(), 2000);
}

// Detectar dispositivo móvil para optimizar efectos
function isMobileDevice() {
  return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Optimizar para móviles
if (isMobileDevice()) {
  document.documentElement.style.setProperty('--animation-duration', '0.3s');
}
