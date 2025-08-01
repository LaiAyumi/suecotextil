// estampas-personalizadas.js
document.addEventListener('DOMContentLoaded', () => {
// FAQ — um aberto por vez
const faqButtons = document.querySelectorAll('.pp-qa .q');
faqButtons.forEach((btn) => {
  const answer = btn.nextElementSibling;
  if (answer) answer.style.maxHeight = '0px';

  btn.addEventListener('click', () => {
    const isOpening = !btn.classList.contains('open');

    // fecha todos
    faqButtons.forEach(b => {
      if (b !== btn) {
        b.classList.remove('open');
        const a = b.nextElementSibling;
        if (a) a.style.maxHeight = '0px';
      }
    });

    // toggle atual
    btn.classList.toggle('open', isOpening);
    if (answer) {
      answer.style.maxHeight = isOpening ? answer.scrollHeight + 'px' : '0px';
    }

    // troca + / –
    const ico = btn.querySelector('.ico');
    if (ico) ico.textContent = isOpening ? '–' : '+';
  });
});


  // Formulário (toast) + WhatsApp
  const form  = document.getElementById('pp-form');
  const whats = document.getElementById('pp-whats');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (typeof showToast === 'function') showToast('Recebemos seu briefing. Obrigado!');
      form.reset();
    });
  }

  if (whats && form) {
    whats.addEventListener('click', (e) => {
      e.preventDefault();
      const nome = form.querySelector('[name="nome"]')?.value?.trim() || '';
      const seg  = form.querySelector('[name="segmento"]')?.value?.trim() || '';
      const msg  = encodeURIComponent(`Olá! Tenho interesse em Estampas Personalizadas.\nNome: ${nome}\nSegmento: ${seg}`);
      window.open(`https://wa.me/55SEUNUMERO?text=${msg}`, '_blank');
    });
  }
});
