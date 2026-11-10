const carousel = document.getElementById('modernCarousel');
const slides = carousel.querySelectorAll('.slide-item');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dotsContainer');

let currentIndex = 0;
let autoPlayTimer = null;
const INTERVAL_TIME = 4000; 

// Generar los indicadores dinámicamente
slides.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('.dot');

function updateSlides() {
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentIndex);
  });
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

function goToSlide(index) {
  currentIndex = index;
  updateSlides();
  resetAutoPlay();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlides();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlides();
}

// Control del Reproductor Automático
function startAutoPlay() {
  autoPlayTimer = setInterval(nextSlide, INTERVAL_TIME);
}

function stopAutoPlay() {
  clearInterval(autoPlayTimer);
}

function resetAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}

// Eventos de Navegación
nextBtn.addEventListener('click', () => {
  nextSlide();
  resetAutoPlay();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetAutoPlay();
});

// Pausa al pasar el ratón por encima (UX Limpia)
carousel.addEventListener('mouseenter', stopAutoPlay);
carousel.addEventListener('mouseleave', startAutoPlay);

// Iniciar el carrusel
startAutoPlay();