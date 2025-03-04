
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Edit2, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

// Mock data for positions and departments
const initialPositions = [
  { id: "1", name: "Chauffeur", department: "Transport", employees: 5 },
  { id: "2", name: "Opérateur Centrale", department: "Production", employees: 3 },
  { id: "3", name: "Technicien", department: "Maintenance", employees: 2 },
  { id: "4", name: "Responsable", department: "Administration", employees: 1 },
  { id: "5", name: "Commercial", department: "Ventes", employees: 3 },
  { id: "6", name: "Comptable", department: "Comptabilité", employees: 1 },
];

const initialDepartments = [
  { id: "1", name: "Transport", employees: 5 },
  { id: "2", name: "Production", employees: 3 },
  { id: "3", name: "Maintenance", employees: 2 },
  { id: "4", name: "Administration", employees: 1 },
  { id: "5", name: "Ventes", employees: 3 },
  { id: "6", name: "Comptabilité", employees: 1 },
];

export function EmployeePositions() {
  const [positions, setPositions] = useState(initialPositions);
  const [departments, setDepartments] = useState(initialDepartments);
  const [activeTab, setActiveTab] = useState("positions");
  
  const [showPositionDialog, setShowPositionDialog] = useState(false);
  const [showDepartmentDialog, setShowDepartmentDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  
  const [newPositionName, setNewPositionName] = useState("");
  const [newPositionDepartment, setNewPositionDepartment] = useState("");
  const [newDepartmentName, setNewDepartmentName] = useState("");
  
  const handleSavePosition = () => {
    if (!newPositionName || !newPositionDepartment) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    
    if (editingItem) {
      setPositions(positions.map(pos => 
        pos.id === editingItem.id 
          ? { ...pos, name: newPositionName, department: newPositionDepartment }
          : pos
      ));
      toast.success("Poste mis à jour avec succès");
    } else {
      const newPosition = {
        id: Date.now().toString(),
        name: newPositionName,
        department: newPositionDepartment,
        employees: 0
      };
      setPositions([...positions, newPosition]);
      toast.success("Nouveau poste créé avec succès");
    }
    
    resetPositionForm();
  };
  
  const handleSaveDepartment = () => {
    if (!newDepartmentName) {
      toast.error("Veuillez saisir un nom de département");
      return;
    }
    
    if (editingItem) {
      setDepartments(departments.map(dept => 
        dept.id === editingItem.id 
          ? { ...dept, name: newDepartmentName }
          : dept
      ));
      
      // Also update department name in positions
      setPositions(positions.map(pos => 
        pos.department === editingItem.name
          ? { ...pos, department: newDepartmentName }
          : pos
      ));
      
      toast.success("Département mis à jour avec succès");
    } else {
      const newDepartment = {
        id: Date.now().toString(),
        name: newDepartmentName,
        employees: 0
      };
      setDepartments([...departments, newDepartment]);
      toast.success("Nouveau département créé avec succès");
    }
    
    resetDepartmentForm();
  };
  
  const handleDeletePosition = (id: string) => {
    setPositions(positions.filter(pos => pos.id !== id));
    toast.success("Poste supprimé avec succès");
  };
  
  const handleDeleteDepartment = (id: string, name: string) => {
    // Check if department has positions
    const hasPositions = positions.some(pos => pos.department === name);
    if (hasPositions) {
      toast.error("Impossible de supprimer un département avec des postes associés");
      return;
    }
    
    setDepartments(departments.filter(dept => dept.id !== id));
    toast.success("Département supprimé avec succès");
  };
  
  const resetPositionForm = () => {
    setNewPositionName("");
    setNewPositionDepartment("");
    setEditingItem(null);
    setShowPositionDialog(false);
  };
  
  const resetDepartmentForm = () => {
    setNewDepartmentName("");
    setEditingItem(null);
    setShowDepartmentDialog(false);
  };
  
  const editPosition = (position: any) => {
    setEditingItem(position);
    setNewPositionName(position.name);
    setNewPositionDepartment(position.department);
    setShowPositionDialog(true);
  };
  
  const editDepartment = (department: any) => {
    setEditingItem(department);
    setNewDepartmentName(department.name);
    setShowDepartmentDialog(true);
  };
  
  return (
    <div>
      <div className="flex space-x-4 mb-6">
        <Button
          variant={activeTab === "positions" ? "default" : "outline"}
          onClick={() => setActiveTab("positions")}
        >
          Postes
        </Button>
        <Button
          variant={activeTab === "departments" ? "default" : "outline"}
          onClick={() => setActiveTab("departments")}
        >
          Départements
        </Button>
      </div>
      
      {activeTab === "positions" ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Liste des postes</h3>
            <Dialog open={showPositionDialog} onOpenChange={setShowPositionDialog}>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  setEditingItem(null);
                  setNewPositionName("");
                  setNewPositionDepartment("");
                }}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Nouveau poste
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 text-white border-gray-700">
                <DialogHeader>
                  <DialogTitle>{editingItem ? "Modifier le poste" : "Ajouter un poste"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="positionName">Nom du poste</Label>
                    <Input 
                      id="positionName" 
                      value={newPositionName} 
                      onChange={(e) => setNewPositionName(e.target.value)}
                      placeholder="Saisir le nom du poste"
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="positionDepartment">Département</Label>
                    <select 
                      id="positionDepartment"
                      value={newPositionDepartment}
                      onChange={(e) => setNewPositionDepartment(e.target.value)}
                      className="w-full h-10 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      <option value="" disabled>Sélectionner un département</option>
                      {departments.map(dept => (
                        <option key={dept.id} value={dept.name}>{dept.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={resetPositionForm}>Annuler</Button>
                  <Button onClick={handleSavePosition}>{editingItem ? "Mettre à jour" : "Ajouter"}</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="space-y-4">
            {positions.map((position) => (
              <div 
                key={position.id} 
                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-white">{position.name}</h4>
                  <p className="text-sm text-gray-400">Département: {position.department}</p>
                  <p className="text-sm text-gray-400">{position.employees} employé(s)</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => editPosition(position)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-red-500 hover:text-red-600 hover:bg-red-900/20"
                    onClick={() => handleDeletePosition(position.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Liste des départements</h3>
            <Dialog open={showDepartmentDialog} onOpenChange={setShowDepartmentDialog}>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  setEditingItem(null);
                  setNewDepartmentName("");
                }}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Nouveau département
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 text-white border-gray-700">
                <DialogHeader>
                  <DialogTitle>{editingItem ? "Modifier le département" : "Ajouter un département"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="departmentName">Nom du département</Label>
                    <Input 
                      id="departmentName" 
                      value={newDepartmentName} 
                      onChange={(e) => setNewDepartmentName(e.target.value)}
                      placeholder="Saisir le nom du département"
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={resetDepartmentForm}>Annuler</Button>
                  <Button onClick={handleSaveDepartment}>{editingItem ? "Mettre à jour" : "Ajouter"}</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="space-y-4">
            {departments.map((department) => (
              <div 
                key={department.id} 
                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-white">{department.name}</h4>
                  <p className="text-sm text-gray-400">{department.employees} employé(s)</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => editDepartment(department)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-red-500 hover:text-red-600 hover:bg-red-900/20"
                    onClick={() => handleDeleteDepartment(department.id, department.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
