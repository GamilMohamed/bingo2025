"use server";
import type React from "react";
import { BingoCell } from "./BingoCell";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import { BingoWithCells } from "@/lib/prisma";
import SwitchTheme from "./SwitchTheme";
import { HelpButton } from "./HelpButton";
import ShareButton from "./ShareButton";

export async function BingoBoard({ bingo, isfirsttime }: { bingo: BingoWithCells, isfirsttime: boolean }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }

  const cells = Array.from({ length: 25 }, (_, i) => (
    <BingoCell key={i} index={i} id={bingo.cells[i].id} cell={bingo.cells[i]} />
  ));


  let username = session.user?.name.split(" ")[0];
  username = username[0].toUpperCase() + username.slice(1);

  const title =
    "BINGO d" +
    ("aeiouy".includes(username[0].toLowerCase()) ? "'" : "e ") +
    username;
  return (
    <div className="container mx-auto px-4 py-8 z-1">
      <div className="bottom-5 z-50 right-5 fixed flex-col flex justify-center items-center">
        <HelpButton isFirstTime={isfirsttime}  />
        <ShareButton userId={session.user.id} content={bingo.id} />
        <form method="post" action="/api/auth/signout">
          <Button type="submit">
            <LogOutIcon />
          </Button>
        </form>
      </div>
      <h1 className="text-6xl font-bold text-center mb-4 text-[#9BC6B9]">
        {title}
      </h1>
      <div className="flex justify-center items-center mb-4">
        <h2 className="text-3xl font-bold text-center text-[#9BC6B9]">
          25 CHOSES À FAIRE EN 2025
        </h2>
        <SwitchTheme />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {cells}
      </div>
    </div>
  );
}
