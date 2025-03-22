
export function ReceiptFooter() {
  return (
    <>
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
    </>
  );
}
