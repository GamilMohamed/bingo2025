"use client";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PencilIcon, CheckIcon, PlusIcon, MinusIcon } from "lucide-react";
import { Card } from "./ui/card";

interface BingoCellProps {
  index: number;
  initialGoal?: string;
  initialMax?: number;
}

export const BingoCell: React.FC<BingoCellProps> = ({
  index,
  initialGoal = "",
  initialMax = 1,
}) => {
  const [goal, setGoal] = useState(initialGoal);
  const [count, setCount] = useState(0);
  const [max, setMax] = useState(initialMax);
  const [isEditMode, setIsEditMode] = useState(false);

  const increment = () => {
    if (count < max) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const isComplete = count === max;

  return (
    <Card
      className={`aspect-square p-4 relative flex flex-col ${
        isComplete ? "bg-[#9BC6B9]" : "bg-white"
      }`}
    >
      <div className="flex-grow mb-2 justify-center items-center flex bg-redx-400">
        {isEditMode ? (
          <Input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Enter goal"
            className="w-full mb-2 h-full"
            aria-label={`Goal for cell ${index + 1}`}
          />
        ) : (
          <p className="overflow-auto h-full bg-bluxe-300 flex justify-center items-center w-full">
            {goal}
          </p>
        )}
      </div>

      <div className="flex justify-between items-center mb-2">
        {isEditMode ? (
          <>
            <Input
              type="number"
              value={count}
              onChange={(e) => setCount(Number.parseInt(e.target.value) || 0)}
              className="w-16 text-center"
              min="0"
              max={max}
              aria-label={`Current value for cell ${index + 1}`}
            />
            <span>/</span>
            <Input
              type="number"
              value={max}
              onChange={(e) => setMax(Number.parseInt(e.target.value) || 1)}
              className="w-16 text-center"
              min="1"
              aria-label={`Maximum value for cell ${index + 1}`}
            />
          </>
        ) : (
          <>
            {isComplete ? (
              ""
            ) : (
              <>
                {max == 1 ? (
                  <Button
                    onClick={increment}
                    disabled={isComplete}
                    size="sm"
                    variant="outline"
                    className={`${isComplete ? "none" : "bg-redx-400 w-1/2"}`}
                  >
                    {!isComplete ? "✓" : ""}
                  </Button>
                ) : (
                  <>
                    <span className="text-lg font-semibold">
                      {count}/{max}
                    </span>
                    <div>
                      <Button
                        onClick={decrement}
                        disabled={count === 0}
                        size="sm"
                        variant="outline"
                        className="mr-2"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={increment}
                        disabled={isComplete}
                        size="sm"
                        variant="outline"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>

      <Button
        onClick={() => setIsEditMode(!isEditMode)}
        variant={isEditMode ? "default" : "outline"}
        className=" aspect-square mt-auto"
        aria-label={isEditMode ? "Save changes" : "Edit cell"}
      >
        {isEditMode ? (
          <>
            <CheckIcon className="h-4 w-4 mr-2" />
          </>
        ) : (
            <PencilIcon className="h-4 w-4 mr-2" />
        )}
      </Button>
    </Card>
  );
};
