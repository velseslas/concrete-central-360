
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Employee, Client, Project } from "../types";

interface SalesVolumeDialogProps {
  employees: Employee[];
  clients: Client[];
  projects: Project[];
  filteredProjects: Project[];
  selectedEmployee: Employee | null;
  selectedClient: string;
  selectedProject: string;
  salesMonth: string;
  salesVolume: string;
  onEmployeeChange: (employee: Employee | null) => void;
  onClientChange: (clientId: string) => void;
  onProjectChange: (projectId: string) => void;
  onMonthChange: (month: string) => void;
  onVolumeChange: (volume: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export function SalesVolumeDialog({
  employees,
  clients,
  projects,
  filteredProjects,
  selectedEmployee,
  selectedClient,
  selectedProject,
  salesMonth,
  salesVolume,
  onEmployeeChange,
  onClientChange,
  onProjectChange,
  onMonthChange,
  onVolumeChange,
  onSubmit,
  onCancel
}: SalesVolumeDialogProps) {
  return (
    <DialogContent className="bg-gray-800 text-white border-gray-700">
      <DialogHeader>
        <DialogTitle className="text-white">
          Enregistrer un volume de vente
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="sales-employee">Vendeur</Label>
          <select 
            id="sales-employee"
            className="w-full rounded-md border border-gray-700 bg-gray-700 p-2"
            value={selectedEmployee?.id || ""}
            onChange={(e) => {
              const selected = employees.find(emp => emp.id === e.target.value);
              onEmployeeChange(selected || null);
            }}
          >
            <option value="">Sélectionner un vendeur</option>
            {employees
              .filter(emp => emp.position === "Commercial")
              .map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="client">Client</Label>
          <select 
            id="client"
            className="w-full rounded-md border border-gray-700 bg-gray-700 p-2"
            value={selectedClient}
            onChange={(e) => onClientChange(e.target.value)}
          >
            <option value="">Sélectionner un client</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="project">Chantier</Label>
          <select 
            id="project"
            className="w-full rounded-md border border-gray-700 bg-gray-700 p-2"
            value={selectedProject}
            onChange={(e) => onProjectChange(e.target.value)}
            disabled={!selectedClient}
          >
            <option value="">Sélectionner un chantier</option>
            {filteredProjects.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sales-month">Mois</Label>
          <Input 
            id="sales-month" 
            type="month" 
            value={salesMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="bg-gray-700 border-gray-600"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sales-volume">Volume vendu (m³)</Label>
          <Input 
            id="sales-volume" 
            type="number" 
            value={salesVolume}
            onChange={(e) => onVolumeChange(e.target.value)}
            placeholder="Volume en mètres cubes" 
            className="bg-gray-700 border-gray-600"
          />
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="bg-gray-700 hover:bg-gray-600 border-gray-600"
        >
          Annuler
        </Button>
        <Button 
          onClick={onSubmit}
          className="bg-[#9b87f5] hover:bg-[#8a76e5]"
        >
          Enregistrer
        </Button>
      </div>
    </DialogContent>
  );
}
