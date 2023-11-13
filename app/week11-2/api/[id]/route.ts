import type { User } from "../../types/index.d.ts";

// fetch one user
export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const id = params.id;

  // fetch user from database
  // const users = await db.query("SELECT * FROM users where id = ?", id);
  const users: User[] = [
    { id: 1, name: "Abe", age: 30 },
    { id: 2, name: "Bob", age: 20 },
  ];
  const user = users.find((user) => user.id === id);

  console.log(`fetch user ${id}`);
  return new Response(JSON.stringify(users), { status: 200 });
}

// update all the information of a user
export async function PUT(
  request: Request,
  { params }: { params: { id: number } }
) {
  const newUser = await request.json();

  const id = params.id;

  // update user in database
  // const result = await db.query("UPDATE users SET name = ?, age = ? WHERE id = ?", newUser.name, newUser.age, id);

  console.log(`(full) update user ${id}`);
  return new Response(null, { status: 204 });
}

// update partial information of a user
export async function PATCH(
  request: Request,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  const newUser = await request.json();

  if (newUser.name) {
    // update name in database
    // const result = await db.query("UPDATE users SET name = ? WHERE id = ?", newUser.name, id);
  }

  if (newUser.age) {
    // update age in database
    // const result = await db.query("UPDATE users SET age = ? WHERE id = ?", newUser.age, newUser.id);
  }

  console.log(`(partial) update user ${id}`);
  return new Response(null, { status: 204 });
}

// delete a user
export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  const id = params.id;

  // delete user in database
  // const result = await db.query("DELETE FROM users WHERE id = ?", newUser.id);

  console.log(`delete user ${id}`);
  return new Response(null, { status: 204 });
}
