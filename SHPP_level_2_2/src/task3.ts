const URL = "https://fakerapi.it/api/v2/users?_quantity=1&_locale=uk_UA";

//a. Використайте async/await + Promise.all

async function getUserWithAsync(): Promise<any> {
  const user = await fetch(URL);
  return user.json();
}

function getUserWithoutAsync(): Promise<any> {
  const user = fetch(URL);
  return user;
}

async function getAllUsersWithPromiseAll() {
  const usersData = [
    getUserWithAsync(),
    getUserWithAsync(),
    getUserWithAsync(),
  ];
  const users = await Promise.all(usersData);
  console.log("\n--=Використання async/await + Promise.all=--");
  for (const user of users) {
    const firstName = user.data[0].firstname;
    const lastName = user.data[0].lastname;
    console.log(`Користувач: ${firstName} ${lastName}`);
  }
}

//b. Використайте async/await але без Promise.all

async function getAllUsersWithoutPromiseAll() {
  const usersData = [
    getUserWithAsync(),
    getUserWithAsync(),
    getUserWithAsync(),
  ];
  console.log("\n--=Використання async/await але без Promise.all=--");
  for (const userData of usersData) {
    const user = await userData;
    const firstName = user.data[0].firstname;
    const lastName = user.data[0].lastname;
    console.log(`Користувач: ${firstName} ${lastName}`);
  }
}

//c. Скористуйтеся виключно промісами,
// без async/await, без Promise.all .... це може бути досить важко

function getAllUsersWithOnlyPromise() {
  console.log("\n--=Використання виключно промісамів=--");
  const usersData = [
    getUserWithoutAsync(),
    getUserWithoutAsync(),
    getUserWithoutAsync()   
  ];
  for (const user of usersData) {
    user
    .then(userResponse => userResponse.json())
    .then((user) => {
      const firstName = user.data[0].firstname;
      const lastName = user.data[0].lastname;
      console.log(`Користувач: ${firstName} ${lastName}`);
    });
  }
}

//a.
// getAllUsersWithPromiseAll();
//b.
// getAllUsersWithoutPromiseAll();
//c.
getAllUsersWithOnlyPromise();
