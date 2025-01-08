import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Invoice } from "@/types/invoice";
import { toast } from "sonner";
import { Upload } from "lucide-react";

interface ValidateInvoiceDialogProps {
  invoice: Invoice | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onValidate: () => void;
}

export function ValidateInvoiceDialog({
  invoice,
  open,
  onOpenChange,
  onValidate,
}: ValidateInvoiceDialogProps) {
  const [reference, setReference] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      toast.success("Document téléchargé avec succès");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference) {
      toast.error("Veuillez saisir une référence");
      return;
    }
    if (!file) {
      toast.error("Veuillez télécharger un document");
      return;
    }
    console.log("Validation de la facture avec référence:", reference, "et fichier:", file);
    onValidate();
    onOpenChange(false);
    toast.success("Facture validée avec succès");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900/95 backdrop-blur-xl border border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Validation de la facture
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            <div>
              <label className="text-sm text-gray-400">Numéro de facture</label>
              <p className="text-white font-medium">{invoice?.id}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Client</label>
              <p className="text-white font-medium">{invoice?.client}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Date de création</label>
              <p className="text-white font-medium">{invoice?.date}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Référence (N° de chèque)</label>
              <Input
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="Entrez le numéro de chèque"
                className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Document justificatif</label>
              <div className="relative">
                <Input
                  type="file"
                  className="hidden"
                  id="validate-doc"
                  onChange={handleFileChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  asChild
                  className="w-full bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50"
                >
                  <label htmlFor="validate-doc" className="cursor-pointer flex items-center justify-center">
                    <Upload className="mr-2 h-4 w-4" />
                    {file ? file.name : "Télécharger un document"}
                  </label>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Valider
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}