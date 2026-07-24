const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('.button');
let currentInput = '';
let previousInput = '';
let operator = null;

function updateScreen(value) {
  screen.textContent = value || '0';
}

function clearCalculator() {
  currentInput = '';
  previousInput = '';
  operator = null;
  updateScreen('0');
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateScreen(currentInput || '0');
}

function appendNumber(number) {
  if (number === '.' && currentInput.includes('.')) return;
  currentInput += number;
  updateScreen(currentInput);
}

function chooseOperator(selectedOperator) {
  if (!currentInput) return;
  if (previousInput) {
    calculate();
  }
  operator = selectedOperator;
  previousInput = currentInput;
  currentInput = '';
}

function calculate() {
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  let result;
  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = current === 0 ? 'Error' : prev / current;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = '';
  updateScreen(currentInput);
}

function applyPercent() {
  if (!currentInput) return;
  const value = parseFloat(currentInput) / 100;
  currentInput = value.toString();
  updateScreen(currentInput);
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const value = button.dataset.value;

    switch (action) {
      case 'clear':
        clearCalculator();
        break;
      case 'delete':
        deleteLast();
        break;
      case 'percent':
        applyPercent();
        break;
      case 'calculate':
        calculate();
        break;
      default:
        if (value === '+' || value === '-' || value === '*' || value === '/') {
          chooseOperator(value);
        } else {
          appendNumber(value);
        }
        break;
    }
  });
});

clearCalculator();
