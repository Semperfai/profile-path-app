import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  // const body = await readBody(event)
  // const link = await prisma.links.create({
  //   data: {
  //     userId: body.userId
  //   }
  // })
  // body.links.forEach(async (link) => {
  //   await prisma.linkItem.create({
  //     data: {
  //       linkId: link.id
  //     }
  //   })
  // })
  // return links
})
