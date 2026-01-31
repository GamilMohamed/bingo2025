"use client";
import { Button } from "./ui/button";

export function YearSelector({
  currentYear,
  availableYears,
  onSwitch,
}: {
  currentYear: number;
  availableYears: number[];
  onSwitch: (year: number) => void;
}) {
  return (
    <div className="flex gap-2 justify-center">
      {availableYears.map((year) => (
        <Button
          key={year}
          variant={currentYear === year ? "default" : "outline"}
          className="active:scale-95 transition-all duration-200"
          onClick={() => onSwitch(year)}
        >
          {year}
        </Button>
      ))}
    </div>
  );
}
