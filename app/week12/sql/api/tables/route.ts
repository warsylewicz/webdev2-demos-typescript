import "dotenv/config";
import { connect } from "@planetscale/database";

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

export async function POST() {
  try {
    const conn = connect(config);
    const result = await conn.execute(
      "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(100), name VARCHAR(100), age INT, role VARCHAR(10));"
    );

    return Response.json({ result }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const conn = connect(config);
    const result = await conn.execute(`DROP TABLE users;`);
    return Response.json({ result }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
