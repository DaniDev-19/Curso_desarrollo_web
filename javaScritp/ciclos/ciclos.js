const carrito = [
    {nombre: "Tomate",precio:80 },
    {nombre: "Cebolla", precio:  20},
    {nombre: "Ajoporro", precio: 10},
    {nombre: "Papa", precio: 5},
    {nombre: "Zanahoria", precio: 50},
];

let TotalAcumulado = 0;

// console.log('-----Productos (Mayor a $50)')

// for (let i = 0; i < carrito.length; i++){
//     TotalAcumulado += carrito[i].precio

//     if (carrito[i].precio > 50){
//         console.log(`- ${carrito[i].nombre}: $${carrito[i].precio}`)
//     }
// };


// console.log("------------------------------------------------");
// console.log(`El total de la compra es: $${TotalAcumulado} \n`);
// console.table(carrito);
// console.log('JSON stringify muestra el texto en formato json con espacios y sin filtro' + JSON.stringify(carrito,null, 2));
// console.log('Solo Nombre' + JSON.stringify(carrito,['nombre']));
// console.log('Solo precios' + JSON.stringify(carrito,['precio']));
// console.log('Filtro menor o igual a 45 sale null o undefined' + JSON.stringify(carrito, (_, valor) => {
//     if (valor && valor.precio <= 45) {
//         return undefined
//     }
//     return valor;
// }, 2));

// for (const producto of carrito) {
//     console.log(producto.nombre);
// };

// carrito.forEach(producto => {
//     console.log(producto.precio)
// });

// const usuario = { nombre: "Alex", edad: 25, rol: "Admin" };
// for (const clave in usuario) {
//     console.log(`${clave}: ${usuario[clave]}`);
// };

// let energia = 3;
// while (energia > 0) {
//     console.log("Caminando...");
//     energia--;
// }

for (let i = 0; i < 11; i++) {
    console.log( `Repetir numero ${i}`);
};

