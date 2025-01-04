import { ClientActions } from "./ClientActions";
import { useState } from "react";
import { DetailView } from "./DetailView";

interface ClientTableProps {
  clients: any[];
  onEdit: (client: any) => void;
  onAddProject: (client: any) => void;
  onDocumentUpload: (client: any) => void;
  onDelete: (clientId: number) => void;
}

export function ClientTable({
  clients,
  onEdit,
  onAddProject,
  onDocumentUpload,
  onDelete,
}: ClientTableProps) {
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);

  const handleRowClick = (client: any) => {
    setSelectedClient(client);
    setShowDetail(true);
  };

  return (
    <>
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
            {clients.map((client) => (
              <tr 
                key={client.id} 
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => handleRowClick(client)}
              >
                <td className="px-6 py-4">{client.nom}</td>
                <td className="px-6 py-4">{client.raisonSociale}</td>
                <td className="px-6 py-4">{client.telephone}</td>
                <td className="px-6 py-4">{client.email}</td>
                <td className="px-6 py-4">{client.ville}</td>
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <ClientActions
                    client={client}
                    onEdit={onEdit}
                    onAddProject={onAddProject}
                    onDocumentUpload={onDocumentUpload}
                    onDelete={onDelete}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedClient && (
        <DetailView
          open={showDetail}
          onOpenChange={setShowDetail}
          data={selectedClient}
          title={`Détails du client : ${selectedClient.nom}`}
        />
      )}
    </>
  );
}