
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Construction } from "lucide-react";

interface Project {
  id: number;
  clientName: string;
  name: string;
  address: string;
  volume: string;
}

interface ProjectListProps {
  onEdit: (project: Project) => void;
}

const mockProjects: Project[] = [
  {
    id: 1,
    clientName: "Client A",
    name: "Projet A",
    address: "123 Rue Principale",
    volume: "500m³",
  },
  {
    id: 2,
    clientName: "Client B",
    name: "Projet B",
    address: "456 Avenue Secondaire",
    volume: "750m³",
  },
];

export function ProjectList({ onEdit }: ProjectListProps) {
  const handleDelete = (projectId: number) => {
    console.log("Delete project:", projectId);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {mockProjects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-[#101422] rounded-lg p-6 border border-[#1F2232] hover:border-[#7C3AED] transition-all"
        >
          <div className="flex items-start mb-4">
            <div className="h-10 w-10 flex items-center justify-center rounded-md bg-[#1F2232] text-[#7C3AED] mr-3">
              <Construction className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">{project.name}</h3>
              <p className="text-sm text-gray-400 mt-1">Client: {project.clientName}</p>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-300">Adresse: {project.address}</p>
            <p className="text-sm text-gray-300">Volume: {project.volume}</p>
          </div>
          
          <div className="flex justify-between items-center">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
              onClick={() => handleDelete(project.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer
            </Button>
            <Button 
              variant="ghost" 
              className="text-[#7C3AED] hover:text-[#6D28D9] hover:bg-[#7C3AED]/10"
              onClick={() => onEdit(project)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
