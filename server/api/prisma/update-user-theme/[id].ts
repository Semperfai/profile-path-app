import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const res = await prisma.users.update({
    where: { id: Number(event?.context?.params?.id) },
    data: {
      theme_id: body.theme_id
    }
  })

  return res
})
