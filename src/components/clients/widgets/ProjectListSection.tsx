
import { motion } from "framer-motion";
import { Clock, CheckCircle, Construction } from "lucide-react";

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
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-200">Liste des chantiers</h3>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {projects.map((project, index) => (
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
                <p className="text-sm text-gray-400 mt-1">
                  Client: {project.client} - {project.concreteQuantity}m³
                </p>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <div className={`px-3 py-1 rounded-full text-xs flex items-center gap-2 ${getStatusColor(project.status)}`}>
                {getStatusIcon(project.status)}
                {project.status}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
