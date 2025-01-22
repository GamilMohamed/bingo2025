"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PencilIcon, CheckIcon, PlusIcon, MinusIcon, Loader2, StickyNoteIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useBingoCell } from "../hooks/useBingoCell";
import { NotesDialog } from "./NotesDialog";
import type { BingoCellProps } from "../types";
import type { FC } from "react";
import { Textarea } from "./ui/textarea";

export const BingoCell: FC<BingoCellProps> = ({ index, id, cell }) => {
  const {
    goal,
    setGoal,
    count,
    setCount,
    max,
    setMax,
    notes,
    setNotes,
    isEditMode,
    setIsEditMode,
    isNotesOpen,
    setIsNotesOpen,
    isSaving,
    updateCell,
    isComplete
  } = useBingoCell(cell, id);

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

  const handleNotesUpdate = (newNotes: string) => {
    setNotes(newNotes);
    void updateCell({ notes: newNotes });
  };

  return (
    <Card
      className={`aspect-square p-4 relative flex flex-col min-w-40 ${
        isComplete ? "bg-[#9BC6B9]" : "bg-white"
      } ${isSaving ? "opacity-70" : ""}`}
    >
      <div className="flex-grow mb-2 justify-center items-center flex">
        {isEditMode ? (
          <Textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="écrire un objectif"
            className="w-full mb-2 h-full"
            aria-label={`Goal for cell ${index + 1}`}
          />
          // <Input
          //   type="text"
          //   value={goal}
          //   onChange={(e) => setGoal(e.target.value)}
          //   placeholder="Enter goal"
          //   className="w-full mb-2 h-full"
          //   aria-label={`Goal for cell ${index + 1}`}
          // />
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
                    {isSaving ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : !isComplete ? (
                      "✓"
                    ) : (
                      ""
                    )}
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
                        {isSaving ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <MinusIcon className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        onClick={increment}
                        disabled={isComplete || isSaving}
                        size="sm"
                        variant="outline"
                      >
                        {isSaving ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <PlusIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>

      <div className="flex gap-2">
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
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isEditMode ? (
            <CheckIcon className="h-4 w-4" />
          ) : (
            <PencilIcon className="h-4 w-4" />
          )}
        </Button>

        <Button
          onClick={() => setIsNotesOpen(true)}
          variant="outline"
          className="aspect-square w-fit flex justify-center items-center"
          disabled={isSaving}
          aria-label="Open notes"
        >
          <StickyNoteIcon className="h-4 w-4" />
        </Button>
      </div>

      <NotesDialog
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        notes={notes}
        onSave={handleNotesUpdate}
        isLoading={isSaving}
      />
    </Card>
  );
};