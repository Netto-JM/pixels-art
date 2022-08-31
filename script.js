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
  for (let index = 1; index < colorBlocks.length; index += 1) {
    const block = colorBlocks[index];
    const randomColor = generateRandomColor();
    block.style.backgroundColor = randomColor;
  }
}

randomizerButton.addEventListener('click', addRandomColors);
