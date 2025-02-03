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
    console.log("Row clicked, showing details for client:", client);
    setSelectedClient(client);
    setShowDetail(true);
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-xl border-b border-gray-700/50">
            <tr>
              <th className="px-6 py-4 text-white font-medium">Nom</th>
              <th className="px-6 py-4 text-white font-medium">Raison sociale</th>
              <th className="px-6 py-4 text-white font-medium">Téléphone</th>
              <th className="px-6 py-4 text-white font-medium">Email</th>
              <th className="px-6 py-4 text-white font-medium">Ville</th>
              <th className="px-6 py-4 text-white font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {clients.map((client, index) => (
              <motion.tr
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => handleRowClick(client)}
                className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-xl hover:bg-gray-700/30 transition-colors cursor-pointer group"
              >
                <td className="px-6 py-4 text-white group-hover:text-blue-400 transition-colors">{client.nom}</td>
                <td className="px-6 py-4 text-white group-hover:text-blue-400 transition-colors">{client.raisonSociale}</td>
                <td className="px-6 py-4 text-white group-hover:text-blue-400 transition-colors">{client.telephone}</td>
                <td className="px-6 py-4 text-white group-hover:text-blue-400 transition-colors">{client.email}</td>
                <td className="px-6 py-4 text-white group-hover:text-blue-400 transition-colors">{client.ville}</td>
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