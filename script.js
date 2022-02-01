const display = document.getElementById("display");
const numeros = document.querySelectorAll(('li[id*=num]'))
const operators = document.querySelectorAll(('li[id*=operator]'))

let newNumber = true;
let operator;
let numberBefore;

const pendingOperation = () => operator !== undefined;

const calculate = () => {
    if(pendingOperation()){
        const numberAfter = parseFloat(display.textContent.replace(',','.'));
        newNumber = true;
        const result = eval(`${numberBefore}${operator}${numberAfter}`);
        updateDisplay(result);
    }
}

const updateDisplay = (text) => {
    if(newNumber){
        display.textContent = text.toLocaleString('BR');
        newNumber = false;
    }else{
        display.textContent += text.toLocaleString('BR');
    }
}

const insertNumber = (event) => updateDisplay(event.target.textContent);

numeros.forEach(numero => numero.addEventListener('click', insertNumber));

const selectOperator = (e) => {
    if(!newNumber) {
        calculate();
        newNumber = true;
        operator = e.target.textContent;
        numberBefore = parseFloat(display.textContent.replace(',','.'));
    }
}

operators.forEach(operator => operator.addEventListener('click', selectOperator));

const activeEqual = () => {
    calculate();
    operator = undefined;
}

document.getElementById('operatorEqual').addEventListener('click', activeEqual);


function clean(){
    document.getElementById('display').innerHTML = '';
    operator = undefined;
    newNumber = true
    numberBefore = undefined
}

const inverterSinal = () => {
    newNumber = true
    updateDisplay(display.textContent * -1)
}
document.getElementById('invert').addEventListener('click', inverterSinal)


const thereIsDecimal = () => display.textContent.indexOf(',') !== -1
const thereIsValue = () => display.textContent.length > 0
const insertDecimal = () => {
    if(!thereIsDecimal()){
        if(thereIsValue()){
            updateDisplay(',')
        }else{
            updateDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click', insertDecimal)


const mapKey = {
    '0' : 'num0',
    '1' : 'num1',
    '2' : 'num2',
    '3' : 'num3',
    '4' : 'num4',
    '5' : 'num5',
    '6' : 'num6',
    '7' : 'num7',
    '8' : 'num8',
    '9' : 'num9',
    '*' : 'operatorMultiply',
    '/' : 'operatorsDivision',
    '-' : 'operatorSubtract',
    '+' : 'operatorMore',
    '=' : 'operatorEqual',
    'Enter' : 'operatorEqual',
    'Escape' : 'clean',
    ',' : 'decimal'
}

const chartKey = (e) => {
    const keyboard = e.key;

    const allowedKey = () => Object.keys(mapKey).indexOf(keyboard) !== -1;
    if(allowedKey()) document.getElementById(mapKey[keyboard]).click()
}
document.addEventListener('keydown', chartKey);