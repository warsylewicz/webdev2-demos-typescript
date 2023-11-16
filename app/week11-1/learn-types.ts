function add(a: number, b: number) {
  return a + b;
}

const answer = add(3, 4);

// const answer2 = add("foo", "bar");
// console.log(answer2); // foobar

// const answer3 = add(3, "3");

//

let a = 5;
let b = 6;
let str = "foo";
let bool = true;

interface Person {
  name: string;
  age: number;
  address?: string;
}

let person: Person = {
  name: "John",
  age: 30,
};

person.address = "foo";
