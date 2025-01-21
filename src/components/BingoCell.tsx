"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PencilIcon, CheckIcon, PlusIcon, MinusIcon } from "lucide-react";
import { Card } from "./ui/card";
import { useSession } from "next-auth/react";
import type { FC } from "react";
// import { Cell } from "@prisma/client";

interface BingoCellProps {
  index: number;
  id: number;
  cell: {
    text: string;
    max: number;
    actual: number;
    checked: boolean;
  };
}

export const BingoCell: FC<BingoCellProps> = ({ index, id, cell }) => {
  const { data: session } = useSession();
  const [goal, setGoal] = useState(cell.text);
  const [count, setCount] = useState(cell.actual);
  const [max, setMax] = useState(cell.max);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const updateCell = async (updates: Partial<typeof cell>) => {
    if (!session) return;
    
    setIsSaving(true);
    try {
      const response = await fetch("/api/bingo-cells", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          text: goal,
          max,
          actual: count,
          checked: count === max,
          ...updates
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update cell");
      }
    } catch (error) {
      console.error("Error updating cell:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // const debounce = <T extends (...args: Cell[]) => void>(func: T, wait: number) => {
  //     let timeout: NodeJS.Timeout;
  //     return (...args: Parameters<T>) => {
  //       clearTimeout(timeout);
  //       timeout = setTimeout(() => func(...args), wait);
  //     };
  //   };

  // const debouncedUpdate = debounce(updateCell, 500);

  // useEffect(() => {
  //   if (cell.text !== goal || cell.max !== max || cell.actual !== count) {
  //     void debouncedUpdate({
  //       text: goal,
  //       max,
  //       actual: count,
  //     });
  //   }
  // }, [goal, max, count, cell.text, cell.max, cell.actual, debouncedUpdate]);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    void updateCell({ actual: newCount });
  };

  const decrement = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      void updateCell({ actual: newCount });
    }
  };

  const handleEditComplete = () => {
    setIsEditMode(false);
    void updateCell({
      text: goal,
      max,
      actual: count,
    });
  };

  const isComplete = count === max;

  return (
    <Card
      className={`aspect-square p-4 relative flex flex-col min-w-40 ${
        isComplete ? "bg-[#9BC6B9]" : "bg-white"
      } ${isSaving ? "opacity-70" : ""}`}
    >
      <div className="flex-grow mb-2 justify-center items-center flex">
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
          <p className="overflow-auto h-full flex justify-center items-center w-full">
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
              onChange={(e) => setCount(Number(e.target.value) || 0)}
              className="w-16 text-center"
              min="0"
              max={max}
              aria-label={`Current value for cell ${index + 1}`}
            />
            <span>/</span>
            <Input
              type="number"
              value={max}
              onChange={(e) => setMax(Number(e.target.value) || 1)}
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
                {max === 1 ? (
                  <Button
                    onClick={increment}
                    disabled={isComplete || isSaving}
                    size="sm"
                    variant="outline"
                    className={`${isComplete ? "none" : "w-fit"}`}
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
                        disabled={count === 0 || isSaving}
                        size="sm"
                        variant="outline"
                        className="mr-2"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={increment}
                        disabled={isComplete || isSaving}
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
        onClick={() => {
          if (isEditMode) {
            handleEditComplete();
          } else {
            setIsEditMode(true);
          }
        }}
        variant={isEditMode ? "default" : "outline"}
        className="aspect-square w-fit flex justify-center items-center"
        disabled={isSaving}
        aria-label={isEditMode ? "Save changes" : "Edit cell"}
      >
        {isEditMode ? (
          <CheckIcon className="h-4 w-4" />
        ) : (
          <PencilIcon className="h-4 w-4" />
        )}
      </Button>
    </Card>
  );
};