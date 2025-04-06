
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { toast } from "sonner";
import { ReceiptHeader } from "./receipt/ReceiptHeader";
import { ReceiptContent } from "./receipt/ReceiptContent";
import { ReceiptFooter } from "./receipt/ReceiptFooter";
import { ReceiptPrintStyles } from "./receipt/ReceiptPrintStyles";

interface ClientPaymentReceiptProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentData: {
    client: string;
    amount: string;
    paymentMethod: string;
    paymentDate: Date;
    notes?: string;
    reference?: string;
    project?: string;
  };
}

export function ClientPaymentReceipt({ 
  open, 
  onOpenChange, 
  paymentData 
}: ClientPaymentReceiptProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.success("Le reçu a été téléchargé");
    // In a real implementation, this would use a library like jsPDF or html2canvas
    // to convert the receipt to a PDF or image file for download
  };

  const receiptNumber = `RECU-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  
  const paymentMethodLabels: Record<string, string> = {
    virement: "Virement bancaire",
    cheque: "Chèque",
    especes: "Espèces",
    carte: "Carte bancaire"
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90%] max-w-[800px] h-[90vh] max-h-[800px] overflow-y-auto print:!p-0 bg-white">
        <ReceiptPrintStyles />
        
        <div className="flex justify-end gap-2 mb-4 no-print">
          <Button onClick={handleDownload} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Télécharger
          </Button>
          <Button onClick={handlePrint} variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Imprimer
          </Button>
        </div>
        
        <div className="print-content p-6 space-y-6">
          <ReceiptHeader receiptNumber={receiptNumber} />
          <ReceiptContent paymentData={paymentData} paymentMethodLabels={paymentMethodLabels} />
          <ReceiptFooter />
        </div>
      </DialogContent>
    </Dialog>
  );
}
