const reloj = document.getElementById('reloj');
const fecha = document.getElementById('fecha');

function actualizarReloj() {
  const ahora = new Date();

  const horas = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');
  const segundos = String(ahora.getSeconds()).padStart(2, '0');

  reloj.textContent = `${horas}:${minutos}:${segundos}`;

  const opcionesFecha = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  fecha.textContent = ahora.toLocaleDateString('es-ES', opcionesFecha);
}

actualizarReloj();
setInterval(actualizarReloj, 1000);
