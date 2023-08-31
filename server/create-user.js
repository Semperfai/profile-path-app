import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const user = await prisma.users.create({
    data: {
      userId: body.userId,
      stripeId: body.stripeId,
      name: body.name,
      address: body.address,
      zipcode: body.zipcode,
      city: body.city,
      country: body.country
    }
  })

  return user
})
