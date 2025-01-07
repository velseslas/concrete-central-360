import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PaymentStateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payments: Array<{
    id: number;
    date: string;
    reference: string;
    amount: number;
    method: string;
    clientName: string;
    projectName: string;
  }>;
  filters: {
    periodType: string;
    startDate: string;
    endDate: string;
    client: string;
    method: string;
  };
}

export function PaymentStateDetailsDialog({
  open,
  onOpenChange,
  payments,
  filters,
}: PaymentStateDialogProps) {
  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-gray-900 text-white border border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Détails des Paiements
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="mb-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold mb-2">Filtres appliqués</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Période:</span>{" "}
                <span className="text-white">{filters.periodType}</span>
              </div>
              <div>
                <span className="text-gray-400">Client:</span>{" "}
                <span className="text-white">{filters.client}</span>
              </div>
              <div>
                <span className="text-gray-400">Date début:</span>{" "}
                <span className="text-white">{filters.startDate || "Non définie"}</span>
              </div>
              <div>
                <span className="text-gray-400">Date fin:</span>{" "}
                <span className="text-white">{filters.endDate || "Non définie"}</span>
              </div>
            </div>
          </div>

          <ScrollArea className="h-[400px] rounded-md border border-gray-700">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-800 hover:bg-gray-800/90 border-b border-gray-700">
                  <TableHead className="text-white">Date</TableHead>
                  <TableHead className="text-white">Référence</TableHead>
                  <TableHead className="text-white">Client</TableHead>
                  <TableHead className="text-white">Projet</TableHead>
                  <TableHead className="text-white">Méthode</TableHead>
                  <TableHead className="text-right text-white">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-gray-900">
                {payments.map((payment) => (
                  <TableRow
                    key={payment.id}
                    className="border-b border-gray-800 hover:bg-gray-800/50"
                  >
                    <TableCell className="text-white">{payment.date}</TableCell>
                    <TableCell className="text-white">{payment.reference}</TableCell>
                    <TableCell className="text-white">{payment.clientName}</TableCell>
                    <TableCell className="text-white">{payment.projectName}</TableCell>
                    <TableCell className="text-white">{payment.method}</TableCell>
                    <TableCell className="text-right text-white">
                      {payment.amount.toLocaleString()} DA
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>

          <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-white">Total</span>
              <span className="text-xl font-bold text-blue-400">
                {totalAmount.toLocaleString()} DA
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}