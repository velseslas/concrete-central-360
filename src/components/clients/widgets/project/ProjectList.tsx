import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Archive, Clock, CheckCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

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
  const [projectStatuses, setProjectStatuses] = useState<{ [key: number]: string }>({});

  const handleStatusChange = (projectId: number, newStatus: string) => {
    setProjectStatuses(prev => ({
      ...prev,
      [projectId]: newStatus
    }));
    console.log(`Status changed for project ${projectId} to ${newStatus}`);
    toast.success("Statut du chantier mis à jour");
  };

  const handleArchive = (project: Project) => {
    console.log("Archiving project:", project);
    toast.success("Chantier archivé avec succès");
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "en cours":
        return <Clock className="h-4 w-4 text-blue-400" />;
      case "terminé":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "archivé":
        return <Archive className="h-4 w-4 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                  <p className="text-sm text-gray-400">{project.client}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Select
                    value={projectStatuses[project.id] || project.status}
                    onValueChange={(value) => handleStatusChange(project.id, value)}
                  >
                    <SelectTrigger className="w-[140px] bg-gray-700/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="en cours">En cours</SelectItem>
                      <SelectItem value="terminé">Terminé</SelectItem>
                      <SelectItem value="archivé">Archivé</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleArchive(project)}
                    disabled={(projectStatuses[project.id] || project.status) !== "terminé"}
                  >
                    <Archive className="h-4 w-4 mr-2" />
                    Archiver
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Volume: {project.concreteQuantity}m³</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(projectStatuses[project.id] || project.status)}
                  <span className="text-gray-300">
                    {projectStatuses[project.id] || project.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}