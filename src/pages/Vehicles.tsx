import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import VehicleForm from "@/components/vehicles/VehicleForm";
import VehicleList from "@/components/vehicles/VehicleList";
import DocumentAlerts from "@/components/vehicles/DocumentAlerts";
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-6"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex items-center justify-between"
        >
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Gestion du Parc Roulant
          </h1>
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
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid gap-6 md:grid-cols-2"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Liste des Véhicules</CardTitle>
              </CardHeader>
              <CardContent>
                <VehicleList onEdit={handleEdit} />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Documents à Renouveler</CardTitle>
              </CardHeader>
              <CardContent>
                <DocumentAlerts />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Vehicles;
