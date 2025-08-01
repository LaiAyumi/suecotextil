// ========== THEME TOGGLE ==========
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
  themeBtn.onclick = () => {
    document.body.classList.toggle('light');
    themeBtn.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
  };
}

// ========== CTA FRAME CLOSE ==========
const ctaClose = document.getElementById('cta-close');
if (ctaClose) {
  ctaClose.onclick = () => {
    document.getElementById('cta-frame').style.display = 'none';
  };
}

// ========== DECORATIVE FRAMES OBSERVER ==========
const frameObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle('in-view', entry.isIntersecting);
  });
}, { threshold: 0.1 });
document.querySelectorAll('.framed').forEach(el => frameObserver.observe(el));

// ========== TOAST UTILITY & CONTACT FORM ==========
function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('visible'), 10);
  setTimeout(() => {
    t.classList.remove('visible');
    setTimeout(() => t.remove(), 500);
  }, 3000);
}

const contatoForm = document.querySelector('#contato-form');
if (contatoForm) {
  contatoForm.addEventListener('submit', e => {
    e.preventDefault();
    showToast('Sua mensagem foi enviada!');
    contatoForm.reset();
  });
}

// FADE-ON-SCROLL PARA SEÇÕES E CARDS  (sem depender de Anime.js)
const fadeObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (typeof window.anime === 'function') {
        // Usa Anime.js se estiver disponível
        window.anime({
          targets: entry.target,
          opacity:   [0, 1],
          translateY:[50, 0],
          duration:  800,
          easing:    'easeOutQuad'
        });
      } else {
        // Fallback nativo (sem Anime.js)
        entry.target.style.transition = 'opacity .8s ease, transform .8s ease';
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
      observer.unobserve(entry.target); // anima 1x
    } else {
      entry.target.style.opacity = 0;
      entry.target.style.transform = 'translateY(50px)';
    }
  });
}, { threshold: 0.1 });

// Elementos que devem “aparecer” ao rolar
document.querySelectorAll(
  '.section, .hero-content, .servico-card, .cartela-cores .container, .estampas-palette .info, .estampas-palette .slider'
).forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(50px)';
  fadeObserver.observe(el);
});


  // —— HERO SLIDER
  (function(){
    const slider  = document.querySelector('#hero-slider .slides');
    const slides  = document.querySelectorAll('#hero-slider .slide');
    const prevBtn = document.querySelector('#hero-slider .prev');
    const nextBtn = document.querySelector('#hero-slider .next');
    let   idx     = 0;
    const total   = slides.length;
    if (!slider || total < 2) return;

    function updateHero() {
      slider.style.transform = `translateX(-${idx * 100}%)`;
    }
    prevBtn.addEventListener('click', () => {
      idx = idx > 0 ? idx - 1 : total - 1;
      updateHero();
    });
    nextBtn.addEventListener('click', () => {
      idx = idx < total - 1 ? idx + 1 : 0;
      updateHero();
    });
  })();

  // —— ESTAMPAS SLIDER
  (function(){
    const slidesEl = document.querySelector('.estampas-palette .slides');
    const slides   = document.querySelectorAll('.estampas-palette .slide');
    const prevBtn  = document.querySelector('.estampas-palette .prev');
    const nextBtn  = document.querySelector('.estampas-palette .next');
    let   index    = 0;
    const total    = slides.length;
    if (!slidesEl || total < 2) return;

    function updateEstampas() {
      slidesEl.style.transform = `translateX(-${index * 100}%)`;
    }
    prevBtn.addEventListener('click', () => {
      index = index > 0 ? index - 1 : total - 1;
      updateEstampas();
    });
    nextBtn.addEventListener('click', () => {
      index = index < total - 1 ? index + 1 : 0;
      updateEstampas();
    });
  })();

  // —— ANIMATED WAVES (se existir)
  const wavePath = document.querySelector('#wavePath');
  if (wavePath && typeof anime === 'function') {
    const targets = [
      "M0,160L80,149.3C160,139,320,117,480,122.7C640,128,800,160,960,186.7C1120,213,1280,235,1360,245.3L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0,320,0,160,0,80,0L0,0Z",
      "M0,192L80,186.7C160,181,320,171,480,160C640,149,800,139,960,149.3C1120,160,1280,192,1360,213.3L1440,235L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0,320,0,160,0,80,0L0,0Z",
      "M0,224L80,213.3C160,203,320,181,480,160C640,139,800,117,960,133.3C1120,149,1280,203,1360,229.3L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0,320,0,160,0,80,0L0,0Z"
    ];
    anime({
      targets: wavePath,
      d:       targets.map(v=>({ value: v })),
      easing:  'easeInOutSine',
      duration:8000,
      loop:    true
    });
  }

// ========== THEME TOGGLE ==========
document.addEventListener('DOMContentLoaded', function() {
  var themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;

  // dingbats monocromos
  var sunSymbol  = '\u2600'; // ☀
  var moonSymbol = '\u263E'; // ☾

  // inicializa
  themeBtn.textContent = document.body.classList.contains('light')
    ? sunSymbol
    : moonSymbol;

  themeBtn.onclick = function() {
    document.body.classList.toggle('light');
    themeBtn.textContent = document.body.classList.contains('light')
      ? sunSymbol
      : moonSymbol;
  };
});

document.addEventListener('DOMContentLoaded', () => {
  const colors = [
    { name:"PRETO",   code:"00156", pantone:"19-0303", hex:"#101010" },
    { name:"ABISMO",  code:"19454", pantone:"18-3949", hex:"#232457" },
    { name:"GLACÊ",   code:"19453", pantone:"17-4139", hex:"#CCD4E3" },
    { name:"AURA",    code:"19452", pantone:"14-4112", hex:"#C1D3E0" },
    { name:"COBALT",  code:"19451", pantone:"17-4018", hex:"#254E7C" }
  ];
  const grid    = document.getElementById('colorsGrid');
  const slides  = document.getElementById('slides');
  const modal   = document.getElementById('modal');
  const closeBtn= document.getElementById('closeBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let current   = 0;

  if (!grid || !slides || !modal) return;

  colors.forEach((c,i) => {
    // Cartão
    const card = document.createElement('div');
    card.className = 'color-card';
    card.innerHTML = `
      <div class="swatch" style="background:${c.hex}"></div>
      <div class="info">
        <span class="name">${c.name}</span>
        <span class="code">${c.code}</span>
      </div>`;
    card.addEventListener('click', () => {
      current = i;
      slides.style.transform = `translateX(-${current*100}%)`;
      modal.classList.add('active');
    });
    grid.append(card);

    // Slide
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML = `
      <div class="color-swatch" style="background:${c.hex}"></div>
      <div class="color-details">
        <h3>${c.name}</h3>
        <p>${c.code}</p>
        <p>Pantone ${c.pantone}</p>
      </div>`;
    slides.append(slide);
  });

  closeBtn?.addEventListener('click', () => modal.classList.remove('active'));
  prevBtn?.addEventListener('click', () => {
    current = (current-1+colors.length)%colors.length;
    slides.style.transform = `translateX(-${current*100}%)`;
  });
  nextBtn?.addEventListener('click', () => {
    current = (current+1)%colors.length;
    slides.style.transform = `translateX(-${current*100}%)`;
  });
});
