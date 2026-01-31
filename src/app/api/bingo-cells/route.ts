import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth";

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  const data = await request.json();
  const { id, text, max, actual, checked, notes, isPrivate } = data;
  console.log(`with text: ${text}, max: ${max}, actual: ${actual}, checked: ${checked}, notes: ${notes}, isPrivate: ${isPrivate}`);
  try {
    const updatedCell = await prisma.cell.update({
      where: { id },
      data: {
        text,
        max,
        actual,
        notes,
        checked,
        isPrivate,
      },
    });
    
    return Response.json(updatedCell);
  } catch (error) {
    return new Response("Error updating cell" + (error instanceof Error ? error.message : ""), { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  const data = await request.json();
  const year = data.year || new Date().getFullYear();
  const bingo = await prisma.bingo.findUnique({
    where: { userId_year: { userId: session.user.id, year } },
  });

  if (!bingo) {
    return new Response("No bingo found", { status: 404 });
  }

  const text = "New !";
  const max = 1;
  const actual = 0;
  const checked = false;
  const notes = "";
  const isPrivate = false;
  const bingoId = bingo.id;
  try {
    const newCell = await prisma.cell.create({
      data: {
        text,
        max,
        actual,
        notes,
        checked,
        isPrivate,
        bingo: { connect: { id: bingoId } },
      },
    });
    return Response.json(newCell);
    // return Response.json(newCell);
  } catch (error) {
    return new Response("Error creating cell" + (error instanceof Error ? error.message : ""), { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  const data = await request.json();
  const { id } = data;
  try {
    await prisma.cell.delete({
      where: { id },
    });
    return new Response("Cell deleted", { status: 200 });
  } catch (error) {
    return new Response("Error deleting cell" + (error instanceof Error ? error.message : ""), { status: 500 });
  }
}