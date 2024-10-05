// Access the DOM elements
const inputbox = document.getElementById('input');
const expression_block = document.getElementById('expression');
const result_block = document.getElementById('result');

// Define expression and result variable
let expression = '';
let result = '';

// Define event handler for button clicks
function buttonClick(event) {
    // Get values from clicked button
    const target = event.target;
    const action = target.dataset.action;
    const value = target.dataset.value;
    
    // Switch case to control the calculator
    switch (action) {
        case 'number':
            addValue(value);
            break;
        case 'clear':
            clear();
            break;
        case 'backspace':
            backspace();
            break;
        case 'addition':
        case 'subtraction':
        case 'multiplication':
        case 'division':
            if (expression === '' && result !== '') {
                startFromResult(value);
            } else if (expression !== '' && !isLastCharOperator()) {
                addValue(value);
            }
            break;
        case 'submit':
            submit();
            break;
        case 'negate':
            negate();
            break;
        case 'mod':
            percentage();
            break;
        case 'decimal':
            decimal(value);
            break;
    }

    // Update display
    updateDisplay(expression, result);
}

// Attach event listener to the inputbox (corrected)
inputbox.addEventListener('click', buttonClick);

// Function to add value to the expression
function addValue(value) {
    if (value === '.') {
        // Find the index of the last operator in the expression
        const lastOperatorIndex = expression.search(/[+\-*/]/);
        const lastDecimalIndex = expression.lastIndexOf('.');
        const lastNumberIndex = Math.max(
            expression.lastIndexOf('+'),
            expression.lastIndexOf('-'),
            expression.lastIndexOf('*'),
            expression.lastIndexOf('/')
        );
        // Check if this is the first decimal in the current number
        if (
            (lastDecimalIndex < lastOperatorIndex ||
            lastDecimalIndex < lastNumberIndex ||
            lastDecimalIndex === -1) &&
            (expression === '' ||
            expression.slice(lastNumberIndex + 1).indexOf('-') === -1)
        ) {
            expression += value;
        }
    } else {
        expression += value;
    }
}

// Function to update the display
function updateDisplay(expression, result) {
    expression_block.textContent = expression;
    result_block.textContent = result;
}

// Clear function
function clear() {
    expression = '';
    result = '';
}

// Backspace function
function backspace() {
    expression = expression.slice(0, -1);
}

// Check if the last character is an operator
function isLastCharOperator() {
    return isNaN(parseInt(expression.slice(-1)));
}

// Start new expression from result
function startFromResult(value) {
    expression += result + value;
}

// Submit the expression and evaluate
function submit() {
    result = evaluateExpression();
    expression = '';
}

// Function to evaluate the expression
function evaluateExpression() {
    const evalResult = eval(expression);
    return isNaN(evalResult) || !isFinite(evalResult)
        ? ' '
        : evalResult < 1
        ? parseFloat(evalResult.toFixed(10))
        : parseFloat(evalResult.toFixed(2));
}

// Negate function
function negate() {
    if (expression === '' && result !== '') {
        result = -result;
    } else if (!expression.startsWith('-') && expression !== '') {
        expression = '-' + expression;
    } else if (expression.startsWith('-')) {
        expression = expression.slice(1);
    }
}

// Percentage function
function percentage() {
    if (expression !== '') {
        result = evaluateExpression();
        expression = '';
        if (!isNaN(result) && isFinite(result)) {
            result /= 100;
        } else {
            result = '';
        }
    } else if (result !== '') {
        result = parseFloat(result) / 100;
    }
}

// Decimal function
function decimal(value) {
    if (!expression.endsWith('.') && !isNaN(expression.slice(-1))) {
        addValue(value);
    }
}
