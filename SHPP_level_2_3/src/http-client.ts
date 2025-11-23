const SERVER = "http://192.168.0.130:3000/"
const msg = "Message to server"

async function sendHTTPRequest() {
  const startTime = new Date();  
  const response = await fetch(SERVER, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(msg),
  });

  const res = await response.json();
  const endTime = new Date();
  console.log(
    `Очікування відповіді: ${endTime.getTime() - startTime.getTime()} ms`
  );
  console.log(res.message);
  
}

sendHTTPRequest()