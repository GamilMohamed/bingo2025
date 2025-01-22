import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth";

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await request.json();
  const { id, text, max, actual, checked, notes } = data;

  try {
    const updatedCell = await prisma.cell.update({
      where: { id },
      data: {
        text,
        max,
        actual,
        notes,
        checked,
      },
    });
    
    return Response.json(updatedCell);
  } catch (error) {
    return new Response("Error updating cell" + (error instanceof Error ? error.message : ""), { status: 500 });
  }
}