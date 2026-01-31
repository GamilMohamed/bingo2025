import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const url = new URL(request.url);
  const year = parseInt(url.searchParams.get("year") || new Date().getFullYear().toString());

  let bingo = await prisma.bingo.findUnique({
    where: { userId_year: { userId: session.user.id, year } },
    include: { cells: { orderBy: { id: "asc" } } },
  });

  if (!bingo) {
    bingo = await prisma.bingo.create({
      data: {
        user: { connect: { id: session.user.id } },
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
      include: { cells: { orderBy: { id: "asc" } } },
    });
  }

  return Response.json(bingo);
}
