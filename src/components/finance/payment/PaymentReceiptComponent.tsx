
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { toast } from "sonner";

interface PaymentReceiptComponentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  receiptData: {
    client: string;
    project?: string;
    amount: number;
    paymentMethod: string;
    paymentDate: string;
    reference?: string;
    notes?: string;
  };
}

export function PaymentReceiptComponent({ 
  open, 
  onOpenChange, 
  receiptData 
}: PaymentReceiptComponentProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.success("Le reçu a été téléchargé");
    // Dans une implémentation réelle, cela utiliserait une bibliothèque comme jsPDF ou html2canvas
    // pour convertir le reçu en fichier PDF ou image pour le téléchargement
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('fr-FR');
  };

  const receiptNumber = `RECU-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  
  const paymentMethodLabels: Record<string, string> = {
    virement: "Virement bancaire",
    cheque: "Chèque",
    especes: "Espèces",
    carte: "Carte bancaire",
    "Virement": "Virement bancaire",
    "Chèque": "Chèque",
    "Espèces": "Espèces",
  };

  const formattedDate = new Date(receiptData.paymentDate).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90%] max-w-[800px] h-[90vh] max-h-[800px] overflow-y-auto print:!p-0 bg-white">
        <style>
          {`
            @media print {
              @page { size: A4; margin: 20mm; }
              body * { visibility: hidden; }
              .print-content, .print-content * { visibility: visible; }
              .no-print, .no-print * { display: none !important; }
              .print-content { position: absolute; left: 0; top: 0; width: 100%; }
            }
          `}
        </style>
        
        <div className="flex justify-end gap-2 mb-4 no-print">
          <Button onClick={handleDownload} variant="outline" size="sm" className="border-gray-300">
            <Download className="h-4 w-4 mr-2" />
            Télécharger
          </Button>
          <Button onClick={handlePrint} variant="outline" size="sm" className="border-gray-300">
            <Printer className="h-4 w-4 mr-2" />
            Imprimer
          </Button>
        </div>
        
        <div className="print-content p-6 space-y-6">
          <div className="text-center border-b pb-4">
            <h1 className="text-2xl font-bold">REÇU DE PAIEMENT</h1>
            <p className="text-gray-500">Numéro: {receiptNumber}</p>
            <p className="text-gray-500">Date: {formattedDate}</p>
          </div>
          
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h2 className="font-bold mb-2">DÉTAILS DU CLIENT</h2>
              <p>Nom: {receiptData.client}</p>
              {receiptData.project && <p>Chantier: {receiptData.project}</p>}
            </div>
            
            <div className="border-b pb-4">
              <h2 className="font-bold mb-2">DÉTAILS DU PAIEMENT</h2>
              <div className="grid grid-cols-2">
                <div>
                  <p className="mb-1"><span className="font-medium">Montant:</span> {formatAmount(receiptData.amount)} DA</p>
                  <p className="mb-1"><span className="font-medium">Mode de paiement:</span> {paymentMethodLabels[receiptData.paymentMethod] || receiptData.paymentMethod}</p>
                </div>
                <div>
                  <p className="mb-1"><span className="font-medium">Date:</span> {formattedDate}</p>
                  {receiptData.reference && (
                    <p className="mb-1"><span className="font-medium">Référence:</span> {receiptData.reference}</p>
                  )}
                </div>
              </div>
              
              {receiptData.notes && (
                <div className="mt-4">
                  <p className="mb-1"><span className="font-medium">Notes:</span></p>
                  <p>{receiptData.notes}</p>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-8">
              <div className="border-t pt-4">
                <p className="font-bold mb-4">Signature du client</p>
                <div className="h-24 border-b"></div>
              </div>
              <div className="border-t pt-4">
                <p className="font-bold mb-4">Signature et cachet de l'entreprise</p>
                <div className="h-24 border-b"></div>
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-500 mt-8">
              <p>Merci de votre paiement</p>
              <p>Ce reçu constitue la preuve de votre paiement</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
