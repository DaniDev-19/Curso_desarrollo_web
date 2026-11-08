const productosParaEnvio = [
    {nombre: "Laptop", precio: 1200, pesokg: 2.1, inStock: true, fragile: true},
    {nombre: "Monitor 4k 32", precio: 450, pesokg: 6.5, inStock: true, fragile: true},
    {nombre: "Mouse Inalambrico", precio: 45, pesokg: 1.1, inStock: false, fragile: false},
    {nombre: "Camara DSLR", precio: 850, pesokg: 1.5, inStock: true, fragile: true},
    {nombre: "Silla Gamer", precio: 250, pesokg: 18.0, inStock: true, fragile: false}
];

const hojaDeEnvio = productosParaEnvio.filter(prod => prod.inStock === true).filter(prod  => prod.pesokg < 5).map(prod => {
    
    let costoEnvio = prod.precio * 0.05;

    if (prod.fragile) {
        costoEnvio += 15;
    }

    const envioRedondeado = Math.ceil(costoEnvio);

    const trackingID = Math.floor(Math.random() * 9000) + 1000;

    return {
        tracking: `#${trackingID}`,
        articulo: prod.nombre,
        precioBase: `$${prod.precio}`,
        costoShipping: `$${envioRedondeado}`,
        totalAPagar: `$${prod.precio + envioRedondeado}`,
    }
});

console.table(hojaDeEnvio);