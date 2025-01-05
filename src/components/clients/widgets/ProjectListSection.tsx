import { motion } from "framer-motion";
import { Clock, CheckCircle } from "lucide-react";

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
      <div className="space-y-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-4 rounded-lg bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/30 transition-colors"
          >
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h4 className="font-medium text-gray-100">{project.name}</h4>
                <p className="text-sm text-gray-400">
                  Client: {project.client} - {project.concreteQuantity}m³
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs border flex items-center gap-2 ${getStatusColor(project.status)}`}>
                {getStatusIcon(project.status)}
                {project.status}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}