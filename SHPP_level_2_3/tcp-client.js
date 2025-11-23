const net = require('net')

const PORT = 3000;
const HOST = "192.168.0.130"

let startTime;
let endTime;

const client = net.createConnection({port: PORT, host: HOST}, () => {
    startTime = new Date();
    console.log(`Connecting to server!`);
    client.write('This is message to server from client')
})

client.on('data', (data) => {
    endTime = new Date();
    console.log(`Response from server: ${data.toString()}`);
    console.log(`Time remaining ${endTime.getTime() - startTime.getTime()} ms`);

});

client.on('end', () => {
    console.log(`Close session`);
})

client.on('error', (err) => {
    console.log(`Catch exception: ${err}`);
})