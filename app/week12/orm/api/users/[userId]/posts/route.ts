import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const newPostSchema = z.object({
  title: z.string(),
  content: z.string(),
});

// fetch list of posts for a user
export async function GET(
  request: Request,
  { params }: { params: { userId: number } }
) {
  // fetch users from database
  const userId = Number(params.userId);
  const posts = await prisma.user.findUnique({
    where: { id: userId },
    include: { posts: true },
  });

  // or: const posts = await prisma.post.findMany({ where: { authorId: userId } });
  // or: const posts = await prisma.user.findUnique({ where: { id: userId } }).posts();
  return new Response(JSON.stringify(posts), { status: 200 });
}

// create a new post for a user
export async function POST(
  request: Request,
  { params }: { params: { userId: number } }
) {
  const requestData = await request.json();
  const parsedPost = newPostSchema.parse(requestData);
  const userId = Number(params.userId);

  const createdPost = await prisma.post.create({
    data: {
      title: parsedPost.title,
      content: parsedPost.content,
      author: { connect: { id: userId } },
    },
  });

  if (!createdPost) {
    return new Response(null, { status: 400 });
  }

  return new Response(JSON.stringify(createdPost), { status: 202 });
}

// delete all posts for a user
export async function DELETE(
  request: Request,
  { params }: { params: { userId: number } }
) {
  const userId = Number(params.userId);
  await prisma.post.deleteMany({
    where: { authorId: userId },
  });

  return new Response(null, { status: 204 });
}
