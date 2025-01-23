"use client";
import { HelpCircleIcon, PencilIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useState } from "react";
import {
	StickyNoteIcon,
	Plus,
	Minus,
	Check,
	X,
	SaveIcon,
} from "lucide-react";

export function HelpButton({isFirstTime}: {isFirstTime: boolean}) {
	const [isOpen, setIsOpen] = useState(isFirstTime);
	return (
		<>
			<Button  className="mb-3" onClick={() => setIsOpen(true)}>
				<HelpCircleIcon />
			</Button>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Explications</DialogTitle>
					</DialogHeader>
						<div>
							<p>

							<b>Bingo 2025</b>  aide à atteindre et retenir des objectifs en 2025 avec une grille de <b>25</b> cases. Chaque case représente un objectif à accomplir, permettant de suivre les progrès et de rester motivé.
							<br />
							L&apos;idéal est de <b>quantifier</b> chaque objectif pour pouvoir suivre les progrès. Par exemple, si vous souhaitez lire 10 livres en 2025, vous pouvez indiquer 10 dans la case correspondante. <br /> Vous pourrez ensuite incrémenter le compteur à chaque livre lu et noter le titre du livre dans les notes.
							</p>
							<div className="flex flex-col gap-2 mt-4">
								<span className="flex flex-row w-full" > <PencilIcon className="mr-1" />Pour éditer une case et ajouter un objectif</span>
								<span className="flex flex-row w-full" > <StickyNoteIcon className="mr-1" />Pour ajouter des notes</span>
								<span className="flex flex-row w-full" > <Check className="mr-1" />Pour marquer une case comme accomplie</span>
								<span className="flex flex-row w-full" > <X className="mr-1" />Pour marquer une case comme non accomplie</span>
								<span className="flex flex-row w-full" > <Plus className="mr-1" />Pour incrémenter le compteur</span>
								<span className="flex flex-row w-full" > <Minus className="mr-1" />Pour décrémenter le compteur</span>
								<span className="flex flex-row w-full" > <SaveIcon className="mr-1" />Pour sauvegarder les modifications</span>
							</div>
						</div>
				</DialogContent>
			</Dialog>
		</>


	);
}