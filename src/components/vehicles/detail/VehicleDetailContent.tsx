
import { Car } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Vehicle } from "@/types/vehicle";
import { getStatusText } from "@/utils/vehicleUtils";
import { toast } from "sonner";

interface VehicleDetailContentProps {
  vehicle: Vehicle;
  onStatusChange: (vehicleId: number, newStatus: string) => void;
  formatPlate: (plate: string) => string;
}

export const VehicleDetailContent = ({ 
  vehicle,
  onStatusChange,
  formatPlate
}: VehicleDetailContentProps) => {
  const vehicleType = vehicle.type;
  const vehicleName = `${vehicleType} ${vehicle.vehicle_number}`;

  const handleStatusChange = (newStatus: string) => {
    console.log(`Mise à jour du statut du véhicule ${vehicle.id} à ${newStatus}`);
    onStatusChange(vehicle.id, newStatus);
    // Notification de succès
    toast.success(`Le statut du véhicule a été mis à jour à "${getStatusText(newStatus)}"`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
          <Car className="h-8 w-8 text-[#9b87f5]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{vehicleName}</h2>
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
      
      {/* Détails du véhicule */}
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
        {/* Numéro de véhicule et immatriculation sur la même ligne */}
        <div className="space-y-1">
          <p className="text-sm text-gray-400">Numéro véhicule</p>
          <p className="text-white">{vehicle.vehicle_number}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-400">Immatriculation</p>
          <p className="text-white">{formatPlate(vehicle.plate)}</p>
        </div>
      </div>
    </div>
  );
};
