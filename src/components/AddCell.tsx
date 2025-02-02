"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function AddCell() {
	const router = useRouter();
	const addCell = async () => {
		try {
			const response = await fetch(`/api/bingo-cells`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (!response.ok) {
				throw new Error('Failed to add cell');
			}
			router.push("/");
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