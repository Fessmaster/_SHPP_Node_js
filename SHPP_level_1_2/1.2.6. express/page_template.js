const upperPart =  `<!DOCTYPE html>
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
                border-radius: 10px;
                gap: 20px;">`

const bottomPart = `</div></body></html>` 

module.exports = { upperPart, bottomPart };