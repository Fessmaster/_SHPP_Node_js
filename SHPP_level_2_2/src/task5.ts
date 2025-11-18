//Є функція №1, яка приймає коллбек, який буде викликаний з параметром == ваш поточний айпі. 
// Створіть функцію №2, яку можна евейтити, яка буде користуватися функцією №1

const url = "https://api.ipify.org?format=json";

async function getIP(url: string): Promise<string> {
    const data = await fetch(url);
    const { ip } = await data.json();
    return ip
}

async function firstFunction (callback: Function): Promise<string> {
    const IP = await getIP(url);    
    return callback(IP)        
}

async function secondFunction (): Promise<string>{
    return firstFunction((ip:string) => ip)
}

async function getMyIP() {
    const result = await secondFunction();
    console.log(`Мій поточний IP: ${result}`);
}

getMyIP()