const cargarBoton = document.querySelector('#cargar-btn');
const estado = document.querySelector('#estado');
const cursoContenedor = document.querySelector('#curso');

cargarBoton.addEventListener('click', cargarCurso);

async function cargarCurso() {
  cargarBoton.disabled = true;
  estado.textContent = 'Cargando datos...';
  cursoContenedor.replaceChildren();

  try {
    const respuesta = await fetch('./curso.json');

    if (!respuesta.ok) {
      throw new Error(`Error del servidor: ${respuesta.status}`);
    }

    const curso = await respuesta.json();
    mostrarCurso(curso);
    estado.textContent = '¡Datos cargados correctamente!';
  } catch (error) {
    estado.textContent = `No se pudieron cargar los datos: ${error.message}`;
  } finally {
    cargarBoton.disabled = false;
  }
}

function mostrarCurso(curso) {
  const titulo = document.createElement('h3');
  titulo.className = 'course-name';
  titulo.textContent = curso.nombre;

  const descripcion = document.createElement('p');
  descripcion.textContent = curso.descripcion;

  const lista = document.createElement('ul');
  lista.className = 'topic-list';

  curso.temas.forEach((tema) => {
    const elemento = document.createElement('li');
    const nombreTema = document.createElement('strong');
    nombreTema.textContent = tema.nombre;
    elemento.append(nombreTema, `: ${tema.descripcion}`);
    lista.append(elemento);
  });

  cursoContenedor.append(titulo, descripcion, lista);
}
