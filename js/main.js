// ========================
//   CUSTOM CURSOR
// ========================
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .project-card, .skill-tag, .cert-badge, .hobby-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// ========================
//   ACTIVE NAV LINK
// ========================
(function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === page) a.classList.add('active');
  });
})();

// ========================
//   SCROLL REVEAL
// ========================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), entry.target.dataset.delay || 0);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.dataset.delay = (i % 4) * 100;
  observer.observe(el);
});

// Timeline
const timelineObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 150);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.timeline-item').forEach(el => timelineObs.observe(el));

// ========================
//   PROGRESS BARS
// ========================
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => bar.classList.add('animate'));
      barObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-bars').forEach(el => barObs.observe(el));

// ========================
//   COUNTERS
// ========================
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      let start = 0;
      const step = target / 30;
      const timer = setInterval(() => {
        start += step;
        if (start >= target) { start = target; clearInterval(timer); }
        el.textContent = Math.floor(start) + (target >= 10 ? '+' : '');
      }, 40);
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));

// ========================
//   PARALLAX ORBS
// ========================
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  document.querySelectorAll('.orb').forEach((orb, i) => {
    const factor = i === 0 ? 1 : -0.6;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

// ========================
//   EASTER EGG — "hack"
// ========================
const secretCode = ['h','a','c','k'];
let buffer = [];
let easterActive = false;

function getMagneticElements() {
  return document.querySelectorAll(`
    nav, .nav-logo, .nav-links a, .nav-badge,
    .hero-inner, .hero-label, .hero-name, .hero-sub, .hero-cta,
    .btn, .ticker, .ticker-track, .ticker-item,
    .section-header, .section-title, .section-count,
    .about-text, .stat-card, .skill-category, .skill-tag,
    .project-card, .tech-pill, .timeline-item,
    .contact-wrapper, .contact-big, .contact-link,
    .cert-badge, .hobby-card, footer, .footer-text
  `);
}

function resetMagnetism() {
  getMagneticElements().forEach(el => {
    el.classList.remove('magnetic');
    el.style.transform = '';
  });
}

document.addEventListener('keydown', e => {
  buffer.push(e.key.toLowerCase());
  if (buffer.length > secretCode.length) buffer.shift();
  if (JSON.stringify(buffer) === JSON.stringify(secretCode)) {
    easterActive = !easterActive;
    document.body.classList.toggle('easter-active', easterActive);
    buffer = [];
    if (!easterActive) resetMagnetism();
    else getMagneticElements().forEach(el => el.classList.add('magnetic'));
  }
});

document.addEventListener('mousemove', e => {
  if (!easterActive) return;
  const mouseX = e.clientX, mouseY = e.clientY;
  getMagneticElements().forEach(el => {
    const rect = el.getBoundingClientRect();
    const elX = rect.left + rect.width / 2;
    const elY = rect.top + rect.height / 2;
    const dx = mouseX - elX, dy = mouseY - elY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 300;
    if (distance < maxDist) {
      const force = (1 - distance / maxDist) * 18;
      el.style.transform = `translate(${dx / distance * force}px, ${dy / distance * force}px)`;
    } else {
      el.style.transform = '';
    }
  });
});
