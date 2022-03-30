const add = (a, b) => {
  return a + b;
}

const subtract = (a, b) => {
  return a - b;
}

const multiply = (a, b) => {
  return a * b;
}

const divide = (a, b) => {
  return a / b;
}

const operate = (a, operator, b) => {
  if (operator === '+') {
    return add(a, b);
  }
  if (operator === '-') {
    return subtract(a, b);
  }
  if (operator === '*') {
    return multiply(a, b);
  }
  if (operator === '/') {
    return parseFloat(divide(a, b).toFixed(7));
  }
}

const display = document.querySelector('.display');

let currentInput = '';
let inputs = [];

const clearScreen = () => {
  currentInput = '';
  display.textContent = 0;
}

function clear(e) {
  clearScreen();
}

const evaluateInputs = () => {
  let result = operate(inputs[0], inputs[1], inputs[2]);
  inputs = [result];
}

const updateDisplay = token => {
  if (display.textContent.startsWith('0')) {
    display.textContent = token;
  } else {
    display.textContent += token;
  }
};

function inputNumber(e) {
  if (!currentInput) {
    clearScreen();
  }
  currentInput += this.textContent;
  updateDisplay(this.textContent);
}

function inputOperator(e) {
  let operator = this.textContent;

  if (currentInput !== '') {
    inputs.push(Number(currentInput));
  }

  if (operator === '=' || inputs.length === 3) {
    evaluateInputs();
    clearScreen();
    updateDisplay(inputs[0]);
  }

  if (operator !== '=') {
    inputs.push(operator);
  }
  currentInput = '';
}

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clear);

const buttons = document.querySelector('.buttons');

// Add buttons
for (let i = 1; i <= 9; i++) {
  let btn = document.createElement('button');
  btn.id = `button${i}`;
  btn.textContent = i;
  btn.addEventListener('click', inputNumber);
  buttons.appendChild(btn);
}

// Add 0 last
let btn = document.createElement('button');
btn.id = 'button0';
btn.textContent = 0;
btn.addEventListener('click', inputNumber);
buttons.appendChild(btn);

// Add operator event handlers
const operators = document.querySelectorAll('.operators');
operators.forEach(o => {
  o.addEventListener('click', inputOperator);
});
