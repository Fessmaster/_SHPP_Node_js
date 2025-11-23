const net = require("net");

const PORT = 3000

const server = net.createServer((socket) => {
    console.log('Start connection');

    console.log(`Server start on port ${PORT}`);
    
    socket.on("data", (data) => {
        console.log(`Server received message from client: ${data.toString()}`);

        if (data.toString().toLowerCase()==='exit'){
            socket.on('end', () => {
                console.log(`Server closed with client request`);
            })
        }
    
        socket.write(`Server received message from client: ${data.toString()}`)
    })

    socket.on('error', (err) => {
        console.log(`Server error: ${err}`);
    })
})

server.listen(PORT, () => {
    console.log(`Server starting on port ${PORT}`);
})