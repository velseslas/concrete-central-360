
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Construction, MapPin, ChartBar, User } from "lucide-react";

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {mockProjects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-[#101422] rounded-lg p-6 hover:border-[#7C3AED] transition-all"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Construction className="h-5 w-5 text-[#9b87f5]" />
              <h3 className="text-xl font-semibold text-white">{project.name}</h3>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <User className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-sm">Client: {project.clientName}</span>
              </div>
              
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-sm">Adresse: {project.address}</span>
              </div>
              
              <div className="flex items-center text-gray-300">
                <ChartBar className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-sm">Volume: {project.volume}</span>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              className="w-full mt-2 bg-[#1e293b] hover:bg-[#334155] text-white"
              onClick={() => onEdit(project)}
            >
              Voir les détails
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
