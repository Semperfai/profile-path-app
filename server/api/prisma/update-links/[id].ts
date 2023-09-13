import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const res = await prisma.links.update({
    where: { id: Number(event?.context?.params?.id) },
    data: {
      name: body.name,
      url: body.url
    }
  })

  return res
})
