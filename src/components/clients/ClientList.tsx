import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Building } from "lucide-react";
import { ClientForm } from "./ClientForm";
import { ProjectForm } from "../projects/ProjectForm";

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
  // Add more mock clients as needed
];

const ClientList = () => {
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);

  const handleDelete = (clientId: number) => {
    console.log("Deleting client:", clientId);
    // TODO: Implement delete logic
  };

  const handleEdit = (client: any) => {
    setSelectedClient(client);
    setShowEditForm(true);
  };

  const handleAddProject = (client: any) => {
    setSelectedClient(client);
    setShowProjectForm(true);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Nom</th>
              <th className="px-6 py-3">Raison sociale</th>
              <th className="px-6 py-3">Téléphone</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Ville</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockClients.map((client) => (
              <tr key={client.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{client.nom}</td>
                <td className="px-6 py-4">{client.raisonSociale}</td>
                <td className="px-6 py-4">{client.telephone}</td>
                <td className="px-6 py-4">{client.email}</td>
                <td className="px-6 py-4">{client.ville}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(client)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddProject(client)}
                    >
                      <Building className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(client.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
    </div>
  );
}

export default ClientList;