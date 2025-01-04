import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { PrintablePaymentReport } from "./PrintablePaymentReport";

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
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>État des Paiements - ${reportData.client}</title>
            <link rel="stylesheet" href="/src/index.css" />
          </head>
          <body>
            <div id="print-content"></div>
          </body>
        </html>
      `);
      
      // Render the PrintablePaymentReport component
      const printContent = printWindow.document.getElementById('print-content');
      if (printContent) {
        printContent.innerHTML = `<div>${PrintablePaymentReport({ reportData }).props.children}</div>`;
      }
      
      printWindow.document.close();
      printWindow.focus();
      
      // Wait for styles to load
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
          <div className="flex items-center w-full">
            <DialogTitle className="text-2xl font-bold">État des Paiements</DialogTitle>
            <Button 
              onClick={handlePrint} 
              variant="outline" 
              className="ml-8 hover:bg-gray-100"
              size="sm"
            >
              <Printer className="mr-2 h-4 w-4" />
              Imprimer
            </Button>
          </div>
        </DialogHeader>

        <PrintablePaymentReport reportData={reportData} />
      </DialogContent>
    </Dialog>
  );
}