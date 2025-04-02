
import { motion } from "framer-motion";
import { Clock, CheckCircle, Construction, User, ChartBar } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export function ProjectListSection({ projects }: ProjectListSectionProps) {
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "en cours":
        return <Clock className="h-4 w-4 text-blue-400" />;
      case "terminé":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "en cours":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "terminé":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="rounded-lg p-6 hover:border-[#7C3AED] transition-all"
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
              <span className={`px-3 py-1 rounded-full text-xs flex items-center gap-2 ${getStatusColor(project.status)}`}>
                {getStatusIcon(project.status)}
                {project.status}
              </span>
            </div>
            
            <Button 
              variant="ghost" 
              className="w-full mt-2 bg-[#1e293b] hover:bg-[#334155] text-white"
            >
              Voir les détails
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
