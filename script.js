// testing windows size 1366 x 768
const colorBlocks = document.getElementsByClassName('color');
const pixels = document.getElementsByClassName('pixel');
const randomizerButton = document.getElementById('button-random-color');
const clearButton = document.getElementById('clear-board');
const pixelArt = {};

const obj = {
  [clearButton]: 'testing',
};

const obj2 = {
  [randomizerButton]: 'testing',
};

console.log(obj, obj2);

function generateRandomColor() {
  const colorValues = [];
  for (let index = 0; index < 3; index += 1) {
    const colorValue = Math.floor(Math.random() * 256);
    colorValues[index] = colorValue;
  }
  const color = `rgb(${colorValues[0]}, ${colorValues[1]}, ${colorValues[2]})`;
  return color;
}

function addRandomColors() {
  const randomColors = [];
  for (let index = 1; index < colorBlocks.length; index += 1) {
    const block = colorBlocks[index];
    const randomColor = generateRandomColor();
    randomColors.push(randomColor);
    block.style.backgroundColor = randomColor;
  }
  localStorage.setItem('colorPalette', JSON.stringify(randomColors));
}

function recoverColorPallet() {
  const localColors = localStorage.getItem('colorPalette');
  if (localColors !== null) {
    const randomColors = JSON.parse(localColors);
    for (let index = 1; index < colorBlocks.length; index += 1) {
      const block = colorBlocks[index];
      const randomColor = randomColors[index - 1];
      block.style.backgroundColor = randomColor;
    }
  }
}

function recoverPixelArt() {
  const localPixelArt = localStorage.getItem('pixelBoard');
  if (localPixelArt !== null) {
    const recoveredPixelArt = JSON.parse(localPixelArt);
    Object.keys(recoveredPixelArt).forEach(((location) => {
      const pixelClass = `.${location}`;
      const pixel = document.querySelector(pixelClass);
      pixel.style.backgroundColor = recoveredPixelArt[location];
    }));
  }
}

function selectColor(event) {
  for (let index = 0; index < colorBlocks.length; index += 1) {
    colorBlocks[index].classList.remove('selected');
  }
  event.target.classList.add('selected');
}

function savePixelInLocalStorage(selectedPixel, selectedColor) {
  const pixelLocation = selectedPixel.classList[1];
  pixelArt[pixelLocation] = selectedColor;
  localStorage.setItem('pixelBoard', JSON.stringify(pixelArt));
}

function paintPixel(event) {
  const selectedBlock = document.querySelector('.selected');
  const blockStyle = window.getComputedStyle(selectedBlock);
  const selectedColor = blockStyle.backgroundColor;
  const selectedPixel = event.target;
  selectedPixel.style.backgroundColor = selectedColor;
  savePixelInLocalStorage(selectedPixel, selectedColor);
}

function clickHandler(event) {
  const clickedElement = event.target;
  if (clickedElement.classList.contains('color')) {
    selectColor(event);
  } else if (clickedElement.classList.contains('pixel')) {
    paintPixel(event);
  }
}

function clearGrid() {
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = 'white';
  }
}

randomizerButton.addEventListener('click', addRandomColors);
clearButton.addEventListener('click', clearGrid);
document.addEventListener('DOMContentLoaded', recoverColorPallet);
document.addEventListener('DOMContentLoaded', recoverPixelArt);

document.addEventListener('click', (event) => { clickHandler(event); });
