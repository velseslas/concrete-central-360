
import React from 'react';

interface ReceiptContentProps {
  paymentData: {
    client: string;
    amount: string;
    paymentMethod: string;
    paymentDate: Date;
    notes?: string;
    reference?: string;
    project?: string;
  };
  paymentMethodLabels: Record<string, string>;
}

export function ReceiptContent({ paymentData, paymentMethodLabels }: ReceiptContentProps) {
  const formatAmount = (amount: string) => {
    return typeof amount === 'string' 
      ? parseFloat(amount.replace(/\s/g, '').replace(/,/g, '')).toLocaleString('fr-FR') 
      : Number(amount).toLocaleString('fr-FR');
  };

  const formattedDate = paymentData.paymentDate.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className="space-y-4">
      <div className="border-b pb-4">
        <h2 className="font-bold mb-2">DÉTAILS DU CLIENT</h2>
        <p>Nom: {paymentData.client}</p>
        {paymentData.project && <p>Chantier: {paymentData.project}</p>}
      </div>
      
      <div className="border-b pb-4">
        <h2 className="font-bold mb-2">DÉTAILS DU PAIEMENT</h2>
        <div className="grid grid-cols-2">
          <div>
            <p className="mb-1"><span className="font-medium">Montant:</span> {formatAmount(paymentData.amount)} DA</p>
            <p className="mb-1">
              <span className="font-medium">Mode de paiement:</span> {paymentMethodLabels[paymentData.paymentMethod] || paymentData.paymentMethod}
            </p>
          </div>
          <div>
            <p className="mb-1"><span className="font-medium">Date:</span> {formattedDate}</p>
            {paymentData.reference && (
              <p className="mb-1"><span className="font-medium">Référence:</span> {paymentData.reference}</p>
            )}
          </div>
        </div>
        
        {paymentData.notes && (
          <div className="mt-4">
            <p className="mb-1"><span className="font-medium">Notes:</span></p>
            <p>{paymentData.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
