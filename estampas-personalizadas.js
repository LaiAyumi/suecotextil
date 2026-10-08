// estampas-personalizadas.js
document.addEventListener('DOMContentLoaded', () => {
  // FAQ: um aberto por vez
  const faqButtons = document.querySelectorAll('.pp-qa .q');

  // a altura da resposta vem do CSS (.q.open + .a); medir aqui cortava o texto
  function setItem(btn, open) {
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  }

  faqButtons.forEach((btn, i) => {
    const answer = btn.nextElementSibling;
    if (answer) {
      if (!answer.id) answer.id = `pp-faq-a${i + 1}`;
      btn.setAttribute('aria-controls', answer.id);
    }
    setItem(btn, false);

    btn.addEventListener('click', () => {
      const isOpening = !btn.classList.contains('open');
      // fecha os demais (o ícone volta a "+" via CSS)
      faqButtons.forEach(b => { if (b !== btn) setItem(b, false); });
      setItem(btn, isOpening);
    });
  });

  // Formulário (toast) + WhatsApp
  const form  = document.getElementById('pp-form');
  const whats = document.getElementById('pp-whats');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (typeof showToast === 'function') showToast(AVISO_FORMULARIO);
    });
  }

  // O botão só aparece quando WHATSAPP_NUMERO (script.js) estiver configurado.
  if (whats && form && typeof whatsappConfigurado === 'function' && whatsappConfigurado()) {
    whats.hidden = false;
    whats.addEventListener('click', () => {
      const nome = form.querySelector('[name="nome"]')?.value?.trim() || '';
      const seg  = form.querySelector('[name="segmento"]')?.value?.trim() || '';
      const msg  = `Olá! Tenho interesse em Estampas Personalizadas.\nNome: ${nome}\nSegmento: ${seg}`;
      window.open(whatsappUrl(msg), '_blank', 'noopener');
    });
  }
});
