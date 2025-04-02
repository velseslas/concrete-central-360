
import { ClientListItem } from "./ClientListItem";

interface ClientListGridProps {
  clients: Array<{
    id: number;
    nom: string;
    contactName: string;
    email: string;
    telephone: string;
    ville: string;
    region: string;
    projectCount: number;
  }>;
  onViewDetails: (client: any) => void;
}

export function ClientListGrid({ clients, onViewDetails }: ClientListGridProps) {
  if (clients.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        Aucun client trouvé
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {clients.map((client) => (
        <ClientListItem 
          key={client.id}
          client={client}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
