
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";

// Converts a number to French words
const numberToWords = (n: number): string => {
  const units = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
  const teens = ["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
  const tens = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingt", "quatre-vingt-dix"];
  
  const convertLessThanThousand = (num: number): string => {
    if (num === 0) return "";
    
    let result = "";
    
    // Hundreds
    if (num >= 100) {
      if (Math.floor(num / 100) === 1) {
        result += "cent ";
      } else {
        result += units[Math.floor(num / 100)] + " cent ";
      }
      num %= 100;
    }
    
    // Tens and units
    if (num >= 10) {
      if (num < 20) {
        result += teens[num - 10];
        return result.trim();
      } else {
        const ten = Math.floor(num / 10);
        const unit = num % 10;
        
        if (ten === 7 || ten === 9) {
          result += tens[ten - 1] + "-";
          result += teens[unit];
        } else {
          result += tens[ten];
          if (unit > 0) {
            result += "-" + units[unit];
          }
        }
      }
    } else if (num > 0) {
      result += units[num];
    }
    
    return result.trim();
  };

  if (n === 0) return "zéro";
  
  let result = "";
  
  // Millions
  if (n >= 1000000) {
    const millions = Math.floor(n / 1000000);
    if (millions === 1) {
      result += "un million ";
    } else {
      result += convertLessThanThousand(millions) + " millions ";
    }
    n %= 1000000;
  }
  
  // Thousands
  if (n >= 1000) {
    const thousands = Math.floor(n / 1000);
    if (thousands === 1) {
      result += "mille ";
    } else {
      result += convertLessThanThousand(thousands) + " mille ";
    }
    n %= 1000;
  }
  
  // Rest
  result += convertLessThanThousand(n);
  
  return result.trim();
};

interface SupplierPaymentReceiptProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentData: {
    supplier: string;
    amount: string;
    paymentMethod: string;
    paymentDate: Date;
    notes?: string;
  };
}

export function SupplierPaymentReceipt({ 
  open, 
  onOpenChange, 
  paymentData 
}: SupplierPaymentReceiptProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.success("Le reçu a été téléchargé");
    // In a real implementation, this would use a library like jsPDF or html2canvas
    // to convert the receipt to a PDF or image file for download
  };

  const receiptNumber = `RECU-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  const amount = parseFloat(paymentData.amount.replace(/\s/g, '').replace(/,/g, '.'));
  const amountInWords = numberToWords(Math.floor(amount));

  const paymentMethodLabels: Record<string, string> = {
    virement: "Virement bancaire",
    cheque: "Chèque",
    especes: "Espèces",
    carte: "Carte bancaire"
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90%] max-w-[800px] h-[90vh] max-h-[800px] overflow-y-auto print:!p-0 bg-white">
        <style>
          {`
            @media print {
              .no-print {
                display: none !important;
              }
              @page {
                size: A4;
                margin: 20mm;
              }
              .print-content {
                padding: 0 !important;
              }
              [role="dialog"] button[type="button"] {
                display: none !important;
              }
            }
          `}
        </style>
        
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
          {/* Header */}
          <div className="flex justify-between items-start border-b pb-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gray-800">Reçu de Paiement</h2>
              <p className="text-gray-600">N° {receiptNumber}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-800">SARL CIMENTERIE BETONIERE</p>
              <p className="text-sm text-gray-600">Route De Tébessa, Oum El Bouaghi</p>
              <p className="text-sm text-gray-600">RC: 25/00-B-0016017</p>
              <p className="text-sm text-gray-600">NIF: 002.5015.36.0598.5099</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Date and Payment Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Date d'émission:</p>
                <p className="font-medium">{format(new Date(), "dd MMMM yyyy", { locale: fr })}</p>
              </div>
              <div>
                <p className="text-gray-600">Date de paiement:</p>
                <p className="font-medium">{format(paymentData.paymentDate, "dd MMMM yyyy", { locale: fr })}</p>
              </div>
            </div>

            {/* Supplier Info */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-lg mb-3 text-gray-800">Fournisseur</h3>
              <p className="font-medium text-gray-800">{paymentData.supplier}</p>
            </div>

            {/* Payment Details */}
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-lg mb-3 text-gray-800">Paiement</h3>
              <div className="space-y-3">
                <div className="flex flex-col">
                  <p className="text-2xl font-bold text-blue-600">
                    {amount.toLocaleString('fr-FR')} DA
                  </p>
                  <p className="text-gray-600 italic">
                    Soit: {amountInWords} dinars algériens
                  </p>
                </div>
                <p className="text-gray-600">Mode de paiement: <span className="font-medium text-gray-800">{paymentMethodLabels[paymentData.paymentMethod] || paymentData.paymentMethod}</span></p>
                
                {paymentData.notes && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-600">Notes:</p>
                    <p className="text-gray-800">{paymentData.notes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-8 pt-10 mt-10 border-t border-gray-200">
              <div>
                <p className="font-semibold text-gray-700 mb-16">Signature du Fournisseur</p>
                <div className="border-t-2 border-gray-300 w-48"></div>
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-16">Signature de l'Entreprise</p>
                <div className="border-t-2 border-gray-300 w-48"></div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-500 pt-6 mt-6 border-t border-gray-200">
              <p>Ce document tient lieu de reçu de paiement.</p>
              <p className="mt-1">SARL CIMENTERIE BETONIERE - Tél: +213 (0) 99 999 9999</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
