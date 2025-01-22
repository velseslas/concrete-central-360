import { motion } from "framer-motion";
import { Construction } from "lucide-react";

interface Project {
  id: number;
  name: string;
  client: string;
  status: string;
  concreteQuantity: string;
}

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
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

  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
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
              <div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}