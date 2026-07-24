const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('startButton');
const highScoreElement = document.getElementById('highScore');
let highScore = Number(localStorage.getItem('snakeHighScore') || 0);


const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const eatAudio = new Audio('sounds/eat.mp3');
eatAudio.preload = 'auto';
eatAudio.volume = 0.9;
eatAudio.addEventListener('error', () => console.warn('eatAudio error', eatAudio.error));
eatAudio.addEventListener('canplaythrough', () => console.info('eatAudio canplaythrough, readyState=', eatAudio.readyState));
eatAudio.addEventListener('play', () => console.info('eatAudio play event'));
const startAudio = new Audio('sounds/start.mp3');
startAudio.preload = 'auto';
startAudio.volume = 0.9;
startAudio.addEventListener('error', () => console.warn('startAudio error', startAudio.error));
startAudio.addEventListener('canplaythrough', () => console.info('startAudio canplaythrough, readyState=', startAudio.readyState));
startAudio.addEventListener('play', () => console.info('startAudio play event'));
const gameOverAudio = new Audio('sounds/gameover.mp3');
gameOverAudio.preload = 'auto';
gameOverAudio.volume = 0.9;
gameOverAudio.addEventListener('error', () => console.warn('gameOverAudio error', gameOverAudio.error));
gameOverAudio.addEventListener('canplaythrough', () => console.info('gameOverAudio canplaythrough, readyState=', gameOverAudio.readyState));
gameOverAudio.addEventListener('play', () => console.info('gameOverAudio play event'));

function playTone(frequency, duration = 0.12, type = 'square') {
  try {
    if (audioContext.state === 'suspended') audioContext.resume();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    gainNode.gain.setValueAtTime(0.12, audioContext.currentTime);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  } catch (e) {
    // ignore
  }
}

function tryPlayAudio(audioElem, fallbackFreq, fallbackType) {
  try {
    audioElem.preload = 'auto';
    audioElem.muted = false;
    console.info('tryPlayAudio:', audioElem.src, 'readyState=', audioElem.readyState, 'abs=', new URL(audioElem.src, location.href).href);
    // ensure the browser attempts to load the file
    try { audioElem.load(); } catch (e) { /* ignore */ }
    audioElem.currentTime = 0;
    const p = audioElem.play();
    if (p && typeof p.then === 'function') {
      p.then(() => { console.info('Audio played OK:', audioElem.src); }).catch((err) => {
        console.warn('Audio play failed (promise), falling back to tone:', err);
        playTone(fallbackFreq, 0.12, fallbackType);
      });
    }
  } catch (e) {
    console.warn('Audio play exception, falling back to tone:', e);
    playTone(fallbackFreq, 0.12, fallbackType);
  }
}

let startLoopOsc = null;
let startLoopGain = null;

function stopFallbackLoop() {
  if (startLoopOsc) {
    try { startLoopOsc.stop(); } catch (e) {}
    try { startLoopOsc.disconnect(); } catch (e) {}
    try { startLoopGain.disconnect(); } catch (e) {}
    startLoopOsc = null;
    startLoopGain = null;
  }
}

function stopAllStartAudio() {
  try {
    if (!startAudio.paused) {
      startAudio.loop = false;
      startAudio.pause();
      startAudio.currentTime = 0;
    }
  } catch (e) {
    // ignore
  }
  stopFallbackLoop();
}

function playEatSound() { tryPlayAudio(eatAudio, 880, 'square'); }
function playGameOverSound() { tryPlayAudio(gameOverAudio, 220, 'sawtooth'); }
function playStartSound() {
  // try to play external file in loop; if playback is blocked/fails, start a continuous oscillator
  try {
    startAudio.loop = true;
    tryPlayAudio(startAudio, 440, 'triangle');
    // ensure any fallback oscillator is stopped
    stopFallbackLoop();
  } catch (e) {
    // fallback: create continuous tone
    if (!startLoopOsc) {
      try { if (audioContext.state === 'suspended') audioContext.resume(); } catch (err) {}
      startLoopOsc = audioContext.createOscillator();
      startLoopGain = audioContext.createGain();
      startLoopOsc.type = 'triangle';
      startLoopOsc.frequency.value = 440;
      startLoopOsc.connect(startLoopGain);
      startLoopGain.connect(audioContext.destination);
      startLoopGain.gain.setValueAtTime(0.08, audioContext.currentTime);
      startLoopOsc.start();
    }
  }
}

