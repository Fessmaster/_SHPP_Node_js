// Створіть декоратор spy(func), який повинен повернути обгортку, яка зберігає всі виклики функції у властивості calls.

// Кожен виклик зберігається як масив аргументів.

// До прикладу:



function work(a, b) {
  console.log( a + b ); // працює як довільна функція або метод
}

function spy (func) {
   
    function wrapper (...args) {
        wrapper.calls.push(args)
        return func.apply(this, args)
    }
    wrapper.calls = []
    return wrapper
}



work = spy(work);

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  console.log( 'виклик:' + args.join() ); // "виклик:1,2", "виклик:4,5"
}
