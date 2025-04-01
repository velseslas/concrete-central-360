
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#101422] rounded-lg p-6 border border-[#1F2232] hover:border-[#7C3AED] transition-all"
          >
            <div className="flex items-start mb-4">
              <div className="h-10 w-10 flex items-center justify-center rounded-md bg-[#1F2232] text-[#7C3AED] mr-3">
                <Building className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{client.nom}</h3>
                <div className="flex items-center mt-1 text-gray-400">
                  <User className="h-4 w-4 mr-1" />
                  <span className="text-sm">{client.contactName}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-sm truncate">{client.email}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-sm">{client.telephone}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-sm">{client.ville}, {client.region}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">{client.projectCount} projets</span>
              <Button 
                variant="ghost" 
                className="text-[#7C3AED] hover:text-[#6D28D9] hover:bg-[#7C3AED]/10"
                onClick={() => onViewDetails(client)}
              >
                Voir les détails
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
