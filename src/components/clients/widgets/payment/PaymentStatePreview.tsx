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
                size: landscape;
                margin: 15mm;
              }
              body {
                width: 100%;
                height: 100%;
              }
            }
          `}
        </style>
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <div className="flex items-center w-full">
            <DialogTitle className="text-2xl font-bold">État des Paiements</DialogTitle>
            <Button 
              onClick={handlePrint} 
              variant="outline" 
              className="no-print ml-8 hover:bg-gray-100"
              size="sm"
            >
              <Printer className="mr-2 h-4 w-4" />
              Imprimer
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Informations du rapport */}
          <div className="bg-gray-50 p-6 rounded-lg space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Client</p>
                <p className="font-medium">{reportData.client}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mode de paiement</p>
                <p className="font-medium">{reportData.paymentMethod}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Période</p>
                <p className="font-medium">Du {reportData.startDate} au {reportData.endDate}</p>
              </div>
            </div>
          </div>

          {/* Tableau des paiements */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Référence</TableHead>
                  <TableHead className="font-semibold">Mode</TableHead>
                  <TableHead className="text-right font-semibold">Montant</TableHead>
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
                <TableRow className="bg-gray-50">
                  <TableCell colSpan={3} className="font-bold text-right">Total:</TableCell>
                  <TableCell className="text-right font-bold">{total.toLocaleString()} DA</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}