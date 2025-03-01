
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface MaintenanceHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MaintenanceHistoryDialog = ({
  open,
  onOpenChange
}: MaintenanceHistoryDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Historique de maintenance</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="border border-gray-700 rounded-md p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-white font-medium">Révision générale</h4>
                <p className="text-sm text-gray-400">Technicien: Jean Dupont</p>
              </div>
              <div className="text-sm text-gray-400">12/04/2023</div>
            </div>
            <p className="mt-2 text-sm text-gray-300">Changement des filtres, vidange et contrôle des pneumatiques.</p>
          </div>
          <div className="border border-gray-700 rounded-md p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-white font-medium">Remplacement freins</h4>
                <p className="text-sm text-gray-400">Technicien: Pierre Martin</p>
              </div>
              <div className="text-sm text-gray-400">25/01/2023</div>
            </div>
            <p className="mt-2 text-sm text-gray-300">Remplacement des plaquettes de frein et des disques avant.</p>
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
