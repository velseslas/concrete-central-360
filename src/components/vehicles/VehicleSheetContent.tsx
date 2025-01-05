import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Vehicle } from "@/types/vehicle";

interface VehicleSheetContentProps {
  vehicle: Vehicle;
  onClose: () => void;
}

const VehicleSheetContent = ({ vehicle, onClose }: VehicleSheetContentProps) => {
  return (
    <SheetContent>
      <SheetHeader>
        <div className="flex justify-between items-center">
          <SheetTitle>Détails du véhicule</SheetTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-gray-100/10"
          >
            <X className="h-4 w-4 text-indigo-500" />
          </Button>
        </div>
      </SheetHeader>
      <div className="mt-6 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-300">Immatriculation</h3>
          <p className="mt-1 text-sm text-gray-400">{vehicle.licensePlate}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-300">Type</h3>
          <p className="mt-1 text-sm text-gray-400">{vehicle.type}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-300">Marque</h3>
          <p className="mt-1 text-sm text-gray-400">{vehicle.brand}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-300">Modèle</h3>
          <p className="mt-1 text-sm text-gray-400">{vehicle.model}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-300">Année</h3>
          <p className="mt-1 text-sm text-gray-400">{vehicle.year}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-300">Statut</h3>
          <p className="mt-1 text-sm text-gray-400">{vehicle.status}</p>
        </div>
      </div>
    </SheetContent>
  );
};

export default VehicleSheetContent;