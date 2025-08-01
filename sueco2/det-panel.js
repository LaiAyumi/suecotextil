document.addEventListener('DOMContentLoaded',()=>{
  const modal  = document.getElementById('detModal');
  const title  = document.getElementById('detTitle');
  const main   = document.getElementById('detMain');
  const thumbs = document.getElementById('detThumbs');
  const bases  = document.getElementById('detBases');
  const close  = document.querySelector('.det-close');

  document.querySelectorAll('.det-trigger').forEach(tile=>{
    tile.addEventListener('click',()=>{
      // título
      title.textContent = tile.dataset.name || 'Estampa';

      // thumbs
      thumbs.innerHTML = '';
      const listThumbs = (tile.dataset.thumbs || tile.dataset.img).split(',');
      listThumbs.forEach((src,i)=>{
        const img=document.createElement('img');
        img.src=src.trim(); if(i===0) img.classList.add('active');
        img.addEventListener('click',()=>{main.src=src;thumbs.querySelectorAll('img').forEach(t=>t.classList.remove('active'));img.classList.add('active');});
        thumbs.appendChild(img);
      });

      // imagem principal
      main.src = (tile.dataset.img || listThumbs[0]).trim();
      main.alt = tile.dataset.name || '';

      // bases
      bases.innerHTML = '';
      try{
        const arr = JSON.parse(tile.dataset.bases || '[]');
        arr.forEach(b=>{
          const li=document.createElement('li');
          li.innerHTML = `
            <div>
              <h4>${b.nome}</h4>
              <p>Largura: <em>${b.largura} cm</em> · Gramatura: <em>${b.grama} g/m²</em><br>Rendimento: <em>${b.rendimento} m/kg</em></p>
            </div>
            <div style="text-align:right">
              <small>COD. ${b.cod}</small><br><p>${b.comp}</p>
            </div>`;
          bases.appendChild(li);
        });
      }catch(e){console.error(e)}

      modal.classList.add('open');
    });
  });

  const closeM=()=>modal.classList.remove('open');
  close.addEventListener('click',closeM);
  modal.addEventListener('click',e=>{if(e.target===modal)closeM()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeM()});
});
