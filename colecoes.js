// colecoes.js
document.addEventListener('DOMContentLoaded', () => {
  const chips = document.querySelectorAll('.coll-chip');
  const cards = document.querySelectorAll('.coll-card');
  const empty = document.getElementById('collEmpty');

  function applyFilter(val) {
    let shown = 0;
    cards.forEach(card => {
      const segs = (card.getAttribute('data-seg') || '').toLowerCase().split(/\s+/);
      const match = (val === 'all') || segs.includes(val);
      card.hidden = !match;
      if (match) shown++;
    });
    if (empty) empty.hidden = shown !== 0;
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => {
        c.classList.remove('is-active');
        c.setAttribute('aria-pressed', 'false');
      });
      chip.classList.add('is-active');
      chip.setAttribute('aria-pressed', 'true');
      applyFilter(chip.dataset.filter || 'all');
    });
  });

  // estado inicial
  applyFilter('all');
});
