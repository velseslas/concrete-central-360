import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VehicleForm from "@/components/vehicles/VehicleForm";
import VehicleList from "@/components/vehicles/VehicleList";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

const Vehicles = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<any>(null);

  const handleEdit = (vehicle: any) => {
    setEditingVehicle(vehicle);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingVehicle(null);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestion du Parc Roulant</h1>
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button>Ajouter un véhicule</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                {editingVehicle ? "Modifier le véhicule" : "Ajouter un véhicule"}
              </DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              <VehicleForm
                onClose={handleClose}
                initialData={editingVehicle}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Liste des Véhicules</CardTitle>
          </CardHeader>
          <CardContent>
            <VehicleList onEdit={handleEdit} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documents à Renouveler</CardTitle>
          </CardHeader>
          <CardContent>
            <DocumentAlerts />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Vehicles;