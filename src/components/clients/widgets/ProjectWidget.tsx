import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProjectList } from "./ProjectList";
import { useState } from "react";
import { ProjectForm } from "../../projects/ProjectForm";

export function ProjectWidget() {
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const handleEdit = (project: any) => {
    setSelectedProject(project);
    setShowNewProjectForm(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Chantiers</CardTitle>
        <Button onClick={() => setShowNewProjectForm(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nouveau chantier
        </Button>
      </CardHeader>
      <CardContent>
        <ProjectList onEdit={handleEdit} />
      </CardContent>

      <ProjectForm 
        open={showNewProjectForm} 
        onOpenChange={setShowNewProjectForm}
        projectToEdit={selectedProject}
        clientId={1}
      />
    </Card>
  );
}