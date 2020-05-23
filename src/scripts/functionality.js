export const calc = document.querySelector('.calc p');
export const result = document.querySelector('.result p');

export function clear() {
    calc.textContent = "";
    result.textContent = 0;
}

export function calculate(stringEquation) {
    try {
        return Function(`return (${stringEquation})`)();
    } catch (error) {
        console.error(error);
        setTimeout(() => {
            clear();
        }, 1000)
        return 'ERR';
    }
}