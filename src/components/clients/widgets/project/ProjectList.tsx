import { useState } from "react";
import { motion } from "framer-motion";
import { Construction, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProjectFormDialog } from "../ProjectFormDialog";

interface Project {
  id: number;
  name: string;
  client: string;
  status: string;
  concreteQuantity: string;
  createdAt: string;
}

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "en cours":
        return "bg-yellow-500/20 text-yellow-400";
      case "terminé":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const handleProjectClick = (project: Project) => {
    console.log("Project clicked:", project);
    setSelectedProject(project);
    setPreviewOpen(true);
  };

  const mockClients = [
    { id: "1", name: "Client A" },
    { id: "2", name: "Client B" },
    { id: "3", name: "Client C" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsNewProjectOpen(true)}
          className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 border-indigo-500/30"
        >
          <Construction className="h-4 w-4 mr-2" />
          Nouveau Chantier
        </Button>
      </div>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => handleProjectClick(project)}
            className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-white font-medium flex items-center gap-2">
                  <Construction className="h-4 w-4 text-blue-400" />
                  {project.name}
                </h3>
                <p className="text-gray-400 text-sm">Client: {project.client}</p>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                <div className="text-right">
                  <p className="text-white font-medium">{project.concreteQuantity} m³</p>
                  <p className="text-gray-400 text-sm">Volume de béton</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl bg-gray-900/95 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Aperçu du Chantier
            </DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-6 p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400">Nom du Chantier</h4>
                    <p className="text-lg text-white">{selectedProject.name}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400">Client</h4>
                    <p className="text-lg text-white">{selectedProject.client}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400">Volume de Béton</h4>
                    <p className="text-lg text-white">{selectedProject.concreteQuantity} m³</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400">Statut</h4>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-1 ${getStatusColor(selectedProject.status)}`}>
                      {selectedProject.status}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Date de Création</h4>
                <p className="text-lg text-white">
                  {new Date(selectedProject.createdAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ProjectFormDialog 
        open={isNewProjectOpen} 
        onOpenChange={setIsNewProjectOpen}
        clients={mockClients}
      />
    </div>
  );
}