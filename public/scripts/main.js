// Front-end interactions for Listicle: floating particles, 3D tilt cards,
// scroll-reveal, clickable tiles and a parallax hero panel.
// Pure vanilla JS — no framework.

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Floating particles in the hero ---------- */
function spawnParticles() {
  const layer = document.getElementById('particles');
  if (!layer || prefersReducedMotion) return;
  const COUNT = 34;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    const size = 2 + (i % 5);
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${(i * 2.97) % 100}%`;
    p.style.animationDuration = `${8 + (i % 7) * 2}s`;
    p.style.animationDelay = `${-(i % 10) * 1.3}s`;
    layer.appendChild(p);
  }
}

/* ---------- 3D tilt following the cursor ---------- */
function attachTilt(card) {
  if (prefersReducedMotion) return;
  const MAX = 9;
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `rotateY(${x * MAX * 2}deg) rotateX(${-y * MAX * 2}deg) scale(1.03)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
}

/* ---------- Scroll reveal ---------- */
const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;

/* ---------- Wire up cards ---------- */
function initCards() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${Math.min(i * 70, 500)}ms`;
    attachTilt(card);

    // Whole tile is clickable (ignore clicks on the inner link itself)
    const href = card.dataset.href;
    if (href) {
      card.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') window.location.href = href;
      });
    }

    if (revealObserver) revealObserver.observe(card);
    else card.classList.add('in-view');
  });

  // Failsafe: never leave content invisible if the observer doesn't fire
  setTimeout(() => cards.forEach((c) => c.classList.add('in-view')), 1600);
}

/* ---------- Parallax hero panel + tilt on detail image ---------- */
function initParallax() {
  const heroPanel = document.getElementById('hero-panel');
  if (heroPanel && !prefersReducedMotion) {
    window.addEventListener('scroll', () => {
      const offset = window.scrollY;
      if (offset < window.innerHeight) {
        heroPanel.style.transform = `translateY(${offset * 0.25}px)`;
      }
    }, { passive: true });
  }

  const detailCard = document.getElementById('detail-card');
  const detailImage = document.getElementById('detail-image');
  if (detailCard && detailImage && !prefersReducedMotion) {
    detailCard.addEventListener('mousemove', (e) => {
      const r = detailCard.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      detailImage.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
    });
    detailCard.addEventListener('mouseleave', () => { detailImage.style.transform = ''; });
  }
}

spawnParticles();
initCards();
initParallax();