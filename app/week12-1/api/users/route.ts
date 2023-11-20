import { sql } from "@vercel/postgres";
import { z } from "zod";

const newUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number().min(0).max(120),
  role: z.enum(["admin", "user"]),
});

// fetch list of users
export async function GET() {
  // fetch users from database
  const { rows } = await sql`SELECT * FROM users`;

  console.log(`fetch ${rows.length} users`);
  return new Response(JSON.stringify(rows), { status: 200 });
}

// create a new user
export async function POST(request: Request) {
  const newUserData = await request.json();

  // validate user data
  const newUser = newUserSchema.parse(newUserData);

  // create new user in database
  const { rows } =
    await sql`INSERT INTO users (email, name, age, role) VALUES (${newUser.email}, ${newUser.name}, ${newUser.age}, ${newUser.role}) RETURNING *`;
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
