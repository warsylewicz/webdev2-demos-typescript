import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const result =
      await sql`CREATE TABLE Users ( id SERIAL PRIMARY KEY, name VARCHAR(100), age INTEGER);`;
    return Response.json({ result }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const result = await sql`DROP TABLE Users;`;
    return Response.json({ result }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
