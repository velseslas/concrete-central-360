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
  }>;
}

interface ClientPaymentListProps {
  clients: ClientPayment[];
  onViewDetails: (client: ClientPayment) => void;
}

export function ClientPaymentList({ clients, onViewDetails }: ClientPaymentListProps) {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-gray-800/50">
            <TableHead className="text-gray-400">Client</TableHead>
            <TableHead className="text-gray-400">Dernier paiement</TableHead>
            <TableHead className="text-right text-gray-400">Total payé</TableHead>
            <TableHead className="text-center text-gray-400">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id} className="hover:bg-gray-800/50">
              <TableCell className="text-gray-300">{client.name}</TableCell>
              <TableCell className="text-gray-300">{client.lastPayment}</TableCell>
              <TableCell className="text-right text-gray-300">
                {client.totalPaid.toLocaleString()} DA
              </TableCell>
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(client)}
                  className="text-gray-400 hover:text-white"
                >
                  Voir détails
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}