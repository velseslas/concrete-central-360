import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
      <DialogContent className="max-w-[90vw] md:max-w-[75vw] lg:max-w-[65vw] h-[80vh] bg-gray-900 text-white border border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Détails des Paiements
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-full space-y-4">
          <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Période: {filters.periodType}</p>
                {filters.startDate && (
                  <p className="text-gray-400">Date début: {filters.startDate}</p>
                )}
                {filters.endDate && (
                  <p className="text-gray-400">Date fin: {filters.endDate}</p>
                )}
              </div>
              <div>
                <p className="text-gray-400">Client: {filters.client}</p>
                <p className="text-gray-400">
                  Mode de paiement: {filters.method}
                </p>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1 rounded-md border border-gray-700">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-800 hover:bg-gray-800/90 border-b border-gray-700">
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
              </TableBody>
            </Table>
          </ScrollArea>

          <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
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