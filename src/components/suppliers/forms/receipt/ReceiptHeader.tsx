
import React from 'react';

interface ReceiptHeaderProps {
  receiptNumber: string;
}

export function ReceiptHeader({ receiptNumber }: ReceiptHeaderProps) {
  return (
    <div className="text-center border-b pb-4">
      <h1 className="text-2xl font-bold">REÇU DE PAIEMENT</h1>
      <p className="text-gray-500">Numéro: {receiptNumber}</p>
      <p className="text-gray-500">Date: {new Date().toLocaleDateString('fr-FR')}</p>
    </div>
  );
}
