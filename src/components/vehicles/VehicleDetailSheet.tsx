
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car } from "lucide-react";
import { Vehicle } from "@/types/vehicle";
import { toast } from "sonner";
import { getStatusText } from "@/utils/vehicleUtils";

interface VehicleDetailSheetProps {
  vehicleId: number | null;
  vehicles: Vehicle[];
  onClose: () => void;
  onStatusChange: (vehicleId: number, newStatus: string) => void;
}

export const VehicleDetailSheet = ({ 
  vehicleId, 
  vehicles, 
  onClose, 
  onStatusChange 
}: VehicleDetailSheetProps) => {
  const vehicle = vehicleId ? vehicles.find(v => v.id === vehicleId) : null;

  const handleStatusChange = (newStatus: string) => {
    if (vehicleId) {
      console.log(`Mise à jour du statut du véhicule ${vehicleId} à ${newStatus}`);
      onStatusChange(vehicleId, newStatus);
      // Notification de succès
      toast.success(`Le statut du véhicule a été mis à jour à "${getStatusText(newStatus)}"`);
    }
  };

  if (!vehicle) return null;

  return (
    <Sheet 
      open={vehicleId !== null} 
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent 
        className="bg-gray-800 border-gray-700 text-white max-w-md"
        side="right"
      >
        <SheetHeader className="pb-6">
          <SheetTitle className="text-white text-xl">Détails du véhicule</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
              <Car className="h-8 w-8 text-[#9b87f5]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{vehicle.name}</h2>
              <div className="mt-2">
                <Select 
                  defaultValue={vehicle.status} 
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white w-[180px]">
                    <SelectValue placeholder="Statut du véhicule" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="available">Disponible</SelectItem>
                    <SelectItem value="maintenance">En maintenance</SelectItem>
                    <SelectItem value="unavailable">Indisponible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Marque</p>
              <p className="text-white">{vehicle.brand}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Modèle</p>
              <p className="text-white">{vehicle.model}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Année</p>
              <p className="text-white">{vehicle.year}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Type</p>
              <p className="text-white">{vehicle.type}</p>
            </div>
            <div className="space-y-1 col-span-2">
              <p className="text-sm text-gray-400">Numéro véhicule</p>
              <p className="text-white">{vehicle.vehicle_number}</p>
            </div>
            <div className="space-y-1 col-span-2">
              <p className="text-sm text-gray-400">Immatriculation</p>
              <p className="text-white">{vehicle.plate}</p>
            </div>
          </div>
          
          <div className="pt-6 space-y-4">
            <h3 className="text-lg font-medium text-white">Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                Modifier
              </Button>
              <Button variant="outline" className="w-full text-red-400 hover:text-red-300 hover:border-red-400">
                Supprimer
              </Button>
              <Button className="w-full col-span-2 bg-[#9b87f5] hover:bg-[#8a76e5] text-white">
                Voir documents
              </Button>
              <Button variant="outline" className="w-full col-span-2">
                Planifier maintenance
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
