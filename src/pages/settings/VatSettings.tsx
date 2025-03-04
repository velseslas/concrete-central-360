
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Percent, ArrowLeft, CheckCircle2, PlusCircle, Trash2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

interface VatRate {
  id: string;
  name: string;
  rate: number;
  isDefault: boolean;
}

export default function VatSettings() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [vatRates, setVatRates] = useState<VatRate[]>([
    { id: '1', name: 'Standard', rate: 19, isDefault: true },
    { id: '2', name: 'Réduit', rate: 9, isDefault: false },
    { id: '3', name: 'Super réduit', rate: 0, isDefault: false },
  ]);
  
  const [newRate, setNewRate] = useState({
    name: '',
    rate: 0,
  });

  const handleSaveVatRates = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Taux de TVA mis à jour avec succès");
    }, 1500);
    
    console.log("VAT rates saved:", vatRates);
  };

  const handleAddRate = () => {
    if (!newRate.name) {
      toast.error("Veuillez saisir un nom pour le taux");
      return;
    }
    
    const newVatRate: VatRate = {
      id: Date.now().toString(),
      name: newRate.name,
      rate: newRate.rate,
      isDefault: false
    };
    
    setVatRates([...vatRates, newVatRate]);
    setNewRate({ name: '', rate: 0 });
    toast.success("Nouveau taux de TVA ajouté");
  };

  const handleRemoveRate = (id: string) => {
    const rate = vatRates.find(r => r.id === id);
    if (rate?.isDefault) {
      toast.error("Impossible de supprimer le taux par défaut");
      return;
    }
    
    setVatRates(vatRates.filter(rate => rate.id !== id));
    toast.success("Taux de TVA supprimé");
  };

  const handleSetDefault = (id: string) => {
    setVatRates(vatRates.map(rate => ({
      ...rate,
      isDefault: rate.id === id
    })));
    toast.success("Taux par défaut mis à jour");
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
            <div className="p-3 rounded-lg bg-green-100">
              <Percent className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">TVA</h1>
              <p className="text-gray-400 mt-1">Configurer les taux de TVA</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-white">Taux de TVA</CardTitle>
              <CardDescription className="text-gray-400">
                Gérez les différents taux de TVA utilisés dans votre application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-md border border-gray-700">
                  <div className="grid grid-cols-12 bg-gray-900 p-3 rounded-t-md">
                    <div className="col-span-5 font-medium text-white">Nom</div>
                    <div className="col-span-3 font-medium text-white">Taux (%)</div>
                    <div className="col-span-2 font-medium text-white text-center">Par défaut</div>
                    <div className="col-span-2 font-medium text-white text-center">Actions</div>
                  </div>
                  <div className="divide-y divide-gray-700">
                    {vatRates.map((rate) => (
                      <div key={rate.id} className="grid grid-cols-12 p-3 items-center">
                        <div className="col-span-5 text-white">{rate.name}</div>
                        <div className="col-span-3 text-white">{rate.rate}%</div>
                        <div className="col-span-2 text-center">
                          <div className="flex justify-center">
                            <div
                              className={`h-5 w-5 rounded-full cursor-pointer border ${
                                rate.isDefault 
                                  ? "bg-green-500 border-green-600" 
                                  : "bg-gray-700 border-gray-600 hover:bg-gray-600"
                              }`}
                              onClick={() => handleSetDefault(rate.id)}
                            >
                              {rate.isDefault && (
                                <CheckCircle2 className="h-5 w-5 text-white" />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-red-400 p-1 h-auto"
                            onClick={() => handleRemoveRate(rate.id)}
                            disabled={rate.isDefault}
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
                  <h3 className="text-white font-medium mb-3">Ajouter un nouveau taux</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-7 gap-4 items-end">
                    <div className="sm:col-span-3">
                      <Label htmlFor="rate-name" className="text-white mb-2 block">
                        Nom du taux
                      </Label>
                      <Input
                        id="rate-name"
                        value={newRate.name}
                        onChange={(e) => setNewRate({...newRate, name: e.target.value})}
                        placeholder="Ex: Réduit"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="rate-value" className="text-white mb-2 block">
                        Valeur (%)
                      </Label>
                      <Input
                        id="rate-value"
                        type="number"
                        min="0"
                        max="100"
                        value={newRate.rate}
                        onChange={(e) => setNewRate({...newRate, rate: parseFloat(e.target.value)})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Button 
                        onClick={handleAddRate}
                        className="w-full bg-green-600 hover:bg-green-500 text-white flex items-center gap-1"
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
                      onClick={handleSaveVatRates}
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
              <CardTitle className="text-white">Informations TVA</CardTitle>
              <CardDescription className="text-gray-400">
                Comprendre les taux de TVA
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
                      Le taux par défaut sera automatiquement appliqué aux nouveaux produits.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="shrink-0 bg-blue-600 rounded-full p-1 mt-0.5 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-blue-300 text-sm">
                      Les modifications des taux de TVA affecteront uniquement les nouveaux documents, pas ceux déjà créés.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="shrink-0 bg-blue-600 rounded-full p-1 mt-0.5 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-blue-300 text-sm">
                      Vous devez toujours avoir au moins un taux de TVA défini comme taux par défaut.
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
