
import { motion } from "framer-motion";
import { Building, Mail, Phone, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Document {
  id: string;
  title: string;
}

interface Client {
  id: string;
  nom: string;
  documents: Document[];
  email?: string;
  phone?: string;
  location?: string;
  contactName?: string;
}

interface ClientListProps {
  clients: Client[];
  onClientClick: (client: Client) => void;
}

export function ClientList({ clients, onClientClick }: ClientListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {clients.map((client, index) => (
        <motion.div
          key={client.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-[#101422] rounded-lg p-6 hover:border-[#7C3AED] transition-all"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-[#9b87f5]" />
              <h3 className="text-xl font-semibold text-white">{client.nom}</h3>
            </div>
            
            <div className="space-y-2">
              {client.contactName && (
                <div className="flex items-center text-gray-300">
                  <User className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm">{client.contactName}</span>
                </div>
              )}
              
              {client.email && (
                <div className="flex items-center text-gray-300">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm">{client.email}</span>
                </div>
              )}
              
              {client.phone && (
                <div className="flex items-center text-gray-300">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm">{client.phone}</span>
                </div>
              )}
              
              {client.location && (
                <div className="flex items-center text-gray-300">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm">{client.location}</span>
                </div>
              )}
            </div>
            
            <div className="text-gray-300 text-sm">
              {client.documents.length} document(s)
            </div>
            
            <Button 
              variant="ghost" 
              className="w-full mt-2 bg-[#1e293b] hover:bg-[#334155] text-white"
              onClick={() => onClientClick(client)}
            >
              Voir les détails
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
