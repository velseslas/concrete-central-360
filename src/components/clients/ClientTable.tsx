import { ClientActions } from "./ClientActions";
import { useState } from "react";
import { DetailView } from "./DetailView";
import { motion } from "framer-motion";

interface ClientTableProps {
  clients: any[];
  onEdit: (client: any) => void;
  onViewProjects: (client: any) => void;
  onDocumentUpload: (client: any) => void;
  onDelete: (clientId: number) => void;
}

export function ClientTable({
  clients,
  onEdit,
  onViewProjects,
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
      <div className="overflow-hidden rounded-lg border border-gray-800">
        <table className="w-full text-sm">
          <thead className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800">
            <tr>
              <th className="px-6 py-4 text-left font-medium text-gray-300">Nom</th>
              <th className="px-6 py-4 text-left font-medium text-gray-300">Raison sociale</th>
              <th className="px-6 py-4 text-left font-medium text-gray-300">Téléphone</th>
              <th className="px-6 py-4 text-left font-medium text-gray-300">Email</th>
              <th className="px-6 py-4 text-left font-medium text-gray-300">Ville</th>
              <th className="px-6 py-4 text-left font-medium text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {clients.map((client, index) => (
              <motion.tr
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gray-900/30 hover:bg-gray-800/50 transition-colors cursor-pointer"
                onClick={() => handleRowClick(client)}
              >
                <td className="px-6 py-4 text-gray-300">{client.nom}</td>
                <td className="px-6 py-4 text-gray-300">{client.raisonSociale}</td>
                <td className="px-6 py-4 text-gray-300">{client.telephone}</td>
                <td className="px-6 py-4 text-gray-300">{client.email}</td>
                <td className="px-6 py-4 text-gray-300">{client.ville}</td>
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <ClientActions
                    client={client}
                    onEdit={onEdit}
                    onViewProjects={onViewProjects}
                    onDocumentUpload={onDocumentUpload}
                    onDelete={onDelete}
                  />
                </td>
              </motion.tr>
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