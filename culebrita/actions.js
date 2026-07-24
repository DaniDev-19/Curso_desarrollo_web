const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('startButton');

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
  draw();
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

startButton.addEventListener('click', () => {
  resetGame();
  startGame();
});

resetGame();
