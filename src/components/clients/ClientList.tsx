
import { useState } from "react";
import { ClientListHeader } from "./list/ClientListHeader";
import { ClientSearch } from "./list/ClientSearch";
import { ClientListGrid } from "./list/ClientListGrid";
import { ClientSidepanels } from "./list/ClientSidepanels";

const mockClients = [
  {
    id: 1,
    nom: "Constructions Modernes",
    contactName: "Jean Dupont",
    email: "j.dupont@construmod.fr",
    telephone: "01 23 45 67 89",
    ville: "Alger",
    region: "Alger",
    projectCount: 5,
  },
  {
    id: 2,
    nom: "BatiBéton",
    contactName: "Marie Leroy",
    email: "m.leroy@batibeton.fr",
    telephone: "01 34 56 78 90",
    ville: "Oran",
    region: "Oran",
    projectCount: 3,
  },
  {
    id: 3,
    nom: "ConstruPro",
    contactName: "Paul Martin",
    email: "p.martin@construpro.fr",
    telephone: "01 45 67 89 01",
    ville: "Constantine",
    region: "Constantine",
    projectCount: 7,
  },
  {
    id: 4,
    nom: "TechBuild",
    contactName: "Sophie Richard",
    email: "s.richard@techbuild.fr",
    telephone: "01 56 78 90 12",
    ville: "Annaba",
    region: "Annaba",
    projectCount: 2,
  },
  {
    id: 5,
    nom: "ImmoBat",
    contactName: "Thomas Bernard",
    email: "t.bernard@immobat.fr",
    telephone: "01 67 89 01 23",
    ville: "Blida",
    region: "Blida",
    projectCount: 4,
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

  const handleViewDetails = (client: any) => {
    console.log("Viewing details for client:", client);
    setSelectedClient(client);
  };

  const filteredClients = mockClients.filter((client) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      client.nom.toLowerCase().includes(searchLower) ||
      client.contactName.toLowerCase().includes(searchLower) ||
      client.email.toLowerCase().includes(searchLower) ||
      client.telephone.includes(searchQuery) ||
      client.ville.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-[#070A14] text-white">
      <div className="container mx-auto px-4 py-8">
        <ClientListHeader setIsNewClientDialogOpen={setIsNewClientDialogOpen} />
        <ClientSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ClientListGrid clients={filteredClients} onViewDetails={handleViewDetails} />
      </div>
      
      <ClientSidepanels 
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        showProjectList={showProjectList}
        setShowProjectList={setShowProjectList}
        showDocuments={showDocuments}
        setShowDocuments={setShowDocuments}
        isNewClientDialogOpen={isNewClientDialogOpen}
        setIsNewClientDialogOpen={setIsNewClientDialogOpen}
      />
    </div>
  );
};
