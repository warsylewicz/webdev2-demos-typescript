import { connect } from "@planetscale/database";
import { z } from "zod";

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

const userSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  age: z.number().min(0).max(120),
  role: z.enum(["ADMIN", "USER"]),
});

// fetch one user
export async function GET(
  request: Request,
  { params }: { params: { id: number | string } }
) {
  const conn = connect(config);

  // if id is "raw", return raw database result
  // this is useful for debugging and testing
  if (typeof params.id === "string" && params.id === "raw") {
    const result = await conn.execute("SELECT * FROM users;");
    return new Response(JSON.stringify(result), { status: 200 });
  }

  const id = Number(params.id);
  const { rows } = await conn.execute("SELECT * FROM users WHERE id = ?;", [
    id,
  ]);
  const user = rows[0];

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
  const requestData = await request.json();
  const parsedUser = userSchema.parse(requestData);

  const conn = connect(config);
  const { rowsAffected } = await conn.execute(
    "UPDATE users SET email = ?, name = ?, age = ?, role = ? WHERE id = ?;",
    [
      parsedUser.email,
      parsedUser.name,
      parsedUser.age,
      parsedUser.role,
      params.id,
    ]
  );

  if (rowsAffected === 0) {
    return new Response(null, { status: 404 });
  }

  return new Response(null, { status: 204 });
}

// delete a user
export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  const conn = connect(config);
  const { rowsAffected } = await conn.execute(
    "DELETE FROM users WHERE id = ?;",
    [params.id]
  );

  if (rowsAffected === 0) {
    return new Response(null, { status: 404 });
  }

  return new Response(null, { status: 204 });
}
