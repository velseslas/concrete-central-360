
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
import { motion } from "framer-motion";

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
            <Button variant="outline" className="bg-gray-800 border-gray-600 hover:bg-gray-700 hover:border-gray-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 min-w-40 justify-between">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
                >
                  <Factory className="h-5 w-5 text-blue-400" />
                </motion.div>
                <span className="font-medium">{selectedPlant}</span>
              </div>
              <ChevronDown className="h-4 w-4 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-white w-52">
            {plants.map((plant) => (
              <DropdownMenuItem
                key={plant}
                onClick={() => setSelectedPlant(plant)}
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                  selectedPlant === plant ? "bg-gray-700 text-blue-400" : "hover:bg-gray-700"
                }`}
              >
                <Factory className="h-4 w-4 text-blue-400" />
                {plant}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem 
              onClick={() => setIsDialogOpen(true)}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md mt-1 border-t border-gray-700 text-green-400 hover:bg-green-900/30 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Ajouter une centrale
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Factory className="h-5 w-5 text-blue-400" />
              Ajouter une nouvelle centrale
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Créez une nouvelle centrale pour gérer des paramètres spécifiques.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right text-white">
                Nom
              </Label>
              <Input
                id="name"
                value={newPlantName}
                onChange={(e) => setNewPlantName(e.target.value)}
                placeholder="Nom de la centrale"
                className="col-span-3 bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddPlant();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
            >
              Annuler
            </Button>
            <Button 
              type="button" 
              onClick={handleAddPlant}
              className="bg-blue-600 hover:bg-blue-500 text-white"
            >
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
