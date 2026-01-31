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

  if (!share) {
    return null
  }

  const bingo = await prisma.bingo.findUnique({
    where: { id: share.content },
    include: {
      cells: {
        orderBy: { id: 'asc' },
        where: { isPrivate: false }
      },
      user: true
    }
  })

  if (!bingo || !bingo.user) {
    return null
  }

  return {
    cells: bingo.cells,
    name: bingo.user.name,
    year: bingo.year
  }
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