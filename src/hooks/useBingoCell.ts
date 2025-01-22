"use client"
import { useState } from "react";
import { useSession } from "next-auth/react";
import type { BingoCell } from "../types";

export const useBingoCell = (initialCell: BingoCell, id: number) => {
  const { data: session } = useSession();
  const [goal, setGoal] = useState(initialCell.text);
  const [count, setCount] = useState(initialCell.actual);
  const [max, setMax] = useState(initialCell.max);
  const [notes, setNotes] = useState(initialCell.notes || "");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const updateCell = async (updates: Partial<BingoCell>) => {
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
          notes,
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

  return {
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
    isComplete: count >= max
  };
};