// ========== CONFIGURAÇÃO ==========
// Número do WhatsApp comercial, só dígitos e com DDI + DDD (ex.: 5511999999999).
// Enquanto estiver com o placeholder, os botões de WhatsApp ficam ocultos
// ou apontam para o formulário de contato (veja o README).
const WHATSAPP_NUMERO = '55SEUNUMERO';

// Aviso exibido pelos formulários: o site é estático e ainda não envia mensagens.
const AVISO_FORMULARIO = 'Obrigado pelo interesse! O envio online ainda não está disponível. ' +
  'Fale conosco pelo (11) 2139-6000 ou contato@sueco.com.br.';

function whatsappConfigurado() {
  return /^\d{10,15}$/.test(WHATSAPP_NUMERO);
}

function whatsappUrl(mensagem) {
  const texto = mensagem ? '?text=' + encodeURIComponent(mensagem) : '';
  return 'https://wa.me/' + WHATSAPP_NUMERO + texto;
}

// Links com [data-whatsapp] viram links do WhatsApp quando o número está configurado.
// Sem número, mantêm o href original (formulário de contato).
document.querySelectorAll('[data-whatsapp]').forEach(link => {
  if (!whatsappConfigurado()) return;
  link.href = whatsappUrl(link.dataset.whatsapp);
  link.target = '_blank';
  link.rel = 'noopener';
});

// ========== THEME TOGGLE ==========
(function () {
  const themeBtn = document.getElementById('theme-toggle');
  const STORAGE_KEY = 'sueco-tema';

  function applyTheme(light) {
    document.body.classList.toggle('light', light);
    if (themeBtn) {
      themeBtn.textContent = light ? '☀' : '☾'; // ☀ / ☾
      themeBtn.setAttribute('aria-pressed', String(light));
    }
  }

  let saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* storage indisponível */ }
  applyTheme(saved === 'light');

  if (!themeBtn) return;
  themeBtn.addEventListener('click', () => {
    const light = !document.body.classList.contains('light');
    applyTheme(light);
    try { localStorage.setItem(STORAGE_KEY, light ? 'light' : 'dark'); } catch (e) { /* ignora */ }
  });
})();

// ========== MENU MOBILE ==========
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.getElementById('nav-links');
  if (!toggle || !menu) return;

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.classList.toggle('is-open', open);
  }

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  menu.addEventListener('click', e => {
    if (e.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', e => {
    if (menu.classList.contains('is-open') && !e.target.closest('.navbar')) setOpen(false);
  });

  // fecha quando o foco do teclado sai da navbar com o menu aberto
  const navbar = toggle.closest('.navbar');
  if (navbar) {
    navbar.addEventListener('focusout', e => {
      if (menu.classList.contains('is-open') && e.relatedTarget && !navbar.contains(e.relatedTarget)) setOpen(false);
    });
  }

  const desktop = window.matchMedia('(min-width: 861px)');
  const onDesktop = e => { if (e.matches) setOpen(false); };
  // addListener: Safari anterior ao 14
  if (desktop.addEventListener) desktop.addEventListener('change', onDesktop);
  else if (desktop.addListener) desktop.addListener(onDesktop);
})();

