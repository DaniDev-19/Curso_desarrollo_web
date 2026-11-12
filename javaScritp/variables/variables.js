var saludar = String("");
let numero = 0;
const nombre = "";

function SaludoCompleto(numero, saludar, nombre) {
  const saludo = `Hola, Estudiantes les doy un gran ${saludar}. Me llamo ${nombre} actualmente me desempeño como Software Engineer Dedicado al Desarrollo Web y proyectos Backend del lado del servidor. Mi celebración de cumpleaños es el 19 de octubre, naci en el año 2000 y en la actualidad tengo una edad de ${numero} años`;

  console.log(`${saludo} \n`);
  console.log("He aquí mi primera función en javaScript");

  return saludo;
}

// SaludoCompleto();

const paragraf = (document.getElementById("paragraf").innerHTML =
  SaludoCompleto(26, "saludo", "daniel").trim());

const paragrafito = (document.getElementById("pequeño-parrafito").textContent =
  "He aqui mi primera función en javaScript");

const nombreCurso = "Desarrollo Web Pro"; // No cambiará
let alumnosRegistrados = 25; // Puede cambiar

const edad = 18;

if (edad >= 18) {
  console.log("Acceso autorizado. Eres mayor de edad.");
} else {
  console.log("Acceso denegado. Eres menor de edad.");
}


for (let i = 1; i <= 5; i++) {
  console.log(`Número de iteración: ${i}`);
}


const lenguajes = ["HTML", "CSS", "JavaScript"];
for (const lang of lenguajes) {
  console.log(`Aprendiendo: ${lang}`);
}


let intentos = 0;
while (intentos < 3) {
  console.log(`Intento número: ${intentos + 1}`);
  intentos++;
}

function sumar(a, b) {
  return a + b;
}

const resultado = sumar(5, 3); // 8


const multiplicar = (a, b) => {
  return a * b;
};

// Versión ultra compacta (retorno implícito)
const dividir = (a, b) => a / b;

const usuario = {
  nombre: "Carlos",
  edad: 28,
  esProgramador: true,
  saludar() {
    return `Hola, soy ${this.nombre}`;
  },
};

console.log(usuario.nombre); // "Carlos"
console.log(usuario.saludar());

// const numeros = [1, 2, 3, 4];
// const dobles = numeros.map((num) => num * 2); // [2, 4, 6, 8]

// const precios = [45, 120, 80, 200];
// const altos = precios.filter((precio) => precio > 100); // [120, 200]

// const usuarios = [
//   { id: 1, name: "Ana" },
//   { id: 2, name: "Luis" },
// ];
// const user = usuarios.find((u) => u.id === 2); // {id: 2, name: "Luis"}

// const boton = document.querySelector("#miBoton");
// const titulo = document.querySelector(".titulo-principal");

// titulo.textContent = "¡Texto cambiado desde JavaScript!";
// titulo.style.color = "#2563eb";
// titulo.classList.add("activo"); // Añade una clase CSS


// const miBoton = document.querySelector("#btnSaludar");

// miBoton.addEventListener("click", () => {
//   alert("¡Hiciste clic en el botón interactivo!");
// });


// async function obtenerDatosClima() {
//   try {
//     // Esperamos a que la petición se complete
//     const respuesta = await fetch("https://api.ejemplo.com/clima");

//     // Verificamos si la respuesta fue exitosa
//     if (!respuesta.ok) {
//       throw new Error("Error al conectar con el servidor");
//     }

//     // Convertimos la respuesta a formato JSON legible
//     const datos = await respuesta.json();
//     console.log("Datos obtenidos con éxito:", datos);
//   } catch (error) {
//     console.error("Hubo un problema en la petición:", error);
//   }
// }

// // Ejecutar la función
// obtenerDatosClima();

const estudiantes = [
  { id: 1, nombre: "Ana", curso: "Frontend" },
  { id: 2, nombre: "Luis", curso: "Backend" }
];

// Muestra los datos en formato de tabla limpia
console.table(estudiantes);

// Alertas visuales en consola
console.warn("⚠️ Precaución: Esta función está deprecada.");
console.error("❌ Error crítico de conexión con la base de datos.");


const rolUsuario = "admin";

switch (rolUsuario) {
  case "admin":
    console.log("Acceso total al panel de control.");
    break; // Rompe la ejecución para que no siga evaluando
  case "editor":
    console.log("Acceso para modificar contenido.");
    break;
  default:
    console.log("Acceso de invitado restringido.");
}

// 'nombre' y 'callbackDespues' son parámetros
function procesarUsuario(nombre, callbackDespues) {
  console.log(`Hola, ${nombre}. Procesando datos...`);
  callbackDespues(); // Ejecutamos la función recibida
}

// Llamamos a la función pasando un callback anónimo como argumento
procesarUsuario("Carlos", () => {
  console.log("✅ ¡Proceso finalizado con éxito!");
});

// Abre una ventana emergente pidiendo un dato
const inputUsuario = prompt("¿Cuál es tu nombre?");
console.log(`El usuario escribió: ${inputUsuario}`);



// 1. Crear un elemento HTML dinámicamente
const nuevaTarjeta = document.createElement("div");
nuevaTarjeta.classList.add("card");

// 2. Usar innerHTML para darle estructura interna
nuevaTarjeta.innerHTML = `
  <h3>Título dinámico</h3>
  <p>Este contenido fue creado con JavaScript puro.</p>
`;

// 3. Insertarlo en el DOM usando append
document.body.append(nuevaTarjeta);


// Limpiar espacios en un formulario
const emailIngresado = "   correo@dominio.com   ";
const emailLimpio = emailIngresado.trim(); // "correo@dominio.com"

// Buscar la posición en un array
const frutas = ["manzana", "pera", "uva"];
const posicion = frutas.indexOf("pera"); // Devuelve 1


const usuarioObj = { nombre: "Ana", rol: "Developer" };

// Objeto a Texto plano (para enviar a un servidor)
const jsonTexto = JSON.stringify(usuarioObj); 

// Texto plano a Objeto (al recibir datos de un servidor)
const objetoOriginal = JSON.parse(jsonTexto);


// Abrir conexión en tiempo real con un servidor WebSocket
const socket = new WebSocket('wss://tu-servidor-chat.com');

// Escuchar cuando el servidor nos envía un mensaje instantáneo
socket.onmessage = function(event) {
  console.log("Mensaje en tiempo real recibido:", event.data);
};


// const edad = 20;

// Estructura: condición ? valorSiEsVerdadero : valorSiEsFalso
// const acceso = edad >= 18 ? "Permitido" : "Denegado";

// console.log(acceso); // "Permitido"


// Redondear un promedio escolar
const promedio = 15.7;
console.log(Math.round(promedio)); // 16

// Generar un número aleatorio entero entre 1 y 10
const numeroAleatorio = Math.floor(Math.random() * 10) + 1;
console.log(numeroAleatorio);