import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator, Save, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CreateQuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateQuoteDialog({ open, onOpenChange }: CreateQuoteDialogProps) {
  const [formData, setFormData] = useState({
    client: "",
    amount: "",
    date: new Date().toISOString().split('T')[0],
    status: "pending" as const,
    description: "",
    validUntil: "",
    reference: `DV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("CreateQuoteDialog - Soumission du formulaire:", formData);
    toast.success("Devis créé avec succès");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900/95 backdrop-blur-xl border border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-400" />
            Nouveau Devis
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Référence</label>
            <Input
              value={formData.reference}
              className="bg-gray-800/50 border-gray-700 text-white"
              readOnly
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Client</label>
            <Input
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="bg-gray-800/50 border-gray-700 text-white"
              placeholder="Nom du client"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Description</label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-gray-800/50 border-gray-700 text-white"
              placeholder="Description du devis"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Montant</label>
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="bg-gray-800/50 border-gray-700 text-white"
                placeholder="0.00"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Date de validité</label>
              <Input
                type="date"
                value={formData.validUntil}
                onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
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
              <X className="h-4 w-4 mr-2" />
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Créer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}