import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const userSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  age: z.number().min(0).max(120),
  role: z.enum(["ADMIN", "USER"]),
});

const patchUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  age: z.number().min(0).max(120).optional(),
  role: z.enum(["ADMIN", "USER"]).optional(),
});

// fetch one user
export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const id: number = Number(params.id);

  const user = await prisma.user.findUnique({ where: { id } });

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

  const id: number = Number(params.id);

  const updatedUser = await prisma.user.update({
    where: { id },
    data: parsedUser,
  });

  return new Response(null, { status: 204 });
}

// update partial information of a user
export async function PATCH(
  request: Request,
  { params }: { params: { id: number } }
) {
  const requestData = await request.json();
  const parsedUser = patchUserSchema.parse(requestData);

  const id = Number(params.id);

  const updatedUser = await prisma.user.update({
    where: { id },
    data: parsedUser,
  });

  return new Response(null, { status: 204 });
}

// delete a user
export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  const id = Number(params.id);

  const deletedUser = await prisma.user.delete({ where: { id } });

  return new Response(null, { status: 204 });
}
