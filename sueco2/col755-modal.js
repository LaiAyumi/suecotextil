document.addEventListener('DOMContentLoaded',()=>{
  const tiles = document.querySelectorAll('.col755-tile:not(.det-trigger)');
  const modal = document.getElementById('col755Modal');
  const full  = document.getElementById('col755Full');
  const close = document.querySelector('.col755-close');

  tiles.forEach(t=>{
    t.addEventListener('click',()=>{
      full.src = t.querySelector('img').src;
      modal.classList.add('open');
    });
  });
  const exit=()=>modal.classList.remove('open');
  close.addEventListener('click',exit);
  modal.addEventListener('click',e=>{if(e.target===modal)exit();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')exit();});
});
