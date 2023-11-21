import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const newUserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  age: z.number().min(0).max(120),
  role: z.enum(["ADMIN", "USER"]),
});

// fetch list of users
export async function GET() {
  // fetch users from database
  const users = await prisma.user.findMany();
  return new Response(JSON.stringify(users), { status: 200 });
}

// create a new user
export async function POST(request: Request) {
  const requestData = await request.json();
  const parsedUser = newUserSchema.parse(requestData);

  const createdUser = await prisma.user.create({
    data: parsedUser,
  });

  if (!createdUser) {
    return new Response(null, { status: 400 });
  }

  return new Response(JSON.stringify(createdUser), { status: 202 });
}

// delete all users
export async function DELETE() {
  await prisma.user.deleteMany();
  return new Response(null, { status: 204 });
}
