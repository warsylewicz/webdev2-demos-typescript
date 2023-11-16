import { sql } from "@vercel/postgres";

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
  const user = await request.json();
  const id: number = Number(params.id);

  // update user in database
  const result =
    await sql`UPDATE users SET name = ${user.name}, age = ${user.age} WHERE id = ${id}`;
  return new Response(null, { status: 204 });
}

// update partial information of a user
export async function PATCH(
  request: Request,
  { params }: { params: { id: number } }
) {
  const id = Number(params.id);
  const user = await request.json();

  // not super efficient because we are updating the database twice
  if (user.name) {
    // update name in database
    const result =
      await sql`UPDATE users SET name = ${user.name} WHERE id = ${id}`;
  }

  if (user.age) {
    // update age in database
    const result =
      await sql`UPDATE users SET age = ${user.age} WHERE id = ${id}`;
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
