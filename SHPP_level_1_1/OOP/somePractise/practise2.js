// Створіть декоратор delay(f, ms), яка затримує кожен виклик f на ms мілісекунд.

// Наприклад:


function f(x) {
  console.log(x);
}
function delay (func, ms){
    const wrapper = function (...args){
        setTimeout(() => func.apply(this, args), ms)
    }
    return wrapper
}

// створюємо обгортки
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("тест"); // показує "test" після 1000 мс
f1500("тест"); // показує "test" після 1500 мс