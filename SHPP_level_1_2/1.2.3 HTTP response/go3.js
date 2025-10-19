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


function outputHttpResponse(statusCode, statusMessage, headers, body) {
  const date = new Date().toString();

  console.log(
`HTTP/1.1 ${statusCode} ${statusMessage}
Date: ${date}
Server: Apache/2.2.14 (Win32)
Connection: Closed
Content-Type: text/html; charset=utf-8
Content-Length: ${headers["Content-Length"]}

${body}`);
}

function processHttpRequest($method, $uri, $headers, $body) {
  // ... проаналізувати вхідні дані, обчислити результат
  // та спеціальною командою красиво вивести відповідь
  let sum = "";
  let statusCode;
  let statusMessage;

  if ($method === "GET" && /^\/sum/.test($uri)) {
    if (!/\?nums\=/.test($uri)) {
      statusCode = "400";
      statusMessage = "Bad Request";
    }
    if (/\?nums\=/.test($uri)) {
      const numbers = $uri.match(/[\d,]+/)[0].split(",");
      sum = numbers.reduce((acc, num) => +acc + +num).toString();
      statusCode = "200";
      statusMessage = "OK";
    }
  } else if ($method === "GET" && !/^\/sum/.test($uri)) {
    statusCode = "404";
    statusMessage = "Not Found";
    sum = "not found";
  } else {
    statusCode = "400";
    statusMessage = "Bad Request";
  }

  $headers["Content-Length"] = sum.length;

  outputHttpResponse(statusCode, statusMessage, $headers, sum);
}

function normalize(str) {
  let arr = str.toLowerCase().split("");
  arr[0] = arr[0].toUpperCase();
  if (arr.includes("-")) {
    arr[arr.indexOf("-") + 1] = arr[arr.indexOf("-") + 1].toUpperCase();
  }
  return arr.join("");
}

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
      headers[normalize(line.match(/^[^:]+/)[0])] = line
        .match(/[^:]+$/)[0]
        .trim();
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
// http = parseTcpStringAsHttpRequest(testStr);

http = parseTcpStringAsHttpRequest(contents);
processHttpRequest(http.method, http.uri, http.headers, http.body);
