export let calc = document.querySelector('.calc p');
export let result = document.querySelector('.result p');

let multiply = 215;
let divide = 247;
let subtract = 8722;
let add = 43;
let decimal = 46;

function multiplicationAndDivision(array) {
    let operand;
    if (array.indexOf('*') === -1 && array.indexOf('/') === -1) {
        return array;
    } else if (array.indexOf('*') === -1) {
        operand = '/';
    } else if (array.indexOf('/') === -1) {
        operand = '*';
    } else {
        operand = array.indexOf('*') < array.indexOf('/') ? '*' : '/';
    }
    let i = array.indexOf(operand);
    let prev = array[i - 1];
    let next = array[i + 1];
    let firstArr = array.slice(0, i);
    let secArr = array.slice(i + 1, array.length);
    firstArr.pop();
    secArr.shift();
    if (operand === '*') {
        secArr.unshift(prev * next);
    } else {
        secArr.unshift(prev * next);
    }

    return multiplicationAndDivision([...firstArr, ...secArr]);
}

function additionAndSubtraction(array) {
    let operand;
    if (array.indexOf('+') === -1 && array.indexOf('-') === -1) {
        return array;
    } else if (array.indexOf('+') === -1) {
        operand = '-';
    } else if (array.indexOf('-') === -1) {
        operand = '+';
    } else {
        operand = array.indexOf('+') < array.indexOf('-') ? '+' : '-';
    }

    let i = array.indexOf(operand);
    let prev = array[i - 1];
    let next = array[i + 1];
    let firstArr = array.slice(0, i);
    let secArr = array.slice(i + 1, array.length);
    firstArr.pop();
    secArr.shift();
    if (operand === '+') {
        secArr.unshift(prev + next);
    } else {
        secArr.unshift(prev - next);
    }

    return additionAndSubtraction([...firstArr, ...secArr]);
}

function isNumber(number) {
    return (number.charCodeAt() >= 48 && number.charCodeAt() <= 57 ? true : false);
}


function getOperand(char) {
    switch (char.charCodeAt()) {
        case multiply:
            return '*';
            break;
        case divide:
            return '/';
            break;
        case add:
            return '+';
            break;
        case subtract:
            return '-';
            break;
        default:
            break;
    }
}


export function clear() {
    calc.textContent = "";
    result.textContent = 0;
}

export function calculate(stringEquation) {
    try {

        let compiled = [];
        let count = 0;
        let broken = stringEquation.trim().split('');

        for (let i = 0; i < broken.length; i++) {
            let code = broken[i].charCodeAt();
            //check if it's a digit between 0-9
            if (isNumber(broken[i])) {
                console.log(broken[i]);
                if (compiled[count] === undefined) {
                    compiled.push(broken[i])
                } else {
                    compiled[count] += broken[i];
                }
            } else if (code === subtract || code === decimal) {
                if (code === subtract) {
                    if (i === 0 && isNumber(broken[i + 1])) {
                        compiled.push(broken[i]);
                    } else if (!isNumber(broken[i - 1]) && isNumber(broken[i + 1])) {
                        compiled.push(broken[i]);
                    } else {
                        count++;
                        console.log(broken[i]);
                        compiled.push(broken[i]);
                        count++;
                    }
                } else {
                    //if Previous was an operand then it should be in a new slot
                    if (!isNumber(broken[i - 1])) {
                        compiled.push(broken[i]);
                    } else {
                        compiled[count] += broken[i];
                    }
                }
            } else {
                count++;
                console.log(broken[i]);
                compiled.push(broken[i]);
                count++;
            }
        }

        //replace string of numbers with numbers
        compiled = compiled.map(portion => {
            if (Number(portion) === Number(portion)) {
                return Number(portion);
            } else if (portion.charCodeAt() === subtract && portion.length > 1) {
                return -Math.abs(Number(portion.slice(1)));
            } else {
                return getOperand(portion);
            }
        });

        compiled = multiplicationAndDivision(compiled);
        compiled = additionAndSubtraction(compiled);

        console.log(compiled);
        if (compiled.length === 1) return compiled[0];
        throw "Failed to compute";
    } catch (error) {
        console.error(error);
        setTimeout(() => {
            clear();
        }, 1000)
        return 'ERR';
    }
}