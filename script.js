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
  localStorage.setItem('randomColors', JSON.stringify(randomColors));
}

function recoverColorPallet() {
  const randomColors = JSON.parse(localStorage.getItem('randomColors'));
  for (let index = 1; index < colorBlocks.length; index += 1) {
    const block = colorBlocks[index];
    const randomColor = randomColors[index - 1];
    block.style.backgroundColor = randomColor;
  }
}

randomizerButton.addEventListener('click', addRandomColors);
document.addEventListener('DOMContentLoaded', recoverColorPallet);
