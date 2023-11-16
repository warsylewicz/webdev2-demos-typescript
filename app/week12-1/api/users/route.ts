import { sql } from "@vercel/postgres";

// fetch list of users
export async function GET() {
  // fetch users from database
  const { rows } = await sql`SELECT * FROM users`;

  console.log(`fetch ${rows.length} users`);
  return new Response(JSON.stringify(rows), { status: 200 });
}

// create a new user
export async function POST(request: Request) {
  const newUser = await request.json();

  // create new user in database
  const { rows } =
    await sql`INSERT INTO users (name, age) VALUES (${newUser.name}, ${newUser.age}) RETURNING *`;
  const user = rows[0];

  console.log(`create new user`);
  return new Response(JSON.stringify(user), { status: 202 });
}

// delete all users
export async function DELETE() {
  // delete all users from database
  const result = await sql`DELETE FROM users`;

  console.log(`delete all users`);
  return new Response(null, { status: 204 });
}
