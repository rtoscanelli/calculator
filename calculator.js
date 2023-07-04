// Operation Logic
let firstNumber = 0;
let op = '';
let secondNumber = 0;
let ans = 0;
const SYNTAX_ERROR = 'Syntax Error';

// Display
let historyValue = '';
let displayValue = '';

// DOM
const display = document.querySelector('#default-display');
const historyDisplay = document.querySelector('#history-display');
const numberButtons = document.querySelectorAll('.number-buttons');
const operators = document.querySelectorAll('.operator-buttons');
const clear = document.querySelector('.clear-button');
const equal = document.querySelector('.equal-button');

// Event Listeners
clear.addEventListener('click', clearAll);
equal.addEventListener('click', function() {
    calculate(equal.textContent)
});

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (ans !== 0 && op === '') {
            clearAll();
        }
        displayValue += button.textContent;
        display.textContent = displayValue;
    });
});

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        if (op === '') {
            console.log('save operator');
            firstNumber = Number(displayValue);
            op = operator.textContent;
            displayValue += op;
            display.textContent = displayValue;
        } else if (op !== '' && firstNumber !== 0) { 
            console.log('calculate with operator');
            calculate(operator.textContent);
        }
        else {
            console.log('change operator');
            // print to the console the op and secondNumber
            console.log(op, secondNumber);
            op = operator.textContent;
            displayValue = displayValue.slice(0, -1) + op;
            display.textContent = displayValue;
        }
    });
});

// Auxiliar Functions
function calculate(button) {
    if (op !== '') {
        secondNumber = Number(displayValue.split(op)[1]);
        displayValue = ans = operator(op, firstNumber, secondNumber);
        if (displayValue === SYNTAX_ERROR) {
            clearAll();
            display.textContent = SYNTAX_ERROR;
            return;
        }
        historyValue = `${firstNumber} ${op} ${secondNumber}`;
        firstNumber = ans;
        secondNumber = 0;
        if (button === '=') {
            op = '';
        }
        else {
            op = button;
            displayValue += op;
        }
    }
    display.textContent = displayValue;
    historyDisplay.textContent = historyValue;
}

function clearAll() {
    ans = 0;
    historyValue = displayValue = op = '';
    display.textContent = '0';
    historyDisplay.textContent = '';
}

// Operation Functions
function operator(op, firstNumber, secondNumber) {
    switch (op) {
        case '+':
            return add(firstNumber, secondNumber);
        case '-':
            return subtract(firstNumber, secondNumber);
        case '*':
            return multiply(firstNumber, secondNumber);
        case '/':
            return division(firstNumber, secondNumber);
        default:
            return 'Invalid operator';
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function division(a, b) {
    if (b === 0) {
        return SYNTAX_ERROR;
    }
    return a / b;
}

