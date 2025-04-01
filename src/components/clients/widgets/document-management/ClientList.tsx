
import { motion } from "framer-motion";
import { FileText, Building } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Document {
  id: string;
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4"
    >
      {clients.map((client, index) => (
        <motion.div
          key={client.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-[#101422] rounded-lg p-6 border border-[#1F2232] hover:border-[#7C3AED] transition-all"
        >
          <div className="flex items-start mb-4">
            <div className="h-10 w-10 flex items-center justify-center rounded-md bg-[#1F2232] text-[#7C3AED] mr-3">
              <Building className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">{client.nom}</h3>
              <div className="flex items-center mt-1 text-gray-400">
                <FileText className="h-4 w-4 mr-1" />
                <span className="text-sm">{client.documents.length} document(s)</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button 
              variant="ghost" 
              className="text-[#7C3AED] hover:text-[#6D28D9] hover:bg-[#7C3AED]/10"
              onClick={() => onClientClick(client)}
            >
              Voir les détails
            </Button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
