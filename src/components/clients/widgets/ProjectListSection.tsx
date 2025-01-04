import { motion } from "framer-motion";

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
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-white">Liste des chantiers</h3>
      <div className="space-y-2">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex justify-between items-center"
          >
            <div>
              <p className="font-medium text-white">{project.name}</p>
              <p className="text-sm text-white/80">
                Client: {project.client} - {project.concreteQuantity}m³
              </p>
            </div>
            <span className="px-2 py-1 rounded-full text-xs bg-white/20 text-white border border-white/30">
              {project.status}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}