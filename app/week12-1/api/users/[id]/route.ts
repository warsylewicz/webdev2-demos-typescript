import { sql } from "@vercel/postgres";
import { z } from "zod";

const userSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  age: z.number().min(0).max(120),
  role: z.enum(["admin", "user"]),
});

const patchUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  age: z.number().min(0).max(120).optional(),
  role: z.enum(["admin", "user"]).optional(),
});

// fetch one user
export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const id: number = Number(params.id);

  const result = await sql`SELECT * FROM users where id = ${id}`;
  const user = result.rows[0];

  if (!user) {
    return new Response(null, { status: 404 });
  }

  return new Response(JSON.stringify(user), { status: 200 });
}

// update all the information of a user
export async function PUT(
  request: Request,
  { params }: { params: { id: number } }
) {
  const userData = await request.json();
  const user = userSchema.parse(userData);

  const id: number = Number(params.id);

  // update user in database
  const result =
    await sql`UPDATE users SET email = ${user.email}, name = ${user.name}, age = ${user.age}, role = ${user.role} WHERE id = ${id}`;
  return new Response(null, { status: 204 });
}

// update partial information of a user
export async function PATCH(
  request: Request,
  { params }: { params: { id: number } }
) {
  const id = Number(params.id);
  const userData = await request.json();

  // validate user data
  const user = patchUserSchema.parse(userData);

  if (user.email) {
    const result =
      await sql`UPDATE users SET email = ${user.email} WHERE id = ${id}`;
  }

  // not super efficient because we are updating the database twice
  if (user.name) {
    const result =
      await sql`UPDATE users SET name = ${user.name} WHERE id = ${id}`;
  }

  if (user.age) {
    const result =
      await sql`UPDATE users SET age = ${user.age} WHERE id = ${id}`;
  }

  if (user.role) {
    const result =
      await sql`UPDATE users SET role = ${user.role} WHERE id = ${id}`;
  }

  return new Response(null, { status: 204 });
}

// delete a user
export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  const id = Number(params.id);

  // delete user in database
  const result = await sql`DELETE FROM users WHERE id = ${id}`;
  return new Response(null, { status: 204 });
}
