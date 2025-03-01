
import { motion } from "framer-motion";
import { ArrowLeft, Search, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import VehicleForm from "@/components/vehicles/VehicleForm";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { VehicleDetailSheet } from "@/components/vehicles/VehicleDetailSheet";
import { vehiclesData } from "@/data/vehicles";

const VehicleList = () => {
  const [vehicleDetailId, setVehicleDetailId] = useState<number | null>(null);
  const [vehicles, setVehicles] = useState(vehiclesData);
  const navigate = useNavigate();

  const handleStatusChange = (vehicleId: number, newStatus: string) => {
    // Mettre à jour les véhicules avec le nouveau statut
    setVehicles(prevVehicles => 
      prevVehicles.map(vehicle => 
        vehicle.id === vehicleId 
          ? { ...vehicle, status: newStatus } 
          : vehicle
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Link to="/vehicles">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour aux véhicules
          </Button>
        </Link>
      </div>

      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-[#9b87f5] hover:bg-[#8a76e5] text-white">
              <Plus className="h-4 w-4" />
              Nouveau véhicule
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">Ajouter un nouveau véhicule</DialogTitle>
            </DialogHeader>
            <VehicleForm onComplete={() => navigate("/vehicles/list")} />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Rechercher un véhicule</CardTitle>
          <Search className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Rechercher par immatriculation, modèle..."
            className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
          />
        </CardContent>
      </Card>

      <div className="space-y-4">
        {vehicles.map((vehicle) => (
          <VehicleCard 
            key={vehicle.id}
            vehicle={vehicle}
            onClick={() => setVehicleDetailId(vehicle.id)}
          />
        ))}
      </div>

      <VehicleDetailSheet 
        vehicleId={vehicleDetailId} 
        vehicles={vehicles}
        onClose={() => setVehicleDetailId(null)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default VehicleList;