// ========== MODAL (cores, estampas e painel de detalhes) ==========
// Fecha pelo X, Esc ou clique no fundo; devolve o foco a quem abriu.
function createModal(root, options) {
  const opts = Object.assign({ openClass: 'active', closeSelector: null, onClose: null }, options);
  const closeBtn = opts.closeSelector ? root.querySelector(opts.closeSelector) : null;
  let opener = null;

  function focusables() {
    return Array.from(root.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter(el => el.offsetParent !== null);
  }

  function isOpen() { return root.classList.contains(opts.openClass); }

  function open(trigger) {
    opener = trigger || document.activeElement;
    root.classList.add(opts.openClass);
    root.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    (closeBtn || root).focus();
  }

  function close() {
    if (!isOpen()) return;
    root.classList.remove(opts.openClass);
    root.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    if (typeof opts.onClose === 'function') opts.onClose();
    if (opener && typeof opener.focus === 'function') opener.focus();
    opener = null;
  }

  if (closeBtn) closeBtn.addEventListener('click', close);
  root.addEventListener('click', e => { if (e.target === root) close(); });

  document.addEventListener('keydown', e => {
    if (!isOpen()) return;
    if (e.key === 'Escape') {
      close();
    } else if (e.key === 'Tab') {
      // mantém o Tab dentro do diálogo enquanto ele estiver aberto
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last  = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  root.setAttribute('aria-hidden', 'true');
  return { open, close, isOpen };
}

// ========== TOAST UTILITY & CONTACT FORM ==========
// Um único aviso, já presente na página (role=status), para o leitor de tela anunciar
// o texto quando ele muda. Envios repetidos reaproveitam o mesmo aviso.
const toastEl = document.createElement('div');
toastEl.className = 'toast';
toastEl.setAttribute('role', 'status');
document.body.appendChild(toastEl);
let toastTimer = null;

function showToast(msg, duration) {
  clearTimeout(toastTimer);
  toastEl.textContent = '';
  toastTimer = setTimeout(() => {
    toastEl.textContent = msg;
    toastEl.classList.add('visible');
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('visible');
      toastTimer = setTimeout(() => { toastEl.textContent = ''; }, 400);
    }, duration || 6000);
  }, 50);
}

const contatoForm = document.querySelector('#contato-form');
if (contatoForm) {
  contatoForm.addEventListener('submit', e => {
    e.preventDefault();
    showToast(AVISO_FORMULARIO);
  });
}

// FADE-ON-SCROLL PARA SEÇÕES E CARDS (Anime.js é opcional; há fallback nativo)
// Anima a propriedade "translate" (e não "transform") para não desfazer os transforms
// do CSS, como a centralização do texto do hero e o hover dos cards.
const fadePendentes = new Set();

function revelar(el) {
  fadePendentes.delete(el);
  el.style.opacity = '';
  el.style.translate = '';
  el.style.transition = '';
}

const fadeObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    observer.unobserve(el); // anima 1x
    fadePendentes.delete(el);
    if (typeof window.anime === 'function') {
      // Usa Anime.js se estiver disponível
      window.anime({
        targets:   el,
        opacity:   [0, 1],
        translate: ['0px 50px', '0px 0px'],
        duration:  800,
        easing:    'easeOutQuad',
        complete:  () => revelar(el)
      });
    } else {
      // Fallback nativo (sem Anime.js)
      el.style.transition = 'opacity .8s ease, translate .8s ease';
      el.style.opacity = 1;
      el.style.translate = '0 0';
      setTimeout(() => revelar(el), 850);
    }
  });
}, { threshold: 0.1 });

// O alvo de um link #âncora aparece na hora, sem deslocamento, para parar no lugar certo
function revelarAlvo(hash) {
  if (!hash || hash.length < 2) return;
  let alvo = null;
  try { alvo = document.getElementById(decodeURIComponent(hash.slice(1))); } catch (e) { return; }
  if (!alvo) return;
  fadePendentes.forEach(el => {
    if (el === alvo || el.contains(alvo)) {
      fadeObserver.unobserve(el);
      revelar(el);
    }
  });
}

// Elementos que devem "aparecer" ao rolar
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll(
    '.section, .hero-content, .servico-card, .cartela-cores .container, .estampas-palette .slider'
  ).forEach(el => {
    el.style.opacity = 0;
    el.style.translate = '0 50px';
    fadePendentes.add(el);
    fadeObserver.observe(el);
  });
  revelarAlvo(location.hash);
  // links internos: revela o destino antes da rolagem padrão do navegador
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href*="#"]');
    if (link && link.pathname === location.pathname) revelarAlvo(link.hash);
  }, true);
}

// ========== SLIDERS (hero e estampas) ==========
function initSlider(root) {
  if (!root) return;
  const track   = root.querySelector('.slides');
  const slides  = root.querySelectorAll('.slide');
  const prevBtn = root.querySelector('.prev');
  const nextBtn = root.querySelector('.next');
  const total   = slides.length;
  let   idx     = 0;
  if (!track || total < 2 || !prevBtn || !nextBtn) return;

  function update() {
    track.style.transform = `translateX(-${idx * 100}%)`;
    slides.forEach((s, i) => {
      const hidden = i !== idx;
      s.setAttribute('aria-hidden', String(hidden));
      s.inert = hidden; // links de slides fora da tela não recebem foco
    });
  }
  prevBtn.addEventListener('click', () => {
    idx = idx > 0 ? idx - 1 : total - 1;
    update();
  });
  nextBtn.addEventListener('click', () => {
    idx = idx < total - 1 ? idx + 1 : 0;
    update();
  });
  update();
}

initSlider(document.querySelector('#hero-slider'));
initSlider(document.querySelector('.estampas-palette .slider'));
