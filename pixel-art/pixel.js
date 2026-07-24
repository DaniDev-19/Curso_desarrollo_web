const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll('.color');
const clearBtn = document.getElementById('clear');
const downloadBtn = document.getElementById('download');

const pixelSize = 16;
let currentColor = '#000000';
let painting = false;

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;

    for (let x = 0; x <= canvas.width; x += pixelSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += pixelSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function paintPixel(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((clientX - rect.left) / pixelSize) * pixelSize;
    const y = Math.floor((clientY - rect.top) / pixelSize) * pixelSize;
    ctx.fillStyle = currentColor;
    ctx.fillRect(x, y, pixelSize, pixelSize);
}

canvas.addEventListener('pointerdown', (event) => {
    painting = true;
    paintPixel(event.clientX, event.clientY);
});

canvas.addEventListener('pointermove', (event) => {
    if (!painting) return;
    paintPixel(event.clientX, event.clientY);
});

window.addEventListener('pointerup', () => {
    painting = false;
});

colors.forEach((button) => {
    button.addEventListener('click', () => {
        colors.forEach((btn) => btn.classList.remove('selected'));
        button.classList.add('selected');
        currentColor = button.dataset.color;
    });
});

clearBtn.addEventListener('click', drawGrid);

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'pixel-art.png';
    link.click();
});

drawGrid();