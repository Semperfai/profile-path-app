import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  if (event?.context?.params?.id) {
    const res = await prisma.users.findFirst({
      where: { userId: event.context.params.id }
    })

    return res
  }
})
