
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Factory, ChevronDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type PlantSwitcherProps = {
  selectedPlant: string;
  setSelectedPlant: (plant: string) => void;
};

export function PlantSwitcher({ selectedPlant, setSelectedPlant }: PlantSwitcherProps) {
  const [plants, setPlants] = useState<string[]>(["Centrale 1", "Centrale 2", "Centrale 3"]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPlantName, setNewPlantName] = useState("");

  const handleAddPlant = () => {
    if (!newPlantName.trim()) {
      toast.error("Veuillez saisir un nom pour la centrale");
      return;
    }
    
    if (plants.includes(newPlantName)) {
      toast.error("Une centrale avec ce nom existe déjà");
      return;
    }
    
    setPlants([...plants, newPlantName]);
    setSelectedPlant(newPlantName);
    setNewPlantName("");
    setIsDialogOpen(false);
    toast.success(`Centrale "${newPlantName}" ajoutée avec succès`);
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-gray-800 border-gray-700 text-white">
              <Factory className="mr-2 h-4 w-4 text-blue-400" />
              {selectedPlant}
              <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-white">
            {plants.map((plant) => (
              <DropdownMenuItem
                key={plant}
                onClick={() => setSelectedPlant(plant)}
                className={selectedPlant === plant ? "bg-gray-700" : ""}
              >
                <Factory className="mr-2 h-4 w-4 text-blue-400" />
                {plant}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem 
              onClick={() => setIsDialogOpen(true)}
              className="text-green-400"
            >
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une centrale
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle centrale à béton</DialogTitle>
            <DialogDescription className="text-gray-400">
              Créez une nouvelle centrale pour gérer des paramètres spécifiques.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input
                id="name"
                value={newPlantName}
                onChange={(e) => setNewPlantName(e.target.value)}
                placeholder="Nom de la centrale"
                className="col-span-3 bg-gray-700 border-gray-600"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              className="bg-gray-700 border-gray-600 text-white"
            >
              Annuler
            </Button>
            <Button type="button" onClick={handleAddPlant}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
