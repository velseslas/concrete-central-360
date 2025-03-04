
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, MapPin, PlusCircle, Save, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Location {
  id: string;
  name: string;
  address: string;
  type: string;
}

export default function LocationsSettings() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState<Location[]>([
    { id: "1", name: "Dépôt Central", address: "123 Rue Principale, Alger", type: "Dépôt" },
    { id: "2", name: "Site de Production Est", address: "45 Zone Industrielle, Constantine", type: "Production" },
    { id: "3", name: "Bureau Commercial Ouest", address: "78 Avenue des Affaires, Oran", type: "Bureau" },
  ]);
  
  const [newLocation, setNewLocation] = useState({
    name: '',
    address: '',
    type: 'Dépôt'
  });

  const handleSaveLocations = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Emplacements mis à jour avec succès");
    }, 1500);
    
    console.log("Locations saved:", locations);
  };

  const handleAddLocation = () => {
    if (!newLocation.name || !newLocation.address) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    
    const newLocationItem: Location = {
      id: Date.now().toString(),
      name: newLocation.name,
      address: newLocation.address,
      type: newLocation.type
    };
    
    setLocations([...locations, newLocationItem]);
    setNewLocation({ name: '', address: '', type: 'Dépôt' });
    toast.success("Nouvel emplacement ajouté");
  };

  const handleRemoveLocation = (id: string) => {
    setLocations(locations.filter(location => location.id !== id));
    toast.success("Emplacement supprimé");
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
            <div className="p-3 rounded-lg bg-teal-100">
              <MapPin className="h-6 w-6 text-teal-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Emplacements</h1>
              <p className="text-gray-400 mt-1">Gérer les emplacements et zones</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-white">Liste des emplacements</CardTitle>
              <CardDescription className="text-gray-400">
                Gérez les différents emplacements de votre entreprise
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Table className="border border-gray-700 rounded-md overflow-hidden">
                  <TableHeader className="bg-gray-900">
                    <TableRow className="border-gray-700">
                      <TableHead className="text-white">Nom</TableHead>
                      <TableHead className="text-white">Adresse</TableHead>
                      <TableHead className="text-white">Type</TableHead>
                      <TableHead className="text-white w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {locations.map((location) => (
                      <TableRow key={location.id} className="border-gray-700">
                        <TableCell className="font-medium text-white">{location.name}</TableCell>
                        <TableCell className="text-gray-300">{location.address}</TableCell>
                        <TableCell className="text-gray-300">{location.type}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-red-400 p-1 h-auto"
                            onClick={() => handleRemoveLocation(location.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Supprimer</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="bg-gray-900 p-4 rounded-md border border-gray-700">
                  <h3 className="text-white font-medium mb-3">Ajouter un nouvel emplacement</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                    <div className="sm:col-span-4">
                      <Label htmlFor="location-name" className="text-white mb-2 block">
                        Nom de l'emplacement
                      </Label>
                      <Input
                        id="location-name"
                        value={newLocation.name}
                        onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                        placeholder="Ex: Dépôt Est"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div className="sm:col-span-4">
                      <Label htmlFor="location-address" className="text-white mb-2 block">
                        Adresse
                      </Label>
                      <Input
                        id="location-address"
                        value={newLocation.address}
                        onChange={(e) => setNewLocation({...newLocation, address: e.target.value})}
                        placeholder="Ex: 123 Rue Principale, Alger"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="location-type" className="text-white mb-2 block">
                        Type
                      </Label>
                      <select
                        id="location-type"
                        value={newLocation.type}
                        onChange={(e) => setNewLocation({...newLocation, type: e.target.value})}
                        className="w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2"
                      >
                        <option value="Dépôt">Dépôt</option>
                        <option value="Bureau">Bureau</option>
                        <option value="Production">Production</option>
                        <option value="Stockage">Stockage</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <Button 
                        onClick={handleAddLocation}
                        className="w-full bg-teal-600 hover:bg-teal-500 text-white flex items-center gap-1"
                      >
                        <PlusCircle className="h-4 w-4" />
                        <span>Ajouter</span>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <motion.div whileTap={{ scale: 0.97 }}>
                    <Button 
                      onClick={handleSaveLocations}
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
                          <Save className="h-4 w-4" />
                          <span>Enregistrer les modifications</span>
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
              <CardTitle className="text-white">Types d'emplacements</CardTitle>
              <CardDescription className="text-gray-400">
                Comprendre les différents types d'emplacements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-teal-900/20 p-4 border border-teal-800">
                <h3 className="font-medium text-teal-300 mb-2">Dépôt</h3>
                <p className="text-gray-300 text-sm">
                  Zone de stockage principale pour les matériaux et équipements.
                </p>
              </div>
              <div className="rounded-lg bg-teal-900/20 p-4 border border-teal-800">
                <h3 className="font-medium text-teal-300 mb-2">Bureau</h3>
                <p className="text-gray-300 text-sm">
                  Espaces administratifs pour la gestion et les opérations.
                </p>
              </div>
              <div className="rounded-lg bg-teal-900/20 p-4 border border-teal-800">
                <h3 className="font-medium text-teal-300 mb-2">Production</h3>
                <p className="text-gray-300 text-sm">
                  Sites où se déroulent les activités de production principales.
                </p>
              </div>
              <div className="rounded-lg bg-teal-900/20 p-4 border border-teal-800">
                <h3 className="font-medium text-teal-300 mb-2">Stockage</h3>
                <p className="text-gray-300 text-sm">
                  Zones secondaires dédiées au stockage temporaire ou spécialisé.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
