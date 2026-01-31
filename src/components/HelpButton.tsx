"use client";
import { HelpCircleIcon, PencilIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useState } from "react";
import { StickyNoteIcon, Plus, Minus, Check, X, SaveIcon } from "lucide-react";

export function HelpButton({ isFirstTime = false, year }: { isFirstTime?: boolean; year: number }) {
  const [isOpen, setIsOpen] = useState(isFirstTime);

  return (
    <>
			<Button  className="mb-3" onClick={() => setIsOpen(true)}>
				<HelpCircleIcon />
			</Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[95%] max-w-[425px] mx-auto p-4 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-lg md:text-xl">
              Explications
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-sm md:text-base">
              <b>Bingo {year}</b> aide à atteindre et retenir des objectifs en
              {year} avec une grille de cases. Chaque case représente un
              objectif à accomplir, permettant de suivre les progrès et de
              rester motivé.
              <br />
              L&apos;idéal est de <b>quantifier</b> chaque objectif pour pouvoir
              suivre les progrès. Par exemple, si vous souhaitez lire 10 livres
              en {year}, vous pouvez indiquer 10 dans la case correspondante.{" "}
              <br />
              Vous pourrez ensuite incrémenter le compteur à chaque livre lu et
              noter le titre du livre dans les notes.
            </p>

            <div className="space-y-2">
              {[
                {
                  Icon: PencilIcon,
                  text: "Pour éditer une case et ajouter un objectif",
                },
                { Icon: StickyNoteIcon, text: "Pour ajouter des notes" },
                { Icon: Check, text: "Pour marquer une case comme accomplie" },
                { Icon: X, text: "Pour marquer une case comme non accomplie" },
                { Icon: Plus, text: "Pour incrémenter le compteur" },
                { Icon: Minus, text: "Pour décrémenter le compteur" },
                { Icon: SaveIcon, text: "Pour sauvegarder les modifications" },
              ].map(({ Icon, text }, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 text-sm md:text-base"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
