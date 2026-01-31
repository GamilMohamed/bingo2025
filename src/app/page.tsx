import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BingoBoardClient from "@/components/BingoBoardClient";

async function createInitialBingo(userId: string, year: number) {
  const bingo = await prisma.bingo.create({
    data: {
      user: { connect: { id: userId } },
      year,
      cells: {
        createMany: {
          data: Array.from({ length: 25 }, (_, i) => ({
            text: `Case ${i + 1}`,
            max: 1,
            actual: 0,
            notes: "",
            checked: false,
            isPrivate: true,
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

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  let isfirstime = false;
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");

  const sp = await searchParams;
  const year = sp.year ? parseInt(sp.year) : new Date().getFullYear();

  let bingo = await prisma.bingo.findUnique({
    where: { userId_year: { userId: session.user.id, year } },
    include: {
      cells: {
        orderBy: { id: 'asc' },
      },
    },
  });

  if (!bingo) {
    isfirstime = true;
    bingo = await createInitialBingo(session.user.id, year);
  }

  const availableYears = Array.from({ length: new Date().getFullYear() - 2024 }, (_, i) => 2025 + i);

  return (
    <main>
      <BingoBoardClient
        initialBingo={bingo}
        initialYear={year}
        userId={session.user.id}
        userName={session.user.name || ""}
        isfirsttime={isfirstime}
        availableYears={availableYears}
      />
    </main>
  );
}