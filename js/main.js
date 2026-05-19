// ============================================================
// UROPEDIATRA — main.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Menu mobile ──────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenu  = document.getElementById('close-menu');

  if (hamburger && mobileMenu) {
    const openMenu = () => {
      mobileMenu.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
    };
    const closeMenuFn = () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    };
    hamburger.addEventListener('click', openMenu);
    closeMenu.addEventListener('click', closeMenuFn);
    mobileMenu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', closeMenuFn)
    );
  }

  // ── FAQ Accordion ─────────────────────────────────────────
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Fecha todos
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        const a = i.querySelector('.faq-answer');
        if (a) a.style.maxHeight = null;
      });

      // Abre o clicado (se estava fechado)
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ── Scroll suave para âncoras ─────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Header shadow no scroll ───────────────────────────────
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 10
        ? '0 2px 20px rgba(0,0,0,0.12)'
        : '0 1px 3px rgba(0,0,0,0.08)';
    });
  }

  // ── Animação fade-in ao entrar na tela ───────────────────
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animate-in');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.trat-card, .dep-card, .chegou__item, .trust-item')
    .forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });

  // ── Formulário de contato (Formspree) ────────────────────
  const form = document.getElementById('contato-form');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const notice = document.getElementById('form-notice');
      const success = document.getElementById('form-success');
      const error = document.getElementById('form-error');

      btn.textContent = 'Enviando...';
      btn.disabled = true;
      if (notice) notice.style.display = 'none';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });

        if (response.ok) {
          if (success) success.style.display = 'block';
          form.reset();
        } else {
          if (error) error.style.display = 'block';
        }
      } catch {
        if (error) error.style.display = 'block';
      }

      btn.textContent = 'Enviar mensagem';
      btn.disabled = false;
    });
  }

});
