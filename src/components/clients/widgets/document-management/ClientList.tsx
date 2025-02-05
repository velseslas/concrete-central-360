import { motion } from "framer-motion";
import { FileText } from "lucide-react";

interface Document {
  id: string;  // Changed from number to string
  title: string;
}

interface Client {
  id: string;
  nom: string;
  documents: Document[];
}

interface ClientListProps {
  clients: Client[];
  onClientClick: (client: Client) => void;
}

export function ClientList({ clients, onClientClick }: ClientListProps) {
  return (
    <div className="space-y-4 mt-4">
      {clients.map((client) => (
        <motion.div
          key={client.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.01 }}
          className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-gray-900/50 p-4 backdrop-blur-sm border border-gray-700/50 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer"
          onClick={() => onClientClick(client)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-all duration-300">
                <FileText className="h-5 w-5 text-indigo-400 group-hover:text-indigo-300" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-200 group-hover:text-white transition-colors">
                  {client.nom}
                </h3>
                <p className="text-sm text-gray-400 group-hover:text-gray-300">
                  {client.documents.length} document(s)
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}