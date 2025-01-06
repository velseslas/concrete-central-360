import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

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
  const [selectedClient, setSelectedClient] = useState<ClientPayment | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleViewDetails = (client: ClientPayment) => {
    setSelectedClient(client);
    setShowDetails(true);
  };

  return (
    <>
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

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="bg-gray-900 text-white border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Historique des paiements - {selectedClient?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-400">Référence</TableHead>
                  <TableHead className="text-gray-400">Date</TableHead>
                  <TableHead className="text-right text-gray-400">Montant</TableHead>
                  <TableHead className="text-center text-gray-400">Méthode</TableHead>
                  <TableHead className="text-center text-gray-400">Projet</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedClient?.payments.map((payment) => (
                  <TableRow key={payment.id} className="border-gray-800">
                    <TableCell className="text-gray-300">{payment.reference}</TableCell>
                    <TableCell className="text-gray-300">{payment.date}</TableCell>
                    <TableCell className="text-right text-gray-300">
                      {payment.amount.toLocaleString()} DA
                    </TableCell>
                    <TableCell className="text-center text-gray-300">
                      {payment.paymentMethod}
                    </TableCell>
                    <TableCell className="text-center text-gray-300">
                      {payment.projectId}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}