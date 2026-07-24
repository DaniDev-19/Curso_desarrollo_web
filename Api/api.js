const contenedorProductos = document.getElementById('productos');
const filtroCategoria = document.getElementById('categoria');
let productos = [];

function formatearPrecio(valor) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(valor);
}

function crearTarjeta(producto) {
  const card = document.createElement('article');
  card.className = 'card';

  card.innerHTML = `
    <picture>
      <source srcset="${producto.imagen.replace('600x360', '800x480')}&format=webp" type="image/webp">
      <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy" width="600" height="360">
    </picture>
    <div class="card-content">
      <h3>${producto.nombre}</h3>
      <p class="price">${formatearPrecio(producto.precio)}</p>
      <p>${producto.disponible ? 'En stock' : 'Agotado'}</p>
      <span class="tag">${producto.categoria}</span>
    </div>
  `;

  return card;
}

function mostrarProductos(lista) {
  contenedorProductos.innerHTML = '';

  if (lista.length === 0) {
    const aviso = document.createElement('div');
    aviso.className = 'card no-data';
    aviso.textContent = 'No hay productos para mostrar.';
    contenedorProductos.appendChild(aviso);
    return;
  }

  lista.forEach(producto => {
    const tarjeta = crearTarjeta(producto);
    contenedorProductos.appendChild(tarjeta);
  });
}

function actualizarFiltro() {
  const categoriaSeleccionada = filtroCategoria.value;
  const productosFiltrados = categoriaSeleccionada === 'todos'
    ? productos
    : productos.filter(producto => producto.categoria === categoriaSeleccionada);

  mostrarProductos(productosFiltrados);
}

function cargarCategorias() {
  const categorias = [...new Set(productos.map(producto => producto.categoria))];
  categorias.sort();
  categorias.forEach(categoria => {
    const option = document.createElement('option');
    option.value = categoria;
    option.textContent = categoria;
    filtroCategoria.appendChild(option);
  });
}

fetch('core.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('No se pudo cargar el archivo JSON.');
    }
    return response.json();
  })
  .then(data => {
    productos = data;
    cargarCategorias();
    mostrarProductos(productos);
  })
  .catch(error => {
    contenedorProductos.innerHTML = '';
    const errorCard = document.createElement('div');
    errorCard.className = 'card no-data';
    errorCard.textContent = 'Error al cargar los datos: ' + error.message;
    contenedorProductos.appendChild(errorCard);
  });

filtroCategoria.addEventListener('change', actualizarFiltro);
