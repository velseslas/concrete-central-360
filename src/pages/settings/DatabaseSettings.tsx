
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, ArrowLeft, Save, Download, Upload, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Backup {
  id: string;
  name: string;
  date: string;
  size: string;
  status: "completed" | "in_progress" | "failed";
}

export default function DatabaseSettings() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [backupInProgress, setBackupInProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [backupName, setBackupName] = useState("");
  
  const [backups, setBackups] = useState<Backup[]>([
    { id: "1", name: "Sauvegarde quotidienne", date: "2023-12-20 08:00", size: "125 MB", status: "completed" },
    { id: "2", name: "Sauvegarde manuelle", date: "2023-12-15 14:30", size: "120 MB", status: "completed" },
    { id: "3", name: "Sauvegarde hebdomadaire", date: "2023-12-13 00:15", size: "118 MB", status: "completed" },
    { id: "4", name: "Sauvegarde mensuelle", date: "2023-12-01 00:00", size: "100 MB", status: "completed" },
  ]);

  const startBackup = () => {
    if (!backupName.trim()) {
      toast.error("Veuillez saisir un nom pour la sauvegarde");
      return;
    }
    
    setBackupInProgress(true);
    setProgress(0);
    
    // Simulate backup progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setBackupInProgress(false);
          
          // Add new backup to the list
          const newBackup: Backup = {
            id: Date.now().toString(),
            name: backupName,
            date: new Date().toLocaleString('fr-FR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            }).replace(',', ''),
            size: "130 MB",
            status: "completed"
          };
          
          setBackups([newBackup, ...backups]);
          setBackupName("");
          toast.success("Sauvegarde terminée avec succès");
        }
        return newProgress;
      });
    }, 500);
  };

  const handleDownloadBackup = (id: string) => {
    toast.success("Téléchargement de la sauvegarde en cours...");
  };

  const handleDeleteBackup = (id: string) => {
    setBackups(backups.filter(backup => backup.id !== id));
    toast.success("Sauvegarde supprimée avec succès");
  };

  const handleRestoreBackup = (id: string) => {
    toast.info("Restauration de la sauvegarde en cours...", {
      duration: 3000,
    });
    
    // Simulate restore
    setTimeout(() => {
      toast.success("Base de données restaurée avec succès");
    }, 3000);
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
            <div className="p-3 rounded-lg bg-cyan-100">
              <Database className="h-6 w-6 text-cyan-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Base de données</h1>
              <p className="text-gray-400 mt-1">Sauvegardes et maintenance</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-white">Sauvegardes de la base de données</CardTitle>
              <CardDescription className="text-gray-400">
                Gérez les sauvegardes de votre base de données
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {backups.map((backup) => (
                  <div 
                    key={backup.id} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-gray-900 border border-gray-700"
                  >
                    <div className="mb-4 sm:mb-0">
                      <div className="flex items-center gap-2">
                        {backup.status === "completed" ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : backup.status === "failed" ? (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          <RefreshCw className="h-5 w-5 text-yellow-500 animate-spin" />
                        )}
                        <h3 className="font-medium text-white">{backup.name}</h3>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-gray-400 mt-1">
                        <span>{backup.date}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{backup.size}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-600/30 text-blue-400 hover:text-blue-300 hover:border-blue-600/60"
                        onClick={() => handleRestoreBackup(backup.id)}
                      >
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Restaurer
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-700 text-gray-300 hover:text-white"
                        onClick={() => handleDownloadBackup(backup.id)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Télécharger
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-red-400"
                        onClick={() => handleDeleteBackup(backup.id)}
                      >
                        <span className="sr-only">Supprimer</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2">
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          <line x1="10" x2="10" y1="11" y2="17" />
                          <line x1="14" x2="14" y1="11" y2="17" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4">
                  <Card className="bg-gray-900 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white">Créer une nouvelle sauvegarde</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {backupInProgress ? (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-white">Sauvegarde en cours...</span>
                            <span className="text-white">{progress}%</span>
                          </div>
                          <Progress value={progress} className="w-full h-2" />
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="flex-1">
                            <Label htmlFor="backup-name" className="sr-only">Nom de la sauvegarde</Label>
                            <Input
                              id="backup-name"
                              placeholder="Nom de la sauvegarde"
                              value={backupName}
                              onChange={(e) => setBackupName(e.target.value)}
                              className="bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                          <Button
                            onClick={startBackup}
                            className="bg-cyan-600 hover:bg-cyan-500 text-white"
                          >
                            Créer une sauvegarde
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-white">Maintenance de la base de données</CardTitle>
              <CardDescription className="text-gray-400">
                Optimisez les performances de votre base de données
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-white mb-1">Optimiser la base de données</h3>
                    <p className="text-sm text-gray-400">
                      Exécutez une optimisation pour améliorer les performances.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-cyan-600/30 text-cyan-400 hover:border-cyan-600/60 hover:text-cyan-300"
                    onClick={() => toast.success("Optimisation de la base de données terminée")}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Optimiser
                  </Button>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-white mb-1">Vérifier l'intégrité</h3>
                    <p className="text-sm text-gray-400">
                      Vérifiez l'intégrité des données dans la base de données.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-green-600/30 text-green-400 hover:border-green-600/60 hover:text-green-300"
                    onClick={() => toast.success("Vérification d'intégrité réussie")}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Vérifier
                  </Button>
                </div>
                
                <Alert className="bg-blue-900/20 border-blue-800 text-blue-300">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>
                    Il est recommandé d'effectuer une sauvegarde avant de lancer des opérations de maintenance.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="bg-gray-800 border-gray-700 shadow-lg sticky top-6">
            <CardHeader>
              <CardTitle className="text-white">Informations sur la base de données</CardTitle>
              <CardDescription className="text-gray-400">
                Statistiques et conseils
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Taille totale</span>
                  <span className="text-white font-medium">1.2 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Nombre de tables</span>
                  <span className="text-white font-medium">32</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Dernière sauvegarde</span>
                  <span className="text-white font-medium">20/12/2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Performance</span>
                  <span className="text-green-400 font-medium">Optimale</span>
                </div>
              </div>
              
              <div className="rounded-lg bg-cyan-900/20 p-4 border border-cyan-800">
                <h3 className="font-medium text-cyan-300 mb-2">Bonnes pratiques</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li className="flex gap-2 items-baseline">
                    <span className="bg-cyan-600 rounded-full w-1.5 h-1.5 inline-block mt-1 shrink-0"></span>
                    <span>Effectuez une sauvegarde quotidienne de vos données.</span>
                  </li>
                  <li className="flex gap-2 items-baseline">
                    <span className="bg-cyan-600 rounded-full w-1.5 h-1.5 inline-block mt-1 shrink-0"></span>
                    <span>Conservez au moins les 5 dernières sauvegardes.</span>
                  </li>
                  <li className="flex gap-2 items-baseline">
                    <span className="bg-cyan-600 rounded-full w-1.5 h-1.5 inline-block mt-1 shrink-0"></span>
                    <span>Optimisez la base de données mensuellement.</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
