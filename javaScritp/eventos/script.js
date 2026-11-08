let numeroDeClics = 0;

document.querySelector('#contador-btn').addEventListener('click', () => {
  numeroDeClics += 1;
  document.querySelector('#contador').textContent = `Clics: ${numeroDeClics}`;
});

document.querySelector('#texto').addEventListener('input', (event) => {
  const mensaje = event.target.value.trim();
  document.querySelector('#vista-previa').textContent = mensaje || 'Tu mensaje aparecerá aquí.';
});

document.querySelector('#color').addEventListener('change', (event) => {
  const caja = document.querySelector('#caja-color');
  caja.className = `color-box ${event.target.value}`;
});

document.querySelector('#tecla').addEventListener('keydown', (event) => {
  document.querySelector('#tecla-resultado').textContent = `Pulsaste: ${event.key}`;
});
