import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction, CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
    >
      <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-800 shadow-lg backdrop-blur-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-gray-100 flex items-center gap-2">
              <Construction className="h-6 w-6 text-blue-400" />
              Chantiers
            </CardTitle>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="bg-gray-800/50 hover:bg-gray-700/50 text-gray-100 border-gray-700"
                >
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
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="p-4 rounded-lg bg-gray-800/30 backdrop-blur-sm border border-gray-700/50"
              >
                <h3 className="font-semibold mb-2 text-gray-200 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-400" />
                  Chantiers en cours
                </h3>
                <p className="text-2xl font-bold text-gray-100">12</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="p-4 rounded-lg bg-gray-800/30 backdrop-blur-sm border border-gray-700/50"
              >
                <h3 className="font-semibold mb-2 text-gray-200 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  Chantiers terminés
                </h3>
                <p className="text-2xl font-bold text-gray-100">45</p>
              </motion.div>
            </div>
            <ProjectListSection projects={mockProjects} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}