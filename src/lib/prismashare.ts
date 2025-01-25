"use server"
import { PrismaClient } from '@prisma/client'
import { addDays } from 'date-fns'

const prisma = new PrismaClient()

export async function createShare(userId: string, content: string, expirationDays: number = 7) {
  return prisma.share.create({
    data: {
      userId,
      content,
      expiresAt: addDays(new Date(), expirationDays),
      isActive: true
    }
  })
}

export async function getShareById(shareId: string) {
  const share = await prisma.share.findUnique({
    where: {
      id: shareId,
      isActive: true,
      expiresAt: { gt: new Date() }
    }
  })

  // get user by share.userId
  const user = await prisma.user.findUnique({
    where: {
      id: share?.userId
    },
    include: {
      bingo: {
        include: {
          cells: {
            orderBy: {
              id: 'asc'
            },
            where: {
              isPrivate: false
            }
          }
        }
      }
    }
  })

  if (!user) {
    return null
  }

  if (!user.bingo) {
    return null
  }

  return user?.bingo.cells
}

export async function deactivateExpiredShares() {
  await prisma.share.updateMany({
    where: {
      expiresAt: { lt: new Date() }
    },
    data: {
      isActive: false
    }
  })
}