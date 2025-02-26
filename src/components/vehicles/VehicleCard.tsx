
import { Card, CardContent } from "@/components/ui/card";
import { Car } from "lucide-react";
import { Vehicle } from "@/types/vehicle";
import { getStatusColor, getStatusText } from "@/utils/vehicleUtils";

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick: () => void;
}

export const VehicleCard = ({ vehicle, onClick }: VehicleCardProps) => {
  return (
    <Card 
      className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
            <Car className="h-6 w-6 text-[#9b87f5]" />
          </div>
          <div>
            <h3 className="text-white font-medium">{vehicle.name}</h3>
            <p className="text-sm text-gray-400">Immatriculation: {vehicle.plate}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(vehicle.status)}`}>
            {getStatusText(vehicle.status)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
