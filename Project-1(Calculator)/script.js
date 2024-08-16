// Accessing the calculator screen and buttons
const calculatorScreen = document.querySelector('.calculator-screen');
const keys = document.querySelector('.calculator-keys');

// Variables to store the current state of the calculator
let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetScreen = false;

// Function to update the screen with the current input
function updateScreen() {
    calculatorScreen.value = currentInput;
}

// Function to handle number and decimal button clicks
function handleNumber(number) {
    if (currentInput === '0' || shouldResetScreen) {
        currentInput = number;
        shouldResetScreen = false;
    } else {
        currentInput += number;
    }
}

// Function to handle operator button clicks
function handleOperator(nextOperator) {
    if (operator && !shouldResetScreen) {
        calculate();
    } else {
        previousInput = currentInput;
    }
    operator = nextOperator;
    shouldResetScreen = true;
}

// Function to handle the equal button click
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

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
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
}

// Function to clear the calculator
function clearCalculator() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetScreen = false;
}

// Event listener for button clicks
keys.addEventListener('click', (event) => {
    const { target } = event;
    const { value } = target;

    if (!target.matches('button')) return;

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
            handleOperator(value);
            break;
        case '=':
            calculate();
            updateScreen();
            break;
        case 'all-clear':
            clearCalculator();
            updateScreen();
            break;
        case '.':
            if (!currentInput.includes('.')) {
                currentInput += '.';
            }
            break;
        default:
            handleNumber(value);
            break;
    }

    updateScreen();
});