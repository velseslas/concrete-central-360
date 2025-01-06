import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

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

export function PaymentStateDialog({ 
  open, 
  onOpenChange, 
  payments,
  filters 
}: PaymentStateDialogProps) {
  const handlePrint = () => {
    window.print();
  };

  const total = payments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <span>État détaillé des Paiements</span>
            <Button onClick={handlePrint} variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Imprimer
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p>Période: {filters.periodType}</p>
              <p>Du: {filters.startDate || 'N/A'}</p>
              <p>Au: {filters.endDate || 'N/A'}</p>
            </div>
            <div>
              <p>Client: {filters.client || 'Tous'}</p>
              <p>Mode de paiement: {filters.method || 'Tous'}</p>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-400">Date</TableHead>
                <TableHead className="text-gray-400">Client</TableHead>
                <TableHead className="text-gray-400">Projet</TableHead>
                <TableHead className="text-gray-400">Référence</TableHead>
                <TableHead className="text-right text-gray-400">Montant</TableHead>
                <TableHead className="text-gray-400">Mode</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id} className="border-gray-800">
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.clientName}</TableCell>
                  <TableCell>{payment.projectName}</TableCell>
                  <TableCell>{payment.reference}</TableCell>
                  <TableCell className="text-right">
                    {payment.amount.toLocaleString()} DA
                  </TableCell>
                  <TableCell>{payment.method}</TableCell>
                </TableRow>
              ))}
              <TableRow className="border-gray-800 font-bold">
                <TableCell colSpan={4} className="text-right">Total:</TableCell>
                <TableCell className="text-right">{total.toLocaleString()} DA</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}