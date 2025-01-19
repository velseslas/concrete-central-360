import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Construction, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { ProjectFormDialog } from "./ProjectFormDialog";
import { ProjectListSection } from "./ProjectListSection";

// Mock data for demonstration
const mockClients = [
  { id: "1", name: "Client A" },
  { id: "2", name: "Client B" },
  { id: "3", name: "Client C" },
];

const mockProjects = [
  { id: 1, name: "Chantier 1", client: "Client A", status: "En cours", concreteQuantity: "150" },
  { id: 2, name: "Chantier 2", client: "Client B", status: "En cours", concreteQuantity: "200" },
  { id: 3, name: "Chantier 3", client: "Client C", status: "Terminé", concreteQuantity: "300" },
];

export function ProjectWidget() {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-white flex items-center gap-2">
              <Construction className="h-6 w-6 text-blue-400" />
              Liste des Chantiers
            </CardTitle>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Rechercher un chantier..." 
                  className="pl-9 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400"
                />
              </div>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-white bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/50">
                    <Plus className="h-4 w-4 mr-2" />
                    Nouveau Chantier
                  </Button>
                </DialogTrigger>
                <ProjectFormDialog 
                  open={open} 
                  onOpenChange={setOpen}
                  clients={mockClients}
                />
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
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
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        project.status === "Terminé" ? "bg-green-500/20 text-green-400" :
                        "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}