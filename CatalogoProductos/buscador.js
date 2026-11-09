const inputBuscar = document.querySelector("#buscador");

if (inputBuscar) {
  inputBuscar.addEventListener("input", (event) => {
    const texto = event.target.value.trim();
    window.catalogoApp.filtro = texto;
    window.catalogoApp.renderProductos();
  });
}
