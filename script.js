/* ============================================================
   DECLARACIONES — todo antes de cualquier llamada
   ============================================================ */
const navbar        = document.getElementById('navbar');
const navLinks      = document.querySelectorAll('.nav-link');
const sections      = document.querySelectorAll('section[id]');
const burger        = document.getElementById('navBurger');
const mobileMenu    = document.getElementById('mobileMenu');
/* ============================================================
   NAVBAR — transparent on hero, solid on scroll
   ============================================================ */
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

function onScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveLink();
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ============================================================
   MOBILE MENU
   ============================================================ */
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

setTimeout(() => {
  revealEls.forEach(el => el.classList.add('visible'));
}, 600);

/* ============================================================
   VIDEO FACADE — swap thumbnail for iframe on click
   ============================================================ */
document.querySelectorAll('.video-facade').forEach(facade => {
  facade.addEventListener('click', () => {
    const id = facade.dataset.yt;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
    iframe.title = 'HITTEN — Videoclip';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:none;';
    facade.parentNode.replaceChild(iframe, facade);
  });
});
