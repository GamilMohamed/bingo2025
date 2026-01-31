"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export function AddCell({ year, onCellAdded }: { year: number; onCellAdded: () => Promise<void> }) {
	const addCell = async () => {
		try {
			const response = await fetch(`/api/bingo-cells`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ year }),
			});
			if (!response.ok) {
				throw new Error('Failed to add cell');
			}
			await onCellAdded();
		}
		catch (error) {
			console.error('Error adding cell:', error);
		}
	};
	return (
		<Button onClick={addCell} className="mb-3">
			<PlusCircle />
		</Button>);
}
