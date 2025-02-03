import { motion } from "framer-motion";
import { ClientTable } from "../ClientTable";

interface Client {
  id: number;
  nom: string;
  raisonSociale: string;
  telephone: string;
  email: string;
  adresse: string;
  ville: string;
  codePostal: string;
  nif: string;
  nis: string;
  numeroArticle: string;
  categorieClient: string;
}

interface ClientListContentProps {
  clients: Client[];
  onEdit: (client: Client) => void;
  onViewProjects: (client: Client) => void;
  onDocumentUpload: (client: Client) => void;
  onDelete: (clientId: number) => void;
}

export function ClientListContent({
  clients,
  onEdit,
  onViewProjects,
  onDocumentUpload,
  onDelete,
}: ClientListContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="p-6"
    >
      <div className="bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-gray-900/50 rounded-lg shadow-xl border border-gray-700/50 backdrop-blur-xl overflow-hidden">
        <ClientTable
          clients={clients}
          onEdit={onEdit}
          onViewProjects={onViewProjects}
          onDocumentUpload={onDocumentUpload}
          onDelete={onDelete}
        />
      </div>
    </motion.div>
  );
}