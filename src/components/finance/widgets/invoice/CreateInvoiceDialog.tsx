import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Invoice } from "@/types/invoice";

interface CreateInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Invoice | null;
  mode?: "create" | "edit";
}

export function CreateInvoiceDialog({ 
  open, 
  onOpenChange,
  initialData,
  mode = "create"
}: CreateInvoiceDialogProps) {
  const [formData, setFormData] = useState<Invoice>({
    id: "",
    client: "",
    amount: "",
    date: new Date().toISOString().split('T')[0],
    status: "unpaid" as const,
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData);
    }
  }, [mode, initialData]);

  console.log("CreateInvoiceDialog - État du dialogue:", { open, formData, mode });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("CreateInvoiceDialog - Soumission du formulaire:", formData);
    
    const successMessage = mode === "edit" 
      ? "Facture modifiée avec succès"
      : "Facture créée avec succès";
    
    toast.success(successMessage);
    
    if (mode === "create") {
      setFormData({
        id: "",
        client: "",
        amount: "",
        date: new Date().toISOString().split('T')[0],
        status: "unpaid",
      });
    }
    
    onOpenChange(false);
  };

  const handleCancel = () => {
    console.log("CreateInvoiceDialog - Annulation");
    onOpenChange(false);
  };

  const dialogTitle = mode === "edit" ? "Modifier la Facture" : "Nouvelle Facture";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900/95 backdrop-blur-xl border border-gray-800 text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-400" />
            {dialogTitle}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="client" className="text-sm font-medium text-gray-200">
              Client
            </label>
            <Input
              id="client"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="bg-gray-800/50 border-gray-700 text-white mt-1.5"
              required
            />
          </div>
          <div>
            <label htmlFor="amount" className="text-sm font-medium text-gray-200">
              Montant
            </label>
            <Input
              id="amount"
              type="text"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="bg-gray-800/50 border-gray-700 text-white mt-1.5"
              required
              pattern="[0-9,\.]+"
            />
          </div>
          <div>
            <label htmlFor="date" className="text-sm font-medium text-gray-200">
              Date
            </label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="bg-gray-800/50 border-gray-700 text-white mt-1.5"
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="bg-gray-800/50 border-gray-700 hover:bg-gray-700 text-white"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {mode === "edit" ? "Modifier" : "Créer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}