// det-panel.js: painel de detalhes da estampa (página de coleção)
document.addEventListener('DOMContentLoaded', () => {
  const modalEl = document.getElementById('detModal');
  const title   = document.getElementById('detTitle');
  const ph      = document.getElementById('detPlaceholder');
  const thumbs  = document.getElementById('detThumbs');
  const bases   = document.getElementById('detBases');
  if (!modalEl || typeof createModal !== 'function') return;

  const modal = createModal(modalEl, { openClass: 'open', closeSelector: '.det-close' });
  let main = null; // <img class="det-main">, criada só quando o card tem foto

  function setMain(src, alt) {
    if (!main) {
      main = document.createElement('img');
      main.className = 'det-main';
      ph.before(main);
    }
    main.src = src;
    main.alt = alt;
  }

  function fill(tile) {
    const name = tile.dataset.name || 'Estampa';
    title.textContent = name;

    // imagens (opcionais): data-img e data-thumbs="a.jpg,b.jpg"
    const list = (tile.dataset.thumbs || tile.dataset.img || '')
      .split(',').map(s => s.trim()).filter(Boolean);
    const hasImg = list.length > 0;
    ph.hidden = hasImg;
    thumbs.innerHTML = '';
    if (hasImg) {
      setMain(tile.dataset.img || list[0], name);
      if (list.length > 1) {
        list.forEach((src, i) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'det-thumb' + (i === 0 ? ' active' : '');
          btn.setAttribute('aria-label', `Imagem ${i + 1} de ${name}`);
          btn.innerHTML = `<img src="${src}" alt="">`;
          btn.addEventListener('click', () => {
            setMain(src, name);
            thumbs.querySelectorAll('.det-thumb').forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
          });
          thumbs.appendChild(btn);
        });
      }
    } else if (main) {
      main.remove();
      main = null;
    }

    // bases
    bases.innerHTML = '';
    try {
      const arr = JSON.parse(tile.dataset.bases || '[]');
      arr.forEach(b => {
        const li = document.createElement('li');
        li.innerHTML = `
          <div>
            <h3>${b.nome}</h3>
            <p>Largura: <em>${b.largura} cm</em> · Gramatura: <em>${b.grama} g/m²</em><br>Rendimento: <em>${b.rendimento} m/kg</em></p>
          </div>
          <div class="det-base-meta">
            <small>COD. ${b.cod}</small><br><p>${b.comp}</p>
          </div>`;
        bases.appendChild(li);
      });
    } catch (e) {
      console.error(e);
    }
  }

  // Cada card tem um <button class="det-trigger"> com os dados no <figure> em volta
  document.querySelectorAll('.det-trigger').forEach(btn => {
    const tile = btn.closest('.col755-tile') || btn;
    btn.setAttribute('aria-haspopup', 'dialog');
    if (!btn.hasAttribute('aria-label')) {
      const caption = tile.querySelector('figcaption');
      btn.setAttribute('aria-label', `Ver detalhes: ${caption ? caption.textContent.trim() : tile.dataset.name}`);
    }

    btn.addEventListener('click', () => {
      fill(tile);
      modal.open(btn);
    });
  });
});
