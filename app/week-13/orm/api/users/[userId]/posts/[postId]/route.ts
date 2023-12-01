import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// fetch one post for a user
export async function GET(
  request: Request,
  { params }: { params: { userId: number; postId: number } }
) {
  const userId: number = Number(params.userId);
  const postId: number = Number(params.postId);

  const post = await prisma.post.findUnique({
    where: { id: postId, authorId: userId },
  });

  if (!post) {
    return new Response(null, { status: 404 });
  }

  return new Response(JSON.stringify(post), { status: 200 });
}
