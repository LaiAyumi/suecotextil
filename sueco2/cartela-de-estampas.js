// cartela-de-estampas.js
document.addEventListener('DOMContentLoaded', function () {
  // 1) Dados de exemplo — substitua pelos seus
  const prints = [
    { name: 'PRETTY DOTS', code: 'E0001', collection: 'Verão 25', img: 'images/prints/p1.jpg' },
    { name: 'URBAN LINES', code: 'E0002', collection: 'Capsule',   img: 'images/prints/p2.jpg' },
    { name: 'AQUARELA',    code: 'E0003', collection: 'Arte',      img: 'images/prints/p3.jpg' },
    { name: 'TROPICAL',    code: 'E0004', collection: 'Resort',    img: 'images/prints/p4.jpg' }
  ];

  // 2) Referências do DOM
  const grid       = document.getElementById('printsGrid');
  const modal      = document.getElementById('printsModal');
  const panel      = modal ? modal.querySelector('.prints-panel') : null;
  const slidesWrap = document.getElementById('printsSlides');
  const prevBtn    = document.getElementById('printsPrev');
  const nextBtn    = document.getElementById('printsNext');
  const closeBtn   = document.getElementById('printsClose');

  if (!grid || !modal || !slidesWrap) return;

  // 3) Monta GRID + SLIDES (1 por estampa)
  let current = 0;

  prints.forEach((p, idx) => {
    // Card
    const card = document.createElement('div');
    card.className = 'print-card';
    card.innerHTML = `
      <div class="thumb" style="background-image:url('${p.img}')"></div>
      <div class="meta">
        <span class="name">${p.name}</span>
        <span class="code">${p.code}</span>
      </div>
    `;
    card.addEventListener('click', () => openAt(idx));
    grid.appendChild(card);

    // Slide
    const slide = document.createElement('div');
    slide.className = 'prints-slide';
    slide.innerHTML = `
      <div class="prints-swatch" style="background-image:url('${p.img}')"></div>
      <div class="prints-details">
        <h3>${p.name}</h3>
        <p>${p.code}</p>
        <p>${p.collection}</p>
      </div>
    `;
    slidesWrap.appendChild(slide);
  });

  function openAt(index) {
    current = index;
    slidesWrap.style.transform = `translateX(-${current * 100}%)`;
    modal.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  // 4) Navegação
  prevBtn && prevBtn.addEventListener('click', () => {
    current = (current - 1 + prints.length) % prints.length;
    slidesWrap.style.transform = `translateX(-${current * 100}%)`;
  });
  nextBtn && nextBtn.addEventListener('click', () => {
    current = (current + 1) % prints.length;
    slidesWrap.style.transform = `translateX(-${current * 100}%)`;
  });
  closeBtn && closeBtn.addEventListener('click', closeModal);

  // Fecha clicando fora do painel
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Acessibilidade: ESC fecha
  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active') && e.key === 'Escape') closeModal();
  });
});
