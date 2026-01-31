"use client";
import { Button } from "@/components/ui/button";
import {
	StickyNoteIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useBingoCell } from "../hooks/useBingoCell";
import type { SharedCellProps } from "../types";
import { type FC } from "react";
import { Progress } from "./ui/progress";





import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";


interface NotesDialogProps {
	isOpen: boolean;
	onClose: () => void;
	notes: string;
}

const NotesDialog: React.FC<NotesDialogProps> = ({
	isOpen,
	onClose,
	notes,
}) => {

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Notes</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<p
						className="min-h-[200px]"
					>
						{notes}
					</p>
				</div>
			</DialogContent>
		</Dialog>
	);
};












export const SharedCell: FC<SharedCellProps> = ({ id, cell }) => {
	const {
		goal,
		count,
		max,
		notes,
		isEditMode,
		isNotesOpen,
		setIsNotesOpen,
		isSaving,
		isComplete,
	} = useBingoCell(cell, id);

	return (
		<Card
			className={`aspect-square p-4 relative flex flex-col min-w-56
				transition-all duration-300
				${isComplete ? "opacity-70 border-primary/50" : ""}
			`}
		>
			<div className={`flex-grow mb-2 justify-center items-center flex ${isComplete && max !== 0 && !isEditMode ? "opacity-20" : ""}`}>
				<p className={`overflow-md h-full flex justify-center text-center items-center w-full leading-7 [&:not(:first-child)]:mt-6 ${goal.length > 55 ? "text-md " : "text-xl"}`}>
					{goal}
				</p>
			</div>
			<div className="flex justify-between items-center mb-2">
					<div className={`w-full flex gap-2 items-center ${max !== 1 ? "" : "opacity-0"}`}>
						<Progress value={(count * 100) / max} max={max} />
						<p className="text-lg">
							{count}/{max}
						</p>
					</div>
			</div>
			{notes &&
				<div className="flex gap-2 justify-around">
					<Button
						onClick={() => setIsNotesOpen(true)}
						variant={notes ? "default" : "outline"}
						className="aspect-square w-fit flex justify-center items-center"
						disabled={isSaving}
						aria-label="Open notes">
						<StickyNoteIcon className="h-4 w-4" />
					</Button>
				</div>
			}
			<NotesDialog
				isOpen={isNotesOpen}
				onClose={() => setIsNotesOpen(false)}
				notes={cell.notes || ""}
			/>
		</Card>
	);
};
