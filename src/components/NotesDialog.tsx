import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
interface NotesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  notes: string;
  onSave: (notes: string) => void;
  isLoading?: boolean;
}

export const NotesDialog: React.FC<NotesDialogProps> = ({
  isOpen,
  onClose,
  notes,
  onSave,
  isLoading
}) => {
  const [value, setValue] = useState(notes);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Notes</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Noms de films regardés, livres lus, visites de musées, etc."
            className="min-h-[200px]"
          />
        </div>
        <Button 
          onClick={() => {
            onSave(value);
            onClose();
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Chargement...
            </>
          ) : "Sauvagarder"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
