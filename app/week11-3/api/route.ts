// Problem: we don't know the shape of the request body

// Solution: use zod to validate the request body
import { z } from "zod";

const newUserSchema = z.object({
  name: z.string(),
  age: z.number().min(0).max(100),
});

// create a new user
export async function POST(request: Request) {
  const newUserData = await request.json();

  // validate the request body
  const newUser = newUserSchema.parse(newUserData);

  // create new user in database
  // ...
  newUserData.id = 2;

  console.log(`create new user`);
  return new Response(JSON.stringify(newUser), { status: 202 });
}
