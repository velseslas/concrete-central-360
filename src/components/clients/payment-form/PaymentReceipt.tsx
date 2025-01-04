import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

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

  const amount = parseFloat(paymentData.amount || "0");
  const amountInWords = numberToWords(Math.floor(amount));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[800px] print:!p-0">
        <style>
          {`
            @media print {
              .no-print {
                display: none !important;
              }
              @page {
                margin: 20mm;
              }
              .print-content {
                padding: 0 !important;
              }
            }
          `}
        </style>
        <div className="p-6 space-y-6 print-content">
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
              <p>Montant: {amount.toLocaleString('fr-FR')} DA</p>
              <p className="text-gray-600 italic">Soit: {amountInWords} dinars algériens</p>
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