
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { numberToWords } from "@/utils/numberToWords";

interface ReceiptContentProps {
  paymentData: {
    supplier: string;
    amount: string;
    paymentMethod: string;
    paymentDate: Date;
    notes?: string;
  };
  paymentMethodLabels: Record<string, string>;
}

export function ReceiptContent({ paymentData, paymentMethodLabels }: ReceiptContentProps) {
  const amount = parseFloat(paymentData.amount.replace(/\s/g, '').replace(/,/g, '.'));
  const amountInWords = numberToWords(Math.floor(amount));

  return (
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
    </div>
  );
}
