// цей файл потрібно буде дописати...

// не звертайте увагу на цю функцію
// вона потрібна для того, щоб коректно зчитувати вхідні данні
function readHttpLikeInput() {
  var fs = require("fs");
  var res = "";
  var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
  let was10 = 0;
  for (;;) {
    try {
      fs.readSync(0 /*stdin fd*/, buffer, 0, 1);
    } catch (e) {
      break; /* windows */
    }
    if (buffer[0] === 10 || buffer[0] === 13) {
      if (was10 > 10) break;
      was10++;
    } else was10 = 0;
    res += new String(buffer);
  }

  return res;
}

let contents = readHttpLikeInput();


function normalize (str){
  let arr = str.toLowerCase().split('')
  arr[0] = arr[0].toUpperCase()
  if (arr.includes("-")){
    arr[arr.indexOf("-")+1] = arr[arr.indexOf("-")+1].toUpperCase()
  }
  return arr.join("")
}


// ось цю функцію, власне, і треба написати
function parseTcpStringAsHttpRequest(string) {
  let method = "";
  let uri = "";
  let headers = {};
  let body = "";
  const arr = string.split("\n");
  for (line of arr) {
    if (/GET|POST/.test(line)) {
      method = line.match(/GET|POST/)[0];
      if (/\/[^\s]+/.test(line)) {        
        uri = line.match(/\/[^\s]+/)[0];
      }
    } else if (/^.+\:/.test(line)) {
      headers[normalize(line.match(/^[^:]+/)[0])] = line.match(/[^:]+$/)[0].trim();
    } else {
      if (line.length !== 0) {
        body = line;
      }
    }
  }


  return {
    method,
    uri,
    headers,
    body,
  };
}


http = parseTcpStringAsHttpRequest(contents);
console.log(JSON.stringify(http, undefined));
console.log(JSON.stringify(http, undefined, 2));
