import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import ConsumablesList from "@/components/consumables/ConsumablesList";
import ConsumableForm from "@/components/consumables/ConsumableForm";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Fuel } from "lucide-react";

const Consumables = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingConsumable, setEditingConsumable] = useState<any>(null);

  const handleEdit = (consumable: any) => {
    setEditingConsumable(consumable);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingConsumable(null);
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
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Gestion des Consommables
            </h1>
            <p className="text-gray-400">
              Suivi des consommations de carburant et autres consommables
            </p>
          </div>
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <Button className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300">
                <Fuel className="mr-2 h-4 w-4" />
                Ajouter une consommation
              </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-gray-800/95 backdrop-blur-xl border-t border-gray-700">
              <DrawerHeader>
                <DrawerTitle className="text-gray-100">
                  {editingConsumable ? "Modifier la consommation" : "Ajouter une consommation"}
                </DrawerTitle>
              </DrawerHeader>
              <div className="p-4">
                <ConsumableForm
                  onClose={handleClose}
                  initialData={editingConsumable}
                />
              </div>
            </DrawerContent>
          </Drawer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid gap-6"
        >
          <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Liste des Consommations</CardTitle>
            </CardHeader>
            <CardContent>
              <ConsumablesList onEdit={handleEdit} />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Consumables;