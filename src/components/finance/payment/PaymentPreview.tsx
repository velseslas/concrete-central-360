import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Printer } from "lucide-react";

interface PaymentPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDocument: string | null;
  selectedClient: any;
}

export function PaymentPreview({ open, onOpenChange, selectedDocument, selectedClient }: PaymentPreviewProps) {
  const handlePrint = () => {
    console.log("Impression du document:", selectedDocument);
    window.print();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[90vw] max-w-[1344px]">
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
                size: 14in auto;
                margin: 0;
              }
              .print-preview {
                width: 1344px !important;
                margin: 0 auto;
                padding: 1rem;
              }
            }
          `}
        </style>
        <DialogHeader className="flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-2xl font-bold">
            Aperçu - {selectedDocument}
          </DialogTitle>
          <Button onClick={handlePrint} variant="outline" className="no-print mr-8">
            <Printer className="mr-2 h-4 w-4" />
            Imprimer
          </Button>
        </DialogHeader>
        <div className="flex justify-center overflow-auto py-4">
          <div className="print-preview w-[1344px] min-h-[600px] bg-white rounded-lg shadow-lg p-4 space-y-4">
            <div className="border-b pb-4">
              <h3 className="text-lg font-bold text-center">Bon de paiement</h3>
              <p className="text-sm text-gray-600 text-center">Ref: {selectedDocument}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm"><span className="font-semibold">Client:</span> {selectedClient?.name}</p>
              <p className="text-sm"><span className="font-semibold">Date:</span> {new Date().toLocaleDateString()}</p>
              <p className="text-sm"><span className="font-semibold">Montant:</span> {selectedClient?.totalPaid.toLocaleString()} DA</p>
            </div>
            <div className="pt-8 space-y-8">
              <div className="text-center">
                <p className="text-sm font-semibold mb-12">Signature du client</p>
                <div className="border-t border-gray-300 w-32 mx-auto"></div>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold mb-12">Signature de l'entreprise</p>
                <div className="border-t border-gray-300 w-32 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}