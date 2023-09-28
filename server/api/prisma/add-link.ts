import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const res = await prisma.links.create({
    data: {
      userId: body.userId,
      name: body.name,
      url: body.url
    }
  })

  return res
})
