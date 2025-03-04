
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Factory, ArrowLeft, CheckCircle2, PlusCircle, Trash2, MapPin, Edit, ToggleLeft, ToggleRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

interface Plant {
  id: string;
  name: string;
  address: string;
  capacity: number;
  active: boolean;
  latitude?: number;
  longitude?: number;
}

export default function PlantsSettings() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [plants, setPlants] = useState<Plant[]>([
    { 
      id: '1', 
      name: 'Centrale 1', 
      address: '123 Rue du Béton, Lyon', 
      capacity: 150,
      active: true,
      latitude: 45.7578137,
      longitude: 4.8320114
    },
    { 
      id: '2', 
      name: 'Centrale 2', 
      address: '456 Avenue du Ciment, Lyon', 
      capacity: 120,
      active: true
    },
    { 
      id: '3', 
      name: 'Centrale Mobile', 
      address: 'Zone Industrielle, Saint-Étienne', 
      capacity: 80,
      active: false
    },
  ]);
  
  const [newPlant, setNewPlant] = useState({
    name: '',
    address: '',
    capacity: 100,
  });

  const handleSavePlants = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Centrales à béton mises à jour avec succès");
    }, 1500);
    
    console.log("Plants saved:", plants);
  };

  const handleAddPlant = () => {
    if (!newPlant.name || !newPlant.address) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    const newPlantObj: Plant = {
      id: Date.now().toString(),
      name: newPlant.name,
      address: newPlant.address,
      capacity: newPlant.capacity,
      active: true
    };
    
    setPlants([...plants, newPlantObj]);
    setNewPlant({ name: '', address: '', capacity: 100 });
    toast.success("Nouvelle centrale ajoutée");
  };

  const handleRemovePlant = (id: string) => {
    setPlants(plants.filter(plant => plant.id !== id));
    toast.success("Centrale supprimée");
  };

  const handleToggleActive = (id: string) => {
    setPlants(plants.map(plant => 
      plant.id === id ? { ...plant, active: !plant.active } : plant
    ));
  };

  const handleStartEdit = (plant: Plant) => {
    setIsEditing(plant.id);
    setNewPlant({
      name: plant.name,
      address: plant.address,
      capacity: plant.capacity
    });
  };

  const handleSaveEdit = () => {
    if (!isEditing) return;
    
    setPlants(plants.map(plant => 
      plant.id === isEditing ? { 
        ...plant, 
        name: newPlant.name, 
        address: newPlant.address, 
        capacity: newPlant.capacity 
      } : plant
    ));
    
    setIsEditing(null);
    setNewPlant({ name: '', address: '', capacity: 100 });
    toast.success("Centrale mise à jour");
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setNewPlant({ name: '', address: '', capacity: 100 });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          onClick={() => navigate('/settings')}
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux paramètres
        </Button>
        
        <div className="relative mb-10 bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-orange-100">
              <Factory className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Centrales à béton</h1>
              <p className="text-gray-400 mt-1">Gérer vos centrales à béton</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-white">Vos centrales</CardTitle>
              <CardDescription className="text-gray-400">
                Gérer les centrales à béton de votre entreprise
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-md border border-gray-700">
                  <div className="grid grid-cols-12 bg-gray-900 p-3 rounded-t-md">
                    <div className="col-span-3 font-medium text-white">Nom</div>
                    <div className="col-span-4 font-medium text-white">Adresse</div>
                    <div className="col-span-2 font-medium text-white">Capacité (m³/h)</div>
                    <div className="col-span-1 font-medium text-white text-center">Statut</div>
                    <div className="col-span-2 font-medium text-white text-center">Actions</div>
                  </div>
                  <div className="divide-y divide-gray-700">
                    {plants.map((plant) => (
                      <div key={plant.id} className="grid grid-cols-12 p-3 items-center">
                        <div className="col-span-3 text-white">{plant.name}</div>
                        <div className="col-span-4 text-white text-sm">{plant.address}</div>
                        <div className="col-span-2 text-white">{plant.capacity}</div>
                        <div className="col-span-1 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`p-0 h-auto ${plant.active ? 'text-green-500' : 'text-gray-500'}`}
                            onClick={() => handleToggleActive(plant.id)}
                          >
                            {plant.active ? (
                              <ToggleRight className="h-5 w-5" />
                            ) : (
                              <ToggleLeft className="h-5 w-5" />
                            )}
                            <span className="sr-only">
                              {plant.active ? 'Désactiver' : 'Activer'}
                            </span>
                          </Button>
                        </div>
                        <div className="col-span-2 text-center flex justify-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-blue-400 p-1 h-auto"
                            onClick={() => handleStartEdit(plant)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Modifier</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-red-400 p-1 h-auto"
                            onClick={() => handleRemovePlant(plant.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Supprimer</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-900 p-4 rounded-md border border-gray-700">
                  <h3 className="text-white font-medium mb-3">
                    {isEditing ? 'Modifier la centrale' : 'Ajouter une nouvelle centrale'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="plant-name" className="text-white mb-2 block">
                        Nom de la centrale*
                      </Label>
                      <Input
                        id="plant-name"
                        value={newPlant.name}
                        onChange={(e) => setNewPlant({...newPlant, name: e.target.value})}
                        placeholder="Ex: Centrale Nord"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="plant-capacity" className="text-white mb-2 block">
                        Capacité (m³/h)
                      </Label>
                      <Input
                        id="plant-capacity"
                        type="number"
                        min="1"
                        value={newPlant.capacity}
                        onChange={(e) => setNewPlant({...newPlant, capacity: parseInt(e.target.value)})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="plant-address" className="text-white mb-2 block">
                        Adresse*
                      </Label>
                      <Textarea
                        id="plant-address"
                        value={newPlant.address}
                        onChange={(e) => setNewPlant({...newPlant, address: e.target.value})}
                        placeholder="Adresse complète"
                        className="bg-gray-700 border-gray-600 text-white min-h-[80px]"
                      />
                    </div>
                    <div className="sm:col-span-2 flex justify-end space-x-2">
                      {isEditing ? (
                        <>
                          <Button 
                            onClick={handleCancelEdit}
                            variant="outline"
                            className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
                          >
                            Annuler
                          </Button>
                          <Button 
                            onClick={handleSaveEdit}
                            className="bg-blue-600 hover:bg-blue-500 text-white"
                          >
                            Mettre à jour
                          </Button>
                        </>
                      ) : (
                        <Button 
                          onClick={handleAddPlant}
                          className="bg-green-600 hover:bg-green-500 text-white flex items-center gap-1"
                        >
                          <PlusCircle className="h-4 w-4" />
                          <span>Ajouter</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <motion.div whileTap={{ scale: 0.97 }}>
                    <Button 
                      onClick={handleSavePlants}
                      disabled={isLoading}
                      className="bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Enregistrement...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Enregistrer toutes les modifications</span>
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Informations</CardTitle>
              <CardDescription className="text-gray-400">
                À propos des centrales à béton
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-blue-900/20 p-4 border border-blue-800">
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <div className="shrink-0 bg-blue-600 rounded-full p-1 mt-0.5 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-blue-300 text-sm">
                      Les centrales inactives n'apparaîtront pas dans les options de production.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="shrink-0 bg-blue-600 rounded-full p-1 mt-0.5 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-blue-300 text-sm">
                      La capacité est utilisée pour calculer les plannings de production.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="shrink-0 bg-blue-600 rounded-full p-1 mt-0.5 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-blue-300 text-sm">
                      Vous pouvez ajouter des coordonnées GPS pour les centrales dans les paramètres avancés.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
