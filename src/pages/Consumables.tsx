import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gestion des Consommables</h1>
          <p className="text-muted-foreground">
            Suivi des consommations de carburant et autres consommables
          </p>
        </div>
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button>
              <Fuel className="mr-2 h-4 w-4" />
              Ajouter une consommation
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
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
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Liste des Consommations</CardTitle>
          </CardHeader>
          <CardContent>
            <ConsumablesList onEdit={handleEdit} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Consumables;