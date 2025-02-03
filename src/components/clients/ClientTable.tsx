import { ClientActions } from "./ClientActions";
import { useState } from "react";
import { DetailView } from "./DetailView";
import { motion } from "framer-motion";
import { Card } from "../ui/card";

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
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-800 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-50" />
        <div className="relative z-10 p-6">
          <div className="grid grid-cols-6 gap-4 text-xs uppercase font-medium text-white bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-4 rounded-lg backdrop-blur-xl">
            <div>Nom</div>
            <div>Raison sociale</div>
            <div>Téléphone</div>
            <div>Email</div>
            <div>Ville</div>
            <div>Actions</div>
          </div>
          <div className="mt-4 space-y-3">
            {clients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => handleRowClick(client)}
                className="grid grid-cols-6 gap-4 p-4 bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-xl hover:bg-gray-700/30 transition-all rounded-lg cursor-pointer group"
              >
                <div className="text-white group-hover:text-purple-400 transition-colors">{client.nom}</div>
                <div className="text-white group-hover:text-purple-400 transition-colors">{client.raisonSociale}</div>
                <div className="text-white group-hover:text-purple-400 transition-colors">{client.telephone}</div>
                <div className="text-white group-hover:text-purple-400 transition-colors">{client.email}</div>
                <div className="text-white group-hover:text-purple-400 transition-colors">{client.ville}</div>
                <div onClick={(e) => e.stopPropagation()}>
                  <ClientActions
                    client={client}
                    onEdit={onEdit}
                    onViewProjects={onViewProjects}
                    onDocumentUpload={onDocumentUpload}
                    onDelete={onDelete}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>

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