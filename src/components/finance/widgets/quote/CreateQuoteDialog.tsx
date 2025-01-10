import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator } from "lucide-react";
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
  });

  console.log("CreateQuoteDialog - État du formulaire:", formData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("CreateQuoteDialog - Soumission du formulaire:", formData);
    toast.success("Devis créé avec succès");
    setFormData({
      client: "",
      amount: "",
      date: new Date().toISOString().split('T')[0],
      status: "pending",
    });
    onOpenChange(false);
  };

  const mockClients = [
    "EURL Construction Plus",
    "SPA Bâtiment Pro",
    "SARL Travaux Publics",
    "ETS Batiment",
    "SARL BTP Services",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900/95 backdrop-blur-xl border border-gray-800 text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-400" />
            Nouveau Devis
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="client" className="text-sm font-medium text-gray-200">
              Client
            </label>
            <Select 
              onValueChange={(value) => setFormData({ ...formData, client: value })}
              value={formData.client}
            >
              <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white mt-1.5">
                <SelectValue placeholder="Sélectionner un client" />
              </SelectTrigger>
              <SelectContent>
                {mockClients.map((client) => (
                  <SelectItem key={client} value={client}>
                    {client}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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