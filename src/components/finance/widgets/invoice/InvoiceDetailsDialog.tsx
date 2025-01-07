import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Printer, Check } from "lucide-react";
import { toast } from "sonner";

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

  return (
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
                  <SelectItem value="validated">Validée</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-between gap-3 pt-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleValidateInvoice}
                className="bg-green-500/10 hover:bg-green-500/20 border-white text-green-400 hover:text-green-300"
              >
                <Check className="h-4 w-4 mr-2" />
                Valider
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleDownloadInvoice}
                className="bg-[#9b87f5]/10 hover:bg-[#9b87f5]/20 border-white text-[#9b87f5] hover:text-[#7E69AB] transition-all duration-200"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
              <Button
                variant="outline"
                onClick={handlePrintInvoice}
                className="bg-[#9b87f5]/10 hover:bg-[#9b87f5]/20 border-white text-[#9b87f5] hover:text-[#7E69AB] transition-all duration-200"
              >
                <Printer className="h-4 w-4 mr-2" />
                Imprimer
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}