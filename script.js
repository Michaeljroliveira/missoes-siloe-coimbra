/* =========================================================
   MISSÕES SILÓE COIMBRA — script.js
   Menu mobile · Scroll suave · Ano automático · Animações
   ========================================================= */

(function () {
  'use strict';

  // ---------- 1. Ano automático no rodapé ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- 2. Menu mobile (hamburger) ----------
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
      nav.classList.toggle('is-open', !isOpen);
      document.body.classList.toggle('menu-open', !isOpen);
    });

    // Fecha o menu ao clicar num link (mobile)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menu');
        nav.classList.remove('is-open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // ---------- 3. Header com sombra ao fazer scroll ----------
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- 4. Scroll suave com offset do header fixo ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerH = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerH - 10;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  // ---------- 5. Animação de entrada (fade-up) ----------
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.section, .timeline article, .leader-card, .schedule-card, .meaning-card')
      .forEach(function (el) {
        el.classList.add('fade-up');
        io.observe(el);
      });
  }

})();