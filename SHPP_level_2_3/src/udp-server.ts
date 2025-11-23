import * as dgram from "dgram"

// Create server

const server = dgram.createSocket("udp4")
const port = 3000

//handle received messages
server.on('message', (message, info) => {
    console.log(`Отримано повідомлення ${message.toString()}`);
    console.log(`Від клієнта ${info.address}:${info.port}`);

    const response = Buffer.from (`Сервер отримав твоє повідомлення: ${message.toString()}`);

    server.send(response, info.port, info.address, (err) =>{
        if (err)console.log(`Помилка відправлення`, err);
        else console.log(`Повідомлення відправлено клієнту ${info.address};${info.port}`);        
    });
});

//handle error
server.on('error', (error) => {
    console.log(`Помилка сервера ${error}`);
    server.close();
});

// server start listen
server.on('listening', () => {
    const address = server.address();
    console.log(`Сервер слухає на ${address.address}:${address.port}`);
})

// Starting server on port 3000
server.bind(port)

