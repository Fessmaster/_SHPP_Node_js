//Є функція №1, яку можна евейти, яка поверне рядок == ваш поточний айп. 
// Створіть функцію №2, яка повинна використовувати функцію №1 для отримання 
// вашого поточного айпі, і яка приймає на вхід один параметр - функцію-коллбек, 
// яка буде викликана, коли айпі буде отримано, з першим параметром, що дорівнює 
// цьому айпі. Так, ми намагалися писати заплутано, але тут все чітко.

const url = "https://api.ipify.org?format=json";

async function firstFunction(url: string): Promise<string> {
    const data = await fetch(url);
    const { ip } = await data.json();    
    return ip
}

function secondFunction(callback:Function) {    
    firstFunction(url).then(ip => callback (ip));
}

async function getMyIP() {
    secondFunction((ip:string) => {
        console.log(`Поточна ip адресса ${ip}`);
    });
    
}

getMyIP()