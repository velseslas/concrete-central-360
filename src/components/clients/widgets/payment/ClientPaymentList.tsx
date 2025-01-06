import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ClientPayment {
  id: string;
  name: string;
  totalPaid: number;
  lastPayment: string;
  payments: Array<{
    id: number;
    amount: number;
    date: string;
    reference: string;
    document: string;
    paymentMethod: string;
    projectId: string;
  }>;
}

interface ClientPaymentListProps {
  clients: ClientPayment[];
  onViewDetails: (client: ClientPayment) => void;
}

export function ClientPaymentList({ clients, onViewDetails }: ClientPaymentListProps) {
  const handleViewDetails = (client: ClientPayment) => {
    console.log("Viewing details for client:", client);
    onViewDetails(client);
  };

  return (
    <div className="space-y-4">
      {clients.map((client) => (
        <div
          key={client.id}
          className="p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">{client.name}</h3>
              <p className="text-sm text-gray-400">
                Dernier paiement: {client.lastPayment}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-blue-400">
                {client.totalPaid.toLocaleString()} DA
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleViewDetails(client)}
                className="text-gray-400 hover:text-white"
              >
                Voir détails
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}