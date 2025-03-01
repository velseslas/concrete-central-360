
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Vehicle } from "@/types/vehicle";

interface DeleteVehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle: Vehicle | null;
  onDelete: () => void;
}

export const DeleteVehicleDialog = ({
  open,
  onOpenChange,
  vehicle,
  onDelete
}: DeleteVehicleDialogProps) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="bg-gray-800 text-white border-gray-700">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Êtes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300">
            Cette action ne peut pas être annulée. Cela supprimera définitivement le véhicule
            {vehicle && ` ${vehicle.type} ${vehicle.vehicle_number}`} et toutes les données associées.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
            onClick={() => onOpenChange(false)}
          >
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction 
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={onDelete}
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
