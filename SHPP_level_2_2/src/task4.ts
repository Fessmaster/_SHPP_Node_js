//Напишіть функцію, яка повинна за мінімальну кількість запитів
//отримати користувача жінку

// -без async/await;
// -з async/await;

async function getUserWithAsync(): Promise<any> {
  const user = await fetch("https://fakerapi.it/api/v2/persons?_quantity=1");
  return user.json();
}

function getUserWithoutAsync(): Promise<any> {
  const user = fetch("https://fakerapi.it/api/v2/persons?_quantity=1");
  return user;
}

async function getFemaleUserWithAsync() {
  let counter = 0;
  let userName = "";
  while (true) {
    counter++;
    const userData = await getUserWithAsync();
    if (userData.data[0].gender === "female") {
      userName = userData.data[0].firstname + " " + userData.data[0].lastname;
      break;
    }
  }
  const resultText = counter === 1 ? `запит` : `запитів`;

  console.log(`Знадобилось ${counter} ${resultText}, щоб отримати користувача жінку.
    Це ${userName}`);
}

function getFemaleUserWithoutAsync() {
  let counter = 0;
  let userName = "";
  let isUserFemale = false;  

  function makeRequest(): Promise<any> {
    // end of Promise chain
    if (isUserFemale) return Promise.resolve()
    counter++;
    const userData = getUserWithoutAsync();
    return userData
      .then(userResponse => userResponse.json())
      .then(user =>{
        if (user.data[0].gender === "female"){
          userName = user.data[0].firstname + " " + user.data[0].lastname;
          isUserFemale = true;
          printResult();
        } else {
          return makeRequest();
        }
      })   
  }

  function printResult (){
    const resultText = counter === 1 ? `запит` : `запитів`;  
    console.log(`Знадобилось ${counter} ${resultText}, щоб отримати користувача жінку.
    Це ${userName}`)
  }

  return makeRequest()
}

// -без async/await;
getFemaleUserWithoutAsync();

// -з async/await;
// getFemaleUserWithAsync()
