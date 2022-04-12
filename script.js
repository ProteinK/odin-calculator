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
    return divide(a, b);
  }
}

const display = document.querySelector('.display');


let decimalButton;

let currentInput = '';
let inputs = [];

const clearScreen = () => {
  display.textContent = 0;
  decimalButton.disabled = false;
}

function clear(e) {
  currentInput = '';
  inputs = [];
  clearScreen();
}

function inputBackspace(e) {
  if (currentInput !== '') {
    currentInput = currentInput.substring(0, currentInput.length - 1);
    if (currentInput) {
      display.textContent = currentInput;
    }
    else {
      display.textContent = 0;
    }
  }
}

const evaluateInputs = () => {
  if (inputs[1] === '/' && inputs[2] === 0) {
    inputs = [];
    return 'ERR: Division by 0';
  }

  let result = parseFloat(operate(inputs[0], inputs[1], inputs[2]).toFixed(7));
  inputs = [result];
  return result;
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
  if (this.textContent === '.') {
    this.disabled = true;
  }
  currentInput += this.textContent;
  updateDisplay(this.textContent);
}

function inputOperatorHandler(e) {
  inputOperator(this.textContent);
}

const inputOperator = operator => {
  if (operator === '=' && inputs.length !== 2) {
    clearScreen();
    updateDisplay('ERR');
    currentInput = '';
    return;
  }

  if (currentInput !== '') {
    inputs.push(Number(currentInput));
  }

  if (operator === '=' || inputs.length === 3) {
    let result = evaluateInputs();
    clearScreen();
    updateDisplay(result);
  }

  if (operator !== '=') {
    inputs.push(operator);
  }
  currentInput = '';
};

function keyDown(e) {
  const acceptableInputs = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
  const operators = ['+', '-', '/', '*', '='];

  if (acceptableInputs.includes(e.key)) {
    if (!currentInput) {
      clearScreen();
    }
    if (e.key === '.') {
      decimalButton.disabled = true;
    }
    currentInput += e.key;
    updateDisplay(e.key);
  } else if (operators.includes(e.key)) {
    inputOperator(e.key);
  } else if (e.key === 'Backspace') {
    inputBackspace();
  }
}

document.addEventListener('keydown', keyDown);

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

// Add decimal button
decimalButton = document.createElement('button');
decimalButton.id = 'decimal';
decimalButton.textContent = '.';
decimalButton.addEventListener('click', inputNumber);
buttons.appendChild(decimalButton);

// Add backspace button
let backspace = document.createElement('button');
backspace.id = 'backspace';
backspace.textContent = '⟵';
backspace.addEventListener('click', inputBackspace);
buttons.appendChild(backspace);

// Add operator event handlers
const operators = document.querySelectorAll('.operators');
operators.forEach(o => {
  o.addEventListener('click', inputOperatorHandler);
});
