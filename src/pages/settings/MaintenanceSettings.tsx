
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, ArrowLeft, Calendar, Save, PlusCircle, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  date: string;
  status: "pending" | "completed" | "overdue";
  type: "periodic" | "corrective" | "preventive";
  assignedTo: string;
}

export default function MaintenanceSettings() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");
  
  const [maintenanceTasks, setMaintenanceTasks] = useState<MaintenanceTask[]>([
    { 
      id: "1", 
      title: "Maintenance pompe centrale 1",
      description: "Vérification et nettoyage des pompes à béton",
      date: "2023-12-25",
      status: "pending",
      type: "periodic",
      assignedTo: "Équipe technique"
    },
    { 
      id: "2", 
      title: "Inspection tapis roulant",
      description: "Inspection complète du système de tapis roulant et remplacement des pièces usées",
      date: "2023-12-22",
      status: "pending",
      type: "preventive",
      assignedTo: "Équipe mécanique"
    },
    { 
      id: "3", 
      title: "Calibration des balances",
      description: "Recalibration des balances pour les matières premières",
      date: "2023-12-15",
      status: "completed",
      type: "periodic",
      assignedTo: "Technicien spécialisé"
    },
    { 
      id: "4", 
      title: "Réparation malaxeur 2",
      description: "Remplacement des pales endommagées du malaxeur 2",
      date: "2023-12-10",
      status: "completed",
      type: "corrective",
      assignedTo: "Équipe maintenance"
    },
    { 
      id: "5", 
      title: "Nettoyage des silos",
      description: "Nettoyage complet des silos de ciment et vérification des capteurs",
      date: "2023-12-05",
      status: "completed",
      type: "periodic",
      assignedTo: "Équipe nettoyage industriel"
    },
  ]);
  
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    date: "",
    type: "periodic",
    assignedTo: ""
  });

  // Filter tasks based on active tab
  const filteredTasks = maintenanceTasks.filter(task => {
    if (activeTab === "upcoming") {
      return task.status === "pending";
    } else if (activeTab === "completed") {
      return task.status === "completed";
    } else if (activeTab === "all") {
      return true;
    }
    return false;
  });

  const handleAddTask = () => {
    if (!newTask.title || !newTask.date || !newTask.assignedTo) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    const newTaskItem: MaintenanceTask = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      date: newTask.date,
      status: "pending",
      type: newTask.type as "periodic" | "corrective" | "preventive",
      assignedTo: newTask.assignedTo
    };
    
    setMaintenanceTasks([newTaskItem, ...maintenanceTasks]);
    setNewTask({
      title: "",
      description: "",
      date: "",
      type: "periodic",
      assignedTo: ""
    });
    
    toast.success("Tâche de maintenance ajoutée avec succès");
  };

  const handleCompleteTask = (id: string) => {
    setMaintenanceTasks(maintenanceTasks.map(task => {
      if (task.id === id) {
        return { ...task, status: "completed" };
      }
      return task;
    }));
    
    toast.success("Tâche marquée comme terminée");
  };

  const handleDeleteTask = (id: string) => {
    setMaintenanceTasks(maintenanceTasks.filter(task => task.id !== id));
    toast.success("Tâche supprimée avec succès");
  };

  const getStatusBadge = (status: MaintenanceTask["status"]) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-600">En attente</Badge>;
      case "completed":
        return <Badge className="bg-green-600">Terminé</Badge>;
      case "overdue":
        return <Badge className="bg-red-600">En retard</Badge>;
      default:
        return null;
    }
  };

  const getTypeBadge = (type: MaintenanceTask["type"]) => {
    switch (type) {
      case "periodic":
        return <Badge variant="outline" className="border-blue-500 text-blue-400">Périodique</Badge>;
      case "corrective":
        return <Badge variant="outline" className="border-red-500 text-red-400">Corrective</Badge>;
      case "preventive":
        return <Badge variant="outline" className="border-green-500 text-green-400">Préventive</Badge>;
      default:
        return null;
    }
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
            <div className="p-3 rounded-lg bg-rose-100">
              <Wrench className="h-6 w-6 text-rose-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Maintenance</h1>
              <p className="text-gray-400 mt-1">Planification de maintenance</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-white">Calendrier de maintenance</CardTitle>
            <CardDescription className="text-gray-400">
              Gérez les tâches de maintenance programmées
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex justify-between items-center mb-4">
                <TabsList className="bg-gray-900 border border-gray-700">
                  <TabsTrigger 
                    value="upcoming" 
                    className="data-[state=active]:bg-rose-600 data-[state=active]:text-white"
                  >
                    À venir
                  </TabsTrigger>
                  <TabsTrigger 
                    value="completed" 
                    className="data-[state=active]:bg-rose-600 data-[state=active]:text-white"
                  >
                    Terminées
                  </TabsTrigger>
                  <TabsTrigger 
                    value="all" 
                    className="data-[state=active]:bg-rose-600 data-[state=active]:text-white"
                  >
                    Toutes
                  </TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Tri: </span>
                  <select className="bg-gray-900 border border-gray-700 rounded-md text-white py-1 px-2">
                    <option value="date-desc">Date (récent)</option>
                    <option value="date-asc">Date (ancien)</option>
                    <option value="type">Type</option>
                  </select>
                </div>
              </div>
              
              <TabsContent value="upcoming" className="mt-0">
                <div className="space-y-4">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                      <TaskCard 
                        key={task.id} 
                        task={task}
                        onComplete={handleCompleteTask}
                        onDelete={handleDeleteTask}
                        getStatusBadge={getStatusBadge}
                        getTypeBadge={getTypeBadge}
                      />
                    ))
                  ) : (
                    <div className="p-4 bg-gray-900 rounded-lg text-center">
                      <p className="text-gray-400">Aucune tâche à venir</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="completed" className="mt-0">
                <div className="space-y-4">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                      <TaskCard 
                        key={task.id} 
                        task={task}
                        onComplete={handleCompleteTask}
                        onDelete={handleDeleteTask}
                        getStatusBadge={getStatusBadge}
                        getTypeBadge={getTypeBadge}
                      />
                    ))
                  ) : (
                    <div className="p-4 bg-gray-900 rounded-lg text-center">
                      <p className="text-gray-400">Aucune tâche terminée</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="all" className="mt-0">
                <div className="space-y-4">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                      <TaskCard 
                        key={task.id} 
                        task={task}
                        onComplete={handleCompleteTask}
                        onDelete={handleDeleteTask}
                        getStatusBadge={getStatusBadge}
                        getTypeBadge={getTypeBadge}
                      />
                    ))
                  ) : (
                    <div className="p-4 bg-gray-900 rounded-lg text-center">
                      <p className="text-gray-400">Aucune tâche trouvée</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">Ajouter une nouvelle tâche de maintenance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="task-title" className="text-white mb-1 block">
                        Titre de la tâche *
                      </Label>
                      <Input
                        id="task-title"
                        value={newTask.title}
                        onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                        placeholder="Ex: Maintenance pompe centrale"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="task-assigned" className="text-white mb-1 block">
                        Assigné à *
                      </Label>
                      <Input
                        id="task-assigned"
                        value={newTask.assignedTo}
                        onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                        placeholder="Ex: Équipe technique"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="task-date" className="text-white mb-1 block">
                        Date prévue *
                      </Label>
                      <Input
                        id="task-date"
                        type="date"
                        value={newTask.date}
                        onChange={(e) => setNewTask({...newTask, date: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="task-type" className="text-white mb-1 block">
                        Type de maintenance
                      </Label>
                      <select
                        id="task-type"
                        value={newTask.type}
                        onChange={(e) => setNewTask({...newTask, type: e.target.value})}
                        className="w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2"
                      >
                        <option value="periodic">Périodique</option>
                        <option value="preventive">Préventive</option>
                        <option value="corrective">Corrective</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor="task-description" className="text-white mb-1 block">
                        Description
                      </Label>
                      <Textarea
                        id="task-description"
                        value={newTask.description}
                        onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                        placeholder="Décrivez la tâche de maintenance..."
                        className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button 
                      onClick={handleAddTask}
                      className="bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1"
                    >
                      <PlusCircle className="h-4 w-4" />
                      <span>Ajouter la tâche</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-400" />
                Maintenance périodique
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-4">
                Tâches de maintenance planifiées à des intervalles réguliers pour maintenir les équipements en bon état de fonctionnement.
              </p>
              <Alert className="bg-blue-900/20 border-blue-800 text-blue-300">
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  Programmez des maintenances périodiques pour éviter les pannes imprévues.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-green-400" />
                Maintenance préventive
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-4">
                Actions préventives visant à anticiper et prévenir les problèmes avant qu'ils ne surviennent.
              </p>
              <Alert className="bg-green-900/20 border-green-800 text-green-300">
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  La maintenance préventive réduit les temps d'arrêt et prolonge la durée de vie des équipements.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Wrench className="h-5 w-5 text-red-400" />
                Maintenance corrective
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-4">
                Interventions réalisées suite à une panne ou un dysfonctionnement pour rétablir le fonctionnement normal.
              </p>
              <Alert className="bg-red-900/20 border-red-800 text-red-300">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Minimisez les maintenances correctives en renforçant vos programmes préventifs.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface TaskCardProps {
  task: MaintenanceTask;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  getStatusBadge: (status: MaintenanceTask["status"]) => React.ReactNode;
  getTypeBadge: (type: MaintenanceTask["type"]) => React.ReactNode;
}

function TaskCard({ task, onComplete, onDelete, getStatusBadge, getTypeBadge }: TaskCardProps) {
  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-medium text-white text-lg">{task.title}</h3>
              {getStatusBadge(task.status)}
              {getTypeBadge(task.type)}
            </div>
            
            <p className="text-gray-300 text-sm mb-4">{task.description}</p>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-2 text-sm text-gray-400">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Date: {new Date(task.date).toLocaleDateString('fr-FR')}
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user mr-1">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Assigné à: {task.assignedTo}
              </div>
            </div>
          </div>
          
          <div className="flex md:flex-col gap-2 justify-end">
            {task.status !== "completed" && (
              <Button 
                variant="outline" 
                size="sm"
                className="border-green-600/30 text-green-400 hover:border-green-600/60 hover:text-green-300"
                onClick={() => onComplete(task.id)}
              >
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Terminé
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm"
              className="border-gray-700 text-gray-300 hover:text-white"
              onClick={() => onDelete(task.id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2 h-4 w-4 mr-1">
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </svg>
              Supprimer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
