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
            <style>
              @page {
                size: landscape;
                margin: 10mm;
              }
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20mm;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
              th, td {
                padding: 8px;
                border: 1px solid #ddd;
                text-align: left;
              }
              th {
                background-color: #f5f5f5;
              }
              .print-info {
                margin-bottom: 20px;
                padding: 10px;
                background-color: #f5f5f5;
                border-radius: 4px;
              }
              .text-right {
                text-align: right;
              }
              .grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
              }
              .text-sm {
                font-size: 0.875rem;
              }
              .text-gray-500 {
                color: #6b7280;
              }
              .font-medium {
                font-weight: 500;
              }
              .font-semibold {
                font-weight: 600;
              }
            </style>
          </head>
          <body>
            ${PrintablePaymentReport({ reportData }).props.children}
          </body>
        </html>
      `);
      
      printWindow.document.close();
      printWindow.focus();
      
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
              className="ml-4 hover:bg-gray-100"
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