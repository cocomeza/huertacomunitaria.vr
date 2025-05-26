document.addEventListener('DOMContentLoaded', () => {
  cargarGaleria();
});

const galeriaData = [
  {
    titulo: "Macetas Eco-Friendly",
    descripcion: "Botellas plásticas convertidas en macetas.",
    imagen: "../assets/img/maceta_reciclada.jpeg"
  },
  {
    titulo: "Camas con Palets",
    descripcion: "Palets reciclados para cultivar verduras.",
    imagen: "../assets/img/palets reciclados.jpeg"
  },
  {
    titulo: "Compostera Sustentable",
    descripcion: "Compost casero con materiales reciclados.",
    imagen: "../assets/img/compostera.jpeg"
  },
  {
    titulo: "Primeros Brotes",
    descripcion: "¡Nuestros primeros vegetales creciendo!",
    imagen: "../assets/img/primeros_brotes.jpeg"
  },
  {
    titulo: "Riego Inteligente",
    descripcion: "Sistema de riego con botellas reutilizadas.",
    imagen: "../assets/img/riego.jpeg"
  },
  {
    titulo: "Transformación Completa",
    descripcion: "De lote baldío a huerta verde.",
    imagen: "../assets/galeria/transformacion.jpg"
  }
];

function cargarGaleria() {
  const grid = document.getElementById('galleryGrid');
  const loader = document.getElementById('loader');
  grid.innerHTML = '';
  loader.style.display = 'block';

  setTimeout(() => {
    grid.innerHTML = galeriaData.map(item => `
      <div class="col-12 col-sm-6 col-md-4">
        <div class="gallery-card h-100">
          <img src="${item.imagen}" alt="${item.titulo}" class="gallery-img" loading="lazy" />
          <div class="p-3 flex-grow-1 d-flex flex-column">
            <div class="gallery-title">${item.titulo}</div>
            <div class="gallery-desc">${item.descripcion}</div>
          </div>
        </div>
      </div>
    `).join('');
    loader.style.display = 'none';
  }, 400);
}
