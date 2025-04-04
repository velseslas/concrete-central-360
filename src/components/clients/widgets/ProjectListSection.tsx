
import { motion } from "framer-motion";
import { Clock, CheckCircle, Construction, User, ChartBar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ProjectFormDialog } from "./ProjectFormDialog";

interface Project {
  id: number;
  name: string;
  client: string;
  status: string;
  concreteQuantity: string;
}

interface ProjectListSectionProps {
  projects: Project[];
}

export function ProjectListSection({ projects = [] }: ProjectListSectionProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "en cours":
        return <Clock className="h-4 w-4 text-blue-400" />;
      case "terminé":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "en cours":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "terminé":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="h-full bg-gray-900/95 p-6 rounded-lg border border-gray-700/50">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Chantiers du client
        </h2>
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nouveau chantier
        </Button>
      </div>

      {projects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-64 flex items-center justify-center flex-col p-6 rounded-lg border border-dashed border-gray-700/50 text-center"
        >
          <Construction className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-300 mb-2">Aucun chantier</h3>
          <p className="text-gray-400 mb-6 max-w-md">
            Ce client n'a pas encore de chantier. Vous pouvez créer un nouveau chantier en cliquant sur le bouton ci-dessous.
          </p>
          <Button 
            onClick={() => setIsFormOpen(true)}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Créer un chantier
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 hover:border-[#7C3AED] transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Construction className="h-5 w-5 text-[#9b87f5]" />
                  <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-gray-300">
                    <User className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-sm">Client: {project.client}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <ChartBar className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-sm">Quantité: {project.concreteQuantity}m³</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <span className={`px-3 py-1 rounded-full text-xs flex items-center gap-2 w-fit ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)}
                    {project.status}
                  </span>
                </div>
                
                <Button 
                  variant="ghost" 
                  className="w-full mt-2 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
                >
                  Voir les détails
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl bg-gray-900/95 border border-gray-700/50">
          <ProjectFormDialog 
            onSuccess={() => setIsFormOpen(false)}
            clientId={1} // This would come from the parent component in a real scenario
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
