import type { User } from "../types/index.d.ts";

// fetch list of users
export async function GET() {
  // fetch users from database
  // const users = await db.query("SELECT * FROM users");
  const users: User[] = [
    { id: 1, name: "Abe", age: 30 },
    { id: 2, name: "Bob", age: 20 },
  ];

  console.log(`fetch users`);
  return new Response(JSON.stringify(users), { status: 200 });
}

// create a new user
export async function POST(request: Request) {
  const newUser = await request.json();

  // create new user in database
  // const result = await db.query("INSERT INTO users (name, age) VALUES (?, ?)", newUser.name, newUser.age);
  // update id based on result
  newUser.id = 2;

  console.log(`create new user`);
  return new Response(JSON.stringify(newUser), { status: 202 });
}
