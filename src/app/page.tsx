import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BingoBoard } from "@/components/BingoBoard";

async function createInitialBingo(userId: string) {
  const bingo = await prisma.bingo.create({
    data: {
      user: { connect: { id: userId } },
      cells: {
        createMany: {
          data: Array.from({ length: 25 }, (_, i) => ({
            text: `Case ${i + 1}`,
            max: 1,
            actual: 0,
            checked: false,
          })),
        },
      },
    },
    include: {
      cells: {
        orderBy: { id: 'asc' },
      },
    },
  });

  return bingo;
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");

  let bingo = await prisma.bingo.findUnique({
    where: { userId: session.user.id },
    include: {
      cells: {
        orderBy: { id: 'asc' },
      },
    },
  });

  if (!bingo) {
    bingo = await createInitialBingo(session.user.id);
  }

  return (
    <main>
      <BingoBoard bingo={bingo} />
    </main>
  );
}