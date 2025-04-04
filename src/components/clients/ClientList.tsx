
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClientListHeader } from "./list/ClientListHeader";
import { ClientListContent } from "./list/ClientListContent";

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
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleEdit = (client: any) => {
    navigate(`/client/${client.id}`);
  };

  const handleViewProjects = (client: any) => {
    navigate(`/client/${client.id}/projects`);
  };

  const handleDocumentUpload = (client: any) => {
    navigate(`/client/${client.id}/documents`);
  };

  const handleDelete = (clientId: number) => {
    console.log("Deleting client:", clientId);
  };

  const handleViewDetails = (client: any) => {
    navigate(`/client/${client.id}`);
  };

  const handleNewClient = () => {
    navigate("/client/new");
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
    <div className="min-h-screen bg-gradient-to-b from-[#070B1A] to-[#0B1023] text-white">
      <div className="container mx-auto px-4 py-8">
        <ClientListHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNewClient={handleNewClient}
        />
        
        <ClientListContent
          clients={filteredClients}
          onEdit={handleEdit}
          onViewProjects={handleViewProjects}
          onDocumentUpload={handleDocumentUpload}
          onDelete={handleDelete}
          onViewDetails={handleViewDetails}
        />
      </div>
    </div>
  );
}
