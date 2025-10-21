const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const filePath = path.join(__dirname, "/counter.txt");
const fs = require("fs");

let counter;

try {
  counter = fs.readFileSync(filePath).toString();
} catch (error) {
  console.log(error.message);
}

app.get("/", (req, res) => {
  counter = parseInt(counter) + 1;
  fs.writeFileSync(filePath, counter.toString());
  return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View counter</title>
</head>
<body style="background-color: rgb(36, 36, 36);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh; 
            margin: 0;">

    <div style="width: 400px;
                height: 150px;
                background-color: rgb(212, 212, 212);
                display: flex;
                justify-content: center;
                align-items: center; 
                border-radius: 10px;">

        <h1>View counter: ${counter}</h1>            
        
    </div>
    
</body>
</html>`);
});

app.listen(port, () => {
  console.log(`This app listening on port ${port}`);
});
