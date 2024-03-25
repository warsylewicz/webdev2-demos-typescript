function add(a: number, b: number): number {
  return a + b;
}

const answer = add(1, 2);

console.log(answer); // 3

// const answer2 = add("hello ", "world");
// console.log(answer2); // hello world

// const answer2 = add("hello ", "world");
// console.log(answer2);
// hello world

// implicitly typed
const str = "hello";
const num = 1;
const bool = true;
let a: string;

interface User {
  name: string;
  age: number;
  address?: string;
}

const obj: User = {
  name: "Jack",
  age: 32,
  address: "calgary",
};
