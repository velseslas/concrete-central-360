import { Card, CardContent } from "@/components/ui/card";
import { Construction, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface Project {
  id: number;
  name: string;
  client: string;
  status: string;
  concreteQuantity: string;
  createdAt: string;
}

interface ProjectStatsProps {
  projects: Project[];
}

export function ProjectStats({ projects }: ProjectStatsProps) {
  const totalProjects = projects.length;
  const ongoingProjects = projects.filter(p => p.status.toLowerCase() === "en cours").length;
  const completedProjects = projects.filter(p => p.status.toLowerCase() === "terminé").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Chantiers</p>
                <p className="text-3xl font-bold text-white mt-2">{totalProjects}</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-full">
                <Construction className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Chantiers en Cours</p>
                <p className="text-3xl font-bold text-white mt-2">{ongoingProjects}</p>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-full">
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Chantiers Terminés</p>
                <p className="text-3xl font-bold text-white mt-2">{completedProjects}</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}