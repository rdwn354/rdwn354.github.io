/**
 * Portfolio — Muhamad Ridwan Suryadi
 * Clean light theme. No Bootstrap.
 */

(function () {
  'use strict';

  /* ═══ NAVBAR ═══ */
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateNav() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    const offset = window.scrollY + 100;
    sections.forEach(sec => {
      if (offset >= sec.offsetTop && offset < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(l => l.classList.remove('active'));
        const a = document.querySelector(`.nav-link[href="#${sec.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ═══ MOBILE DRAWER ═══ */
  const navToggle      = document.getElementById('navToggle');
  const mobileDrawer   = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  const openDrawer  = () => {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('open');
    navToggle.classList.add('open');
    document.body.classList.add('no-scroll');
  };
  const closeDrawer = () => {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('open');
    navToggle.classList.remove('open');
    document.body.classList.remove('no-scroll');
  };

  if (navToggle) navToggle.addEventListener('click', () =>
    mobileDrawer.classList.contains('open') ? closeDrawer() : openDrawer()
  );
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
  document.querySelectorAll('.drawer-link').forEach(l => l.addEventListener('click', closeDrawer));

  /* ═══ SCROLL TOP ═══ */
  const scrollTop = document.getElementById('scrollTop');
  if (scrollTop) {
    window.addEventListener('scroll', () =>
      scrollTop.classList.toggle('active', window.scrollY > 300), { passive: true }
    );
    scrollTop.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ═══ SMOOTH SCROLL ═══ */
  const NAV_H = 64;
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - NAV_H, behavior: 'smooth' });
    });
  });

  window.addEventListener('load', () => {
    if (window.location.hash) {
      const t = document.querySelector(window.location.hash);
      if (t) setTimeout(() => window.scrollTo({ top: t.offsetTop - NAV_H, behavior: 'smooth' }), 200);
    }
  });

  /* ═══ AOS ═══ */
  window.addEventListener('load', () => {
    AOS.init({ duration: 650, easing: 'ease-out-cubic', once: true, offset: 60 });
  });

  /* ═══ TYPED.JS ═══ */
  const typedEl = document.querySelector('.typed');
  if (typedEl) {
    new Typed('.typed', {
      strings: typedEl.getAttribute('data-typed-items').split(','),
      loop: true, typeSpeed: 70, backSpeed: 35, backDelay: 2200,
    });
  }

  /* ═══ GLIGHTBOX ═══ */
  GLightbox({ selector: '.glightbox' });

  /* ═══ ISOTOPE ═══ */
  document.querySelectorAll('.isotope-layout').forEach(wrap => {
    let iso;
    imagesLoaded(wrap.querySelector('.isotope-container'), () => {
      iso = new Isotope(wrap.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: 'fitRows',
      });
    });

    wrap.querySelectorAll('.isotope-filters li').forEach(btn => {
      btn.addEventListener('click', function () {
        wrap.querySelector('.filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        if (iso) iso.arrange({ filter: this.getAttribute('data-filter') });
      });
    });
  });

  /* ═══ SKILL BARS ═══ */
  window.addEventListener('load', () => {
    document.querySelectorAll('.skill-item').forEach(item => {
      new Waypoint({
        element: item,
        offset: '92%',
        handler: function () {
          const fill = item.querySelector('.skill-fill');
          if (fill) fill.style.width = item.getAttribute('data-w') + '%';
        },
      });
    });
  });

})();