const tileCount = 20;
const tileSize = canvas.width / tileCount;
let snake = [{ x: 10, y: 10 }];
let velocity = { x: 0, y: 0 };
let food = { x: 5, y: 5 };
let score = 0;
let gameInterval = null;
let speed = 8;
let lastDirection = { x: 0, y: 0 };

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  velocity = { x: 0, y: 0 };
  lastDirection = { x: 0, y: 0 };
  score = 0;
  speed = 8;
  placeFood();
  updateScore();
  updateHighScore();
  draw();
}

function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('snakeHighScore', highScore);
  }
  highScoreElement.textContent = highScore;
}

function placeFood() {
  food.x = Math.floor(Math.random() * tileCount);
  food.y = Math.floor(Math.random() * tileCount);

  if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    placeFood();
  }
}

function updateScore() {
  scoreElement.textContent = score;
}

function drawGrid() {
  context.fillStyle = '#020617';
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let x = 0; x < tileCount; x++) {
    for (let y = 0; y < tileCount; y++) {
      context.strokeStyle = 'rgba(255,255,255,0.03)';
      context.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}

function draw() {
  drawGrid();

  context.fillStyle = '#ef4444';
  context.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

  snake.forEach((segment, index) => {
    context.fillStyle = index === 0 ? '#10b981' : '#22c55e';
    context.fillRect(segment.x * tileSize + 1, segment.y * tileSize + 1, tileSize - 2, tileSize - 2);
  });
}

function gameOver() {
  clearInterval(gameInterval);
  gameInterval = null;
  // stop any start music loop first
  stopAllStartAudio();
  playGameOverSound();
  context.fillStyle = 'rgba(0, 0, 0, 0.55)';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#f8fafc';
  context.font = '24px system-ui';
  context.textAlign = 'center';
  context.fillText('Juego terminado', canvas.width / 2, canvas.height / 2 - 10);
  context.font = '16px system-ui';
  context.fillText('Presiona Iniciar / Reiniciar', canvas.width / 2, canvas.height / 2 + 20);
}

function update() {
  const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };

  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    gameOver();
    return;
  }

  if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    gameOver();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 1;
    speed = Math.min(16, speed + 0.7);
    placeFood();
    updateScore();
    updateHighScore();
    playEatSound();
  } else {
    snake.pop();
  }

  draw();
}

function startGame() {
  if (gameInterval) {
    clearInterval(gameInterval);
  }
  if (velocity.x === 0 && velocity.y === 0) {
    velocity = { x: 1, y: 0 };
    lastDirection = { x: 1, y: 0 };
  }
  gameInterval = setInterval(update, 1000 / speed);
}

function setDirection(x, y) {
  if (x === -lastDirection.x && y === -lastDirection.y) {
    return;
  }
  velocity = { x, y };
  lastDirection = { x, y };
}


window.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowUp':
    case 'w':
    case 'W':
      setDirection(0, -1);
      break;
    case 'ArrowDown':
    case 's':
    case 'S':
      setDirection(0, 1);
      break;
    case 'ArrowLeft':
    case 'a':
    case 'A':
      setDirection(-1, 0);
      break;
    case 'ArrowRight':
    case 'd':
    case 'D':
      setDirection(1, 0);
      break;
  }
});

startButton.addEventListener('click', async () => {
  if (audioContext.state === 'suspended') {
    try {
      await audioContext.resume();
      console.info('audioContext resumed on user gesture');
    } catch (e) {
      console.warn('audioContext resume failed', e);
    }
  }
  playStartSound();
  resetGame();
  startGame();
});

resetGame();
