
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, FileText, Calendar, Wrench, AlertTriangle, Map, Settings } from "lucide-react";
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

  // Formatage de l'immatriculation en 00000-000-00
  const formatPlate = (plate: string) => {
    // Si le format est déjà correct, on le retourne tel quel
    if (/^\d{5}-\d{3}-\d{2}$/.test(plate)) return plate;
    
    // Sinon, on retourne le format d'origine
    return plate;
  };

  if (!vehicle) return null;

  // Extraire le type de véhicule et créer un nom basé sur le numéro de véhicule
  const vehicleType = vehicle.type;
  const vehicleName = `${vehicleType} ${vehicle.vehicle_number}`;

  return (
    <Sheet 
      open={vehicleId !== null} 
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent 
        className="bg-gray-800 border-gray-700 text-white max-w-md overflow-y-auto"
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
          
          {/* Actions déplacées en haut pour une meilleure visibilité */}
          <div className="space-y-4 pt-2 pb-4 border-t border-b border-gray-700">
            <h3 className="text-lg font-medium text-white pt-4">Actions</h3>
            <div className="space-y-3">
              <Button className="w-full bg-[#9b87f5] hover:bg-[#8a76e5] text-white flex justify-start">
                <FileText className="mr-2 h-5 w-5" />
                Voir documents
              </Button>
              <Button variant="outline" className="w-full flex justify-start">
                <Calendar className="mr-2 h-5 w-5" />
                Planifier maintenance
              </Button>
              <Button variant="outline" className="w-full flex justify-start">
                <Wrench className="mr-2 h-5 w-5" />
                Historique maintenance
              </Button>
              <Button variant="outline" className="w-full flex justify-start">
                <Map className="mr-2 h-5 w-5" />
                Localiser véhicule
              </Button>
              <Button variant="outline" className="w-full flex justify-start">
                <Settings className="mr-2 h-5 w-5" />
                Modifier
              </Button>
              <Button variant="outline" className="w-full text-red-400 hover:text-red-300 hover:border-red-400 flex justify-start">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Supprimer
              </Button>
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
      </SheetContent>
    </Sheet>
  );
};
