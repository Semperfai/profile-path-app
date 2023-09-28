import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const res = await prisma.links.delete({
    where: { id: Number(event?.context?.params?.id) }
  })

  return res
})
