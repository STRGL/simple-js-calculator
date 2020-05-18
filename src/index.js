import './stylesheets/scss/main.scss';
import { calculate, clear, calc, result } from './scripts/helpers.js';

{
    document.body.addEventListener('click', event => {
        let element = event.target;
        if (!element.className.includes('btn--alt') && element.className.includes('btn')) {
            if (element.id === 'equal') {
                let answer = calculate(calc.textContent);
                calc.textContent = answer;
                result.textContent = answer;
            } else {
                calc.textContent += element.textContent.trim();
            }
        } else if (element.id === 'clear') {
            clear();
        }

    });

    document.querySelector('#save').addEventListener('click', event => {

    })

}