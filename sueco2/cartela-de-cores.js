// cartela-de-cores.js

document.addEventListener('DOMContentLoaded', function() {
  var colors = [
    { name:"PRETO",   code:"00156", pantone:"19-0303", hex:"#101010" },
    { name:"ABISMO",  code:"19454", pantone:"18-3949", hex:"#232457" },
    { name:"GLACÊ",   code:"19453", pantone:"17-4139", hex:"#CCD4E3" },
    { name:"AURA",    code:"19452", pantone:"14-4112", hex:"#C1D3E0" },
    { name:"COBALT",  code:"19451", pantone:"17-4018", hex:"#254E7C" }
  ];
  var grid     = document.getElementById('colorsGrid');
  var slides   = document.getElementById('slides');
  var modal    = document.getElementById('modal');
  var closeBtn = document.getElementById('closeBtn');
  var prevBtn  = document.getElementById('prevBtn');
  var nextBtn  = document.getElementById('nextBtn');
  var current  = 0;

  // Se algum elemento essencial faltar, aborta
  if (!grid || !slides || !modal) {
    console.error('Elementos essenciais não encontrados no DOM');
    return;
  }

  // Monta grid e slides
  for (var i = 0; i < colors.length; i++) {
    (function(c, idx) {
      // Cartão
      var card = document.createElement('div');
      card.className = 'color-card';
      card.innerHTML =
        '<div class="swatch" style="background:' + c.hex + '"></div>' +
        '<div class="info">' +
          '<span class="name">' + c.name + '</span>' +
          '<span class="code">' + c.code + '</span>' +
        '</div>';
      card.addEventListener('click', function() {
        current = idx;
        slides.style.transform = 'translateX(-' + (current * 100) + '%)';
        modal.classList.add('active');
        document.body.classList.add('no-scroll')
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
          '<p> ' + c.pantone + '</p>' +
        '</div>';
      slides.appendChild(slide);
    })(colors[i], i);
  }

  // Fecha modal
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      modal.classList.remove('active');
    });
  }

  // Navegação anterior
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      current = (current - 1 + colors.length) % colors.length;
      slides.style.transform = 'translateX(-' + (current * 100) + '%)';
    });
  }

  // Navegação próxima
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      current = (current + 1) % colors.length;
      slides.style.transform = 'translateX(-' + (current * 100) + '%)';
    });
  }
});
