"use server";
import type React from "react"
import { BingoCell } from "./BingoCell"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import { BingoWithCells } from "@/lib/prisma";


export async function BingoBoard({ bingo }: { bingo: BingoWithCells }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const cells = Array.from({ length: 25 }, (_, i) => <BingoCell key={i} index={i}
    id={bingo.cells[i].id}
    cell={bingo.cells[i]}
  />)

  return (
    <div className="container mx-auto px-4 py-8">
      <form method="post" action="/api/auth/signout">
        <Button className="bottom-5 right-5 fixed" type="submit"><LogOutIcon/></Button>
      </form>
      <h1 className="text-6xl font-bold text-center mb-4 text-[#9BC6B9]">BINGO de {session.user?.name.split(' ')[0]}</h1>
      <h2 className="text-3xl font-bold text-center mb-4 text-[#9BC6B9]">25 CHOSES À FAIRE EN 2025</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">{cells}</div>
    </div>
  )
}

