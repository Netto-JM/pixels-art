const colorBlocks = document.getElementsByClassName('color');
const pixels = document.getElementsByClassName('pixel');
const randomizerButton = document.getElementById('button-random-color');
const generateButton = document.getElementById('generate-board');
const generateInput = document.getElementById('board-size');
const clearButton = document.getElementById('clear-board');
const container = document.getElementById('board-container');
let pixelBoard = document.getElementById('pixel-board');
let pixelArt = {};

function appendTextNode(element, text) {
  const textNode = document.createTextNode(text);
  element.appendChild(textNode);
}

function addClassesToElement(element, classArray) {
  element.classList.add(...classArray);
}

function addIdToElement(element, idName) {
  element.setAttribute('id', idName);
}

function createElementWithText(element, text) {
  const newElement = document.createElement(element);
  if (text) appendTextNode(newElement, text);
  return newElement;
}

function completeElementBuilder(element, parent, classArray, idName) {
  const newElement = createElementWithText(element);
  if (classArray) addClassesToElement(newElement, classArray);
  if (idName) addIdToElement(newElement, idName);
  if (parent) parent.appendChild(newElement);
  return newElement;
}

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
  localStorage.removeItem('pixelBoard');
  pixelArt = {};
}

function styleNewBoard(board, size) {
  const styledPixelBoard = board.cloneNode(true);
  const template = `repeat(${size}, 1fr)`;
  const proportion = `${size * 40}px`;
  styledPixelBoard.style.gridTemplateColumns = template;
  styledPixelBoard.style.gridTemplateRows = template;
  styledPixelBoard.style.width = proportion;
  styledPixelBoard.style.height = proportion;
  return styledPixelBoard;
}

function defineBoardSize(fromClick, input) {
  const inputedValue = (fromClick) ? input : localStorage.getItem('boardSize');
  let inputedNumber = Number(inputedValue);
  if (!fromClick) return inputedNumber;
  if (inputedNumber > 50) inputedNumber = 50;
  if (inputedNumber < 5) inputedNumber = 5;
  localStorage.setItem('boardSize', inputedNumber);
  return inputedNumber;
}

function generateBoard(fromClick) {
  const boardSize = defineBoardSize(fromClick, generateInput.value);
  container.removeChild(pixelBoard);
  pixelBoard = completeElementBuilder('div', undefined, undefined, 'pixel-board');
  pixelBoard = styleNewBoard(pixelBoard, boardSize);
  container.appendChild(pixelBoard);
  for (let index1 = 1; index1 <= boardSize; index1 += 1) {
    for (let index2 = 1; index2 <= boardSize; index2 += 1) {
      const className = `p${index1}-${index2}`;
      completeElementBuilder('div', pixelBoard, ['pixel', className]);
    }
  }
  if (fromClick) {
    localStorage.removeItem('pixelBoard');
    pixelArt = {};
  }
}

function recoverPixelArt() {
  if (localStorage.getItem('boardSize') !== null) generateBoard(false);
  pixelArt = localStorage.getItem('pixelBoard') || pixelArt;
  const isPaintedBoard = JSON.stringify(pixelArt).length > 2;
  if (pixelArt !== null && isPaintedBoard) {
    pixelArt = JSON.parse(pixelArt);
    Object.keys(pixelArt).forEach(((location) => {
      const pixelClass = `.${location}`;
      const pixel = document.querySelector(pixelClass);
      pixel.style.backgroundColor = pixelArt[location];
    }));
  }
}

function generateButtonHandler() {
  if (generateInput.value.length === 0) {
    return alert('Board inválido!');
  }
  generateBoard(true);
}

randomizerButton.addEventListener('click', addRandomColors);
clearButton.addEventListener('click', clearGrid);
generateButton.addEventListener('click', generateButtonHandler);
document.addEventListener('DOMContentLoaded', recoverColorPallet);
document.addEventListener('DOMContentLoaded', recoverPixelArt);
document.addEventListener('click', (event) => { clickHandler(event); });
