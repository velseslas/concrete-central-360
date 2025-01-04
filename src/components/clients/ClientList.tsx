import { useState } from "react";
import { ClientForm } from "./ClientForm";
import { ProjectForm } from "../projects/ProjectForm";
import { DocumentsWidget } from "./widgets/DocumentsWidget";
import { ClientTable } from "./ClientTable";
import { Button } from "../ui/button";
import { UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { DocumentManagementWidget } from "./widgets/DocumentManagementWidget";

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
  const [showEditForm, setShowEditForm] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);

  const handleDelete = (clientId: number) => {
    console.log("Deleting client:", clientId);
  };

  const handleEdit = (client: any) => {
    setSelectedClient(client);
    setShowEditForm(true);
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
        <Button onClick={() => setShowNewForm(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Nouveau client
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        <DocumentManagementWidget />
      </div>
      
      {selectedClient && (
        <>
          <ClientForm
            open={showEditForm}
            onOpenChange={setShowEditForm}
            clientToEdit={selectedClient}
          />
          <ProjectForm
            open={showProjectForm}
            onOpenChange={setShowProjectForm}
            clientId={selectedClient.id}
          />
          {showDocumentUpload && (
            <DocumentsWidget clientId={selectedClient.id} />
          )}
        </>
      )}

      <ClientForm
        open={showNewForm}
        onOpenChange={setShowNewForm}
      />
    </motion.div>
  );
};

export default ClientList;