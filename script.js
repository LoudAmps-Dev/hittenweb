/* ============================================================
   NAVBAR — transparent on hero, solid on scroll
   ============================================================ */
const navbar  = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

function onScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveLink();
  if (prefersMotion) parallaxHero();
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ============================================================
   ACTIVE NAV LINK
   ============================================================ */
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollMid = window.scrollY + window.innerHeight / 3;

  sections.forEach(section => {
    const id   = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (!link) return;

    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;

    link.classList.toggle('active', scrollMid >= top && scrollMid < bottom);
  });
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
const burger     = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMenu(open) {
  burger.classList.toggle('open', open);
  mobileMenu.classList.toggle('open', open);
  mobileMenu.setAttribute('aria-hidden', String(!open));
  burger.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
}

burger.addEventListener('click', () => {
  toggleMenu(!mobileMenu.classList.contains('open'));
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
    toggleMenu(false);
  }
});

/* ============================================================
   HERO BACKGROUND + PARALLAX
   ============================================================ */
const heroBg      = document.getElementById('heroBg');
const prefersMotion = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

heroBg.style.backgroundImage = "url('assets/Copia de Copia de Hitten promo 2.jpg')";

function parallaxHero() {
  const hero    = document.querySelector('.hero');
  const scrolled = window.scrollY;
  if (scrolled < hero.offsetHeight) {
    heroBg.style.transform = `translateY(${scrolled * 0.28}px)`;
  }
}

/* ============================================================
   SCROLL REVEAL via IntersectionObserver
   ============================================================ */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));

/* Fallback: si el observer no dispara (file://, Safari antiguo),
   hace todo visible después de 600ms */
setTimeout(() => {
  revealEls.forEach(el => el.classList.add('visible'));
}, 600);
