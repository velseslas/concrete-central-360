import { Button } from "@/components/ui/button";
import { Invoice } from "@/types/invoice";
import { Check, Download, Eye, Printer } from "lucide-react";

interface InvoiceActionsProps {
  invoice: Invoice | null;
  isValidateEnabled: boolean;
  onValidate: () => void;
  onPreviewClick: () => void;
  onPrint: () => void;
  onDownload: () => void;
}

export function InvoiceActions({
  invoice,
  isValidateEnabled,
  onValidate,
  onPreviewClick,
  onPrint,
  onDownload
}: InvoiceActionsProps) {
  return (
    <div className="flex gap-3">
      {isValidateEnabled && (
        <Button
          variant="outline"
          onClick={onValidate}
          className="bg-green-500/10 hover:bg-green-500/20 border-green-500/20 hover:border-green-500/30 text-green-400"
        >
          <Check className="h-4 w-4 mr-2" />
          Valider
        </Button>
      )}
      <Button
        variant="outline"
        onClick={onPreviewClick}
        className="bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/20 hover:border-purple-500/30 text-purple-400"
      >
        <Eye className="h-4 w-4 mr-2" />
        Aperçu
      </Button>
      <Button
        variant="outline"
        onClick={onDownload}
        className="bg-primary/10 hover:bg-primary/20 border-primary/20 hover:border-primary/30 text-primary-foreground"
      >
        <Download className="h-4 w-4 mr-2" />
        Télécharger
      </Button>
      <Button
        variant="default"
        onClick={onPrint}
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <Printer className="h-4 w-4 mr-2" />
        Imprimer
      </Button>
    </div>
  );
}