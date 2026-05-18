// ============================================================
// UROPEDIATRA — main.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Menu mobile ──────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenu  = document.getElementById('close-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
    closeMenu.addEventListener('click',  () => mobileMenu.classList.remove('open'));
    mobileMenu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => mobileMenu.classList.remove('open'))
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

  // ── Formulário de contato ─────────────────────────────────
  const form = document.getElementById('contato-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      btn.textContent = 'Enviando...';
      btn.disabled = true;

      // Aqui integraria com backend / Formspree / EmailJS
      setTimeout(() => {
        const msg = document.getElementById('form-success');
        if (msg) msg.style.display = 'block';
        form.reset();
        btn.textContent = 'Enviar mensagem';
        btn.disabled = false;
      }, 1200);
    });
  }

});
