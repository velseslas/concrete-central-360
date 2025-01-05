import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface PaymentStateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportData: any[];
  filters: {
    client: string;
    startDate: string;
    endDate: string;
    paymentMethod: string;
  };
}

export function PaymentStateDialog({ 
  open, 
  onOpenChange, 
  reportData,
  filters 
}: PaymentStateDialogProps) {
  const handlePrint = () => {
    window.print();
    console.log("Printing payment state");
  };

  const total = reportData.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">État des Paiements</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                Période: du {filters.startDate} au {filters.endDate}
              </p>
              <p className="text-sm text-gray-600">
                Client: {filters.client}
              </p>
              <p className="text-sm text-gray-600">
                Mode de paiement: {filters.paymentMethod}
              </p>
            </div>
            <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Imprimer
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Référence</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.reference}</TableCell>
                  <TableCell>{payment.amount.toLocaleString()} DA</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>{payment.status}</TableCell>
                </TableRow>
              ))}
              <TableRow className="font-bold">
                <TableCell colSpan={2} className="text-right">Total:</TableCell>
                <TableCell>{total.toLocaleString()} DA</TableCell>
                <TableCell colSpan={2}></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}