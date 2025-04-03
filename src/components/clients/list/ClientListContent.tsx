
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Building } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Client {
  id: number;
  nom: string;
  contactName: string;
  email: string;
  telephone: string;
  ville: string;
  region: string;
  projectCount: number;
}

interface ClientListContentProps {
  clients: Client[];
  onEdit: (client: Client) => void;
  onViewProjects: (client: Client) => void;
  onDocumentUpload: (client: Client) => void;
  onDelete: (clientId: number) => void;
  onViewDetails: (client: Client) => void;
}

export function ClientListContent({
  clients,
  onEdit,
  onViewProjects,
  onDocumentUpload,
  onDelete,
  onViewDetails,
}: ClientListContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 mt-8"
    >
      {clients.map((client) => (
        <motion.div
          key={client.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all max-w-2xl mx-auto"
        >
          <div className="p-6">
            <div className="flex items-start mb-4">
              <div className="h-12 w-12 flex items-center justify-center bg-indigo-900/30 rounded-full text-purple-400 mr-4">
                <Building className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{client.nom}</h3>
                <div className="flex items-center mt-1 text-gray-400">
                  <User className="h-4 w-4 mr-1" />
                  <span className="text-sm">{client.contactName}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 mb-5 pl-2">
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-3 text-indigo-400" />
                <span className="text-sm truncate">{client.email}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-3 text-indigo-400" />
                <span className="text-sm">{client.telephone}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-3 text-indigo-400" />
                <span className="text-sm">{client.ville}, {client.region}</span>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-400">{client.projectCount} projets</span>
              <Button 
                variant="ghost" 
                className="text-indigo-400 hover:text-white hover:bg-indigo-600/40 px-4 py-2 rounded-lg transition-all"
                onClick={() => onViewDetails(client)}
              >
                Voir les détails
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
