import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { Invoice } from "@/types/invoice";
import { toast } from "sonner";

interface InvoiceReportPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoices: Invoice[];
  filters: {
    client: string;
    status: string;
    startDate: string;
    endDate: string;
  };
}

export function InvoiceReportPreview({
  open,
  onOpenChange,
  invoices,
  filters
}: InvoiceReportPreviewProps) {
  const handleDownload = () => {
    console.log("Téléchargement du rapport");
    toast.success("Téléchargement du rapport en cours...");
  };

  const handlePrint = () => {
    console.log("Impression du rapport");
    window.print();
    toast.success("Impression lancée");
  };

  const total = invoices.reduce((sum, invoice) => sum + parseFloat(invoice.amount.replace(/[^0-9.-]+/g,"")), 0);

  console.log("Rendering report preview with invoices:", invoices);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle>Aperçu du Rapport</DialogTitle>
        </DialogHeader>
        <div className="flex justify-end space-x-2 mb-4">
          <Button onClick={handleDownload} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Télécharger
          </Button>
          <Button onClick={handlePrint} variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Imprimer
          </Button>
        </div>
        <div className="bg-white text-gray-900 p-6 rounded-lg">
          <div className="mb-4">
            <h3 className="text-lg font-bold">Rapport de Facturation</h3>
            <p className="text-sm text-gray-600">Période: {filters.startDate || 'Non spécifiée'} - {filters.endDate || 'Non spécifiée'}</p>
            <p className="text-sm text-gray-600">Client: {filters.client === 'all' ? 'Tous' : filters.client}</p>
            <p className="text-sm text-gray-600">Statut: {filters.status === 'all' ? 'Tous' : filters.status}</p>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-2 text-left">N° Facture</th>
                <th className="border p-2 text-left">Client</th>
                <th className="border p-2 text-left">Date</th>
                <th className="border p-2 text-right">Montant</th>
                <th className="border p-2 text-center">Statut</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="border p-2">{invoice.id}</td>
                  <td className="border p-2">{invoice.client}</td>
                  <td className="border p-2">{invoice.date}</td>
                  <td className="border p-2 text-right">{invoice.amount}</td>
                  <td className="border p-2 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      invoice.status === 'paid' 
                        ? 'bg-green-100 text-green-800'
                        : invoice.status === 'validated'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {invoice.status === 'paid' ? 'Payée' : invoice.status === 'validated' ? 'Validée' : 'Impayée'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-bold">
                <td colSpan={3} className="border p-2 text-right">Total:</td>
                <td className="border p-2 text-right">{total.toLocaleString()} DA</td>
                <td className="border p-2"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}