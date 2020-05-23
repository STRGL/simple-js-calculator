import './stylesheets/scss/main.scss';
import { calculate, clear, calc, result } from './scripts/functionality';


{
    let sum = '';
    document.body.addEventListener('click', event => {
        let element = event.target;
        if (calc.textContent === '') sum = '';
        if (!element.className.includes('btn--alt') && element.className.includes('btn')) {
            if (element.id === 'equal') {
                let answer = calculate(sum);
                calc.textContent = answer;
                result.textContent = answer;
                sum = answer;
            } else {
                if (element.dataset.operator != undefined) {
                    calc.textContent += element.textContent.trim();
                    sum += element.dataset.operator;
                } else {
                    calc.textContent += element.textContent.trim();
                    sum += element.textContent.trim();
                }
            }
        } else if (element.id === 'clear') {
            clear();
            sum = '';
        }

        console.log('SUM: ', sum);
    });

    document.querySelector('#save').addEventListener('click', event => {

    })

}
