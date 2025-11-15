// 1.

function getFirstWord(a: string): number {
  const firstWord = a.split(/ +/)[0] ?? "";
  return firstWord.length;
}

// 2.
type Naming = {
  name: string;
  surname: string;
};

function getUserNamings(a: Naming) {
  return {
    fullname: a.name + " " + a.surname,
    initials: a.name[0] + "." + a.surname[0],
  };
}

// 3.

// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>
type Product = {
  name: string;
};
type Products = {
  products: Product[];
};
function getAllProductNames(a: Products) {
  return a?.products?.map((prod) => prod?.name) || [];
}

// 4.1

// easy way is using 'as' keyword
// hard way is ?...

type Hey = {
  name: () => string;
  cuteness?: number;
  coolness?: number;
};

function hey(a: Hey) {
  return "hey! i'm " + a.name();
}
hey({ name: () => "roma", cuteness: 100 });
hey({ name: () => "vasya", coolness: 100 });

// 5.

type SomeType = Record<string, string>;

// google for Record type
function stringEntries(a: SomeType | string[]) {
  return Array.isArray(a) ? a : Object.keys(a);
}

// 6.

// you don't know Promises and async/await yet. Or do you?
// ....can be hard, don't worry and SKIP if you do not know how to do it


async function world(a:number): Promise<string> {
  return "*".repeat(a);
}
const hello = async (): Promise<string> => {
  return await world(10);
};
hello()
  .then((r) => console.log(r))
  .catch((e) => console.log("fail"));
