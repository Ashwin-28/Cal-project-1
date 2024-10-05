//access the DOM elements
const inputbox=document.getElementById('input');
const expression_block=document.getElementById('expression');
const result_block=document.getElementById('result');

//define expression and result variable
let expression =' ';
let result=' ';

//define event handler for butn clicks
function buttonClick(event)
{
    const target = event.target;
    const action = target.dataset.action;
    const value = target.dataset.value;
//swtich case part
    switch(action)
    {
        case 'number':
            addValue(value);
            break;
        case 'clear':
            break;

    }
    updateDisplay(expression,result);
    
}


inputbox.addEventListener('click',buttonClick);

function addValue(value)
{
    expression+=value;
}

function updateDisplay(expression,result)
{
    expression_block.textContent=expression;
    result_block.textContent=result;
}
