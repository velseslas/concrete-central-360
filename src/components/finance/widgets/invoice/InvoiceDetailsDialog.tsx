import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Printer, Check, Eye } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface Invoice {
  id: string;
  client: string;
  amount: string;
  date: string;
  status: "pending" | "paid" | "overdue" | "validated";
}

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

  const handlePrintInvoice = () => {
    toast.success("Impression de la facture " + invoice?.id);
  };

  const handleDownloadInvoice = () => {
    toast.success("Téléchargement de la facture " + invoice?.id);
  };

  const handleValidateInvoice = () => {
    if (invoice) {
      onStatusChange("validated");
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
        <DialogContent className="bg-gray-900/95 backdrop-blur-xl border border-gray-800 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Aperçu de la Facture {invoice?.id}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Aperçu de la facture */}
            <div className="bg-white text-gray-900 p-8 rounded-lg">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Facture #{invoice?.id}</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Client</p>
                    <p className="font-medium">{invoice?.client}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">Date</p>
                    <p className="font-medium">{invoice?.date}</p>
                  </div>
                </div>
                <div className="mt-8">
                  <p className="text-gray-600">Montant Total</p>
                  <p className="text-2xl font-bold">{invoice?.amount}</p>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={handleDownloadInvoice}
                className="bg-[#9b87f5]/10 hover:bg-[#9b87f5]/20 border-white text-[#9b87f5] hover:text-[#7E69AB] px-6"
              >
                <DollarSign className="h-5 w-5 mr-2" />
                Télécharger
              </Button>
              <Button
                variant="outline"
                onClick={handlePrintInvoice}
                className="bg-[#9b87f5]/10 hover:bg-[#9b87f5]/20 border-white text-[#9b87f5] hover:text-[#7E69AB] px-6"
              >
                <Printer className="h-5 w-5 mr-2" />
                Imprimer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}