
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Map } from "lucide-react";

interface LocationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LocationDialog = ({
  open,
  onOpenChange
}: LocationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Localisation du véhicule</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="bg-gray-700 rounded-lg h-[300px] flex items-center justify-center">
            <Map className="h-12 w-12 text-gray-500" />
            <p className="text-gray-400 mt-4">Carte de localisation</p>
          </div>
          <div className="mt-4">
            <h4 className="text-white font-medium">Dernière position connue</h4>
            <p className="text-gray-300">Chantier Montpellier Nord</p>
            <p className="text-sm text-gray-400">Mise à jour: aujourd'hui à 14:30</p>
          </div>
        </div>
        <DialogFooter>
          <Button className="bg-[#9b87f5] hover:bg-[#8a76e5] text-white" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
