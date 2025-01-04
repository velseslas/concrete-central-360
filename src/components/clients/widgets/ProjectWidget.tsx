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
      <Card className="bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white flex items-center gap-2">
              <Construction className="h-6 w-6" />
              Chantiers
            </CardTitle>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/20">
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
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <h3 className="font-semibold mb-2 text-white flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Chantiers en cours
                </h3>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
              <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <h3 className="font-semibold mb-2 text-white flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Chantiers terminés
                </h3>
                <p className="text-2xl font-bold text-white">45</p>
              </div>
            </div>
            <ProjectListSection projects={mockProjects} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}