import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PaymentStateDetailsDialogProps {
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
}: PaymentStateDetailsDialogProps) {
  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] h-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Détails des paiements
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-full space-y-4">
          <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Période: {filters.periodType}</p>
                <p className="text-gray-400">
                  Date début: {filters.startDate || "Non définie"}
                </p>
                <p className="text-gray-400">
                  Date fin: {filters.endDate || "Non définie"}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Client: {filters.client}</p>
                <p className="text-gray-400">
                  Mode de paiement: {filters.method}
                </p>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1 border rounded-lg border-gray-700">
            <div className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">Date</TableHead>
                    <TableHead className="text-white">Référence</TableHead>
                    <TableHead className="text-white">Client</TableHead>
                    <TableHead className="text-white">Projet</TableHead>
                    <TableHead className="text-white">Mode</TableHead>
                    <TableHead className="text-right text-white">Montant</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id} className="border-b border-gray-700">
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.reference}</TableCell>
                      <TableCell>{payment.clientName}</TableCell>
                      <TableCell>{payment.projectName}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell className="text-right">
                        {payment.amount.toLocaleString()} DA
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-t border-gray-700 font-bold">
                    <TableCell colSpan={5} className="text-right">
                      Total:
                    </TableCell>
                    <TableCell className="text-right">
                      {totalAmount.toLocaleString()} DA
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}