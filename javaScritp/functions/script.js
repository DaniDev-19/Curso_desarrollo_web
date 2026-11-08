function crearSaludo(nombre) {
  return `¡Hola, ${nombre}!`;
}

function sumar(a, b) {
  return a + b;
}


console.log(crearSaludo('hola'));

document.querySelector('#saludo-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const nombre = document.querySelector('#nombre').value.trim();
  document.querySelector('#saludo-resultado').textContent = crearSaludo(nombre);
});

document.querySelector('#sumar-btn').addEventListener('click', () => {
  const numeroUno = Number(document.querySelector('#numero-uno').value);
  const numeroDos = Number(document.querySelector('#numero-dos').value);
  document.querySelector('#suma-resultado').textContent = `Resultado: ${sumar(numeroUno, numeroDos)}`;
});

