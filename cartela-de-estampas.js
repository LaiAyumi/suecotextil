// cartela-de-estampas.js
document.addEventListener('DOMContentLoaded', function () {
  // 1) Dados de exemplo: substitua pelas estampas reais (veja "Conteúdo do cliente" no README).
  //    "img" é opcional; sem imagem, o card mostra um padrão ilustrativo ("pattern").
  //    Enquanto forem exemplos, os cards levam o selo "Ilustrativo".
  const prints = [
    { name: 'PRETTY DOTS', code: 'E0001', collection: 'Verão 25', pattern: 'dots' },
    { name: 'URBAN LINES', code: 'E0002', collection: 'Capsule',  pattern: 'lines' },
    { name: 'AQUARELA',    code: 'E0003', collection: 'Arte',     img: 'images/estampa-floral.webp' },
    { name: 'TROPICAL',    code: 'E0004', collection: 'Resort',   pattern: 'waves' }
  ];

  // 2) Referências do DOM
  const grid       = document.getElementById('printsGrid');
  const modalEl    = document.getElementById('printsModal');
  const slidesWrap = document.getElementById('printsSlides');
  const prevBtn    = document.getElementById('printsPrev');
  const nextBtn    = document.getElementById('printsNext');

  if (!grid || !modalEl || !slidesWrap || typeof createModal !== 'function') return;

  const modal = createModal(modalEl, { openClass: 'active', closeSelector: '#printsClose' });
  let current = 0;

  // Fundo do card/slide: imagem (inline) ou padrão ilustrativo em CSS
  function artAttrs(p) {
    return p.img ? `style="background-image:url('${p.img}')"` : '';
  }
  function artClass(p) {
    return ' ph-art' + (p.img ? '' : ` ph-art--${p.pattern || 'dots'}`);
  }

  // 3) Monta GRID + SLIDES (1 por estampa)
  prints.forEach((p, idx) => {
    // Card
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'print-card';
    card.setAttribute('aria-haspopup', 'dialog');
    card.innerHTML = `
      <span class="thumb${artClass(p)}" ${artAttrs(p)} aria-hidden="true"><span class="ph-art__label">Ilustrativo</span></span>
      <span class="meta">
        <span class="name">${p.name}</span>
        <span class="code">${p.code}</span>
      </span>
    `;
    card.addEventListener('click', () => {
      show(idx);
      modal.open(card);
    });
    grid.appendChild(card);

    // Slide
    const slide = document.createElement('div');
    slide.className = 'prints-slide';
    slide.innerHTML = `
      <div class="prints-swatch${artClass(p)}" ${artAttrs(p)} aria-hidden="true"></div>
      <div class="prints-details">
        <h3>${p.name}</h3>
        <p>${p.code}</p>
        <p>${p.collection}</p>
      </div>
    `;
    slidesWrap.appendChild(slide);
  });

  function show(index) {
    current = (index + prints.length) % prints.length;
    slidesWrap.style.transform = `translateX(-${current * 100}%)`;
    Array.from(slidesWrap.children).forEach((slide, i) => {
      slide.setAttribute('aria-hidden', String(i !== current));
    });
  }

  // 4) Navegação
  prevBtn && prevBtn.addEventListener('click', () => show(current - 1));
  nextBtn && nextBtn.addEventListener('click', () => show(current + 1));

  document.addEventListener('keydown', (e) => {
    if (!modal.isOpen()) return;
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  show(0);
});
