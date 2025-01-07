import { Button } from "@/components/ui/button";
import { DollarSign, Printer } from "lucide-react";
import { Invoice } from "@/types/invoice";

interface InvoicePrintPreviewProps {
  invoice: Invoice | null;
  onPrint: () => void;
  onDownload: () => void;
}

export function InvoicePrintPreview({ 
  invoice, 
  onPrint, 
  onDownload 
}: InvoicePrintPreviewProps) {
  return (
    <div id="invoice-preview" className="space-y-6 p-4">
      <div className="company-info">
        <h3 className="text-base font-semibold text-gray-900">SARL EXEMPLE</h3>
        <p className="text-gray-600">123 Rue des Entrepreneurs</p>
        <p className="text-gray-600">16000 Alger, Algérie</p>
        <p className="text-gray-600">Tél: +213 XX XX XX XX</p>
      </div>

      <div className="invoice-details flex justify-between">
        <div>
          <h4 className="font-semibold mb-1">Facturé à:</h4>
          <p className="font-medium">{invoice?.client}</p>
          <p className="text-gray-600">Adresse du client</p>
          <p className="text-gray-600">Ville, Code postal</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">Date: {invoice?.date}</p>
          <p className="text-gray-600">Facture N°: {invoice?.id}</p>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-right">Quantité</th>
            <th className="px-4 py-2 text-right">Prix unitaire</th>
            <th className="px-4 py-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border">Service de construction</td>
            <td className="px-4 py-2 text-right border">1</td>
            <td className="px-4 py-2 text-right border">150,000 DA</td>
            <td className="px-4 py-2 text-right border">150,000 DA</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="px-4 py-2 text-right font-medium border">Total HT</td>
            <td className="px-4 py-2 text-right font-medium border">150,000 DA</td>
          </tr>
          <tr>
            <td colSpan={3} className="px-4 py-2 text-right font-medium border">TVA (19%)</td>
            <td className="px-4 py-2 text-right font-medium border">28,500 DA</td>
          </tr>
          <tr>
            <td colSpan={3} className="px-4 py-2 text-right font-semibold border">Total TTC</td>
            <td className="px-4 py-2 text-right font-semibold border">178,500 DA</td>
          </tr>
        </tfoot>
      </table>

      <div className="footer">
        <div className="mb-4">
          <h4 className="font-semibold mb-1">Conditions de paiement</h4>
          <p className="text-gray-600">Paiement à 30 jours</p>
        </div>
        <div>
          <h4 className="font-semibold mb-1">Coordonnées bancaires</h4>
          <p className="text-gray-600">IBAN: DZ XX XXXX XXXX XXXX XXXX</p>
          <p className="text-gray-600">BIC: XXXXXXXX</p>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t no-print">
        <Button
          variant="outline"
          onClick={onDownload}
          className="bg-gray-100 hover:bg-gray-200 text-gray-900"
        >
          <DollarSign className="h-4 w-4 mr-2" />
          Télécharger
        </Button>
        <Button
          variant="outline"
          onClick={onPrint}
          className="bg-gray-100 hover:bg-gray-200 text-gray-900"
        >
          <Printer className="h-4 w-4 mr-2" />
          Imprimer
        </Button>
      </div>
    </div>
  );
}