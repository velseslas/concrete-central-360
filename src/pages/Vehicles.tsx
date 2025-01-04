import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    <div className="min-h-screen bg-[#1A1F2C]">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-6 space-y-6"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between"
        >
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] bg-clip-text text-transparent">
              Parc Roulant
            </h1>
            <p className="text-[#7E69AB]">
              Gestion de votre flotte de véhicules
            </p>
          </div>
          
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <Button className="bg-[#9b87f5] hover:bg-[#7E69AB] transition-colors">
                Ajouter un véhicule
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="border-b border-[#2A2F3C]">
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

        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="border-[#2A2F3C] bg-[#221F26]/80">
              <div className="p-6">
                <VehicleList onEdit={handleEdit} />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-[#2A2F3C] bg-[#221F26]/80">
              <div className="p-6">
                <DocumentAlerts />
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Vehicles;