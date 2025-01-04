import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface PaymentStatePreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportData: {
    client: string;
    startDate: string;
    endDate: string;
    paymentMethod: string;
    payments: Array<{
      date: string;
      reference: string;
      amount: number;
      method: string;
    }>;
  };
}

export function PaymentStatePreview({ open, onOpenChange, reportData }: PaymentStatePreviewProps) {
  const handlePrint = () => {
    window.print();
  };

  const total = reportData.payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <style>
          {`
            @media print {
              .no-print {
                display: none !important;
              }
              [role="dialog"] button[type="button"] {
                display: none !important;
              }
              @page {
                size: A4;
                margin: 20mm;
              }
            }
          `}
        </style>
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-2xl font-bold">État des Paiements</DialogTitle>
          <Button onClick={handlePrint} variant="outline" className="no-print">
            <Printer className="mr-2 h-4 w-4" />
            Imprimer
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informations du rapport */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <p><span className="font-semibold">Période:</span> du {reportData.startDate} au {reportData.endDate}</p>
            <p><span className="font-semibold">Client:</span> {reportData.client}</p>
            <p><span className="font-semibold">Mode de paiement:</span> {reportData.paymentMethod}</p>
          </div>

          {/* Tableau des paiements */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Référence</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead className="text-right">Montant</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.payments?.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.reference}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell className="text-right">{payment.amount.toLocaleString()} DA</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} className="font-bold text-right">Total:</TableCell>
                <TableCell className="text-right font-bold">{total.toLocaleString()} DA</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}