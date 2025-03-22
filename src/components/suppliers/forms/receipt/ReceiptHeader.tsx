
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface ReceiptHeaderProps {
  receiptNumber: string;
}

export function ReceiptHeader({ receiptNumber }: ReceiptHeaderProps) {
  return (
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
  );
}
