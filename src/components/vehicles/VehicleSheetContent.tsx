
import { Button } from "@/components/ui/button";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Car } from "lucide-react";

interface Vehicle {
  id: number;
  name: string;
  plate: string;
  status: string;
  brand: string;
  model: string;
  year: string;
  type: string;
}

interface VehicleSheetContentProps {
  vehicle: Vehicle;
  onClose: () => void;
}

const VehicleSheetContent = ({ vehicle, onClose }: VehicleSheetContentProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500/20 text-green-400";
      case "maintenance":
        return "bg-orange-500/20 text-orange-400";
      case "unavailable":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Disponible";
      case "maintenance":
        return "En maintenance";
      case "unavailable":
        return "Indisponible";
      default:
        return "Inconnu";
    }
  };

  return (
    <>
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
            <span className={`mt-1 inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(vehicle.status)}`}>
              {getStatusText(vehicle.status)}
            </span>
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
    </>
  );
};

export default VehicleSheetContent;
