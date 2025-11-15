type Cat = {
  name: () => string;
  type: "cat"
  cuteness:number;  
}

type Dog= {
  name: () => string;
  type: "dog"
  coolness:number;  
}

function hey(a: Cat | Dog) {
  return (
    "hey! i'm " +
    a.name() +
    (a.type === "cat" ? "cuteness: " + a.cuteness : "coolness: " + a.coolness)
  );
}
hey({ name: () => "roma", type: "cat", cuteness: 100 });
hey({ name: () => "vasya", type: "dog", coolness: 100 });
