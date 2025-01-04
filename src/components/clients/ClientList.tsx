import { useState } from "react";
import { ClientForm } from "./ClientForm";
import { ProjectForm } from "../projects/ProjectForm";
import { DocumentsWidget } from "./widgets/DocumentsWidget";
import { ClientTable } from "./ClientTable";
import { Button } from "../ui/button";
import { UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Sheet, SheetContent } from "../ui/sheet";

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

const ClientList = () => {
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);
  const [isNewClientDialogOpen, setIsNewClientDialogOpen] = useState(false);

  const handleDelete = (clientId: number) => {
    console.log("Deleting client:", clientId);
  };

  const handleEdit = (client: any) => {
    setSelectedClient(client);
  };

  const handleAddProject = (client: any) => {
    setSelectedClient(client);
    setShowProjectForm(true);
  };

  const handleDocumentUpload = (client: any) => {
    setSelectedClient(client);
    setShowDocumentUpload(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex justify-between items-center"
      >
        <h2 className="text-2xl font-bold">Liste des clients</h2>
        <Dialog open={isNewClientDialogOpen} onOpenChange={setIsNewClientDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Nouveau client
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[800px] max-h-[90vh] overflow-y-auto">
            <ClientForm onSuccess={() => setIsNewClientDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-white rounded-lg shadow"
      >
        <ClientTable
          clients={mockClients}
          onEdit={handleEdit}
          onAddProject={handleAddProject}
          onDocumentUpload={handleDocumentUpload}
          onDelete={handleDelete}
        />
      </motion.div>
      
      {selectedClient && (
        <>
          <Sheet>
            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
              <ClientForm clientToEdit={selectedClient} />
            </SheetContent>
          </Sheet>
          <ProjectForm
            open={showProjectForm}
            onOpenChange={setShowProjectForm}
            clientId={selectedClient.id}
          />
          {showDocumentUpload && (
            <DocumentsWidget />
          )}
        </>
      )}
    </motion.div>
  );
};

export default ClientList;