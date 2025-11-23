const http = require("http");

const server = http.createServer((req, res) => {
    let streamData = '';
    let data = ''
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Обробка OPTIONS запиту
    if (req.method === 'OPTIONS') {
        res.end();
        return;
    }

    req.on("data", chunk => {
        streamData += chunk;
    })
    req.on("end", () => {
        console.log("Raw StreamData:", streamData); // Що прийшло?
        console.log("Type of StreamData:", typeof streamData);
    
    try {
        data = JSON.parse(streamData);
        console.log("Parsed data:", data);
    } catch (e) {
        console.log("Parse error:", e);
    }        
        res.end(JSON.stringify({message: data}));
    });   
})

server.listen(3000, () => {
    console.log(`Server start on port 3000`);
})