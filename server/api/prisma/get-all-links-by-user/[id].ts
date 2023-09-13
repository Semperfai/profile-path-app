import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  let links = await prisma.links.findMany({
    where: { userId: event?.context?.params?.userId },
    orderBy: { id: 'desc' }
  })
  return links
})
