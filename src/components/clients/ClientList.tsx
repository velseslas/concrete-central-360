import { useState } from "react";
import { motion } from "framer-motion";
import { Sheet, SheetContent } from "../ui/sheet";
import { Card } from "../ui/card";
import { ClientForm } from "./ClientForm";
import { DocumentsWidget } from "./widgets/DocumentsWidget";
import { ProjectListSection } from "./widgets/ProjectListSection";
import { ClientListHeader } from "./list/ClientListHeader";
import { ClientListContent } from "./list/ClientListContent";
import { Dialog, DialogContent } from "../ui/dialog";

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

export const ClientList = () => {
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

  const filteredClients = mockClients.filter((client) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      client.nom.toLowerCase().includes(searchLower) ||
      client.raisonSociale.toLowerCase().includes(searchLower) ||
      client.email.toLowerCase().includes(searchLower) ||
      client.telephone.includes(searchQuery) ||
      client.ville.toLowerCase().includes(searchLower)
    );
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 w-full max-w-[1400px] mx-auto px-4"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-800 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-50" />
        <div className="relative z-10">
          <ClientListHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            isNewClientDialogOpen={isNewClientDialogOpen}
            setIsNewClientDialogOpen={setIsNewClientDialogOpen}
          />
          <ClientListContent
            clients={filteredClients}
            onEdit={handleEdit}
            onViewProjects={handleViewProjects}
            onDocumentUpload={handleDocumentUpload}
            onDelete={handleDelete}
          />
        </div>
      </Card>
      
      {selectedClient && (
        <>
          <Sheet open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
            <SheetContent side="right" className="w-[400px] sm:w-[540px] bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50">
              <ClientForm clientToEdit={selectedClient} onSuccess={() => setSelectedClient(null)} />
            </SheetContent>
          </Sheet>
          
          {showProjectList && (
            <Sheet open={showProjectList} onOpenChange={setShowProjectList}>
              <SheetContent side="right" className="w-[400px] sm:w-[540px] bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50">
                <ProjectListSection projects={mockProjects} />
              </SheetContent>
            </Sheet>
          )}

          {showDocuments && (
            <Sheet open={showDocuments} onOpenChange={setShowDocuments}>
              <SheetContent side="right" className="w-[400px] sm:w-[540px] bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50">
                <DocumentsWidget />
              </SheetContent>
            </Sheet>
          )}
        </>
      )}

      <Dialog open={isNewClientDialogOpen} onOpenChange={setIsNewClientDialogOpen}>
        <DialogContent className="max-w-[800px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50">
          <ClientForm onSuccess={() => setIsNewClientDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};
