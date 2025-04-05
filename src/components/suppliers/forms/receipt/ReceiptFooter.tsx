
import React from 'react';

export function ReceiptFooter() {
  return (
    <>
      <div className="grid grid-cols-2 gap-8 mt-8">
        <div className="border-t pt-4">
          <p className="font-bold mb-4">Signature du fournisseur</p>
          <div className="h-24 border-b"></div>
        </div>
        <div className="border-t pt-4">
          <p className="font-bold mb-4">Signature et cachet de l'entreprise</p>
          <div className="h-24 border-b"></div>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500 mt-8">
        <p>Merci pour votre collaboration</p>
        <p>Ce reçu constitue la preuve de votre paiement</p>
      </div>
    </>
  );
}
