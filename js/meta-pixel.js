// ============================================================
// UROPEDIATRA — Meta Pixel
// ============================================================
// Site médico: as páginas de condição clínica (/tratamentos/) NÃO
// enviam PageView. Assim a Meta não recebe o rastro de quais doenças
// cada visitante pesquisou — dessas páginas sai apenas o evento
// Contact, que é um ato voluntário de procurar atendimento.
// O evento Contact é disparado em js/main.js, junto do GA4.

(function (f, b, e, v, n, t, s) {
  if (f.fbq) return;
  n = f.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  };
  if (!f._fbq) f._fbq = n;
  n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
  t = b.createElement(e); t.async = !0; t.src = v;
  s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
})(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

window.META_PIXEL_ID = '1415327653360730';

// autoConfig desligado: impede a coleta automática de cliques em botões
// e campos de formulário, que é por onde dado pessoal costuma vazar.
fbq('set', 'autoConfig', false, window.META_PIXEL_ID);
fbq('init', window.META_PIXEL_ID);

if (location.pathname.indexOf('/tratamentos/') === -1) {
  fbq('track', 'PageView');
}
