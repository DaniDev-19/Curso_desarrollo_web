var saludar = String('');
let numero = 0;
const nombre = ''; 


function SaludoCompleto (numero, saludar , nombre) {
    const saludo = `Hola, Estudiantes les doy un gran ${saludar}. Me llamo ${nombre} actualmente me desempeño como Software Engineer Dedicado al Desarrollo Web y proyectos Backend del lado del servidor. Mi celebración de cumpleaños es el 19 de octubre, naci en el año 2000 y en la actualidad tengo una edad de ${numero} años`;

    console.log(`${saludo} \n`);
    console.log('He aquí mi primera función en javaScript');
    
    return saludo;
}

// SaludoCompleto(); 

const paragraf = document.getElementById('paragraf').textContent = SaludoCompleto(26,'saludo', 'daniel').trim();

const paragrafito = document.getElementById('pequeño-parrafito').textContent = 'He aqui mi primera función en javaScript';
