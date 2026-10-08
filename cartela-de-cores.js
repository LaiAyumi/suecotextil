// cartela-de-cores.js
// Único renderizador da cartela de cores: monta o grid e o modal/slider.

document.addEventListener('DOMContentLoaded', function () {
  var colors = [
    { name:"PRETO",   code:"00156", pantone:"19-0303", hex:"#101010" },
    { name:"ABISMO",  code:"19454", pantone:"18-3949", hex:"#232457" },
    { name:"GLACÊ",   code:"19453", pantone:"17-4139", hex:"#CCD4E3" },
    { name:"AURA",    code:"19452", pantone:"14-4112", hex:"#C1D3E0" },
    { name:"COBALT",  code:"19451", pantone:"17-4018", hex:"#254E7C" }
  ];
  var grid     = document.getElementById('colorsGrid');
  var slides   = document.getElementById('slides');
  var modalEl  = document.getElementById('modal');
  var prevBtn  = document.getElementById('prevBtn');
  var nextBtn  = document.getElementById('nextBtn');
  var current  = 0;

  if (!grid || !slides || !modalEl || typeof createModal !== 'function') return;

  var modal = createModal(modalEl, { openClass: 'active', closeSelector: '#closeBtn' });

  function show(index) {
    current = (index + colors.length) % colors.length;
    slides.style.transform = 'translateX(-' + (current * 100) + '%)';
    Array.prototype.forEach.call(slides.children, function (slide, i) {
      slide.setAttribute('aria-hidden', String(i !== current));
    });
  }

  // Monta grid e slides
  colors.forEach(function (c, idx) {
    // Cartão
    var card = document.createElement('button');
    card.type = 'button';
    card.className = 'color-card';
    card.setAttribute('aria-haspopup', 'dialog');
    card.innerHTML =
      '<span class="swatch" style="background:' + c.hex + '"></span>' +
      '<span class="info">' +
        '<span class="name">' + c.name + '</span>' +
        '<span class="code">' + c.code + '</span>' +
      '</span>';
    card.addEventListener('click', function () {
      show(idx);
      modal.open(card);
    });
    grid.appendChild(card);

    // Slide
    var slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML =
      '<div class="color-swatch" style="background:' + c.hex + '"></div>' +
      '<div class="color-details">' +
        '<h3>' + c.name + '</h3>' +
        '<p>' + c.code + '</p>' +
        '<p>' + c.pantone + '</p>' +
      '</div>';
    slides.appendChild(slide);
  });

  if (prevBtn) prevBtn.addEventListener('click', function () { show(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { show(current + 1); });

  // Setas do teclado navegam entre as cores com o modal aberto
  document.addEventListener('keydown', function (e) {
    if (!modal.isOpen()) return;
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  show(0);
});
