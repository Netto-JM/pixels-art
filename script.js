// testing windows size 1366 x 768
const colorBlocks = document.getElementsByClassName('color');
const randomizerButton = document.getElementById('button-random-color');

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

function selectColor(event) {
  for (let index = 0; index < colorBlocks.length; index += 1) {
    colorBlocks[index].classList.remove('selected');
  }
  event.target.classList.add('selected');
}

function paintPixel(event) {
  const selectedBlock = document.querySelector('.selected');
  const blockStyle = window.getComputedStyle(selectedBlock);
  const selectedColor = blockStyle.backgroundColor;
  const selectedPixel = event.target;
  selectedPixel.style.backgroundColor = selectedColor;
}

function clickHandler(event) {
  const clickedElement = event.target;
  if (clickedElement.classList.contains('color')) {
    selectColor(event);
  } else if (clickedElement.classList.contains('pixel')) {
    paintPixel(event);
  }
}

randomizerButton.addEventListener('click', addRandomColors);
document.addEventListener('DOMContentLoaded', recoverColorPallet);

document.addEventListener('click', (event) => { clickHandler(event); });
