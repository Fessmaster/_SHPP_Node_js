//1.
// Використати node-fetch, щоб зробити запит await fetch("https://api.ipify.org?format=json"), отримати відповідь та вивести на екран свій айпі

//2.
//Напишіть функцію за мотивами п.1., яка повертає ваш айпі.

const url = "https://api.ipify.org?format=json";

async function getIP(url: string): Promise<string> {
    const data = await fetch(url);
    const { ip } = await data.json();
    return ip
}

async function printIp (){
    const ip = await getIP(url)
    console.log(`Your IP is: ${ip}`);
}

printIp(); 