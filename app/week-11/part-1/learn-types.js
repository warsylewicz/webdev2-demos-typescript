function add(a, b) {
  return a + b;
}

const answer = add(1, 2);

console.log(answer);
// 3

// const answer2 = add("hello ", "world");
// console.log(answer2);
// hello world

const str = "hello";
const num = 1;
const bool = true;

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
