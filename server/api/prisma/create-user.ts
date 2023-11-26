import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const user = await prisma.users.create({
    data: {
      userId: body.userId,
      name: body.name,
      email: body.email,
      created_at: body.created_at,
    },
  });

  return user;
});
