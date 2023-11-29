import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// fetch one post for a user
export async function GET(
  request: Request,
  { params }: { params: { userId: number; postId: number } }
) {
  const userId: number = Number(params.userId);
  const postId: number = Number(params.postId);

  const user = await prisma.post.findUnique({
    where: { id: postId, authorId: userId },
  });

  if (!user) {
    return new Response(null, { status: 404 });
  }

  return new Response(JSON.stringify(user), { status: 200 });
}
