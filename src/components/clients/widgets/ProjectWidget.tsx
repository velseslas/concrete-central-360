import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProjectList } from "./ProjectList";
import { useState } from "react";
import { ProjectFormDialog } from "./ProjectFormDialog";

interface Project {
  id: number;
  clientName: string;
  name: string;
  address: string;
  volume: string;
}

export function ProjectWidget() {
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);

  const handleEditProject = (project: Project) => {
    console.log("Editing project:", project);
  };

  // Mock clients data
  const mockClients = [
    { id: "1", name: "Client A" },
    { id: "2", name: "Client B" },
  ];

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-xl font-bold">Chantiers</CardTitle>
        <Button 
          onClick={() => setShowNewProjectForm(true)}
          className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 border-indigo-500/20 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nouveau Chantier
        </Button>
      </CardHeader>
      <CardContent>
        <ProjectList onEdit={handleEditProject} />
      </CardContent>

      <ProjectFormDialog
        open={showNewProjectForm}
        onOpenChange={setShowNewProjectForm}
        clients={mockClients}
      />
    </Card>
  );
}