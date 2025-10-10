// Дросельний (throttle) декоратор

function f(a) {
  console.log(a);
}

function throttle(f, ms) {
  let isThrottle = false;
  let setArguments;
  let setThis;
  function wrapper() {
    if (isThrottle) {
      setArguments = arguments; // зберігаємо аргументи
      setThis = this; // зберігаємо оточення 
      return; // завершуємо виконання поточного виклику
    }
    isThrottle = true; // встановлюємо прапорець для паузи
    f.apply(this, arguments); // виводимо перший виклик
    setTimeout(() => { // запуск таймера
      isThrottle = false; // зкидаємо прапорець охолодження 
      if (setArguments && setThis) { // якщо збережено дані викликаємо функцію
        wrapper.apply(setThis, setArguments); // виклик обгортки з поточними даними для їх виведення
        setArguments = setThis = null; // зкидаємо збережені дані після таймеру
      }
    }, ms);
  }
  return wrapper;
}

// f1000 передає виклики до f максимум один раз на 1000 мс
let f1000 = throttle(f, 2000);

f1000(1); // показує 1
f1000(2); // (обмеження, 1000 мс ще не закінчилися)
f1000(3); // (вивід 3 після закінчення таймера)
setTimeout(() => {
  //
  f1000(4); // через 1 секунду зявиться 4
  f1000(5); // (обмеження, 1000 мс ще не закінчилися)
  f1000(6); // таймер закінчився виведено 6
}, 3000);

// коли 1000 ms time out ...
// ...виводить 3; проміжне значення 2 було проігноровано
