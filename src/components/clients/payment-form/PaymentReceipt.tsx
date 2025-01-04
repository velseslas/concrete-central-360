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
              .print-title {
                color: black !important;
                background: none !important;
                -webkit-text-fill-color: black !important;
                padding-left: 1rem !important;
              }
              .print-info {
                padding-left: 1rem !important;
              }
            }
          `}
        </style>
        <div className="p-8 space-y-8 print-content bg-gradient-to-br from-gray-50 to-white">
          {/* Header */}
          <div className="flex justify-between items-start border-b pb-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] bg-clip-text text-transparent print-title">
                Bon de Paiement
              </h2>
              <div className="space-y-1 print-info">
                <p className="text-gray-600">Date: <span className="font-medium text-gray-800">{paymentData.paymentDate || 'N/A'}</span></p>
                <p className="text-gray-600">Référence: <span className="font-medium text-gray-800">{paymentData.reference || 'N/A'}</span></p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={handlePrint} 
              className="no-print hover:bg-gray-100 transition-colors"
            >
              <Printer className="h-4 w-4 mr-2" />
              Imprimer
            </Button>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Client Info */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">Informations Client</h3>
              <div className="space-y-2">
                <p className="text-gray-600">Client: <span className="font-medium text-gray-800">{clientName}</span></p>
                <p className="text-gray-600">Chantier: <span className="font-medium text-gray-800">{projectName}</span></p>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">Détails du Paiement</h3>
              <div className="space-y-3">
                <div className="flex flex-col">
                  <p className="text-2xl font-bold text-blue-600">
                    {amount.toLocaleString('fr-FR')} DA
                  </p>
                  <p className="text-gray-600 italic">
                    Soit: {amountInWords} dinars algériens
                  </p>
                </div>
                <p className="text-gray-600">Mode de paiement: <span className="font-medium text-gray-800">Espèces</span></p>
              </div>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-12 pt-8 mt-8 border-t border-gray-200">
              <div>
                <p className="font-semibold text-gray-700 mb-12">Signature du Client</p>
                <div className="border-t-2 border-gray-300 w-48"></div>
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-12">Signature de l'Entreprise</p>
                <div className="border-t-2 border-gray-300 w-48"></div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}