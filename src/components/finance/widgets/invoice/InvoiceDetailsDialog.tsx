import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Printer, Check, Eye } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Invoice } from "@/types/invoice";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface InvoiceDetailsDialogProps {
  invoice: Invoice | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange: (status: Invoice["status"]) => void;
}

export function InvoiceDetailsDialog({ 
  invoice, 
  open, 
  onOpenChange, 
  onStatusChange 
}: InvoiceDetailsDialogProps) {
  const [showPreview, setShowPreview] = useState(false);

  const handlePrintInvoice = async () => {
    const invoiceElement = document.getElementById('invoice-preview');
    if (!invoiceElement) {
      toast.error("Erreur lors de l'impression");
      return;
    }
    
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Impression Facture</title>');
      printWindow.document.write('</head><body>');
      printWindow.document.write(invoiceElement.innerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }
    toast.success("Impression de la facture " + invoice?.id);
  };

  const handleDownloadInvoice = async () => {
    const invoiceElement = document.getElementById('invoice-preview');
    if (!invoiceElement) {
      toast.error("Erreur lors du téléchargement");
      return;
    }

    try {
      const canvas = await html2canvas(invoiceElement);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`facture-${invoice?.id}.pdf`);
      
      toast.success("Téléchargement de la facture " + invoice?.id);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      toast.error("Erreur lors du téléchargement du PDF");
    }
  };

  const handleValidateInvoice = () => {
    if (invoice) {
      onStatusChange("paid");
      toast.success(`La facture ${invoice.id} a été validée avec succès`);
    }
  };

  const isValidateEnabled = invoice?.status === "paid";

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-gray-900/95 backdrop-blur-xl border border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              Détails de la Facture {invoice?.id}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Client</p>
                <p className="text-white font-medium">{invoice?.client}</p>
              </div>
              <div>
                <p className="text-gray-400">Montant</p>
                <p className="text-white font-medium">{invoice?.amount}</p>
              </div>
              <div>
                <p className="text-gray-400">Date</p>
                <p className="text-white font-medium">{invoice?.date}</p>
              </div>
              <div>
                <p className="text-gray-400">Statut</p>
                <Select value={invoice?.status} onValueChange={onStatusChange}>
                  <SelectTrigger className="w-full bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Changer le statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="paid">Payée</SelectItem>
                    <SelectItem value="overdue">En retard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-between gap-3 pt-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleValidateInvoice}
                  disabled={!isValidateEnabled}
                  className={`bg-green-500/10 border-white px-6 ${
                    isValidateEnabled 
                      ? 'hover:bg-green-500/20 text-green-400 hover:text-green-300 cursor-pointer' 
                      : 'opacity-50 cursor-not-allowed text-gray-400'
                  }`}
                >
                  <Check className="h-5 w-5 mr-2" />
                  Valider
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowPreview(true)}
                  className="bg-[#9b87f5]/10 hover:bg-[#9b87f5]/20 border-white text-[#9b87f5] hover:text-[#7E69AB] px-6 transition-all duration-200"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  Aperçu
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="bg-white text-gray-900 max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold border-b pb-4">
              Facture #{invoice?.id}
            </DialogTitle>
          </DialogHeader>
          
          <div id="invoice-preview" className="space-y-6 p-4">
            {/* En-tête de la facture */}
            <div className="flex justify-between text-sm">
              <div>
                <h3 className="text-base font-semibold text-gray-900">SARL EXEMPLE</h3>
                <p className="text-gray-600">123 Rue des Entrepreneurs</p>
                <p className="text-gray-600">16000 Alger, Algérie</p>
                <p className="text-gray-600">Tél: +213 XX XX XX XX</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Date: {invoice?.date}</p>
                <p className="text-gray-600">Facture N°: {invoice?.id}</p>
              </div>
            </div>

            {/* Informations client */}
            <div className="border-t border-b py-3 text-sm">
              <h4 className="font-semibold mb-1">Facturé à:</h4>
              <p className="font-medium">{invoice?.client}</p>
              <p className="text-gray-600">Adresse du client</p>
              <p className="text-gray-600">Ville, Code postal</p>
            </div>

            {/* Détails de la facture */}
            <div className="border rounded-lg overflow-hidden text-sm">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Description</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Quantité</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Prix unitaire</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2">Service de construction</td>
                    <td className="px-4 py-2 text-right">1</td>
                    <td className="px-4 py-2 text-right">150,000 DA</td>
                    <td className="px-4 py-2 text-right">150,000 DA</td>
                  </tr>
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={3} className="px-4 py-2 text-right font-medium">Total HT</td>
                    <td className="px-4 py-2 text-right font-medium">150,000 DA</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="px-4 py-2 text-right font-medium">TVA (19%)</td>
                    <td className="px-4 py-2 text-right font-medium">28,500 DA</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="px-4 py-2 text-right font-semibold">Total TTC</td>
                    <td className="px-4 py-2 text-right font-semibold">178,500 DA</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Conditions de paiement */}
            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-semibold mb-1">Conditions de paiement</h4>
                <p className="text-gray-600">Paiement à 30 jours</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Coordonnées bancaires</h4>
                <p className="text-gray-600">IBAN: DZ XX XXXX XXXX XXXX XXXX</p>
                <p className="text-gray-600">BIC: XXXXXXXX</p>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={handleDownloadInvoice}
                className="bg-gray-100 hover:bg-gray-200 text-gray-900"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
              <Button
                variant="outline"
                onClick={handlePrintInvoice}
                className="bg-gray-100 hover:bg-gray-200 text-gray-900"
              >
                <Printer className="h-4 w-4 mr-2" />
                Imprimer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}