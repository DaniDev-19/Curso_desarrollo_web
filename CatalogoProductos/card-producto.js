const productos = [
  {
    id: 1,
    nombre: "Mango Ataulfo",
    categoria: "Frutas",
    precio: 89,
    descripcion: "Mango maduro, dulce y lleno de sabor para tus desayunos.",
    imagen:
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    nombre: "Aguacate Hass",
    categoria: "Verduras",
    precio: 65,
    descripcion: "Ideal para ensaladas, tostadas y recetas caseras.",
    imagen:
      "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    nombre: "Pan de centeno",
    categoria: "Panadería",
    precio: 54,
    descripcion: "Textura suave, sabor intenso y perfecto para acompañar.",
    imagen:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    nombre: "Tomates cherry",
    categoria: "Verduras",
    precio: 72,
    descripcion: "Jugosos y frescos para ensaladas y platos rápidos.",
    imagen:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    nombre: "Limones orgánicos",
    categoria: "Frutas",
    precio: 39,
    descripcion: "Aportan frescura a tus bebidas, postres y comidas.",
    imagen:
      "https://images.unsplash.com/photo-1590502593747-42a9961336f3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    nombre: "Lechuga romana",
    categoria: "Verduras",
    precio: 48,
    descripcion: "Crisp y fresca, ideal para tus ensaladas del día.",
    imagen:
      "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=900&q=80",
  },
];

const TELEFONO_WHATSAPP = "521234567890";

window.catalogoApp = {
  productos,
  filtro: "",
  carrito: [],

  renderProductos() {
    const productGrid = document.querySelector("#productGrid");
    if (!productGrid) return;

    const texto = this.filtro.trim().toLowerCase();
    const productosFiltrados = this.productos.filter((producto) => {
      const nombre = producto.nombre.toLowerCase();
      const categoria = producto.categoria.toLowerCase();
      const descripcion = producto.descripcion.toLowerCase();

      return (
        nombre.includes(texto) ||
        categoria.includes(texto) ||
        descripcion.includes(texto)
      );
    });

    if (productosFiltrados.length === 0) {
      productGrid.innerHTML = `
        <div class="sin-resultados">
          <p>No se encontraron productos para "${this.filtro}".</p>
        </div>
      `;
      return;
    }

    productGrid.innerHTML = productosFiltrados
      .map(
        (producto) => `
          <article class="card" data-id="${producto.id}">
            <div class="card-picture">
              <span class="card-badge">${producto.categoria}</span>
              <img src="${producto.imagen}" alt="${producto.nombre}" />
            </div>

            <div class="description">
              <div class="price-row">
                <span class="price">$${producto.precio}</span>
                <button class="add-btn" type="button" data-producto-id="${producto.id}">+ Añadir</button>
              </div>

              <h3>${producto.nombre}</h3>
              <p>${producto.descripcion}</p>
            </div>
          </article>
        `
      )
      .join("");
  },

  actualizarCarrito() {
    const carritoBtn = document.querySelector(".carrito");
    const cartTotal = document.querySelector("#cartTotal");
    const cartItems = document.querySelector("#cartItems");

    if (carritoBtn) {
      const cantidadTotal = this.carrito.reduce((sum, item) => sum + item.cantidad, 0);
      carritoBtn.textContent = `Carrito (${cantidadTotal})`;
    }

    if (cartItems) {
      if (!this.carrito.length) {
        cartItems.innerHTML = '<div class="cart-empty">Tu carrito está vacío.</div>';
      } else {
        cartItems.innerHTML = this.carrito
          .map(
            (item) => `
              <div class="cart-item">
                <img src="${item.imagen}" alt="${item.nombre}" />
                <div class="cart-item-info">
                  <h4>${item.nombre}</h4>
                  <p>${item.cantidad} x $${item.precio}</p>
                </div>
                <strong>$${item.precio * item.cantidad}</strong>
              </div>
            `
          )
          .join("");
      }
    }

    if (cartTotal) {
      const total = this.carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
      cartTotal.textContent = `$${total}`;
    }
  },

  abrirCarrito() {
    const panel = document.querySelector("#cartPanel");
    if (panel) {
      panel.classList.add("open");
    }
  },

  cerrarCarrito() {
    const panel = document.querySelector("#cartPanel");
    if (panel) {
      panel.classList.remove("open");
    }
  },

  agregarAlCarrito(productoId) {
    const producto = this.productos.find((item) => item.id === Number(productoId));
    if (!producto) return;

    const itemExistente = this.carrito.find((item) => item.id === producto.id);

    if (itemExistente) {
      itemExistente.cantidad += 1;
    } else {
      this.carrito.push({ ...producto, cantidad: 1 });
    }

    this.actualizarCarrito();
    this.abrirCarrito();
  },

  construirMensajeWhatsApp() {
    if (!this.carrito.length) return "";

    const productosMensaje = this.carrito
      .map(
        (item) => `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}`
      )
      .join("%0A");

    const total = this.carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    return `Hola, quiero hacer este pedido:%0A${productosMensaje}%0A%0ATotal: $${total}`;
  },

  enviarPedidoWhatsApp() {
    const mensaje = this.construirMensajeWhatsApp();
    if (!mensaje) return;

    const url = `https://wa.me/${TELEFONO_WHATSAPP}?text=${mensaje}`;
    window.open(url, "_blank");
  },
};

const productGrid = document.querySelector("#productGrid");
if (productGrid) {
  window.catalogoApp.renderProductos();
}

const carritoBtn = document.querySelector(".carrito");
if (carritoBtn) {
  carritoBtn.addEventListener("click", () => {
    const panel = document.querySelector("#cartPanel");
    if (panel) {
      panel.classList.toggle("open");
    }
  });
}

const cartCloseButton = document.querySelector(".cart-close");
if (cartCloseButton) {
  cartCloseButton.addEventListener("click", () => {
    window.catalogoApp.cerrarCarrito();
  });
}

const whatsappBtn = document.querySelector("#whatsappBtn");
if (whatsappBtn) {
  whatsappBtn.addEventListener("click", () => {
    window.catalogoApp.enviarPedidoWhatsApp();
  });
}

document.addEventListener("click", (event) => {
  const boton = event.target.closest(".add-btn");
  if (boton) {
    const productoId = boton.dataset.productoId;
    window.catalogoApp.agregarAlCarrito(productoId);
    return;
  }
});

const carouselItems = [...document.querySelectorAll(".carousel-item")];
if (carouselItems.length) {
  let activeIndex = 0;

  const activarSlide = (index) => {
    activeIndex = (index + carouselItems.length) % carouselItems.length;

    carouselItems.forEach((item, itemIndex) => {
      item.classList.toggle("active", itemIndex === activeIndex);
    });
  };

  const prevButton = document.querySelector(".carousel-btn.prev");
  const nextButton = document.querySelector(".carousel-btn.next");

  prevButton?.addEventListener("click", () => activarSlide(activeIndex - 1));
  nextButton?.addEventListener("click", () => activarSlide(activeIndex + 1));

  setInterval(() => activarSlide(activeIndex + 1), 4000);
}

window.catalogoApp.actualizarCarrito();
