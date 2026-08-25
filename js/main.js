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

  // ── Active state na navegação ────────────────────────────
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http')) return;
    const linkFile = href.split('/').pop();
    const isTratatamentos = path.includes('/tratamentos/') && href.includes('tratamentos');
    const isExact = linkFile === filename || (linkFile === 'index.html' && filename === '');
    if (isTratatamentos || isExact) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // ── Animação fade-in ao entrar na tela ───────────────────
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animate-in');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.trat-card, .dep-card, .trust-item')
    .forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });


});

// ── Rastreamento de conversões GA4: cliques em WhatsApp e telefone ──
document.addEventListener('click', function (ev) {
  var a = ev.target.closest ? ev.target.closest('a[href]') : null;
  if (!a || typeof gtag !== 'function') return;
  var href = a.getAttribute('href') || '';
  if (href.indexOf('wa.me') !== -1) {
    gtag('event', 'clique_whatsapp', { link_url: href, page_path: location.pathname });
  } else if (href.indexOf('tel:') === 0) {
    gtag('event', 'clique_telefone', { link_url: href, page_path: location.pathname });
  }
});
