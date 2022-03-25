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

function clear(e) {
  display.textContent = 0;
}

const addToDisplay = token => {
  if (display.textContent.startsWith('0')) {
    display.textContent = token;
  } else {
    display.textContent += token;
  }
};

function buttonClicked(e) {
  addToDisplay(this.textContent);
}

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clear);

const buttons = document.querySelector('.buttons');

// Add buttons
for (let i = 1; i <= 9; i++) {
  let btn = document.createElement('button');
  btn.id = `button${i}`;
  btn.textContent = i;
  btn.addEventListener('click', buttonClicked);
  buttons.appendChild(btn);
}

// Add 0 last
let btn = document.createElement('button');
btn.id = 'button0';
btn.textContent = 0;
btn.addEventListener('click', buttonClicked);
buttons.appendChild(btn);
