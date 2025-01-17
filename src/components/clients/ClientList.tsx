import { useState } from "react";
import { ClientForm } from "./ClientForm";
import { DocumentsWidget } from "./widgets/DocumentsWidget";
import { ClientTable } from "./ClientTable";
import { Button } from "../ui/button";
import { UserPlus, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Sheet, SheetContent } from "../ui/sheet";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ProjectListSection } from "./widgets/ProjectListSection";

const mockClients = [
  {
    id: 1,
    nom: "Entreprise ABC",
    raisonSociale: "ABC SARL",
    telephone: "0123456789",
    email: "contact@abc.com",
    adresse: "123 Rue Principale",
    ville: "Alger",
    codePostal: "16000",
    nif: "123456789",
    nis: "987654321",
    numeroArticle: "ART123",
    categorieClient: "entreprise",
  },
];

// Mock projects data
const mockProjects = [
  {
    id: 1,
    name: "Projet Construction A",
    client: "Entreprise ABC",
    status: "En cours",
    concreteQuantity: "500",
  },
  {
    id: 2,
    name: "Projet Construction B",
    client: "Entreprise ABC",
    status: "Terminé",
    concreteQuantity: "750",
  },
];

const ClientList = () => {
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [showProjectList, setShowProjectList] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [isNewClientDialogOpen, setIsNewClientDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (clientId: number) => {
    console.log("Deleting client:", clientId);
  };

  const handleEdit = (client: any) => {
    setSelectedClient(client);
  };

  const handleViewProjects = (client: any) => {
    setSelectedClient(client);
    setShowProjectList(true);
  };

  const handleDocumentUpload = (client: any) => {
    setSelectedClient(client);
    setShowDocuments(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-800 shadow-xl">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-white flex items-center gap-2">
              <UserPlus className="h-6 w-6 text-purple-400" />
              Liste des Clients
            </CardTitle>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Rechercher un client..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-gray-800/30 border-gray-700/50 text-white placeholder-gray-400"
                />
              </div>
              <Dialog open={isNewClientDialogOpen} onOpenChange={setIsNewClientDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => setIsNewClientDialogOpen(true)}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Nouveau client
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[800px] max-h-[90vh] overflow-y-auto bg-gray-900/95 border-gray-700/50">
                  <ClientForm onSuccess={() => setIsNewClientDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 rounded-lg shadow-xl border border-gray-700/50 backdrop-blur-xl"
          >
            <ClientTable
              clients={mockClients}
              onEdit={handleEdit}
              onViewProjects={handleViewProjects}
              onDocumentUpload={handleDocumentUpload}
              onDelete={handleDelete}
            />
          </motion.div>
        </CardContent>
      </Card>
      
      {selectedClient && (
        <>
          <Sheet>
            <SheetContent side="right" className="w-[400px] sm:w-[540px] bg-gray-900/95 border-gray-700/50">
              <ClientForm clientToEdit={selectedClient} onSuccess={() => setSelectedClient(null)} />
            </SheetContent>
          </Sheet>
          
          {showProjectList && (
            <Sheet open={showProjectList} onOpenChange={setShowProjectList}>
              <SheetContent side="right" className="w-[400px] sm:w-[540px] bg-gray-900/95 border-gray-700/50">
                <ProjectListSection projects={mockProjects} />
              </SheetContent>
            </Sheet>
          )}

          {showDocuments && (
            <Sheet open={showDocuments} onOpenChange={setShowDocuments}>
              <SheetContent side="right" className="w-[400px] sm:w-[540px] bg-gray-900/95 border-gray-700/50">
                <DocumentsWidget />
              </SheetContent>
            </Sheet>
          )}
        </>
      )}
    </motion.div>
  );
};

export default ClientList;