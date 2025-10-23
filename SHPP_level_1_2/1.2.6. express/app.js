const { upperPart, bottomPart } = require("./page_template.js");
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
  return res.send(`
    ${upperPart}
        <h1><a href="/hello">View counter</a> <br><br>
        <a href="/sum?first=5&second=3">Sum of: 5 + 3</a></h1>
    ${bottomPart}`);
})

app.get("/hello", (req, res) => {
  counter = parseInt(counter) + 1;
  fs.writeFileSync(filePath, counter.toString());
  return res.send(`
    ${upperPart}
        <h1>View counter: ${counter}</h1>        
    ${bottomPart}`);
});

app.get("/sum", (request, response) => {
  const {
    query:{first, second} 
  } = request;
  if (isNaN(parseInt(first))||isNaN(parseInt(second))){
    return response.status(400).send(`
      ${upperPart}
      <h1>One of the values is not a number</h1>
      ${bottomPart}`)
  }
  return response.status(200).send(`
    ${upperPart}
    <h1>${first} + ${second} = ${parseInt(first)+parseInt(second)}</h1>
    ${bottomPart}`)
})

app.listen(port, () => {
  console.log(`This app listening on port ${port}`);
});
