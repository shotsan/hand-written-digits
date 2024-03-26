const numCanvasesInput = document.getElementById('num-canvases');
const createCanvasesButton = document.getElementById('create-canvases');
const canvasContainer = document.getElementById('canvas-container');

createCanvasesButton.addEventListener('click', () => {
  const numCanvases = numCanvasesInput.value;
  canvasContainer.innerHTML = ''; // Clear any existing canvases
  const canvases = document.querySelectorAll('canvas');

  canvases.forEach((canvas) => {
  canvas.removeEventListener('mousedown', startDrawing);
  canvas.removeEventListener('mousemove', draw);
  canvas.removeEventListener('mouseup', stopDrawing);
  canvas.removeEventListener('mouseout', stopDrawing);
});

  for (let i = 0; i < numCanvases; i++) {
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas' + i;
    canvas.width = 100;
    canvas.height = 100;
    canvas.className = 'canvas';
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    document.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    canvasContainer.appendChild(canvas);
  }
});

let isDrawing = false;

function startDrawing(event) {
  if (event.target.className === 'canvas') {
    isDrawing = true;
    draw(event);
  }
}

function draw(event) {
  if (!isDrawing) return;
  const ctx = event.target.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(event.clientX - event.target.offsetLeft, event.clientY - event.target.offsetTop, 5, 0, Math.PI * 2);
  ctx.fill();
}

function stopDrawing(event) {
  if (event.target.className === 'canvas') {
    isDrawing = false;
  }
}




const downloadButton = document.getElementById('download');

downloadButton.addEventListener('click', () => {
  const canvases = document.querySelectorAll('canvas');

  canvases.forEach((canvas, index) => {
    const link = document.createElement('a');
    link.download = 'image' + index + '.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});
