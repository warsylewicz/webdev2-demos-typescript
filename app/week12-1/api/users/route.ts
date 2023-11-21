import { connect } from "@planetscale/database";
import { z } from "zod";

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

const newUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number().min(0).max(120),
  role: z.enum(["admin", "user"]),
});

// fetch list of users
export async function GET() {
  const conn = connect(config);
  const { rows } = await conn.execute("SELECT * FROM users;");
  return new Response(JSON.stringify(rows), { status: 200 });
}

// create a new user
export async function POST(request: Request) {
  const requestData = await request.json();
  const parsedUser = newUserSchema.parse(requestData);

  const conn = connect(config);
  const { insertId } = await conn.execute(
    "INSERT INTO users (email, name, age, role) VALUES (?, ?, ?, ?);",
    [parsedUser.email, parsedUser.name, parsedUser.age, parsedUser.role]
  );

  const user = {
    id: insertId,
    ...parsedUser,
  };

  return new Response(JSON.stringify(user), { status: 201 });
}

// delete all users
export async function DELETE() {
  const conn = connect(config);
  await conn.execute("DELETE FROM users;");
  return new Response(null, { status: 204 });
}
