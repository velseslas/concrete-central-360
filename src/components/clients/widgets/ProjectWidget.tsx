import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { ProjectFormDialog } from "./ProjectFormDialog";
import { ProjectFilters } from "./project/ProjectFilters";
import { ProjectList } from "./project/ProjectList";

// Mock data for demonstration
const mockClients = [
  { id: "1", name: "Client A" },
  { id: "2", name: "Client B" },
  { id: "3", name: "Client C" },
];

const mockProjects = [
  { 
    id: 1, 
    name: "Chantier 1", 
    client: "Client A", 
    status: "En cours", 
    concreteQuantity: "150",
    createdAt: new Date("2024-01-15").toISOString()
  },
  { 
    id: 2, 
    name: "Chantier 2", 
    client: "Client B", 
    status: "En cours", 
    concreteQuantity: "200",
    createdAt: new Date("2024-02-01").toISOString()
  },
  { 
    id: 3, 
    name: "Chantier 3", 
    client: "Client C", 
    status: "Terminé", 
    concreteQuantity: "300",
    createdAt: new Date("2024-03-10").toISOString()
  },
];

export function ProjectWidget() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedClient, setSelectedClient] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.status.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClient = selectedClient === "all" || project.client === mockClients.find(c => c.id === selectedClient)?.name;
    const matchesStatus = selectedStatus === "all" || project.status === selectedStatus;
    const matchesYear = selectedYear === "all" || new Date(project.createdAt).getFullYear().toString() === selectedYear;

    return matchesSearch && matchesClient && matchesStatus && matchesYear;
  });

  console.log("Filters:", { searchQuery, selectedYear, selectedClient, selectedStatus });
  console.log("Filtered projects:", filteredProjects);

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
            <div className="flex items-center gap-4 w-full md:w-auto">
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
                showSearchOnly={true}
              />
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 border-white transition-colors whitespace-nowrap"
                  >
                    <Construction className="h-4 w-4 mr-2" />
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
        <CardContent className="space-y-6">
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
          />
          <ProjectList projects={filteredProjects} />
        </CardContent>
      </Card>
    </motion.div>
  );
}