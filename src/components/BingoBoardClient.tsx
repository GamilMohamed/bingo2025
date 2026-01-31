"use client";
import { useState, useCallback } from "react";
import { BingoCell } from "./BingoCell";
import { YearSelector } from "./YearSelector";
import ShareButton from "./ShareButton";
import { AddCell } from "./AddCell";
import { HelpButton } from "./HelpButton";
import SwitchTheme from "./SwitchTheme";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";

interface CellData {
  id: number;
  text: string;
  max: number;
  actual: number;
  checked: boolean;
  notes: string;
  isPrivate: boolean;
}

interface BingoData {
  id: string;
  year: number;
  cells: CellData[];
}

const YEAR_TINTS: Record<number, string> = {
  2025: "rgba(155, 198, 185, 0.15)",
  2026: "rgba(217, 123, 150, 0.15)",
};

export default function BingoBoardClient({
  initialBingo,
  initialYear,
  userId,
  userName,
  isfirsttime,
  availableYears,
}: {
  initialBingo: BingoData;
  initialYear: number;
  userId: string;
  userName: string;
  isfirsttime: boolean;
  availableYears: number[];
}) {
  const [bingo, setBingo] = useState<BingoData>(initialBingo);
  const [year, setYear] = useState(initialYear);
  const [isExiting, setIsExiting] = useState(false);
  const [switchCount, setSwitchCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const switchYear = useCallback(
    async (newYear: number) => {
      if (newYear === year || isLoading) return;
      setIsLoading(true);
      setIsExiting(true);

      // fetch runs in parallel with the exit animation
      const fetchPromise = fetch(`/api/bingo?year=${newYear}`).then((r) => r.json());
      await new Promise((r) => setTimeout(r, 250));
      const data = await fetchPromise;

      setBingo(data);
      setYear(newYear);
      setSwitchCount((c) => c + 1);
      setIsExiting(false);
      setIsLoading(false);
    },
    [year, isLoading]
  );

  const handleCellAdded = useCallback(async () => {
    const res = await fetch(`/api/bingo?year=${year}`);
    const data = await res.json();
    setBingo(data);
  }, [year]);

  let username = userName?.split(" ")[0] || "";
  username = username.charAt(0).toUpperCase() + username.slice(1);
  const title =
    "BINGO d" +
    ("aeiouy".includes((username[0] || "").toLowerCase()) ? "'" : "e ") +
    username;

  return (
    <div className={`min-h-screen bg-background text-foreground ${year === 2025 ? "year-2025" : ""}`}>
      {/* ambient year-color tint behind content */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundColor: YEAR_TINTS[year] || YEAR_TINTS[2026],
          transition: "background-color 600ms ease",
        }}
      />
    <div className="container mx-auto px-4 py-8 relative z-[1]">
      <div className="bottom-5 z-50 right-5 fixed flex-col flex justify-center items-center gap-2">
        <HelpButton isFirstTime={isfirsttime} year={year} />
        <ShareButton userId={userId} content={bingo.id} />
        <AddCell year={year} onCellAdded={handleCellAdded} />
        <form method="post" action="/api/auth/signout">
          <Button type="submit">
            <LogOutIcon />
          </Button>
        </form>
      </div>
      <h1 className="text-6xl font-bold text-center mb-4 text-primary">
        {title}
      </h1>
      <div className="flex justify-center mb-4">
        <YearSelector
          currentYear={year}
          availableYears={availableYears}
          onSwitch={switchYear}
        />
      </div>
      <div className="flex justify-center items-center mb-4">
        <h2 className="text-3xl font-bold text-center text-primary">
          {bingo.cells.length} CHOSES À FAIRE EN {year}
        </h2>
        <SwitchTheme />
      </div>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 ${
          isExiting ? "exiting-grid" : ""
        }`}
        id="bingo-grid"
        key={switchCount}
      >
        {bingo.cells.map((cell, index) => (
          <BingoCell
            key={cell.id}
            index={index}
            id={cell.id}
            cell={cell}
            animate={switchCount > 0}
          />
        ))}
      </div>
    </div>
    </div>
  );
}
