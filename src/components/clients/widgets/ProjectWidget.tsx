
import { useState } from "react";
import { motion } from "framer-motion";
import { Construction, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ProjectFormDialog } from "./ProjectFormDialog";
import { ProjectList } from "./ProjectList";
import { ProjectFilters } from "./project/ProjectFilters";
import { ProjectStats } from "./project/ProjectStats";

// Mock data for projects
const mockProjects = [
  {
    id: 1,
    name: "Projet Résidentiel Alger",
    client: "SARL Construction",
    status: "En cours",
    concreteQuantity: "250",
    createdAt: "2023-01-15",
  },
  {
    id: 2,
    name: "Construction Centre Commercial",
    client: "SPA Promotech",
    status: "Terminé",
    concreteQuantity: "800",
    createdAt: "2022-09-10",
  },
  {
    id: 3,
    name: "Rénovation Bureaux",
    client: "EURL Architectura",
    status: "En cours",
    concreteQuantity: "150",
    createdAt: "2023-04-22",
  },
];

// Mock data for client options
const mockClients = [
  { id: "1", name: "SARL Construction" },
  { id: "2", name: "SPA Promotech" },
  { id: "3", name: "EURL Architectura" },
];

interface ProjectWidgetProps {
  clientId: number | null;
}

export function ProjectWidget({ clientId }: ProjectWidgetProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedClient, setSelectedClient] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  
  // Filter projects based on search query and filters
  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesYear = selectedYear === "all" || 
                       new Date(project.createdAt).getFullYear().toString() === selectedYear;
    
    const matchesClient = selectedClient === "all" || 
                         mockClients.find(c => c.id === selectedClient)?.name === project.client;
    
    const matchesStatus = selectedStatus === "all" || project.status === selectedStatus;
    
    return matchesSearch && matchesYear && matchesClient && matchesStatus;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Construction className="h-5 w-5 text-blue-400" />
          Gestion des Chantiers
        </h2>
        
        <Dialog open={formOpen} onOpenChange={setFormOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 border border-white/20 transition-colors"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouveau chantier
            </Button>
          </DialogTrigger>
          <ProjectFormDialog onOpenChange={setFormOpen} />
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Rechercher un chantier..." 
            className="pl-9 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <ProjectFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          clients={mockClients}
          showSearchOnly={false}
          projects={filteredProjects}
        />
      </div>
      
      <ProjectStats projects={mockProjects} />
      
      <ProjectList projects={filteredProjects} />
    </motion.div>
  );
}
