import { useState } from "react";
import { ClientForm } from "./ClientForm";
import { ProjectForm } from "../projects/ProjectForm";
import { DocumentsWidget } from "./widgets/DocumentsWidget";
import { OrdersWidget } from "./widgets/OrdersWidget";
import { ProductionWidget } from "./widgets/ProductionWidget";
import { ClientTable } from "./ClientTable";
import { Button } from "../ui/button";
import { UserPlus } from "lucide-react";
import { ReportsWidget } from "./widgets/ReportsWidget";

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Liste des clients</h2>
        <Button onClick={() => setShowNewForm(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Nouveau client
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <ClientTable
          clients={mockClients}
          onEdit={handleEdit}
          onAddProject={handleAddProject}
          onDocumentUpload={handleDocumentUpload}
          onDelete={handleDelete}
        />
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
          <OrdersWidget 
            clientId={selectedClient.id}
            clientName={selectedClient.nom}
          />
          <ProductionWidget 
            clientId={selectedClient.id}
          />
          <ReportsWidget />
        </>
      )}

      <ClientForm
        open={showNewForm}
        onOpenChange={setShowNewForm}
      />
    </div>
  );
};

export default ClientList;