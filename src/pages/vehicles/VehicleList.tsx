
import { motion } from "framer-motion";
import { ArrowLeft, Search, Plus, Car } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import VehicleForm from "@/components/vehicles/VehicleForm";

const VehicleList = () => {
  const [vehicleDetailId, setVehicleDetailId] = useState<number | null>(null);
  const navigate = useNavigate();

  const vehicles = [
    {
      id: 1,
      name: "Camion Benne #1",
      plate: "AB-124-CD",
      status: "available",
      brand: "Volvo",
      model: "FH16",
      year: "2020",
      type: "Camion Benne"
    },
    {
      id: 2,
      name: "Camion Benne #2",
      plate: "AB-125-CD",
      status: "maintenance",
      brand: "Renault",
      model: "T High",
      year: "2021", 
      type: "Camion Benne"
    },
    {
      id: 3,
      name: "Chargeuse #1",
      plate: "AB-126-CD",
      status: "unavailable",
      brand: "Caterpillar",
      model: "966M",
      year: "2019",
      type: "Chargeuse"
    },
    {
      id: 4,
      name: "Pelleteuse #1",
      plate: "AB-127-CD",
      status: "available",
      brand: "JCB",
      model: "3CX",
      year: "2022",
      type: "Pelleteuse"
    },
    {
      id: 5,
      name: "Niveleuse #1",
      plate: "AB-128-CD",
      status: "available",
      brand: "Komatsu",
      model: "GD705-5",
      year: "2021",
      type: "Niveleuse"
    }
  ];

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
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4">
        <Link to="/vehicles">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour aux véhicules
          </Button>
        </Link>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Liste des Véhicules</h1>
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
          <Card key={vehicle.id} className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors">
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
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setVehicleDetailId(vehicle.id)}
                >
                  Détails
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Sheet 
        open={vehicleDetailId !== null} 
        onOpenChange={(open) => {
          if (!open) setVehicleDetailId(null);
        }}
      >
        <SheetContent 
          className="bg-gray-800 border-gray-700 text-white max-w-md"
          side="right"
        >
          {vehicleDetailId !== null && (
            <>
              <SheetHeader className="pb-6">
                <SheetTitle className="text-white text-xl">Détails du véhicule</SheetTitle>
              </SheetHeader>
              
              <div className="space-y-6">
                {(() => {
                  const vehicle = vehicles.find(v => v.id === vehicleDetailId);
                  if (!vehicle) return null;
                  
                  return (
                    <>
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
                    </>
                  );
                })()}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default VehicleList;
