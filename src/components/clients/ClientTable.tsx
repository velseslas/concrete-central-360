import { ClientActions } from "./ClientActions";
import { useState } from "react";
import { DetailView } from "./DetailView";
import { motion } from "framer-motion";

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
      <div className="overflow-hidden rounded-lg border border-gray-800">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-xl border-b border-gray-800">
            <tr>
              <th className="px-6 py-4 text-white font-medium">Nom</th>
              <th className="px-6 py-4 text-white font-medium">Raison sociale</th>
              <th className="px-6 py-4 text-white font-medium">Téléphone</th>
              <th className="px-6 py-4 text-white font-medium">Email</th>
              <th className="px-6 py-4 text-white font-medium">Ville</th>
              <th className="px-6 py-4 text-white font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {clients.map((client, index) => (
              <motion.tr
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gradient-to-r from-gray-900/30 to-gray-800/30 backdrop-blur-xl hover:bg-gray-800/50 transition-colors cursor-pointer"
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
                    onAddProject={onAddProject}
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