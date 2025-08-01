// colecoes.js
document.addEventListener('DOMContentLoaded', () => {
  const chips = document.querySelectorAll('.coll-chip');
  const cards = document.querySelectorAll('.coll-card');
  const empty = document.getElementById('collEmpty');

  function applyFilter(val) {
    let shown = 0;
    cards.forEach(card => {
      const segs = (card.getAttribute('data-seg') || '').toLowerCase();
      const match = (val === 'all') || segs.includes(val);
      card.style.display = match ? '' : 'none';
      if (match) shown++;
    });
    if (empty) empty.hidden = shown !== 0;
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      applyFilter(chip.dataset.filter || 'all');
    });
  });

  // estado inicial
  applyFilter('all');
});
