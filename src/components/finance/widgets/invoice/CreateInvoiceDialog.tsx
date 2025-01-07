import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FileText } from "lucide-react";
import { toast } from "sonner";

interface CreateInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateInvoiceDialog({ open, onOpenChange }: CreateInvoiceDialogProps) {
  const [formData, setFormData] = useState({
    id: "",
    client: "",
    amount: "",
    date: new Date().toISOString().split('T')[0],
    status: "unpaid" as const,
  });

  console.log("État du dialogue dans CreateInvoiceDialog:", { open, formData });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Soumission du formulaire:", formData);
    toast.success("Facture créée avec succès");
    setFormData({
      id: "",
      client: "",
      amount: "",
      date: new Date().toISOString().split('T')[0],
      status: "unpaid",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900/95 backdrop-blur-xl border border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-400" />
            Nouvelle Facture
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="client" className="text-gray-200">Client</Label>
              <Input
                id="client"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="bg-gray-800/50 border-gray-700 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="amount" className="text-gray-200">Montant (DA)</Label>
              <Input
                id="amount"
                type="text"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="bg-gray-800/50 border-gray-700 text-white"
                required
                pattern="[0-9,\.]+"
              />
            </div>
            <div>
              <Label htmlFor="date" className="text-gray-200">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="bg-gray-800/50 border-gray-700 text-white"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-gray-800/50 border-gray-700 hover:bg-gray-700 text-white"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Créer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}