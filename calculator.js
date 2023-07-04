// Operation Logic
let firstNumber = null;
let op = null;
let secondNumber = null;
const MATH_ERROR = 'Math Error';

let isOperator = false;

// Display
let historyValue = '';
let displayValue = '';

// DOM
const display = document.querySelector('#default-display');
const historyDisplay = document.querySelector('#history-display');
const numberButtons = document.querySelectorAll('.number-buttons');
const operators = document.querySelectorAll('.operator-buttons');
const equal = document.querySelector('.equal-button');
const clear = document.querySelector('.clear-button');
const backspace  = document.querySelector('.delete-button');

// Event Listeners
clear.addEventListener('click', clearAll);

backspace.addEventListener('click', () => {
    if (displayValue.length > 0) {
        displayValue = displayValue.slice(0, -1);
        display.textContent = displayValue;
        const lastChar = displayValue.charAt(displayValue.length - 1);
        if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/' || lastChar === '%') {
            isOperator = true;
        } else if (lastChar === '') {
            display.textContent = '0';
        }
    }
});

equal.addEventListener('click', () => {
    calculate(equal.textContent)
});

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        registerNumber(button.textContent);
    });
});

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        if (firstNumber === null) {
            firstNumber = Number(displayValue);
            console.log(firstNumber);
            op = operator.textContent;
            displayValue += op;
            display.textContent = displayValue;
        } else if (isOperator) {
            op = operator.textContent;
            console.log(displayValue);
            displayValue = displayValue.slice(0, -1);
            displayValue += op;
            display.textContent = displayValue;
        } else if (op === null) {
            op = operator.textContent;
            displayValue += op;
            display.textContent = displayValue;
        }
        else if (firstNumber !== null && secondNumber === null) {
            secondNumber = Number(displayValue.split(op)[1]);
            console.log(secondNumber);
            displayValue = operate(op, firstNumber, secondNumber);
            historyValue = `${firstNumber} ${op} ${secondNumber}`;
            firstNumber = displayValue;
            secondNumber = null;
            if (operator.textContent !== '=') {
                op = operator.textContent;
                displayValue += op;
            } else {
                op = null;
            }
            display.textContent = displayValue;
            historyDisplay.textContent = historyValue;
        }
        isOperator = true;
    });
});

// Auxiliar Functions
function registerNumber(digit) {
    if (firstNumber !== 0 && op === '') {
        clearAll();
    }
    isOperator = false;
    displayValue += digit;
    display.textContent = displayValue;
}

function calculate(button) {
    if (op !== null) {
        secondNumber = Number(displayValue.split(op)[1]);
        displayValue = operate(op, firstNumber, secondNumber);
        if (displayValue === MATH_ERROR) {
            clearAll();
            display.textContent = MATH_ERROR;
            return;
        }
        historyValue = `${firstNumber} ${op} ${secondNumber}`;
        firstNumber = displayValue;
        secondNumber = null;
        if (button === '=') {
            op = null;
            isOperator = false;
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
    firstNumber = secondNumber = op = null;
    isOperator = false;
    historyValue = displayValue = '';
    display.textContent = '0';
    historyDisplay.textContent = '';
}

// Operation Functions
function operate(op, firstNumber, secondNumber) {
    switch (op) {
        case '+':
            return add(firstNumber, secondNumber);
        case '-':
            return subtract(firstNumber, secondNumber);
        case '*':
            return multiply(firstNumber, secondNumber);
        case '/':
            return division(firstNumber, secondNumber);
        case '%':
            return percentage(firstNumber, secondNumber);
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
        return MATH_ERROR;
    }
    return a / b;
}

function percentage(a, b) {
    if (b == 0) {
        b = 1;
        secondNumber = 1;
    }
    return (a * b) / 100;
}

