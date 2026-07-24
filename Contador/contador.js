let contador = 0;
let paso = 1;

const display = document.getElementById('display');
const incrementarBtn = document.getElementById('incrementar');
const decrementarBtn = document.getElementById('decrementar');
const resetBtn = document.getElementById('reset');
const aplicarPasoBtn = document.getElementById('aplicarPaso');
const inputPaso = document.getElementById('paso');
const valorPaso = document.getElementById('valorPaso');

function actualizarDisplay() {
  display.textContent = contador;
  display.classList.remove('is-updated');
  void display.offsetWidth;
  display.classList.add('is-updated');
}

function cambiarValor(cantidad) {
  contador += cantidad;
  actualizarDisplay();
}

incrementarBtn.addEventListener('click', () => {
  cambiarValor(paso);
});

decrementarBtn.addEventListener('click', () => {
  cambiarValor(-paso);
});

resetBtn.addEventListener('click', () => {
  contador = 0;
  actualizarDisplay();
});

aplicarPasoBtn.addEventListener('click', () => {
  const nuevoPaso = Number(inputPaso.value);

  if (nuevoPaso > 0) {
    paso = nuevoPaso;
    valorPaso.textContent = paso;
    actualizarDisplay();
  } else {
    alert('El paso debe ser un número mayor que cero.');
  }
});

inputPaso.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    aplicarPasoBtn.click();
  }
});

actualizarDisplay();
