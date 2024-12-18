import { useState } from "react";
import { ClientForm } from "./ClientForm";
import { ProjectForm } from "../projects/ProjectForm";
import { DocumentUpload } from "./DocumentUpload";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ClientTable } from "./ClientTable";

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
    <div className="bg-white rounded-lg shadow">
      <ClientTable
        clients={mockClients}
        onEdit={handleEdit}
        onAddProject={handleAddProject}
        onDocumentUpload={handleDocumentUpload}
        onDelete={handleDelete}
      />
      
      {selectedClient && (
        <ClientForm
          open={showEditForm}
          onOpenChange={setShowEditForm}
          clientToEdit={selectedClient}
        />
      )}
      {selectedClient && (
        <ProjectForm
          open={showProjectForm}
          onOpenChange={setShowProjectForm}
          clientId={selectedClient.id}
        />
      )}
      {selectedClient && (
        <Dialog open={showDocumentUpload} onOpenChange={setShowDocumentUpload}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Documents administratifs - {selectedClient.nom}</DialogTitle>
            </DialogHeader>
            <DocumentUpload clientId={selectedClient.id} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ClientList;