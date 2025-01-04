import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface PaymentReceiptProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentData: {
    clientId?: string;
    projectId?: string;
    amount?: string;
    paymentMethod?: string;
    paymentDate?: string;
    reference?: string;
  };
  clientName: string;
  projectName: string;
}

export function PaymentReceipt({ open, onOpenChange, paymentData, clientName, projectName }: PaymentReceiptProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[800px]">
        <style>
          {`
            @media print {
              .no-print {
                display: none !important;
              }
              @page {
                margin: 20mm;
              }
            }
          `}
        </style>
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-6">Bon de Paiement</h2>
              <p className="text-gray-600">Date: {paymentData.paymentDate || 'N/A'}</p>
              <p className="text-gray-600">Référence: {paymentData.reference || 'N/A'}</p>
            </div>
            <Button variant="outline" onClick={handlePrint} className="no-print">
              <Printer className="h-4 w-4 mr-2" />
              Imprimer
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Informations Client</h3>
              <p>Client: {clientName}</p>
              <p>Chantier: {projectName}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Détails du Paiement</h3>
              <p>Montant: {paymentData.amount || '0'} DA</p>
              <p>Mode de paiement: Espèces</p>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <p className="font-semibold mb-8">Signature du Client</p>
                <div className="border-t border-gray-300 w-48"></div>
              </div>
              <div>
                <p className="font-semibold mb-8">Signature de l'Entreprise</p>
                <div className="border-t border-gray-300 w-48"></div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}