
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Languages, ArrowLeft, Save, Check, X, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Language {
  id: string;
  name: string;
  code: string;
  active: boolean;
  default: boolean;
}

export default function LanguagesSettings() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [languages, setLanguages] = useState<Language[]>([
    { id: "1", name: "Français", code: "fr", active: true, default: true },
    { id: "2", name: "Arabe", code: "ar", active: true, default: false },
    { id: "3", name: "Anglais", code: "en", active: true, default: false },
    { id: "4", name: "Espagnol", code: "es", active: false, default: false },
  ]);

  const handleToggleLanguage = (id: string) => {
    setLanguages(languages.map(lang => {
      if (lang.id === id) {
        return { ...lang, active: !lang.active };
      }
      return lang;
    }));
  };

  const handleSetDefault = (id: string) => {
    setLanguages(languages.map(lang => ({
      ...lang,
      default: lang.id === id
    })));
    toast.success("Langue par défaut mise à jour");
  };

  const handleSaveLanguages = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Paramètres de langue mis à jour avec succès");
    }, 1500);
    
    console.log("Languages saved:", languages);
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
            <div className="p-3 rounded-lg bg-indigo-100">
              <Languages className="h-6 w-6 text-indigo-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Langues</h1>
              <p className="text-gray-400 mt-1">Paramètres de langue et traduction</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-white">Configuration des langues</CardTitle>
              <CardDescription className="text-gray-400">
                Gérez les langues disponibles dans votre application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Table className="border border-gray-700 rounded-md overflow-hidden">
                  <TableHeader className="bg-gray-900">
                    <TableRow className="border-gray-700">
                      <TableHead className="text-white">Langue</TableHead>
                      <TableHead className="text-white">Code</TableHead>
                      <TableHead className="text-white text-center">Activée</TableHead>
                      <TableHead className="text-white text-center">Par défaut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {languages.map((language) => (
                      <TableRow key={language.id} className="border-gray-700">
                        <TableCell className="font-medium text-white">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-indigo-400" />
                            {language.name}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">{language.code}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            <Switch
                              checked={language.active}
                              onCheckedChange={() => handleToggleLanguage(language.id)}
                              disabled={language.default}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            {language.default ? (
                              <div className="bg-indigo-500 text-white p-1 rounded-full">
                                <Check className="h-4 w-4" />
                              </div>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-indigo-500/30 hover:border-indigo-500/60 text-indigo-400 hover:text-indigo-300 h-7"
                                onClick={() => handleSetDefault(language.id)}
                                disabled={!language.active}
                              >
                                Définir
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="pt-4 flex justify-end">
                  <motion.div whileTap={{ scale: 0.97 }}>
                    <Button 
                      onClick={handleSaveLanguages}
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
              <CardTitle className="text-white">Informations sur les langues</CardTitle>
              <CardDescription className="text-gray-400">
                Comprendre les paramètres de langue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-indigo-900/20 p-4 border border-indigo-800">
                <h3 className="font-medium text-indigo-300 mb-2">Langues actives</h3>
                <p className="text-gray-300 text-sm">
                  Les langues actives seront disponibles pour les utilisateurs dans l'interface.
                </p>
              </div>
              <div className="rounded-lg bg-indigo-900/20 p-4 border border-indigo-800">
                <h3 className="font-medium text-indigo-300 mb-2">Langue par défaut</h3>
                <p className="text-gray-300 text-sm">
                  La langue par défaut est utilisée pour les nouveaux utilisateurs et ne peut pas être désactivée.
                </p>
              </div>
              <div className="rounded-lg bg-indigo-900/20 p-4 border border-indigo-800">
                <h3 className="font-medium text-indigo-300 mb-2">Codes de langue</h3>
                <p className="text-gray-300 text-sm">
                  Les codes de langue suivent la norme ISO 639-1 et sont utilisés pour identifier les langues dans le système.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
