const dgram = require("dgram")

const client  = dgram.createSocket("udp4");

const message = Buffer.from(`Hello! This message from UDP client!`)

const SERVER_PORT = 3000;
const SERVER_ADDRESS = "192.168.0.130";

let startTime;
let endTime;

client.on('listening', () =>{
    const address = client.address();
    console.log(`Client wait to receive message on port ${address.port}`);
});

client.on("message", (msg, info) => {
    endTime = new Date()
    console.log(`Get message: ${msg}`);
    console.log(`From server: ${info.address}:${info.port}`);
    console.log(`Time remaining ${endTime.getTime() - startTime.getTime()} ms`);
    client.close()    
})

client.on("error", (err) => {
    console.log(`Client error ${err}`);
    client.close();
})

client.send(message, SERVER_PORT, SERVER_ADDRESS, (err) => {
    if (err) {
        console.log(`Sending error: ${err}`);
        client.close();
    } else {
        console.log(`Message send successfully. Waite for answer...`);
        startTime = new Date();
    }
});

