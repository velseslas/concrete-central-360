import { Button } from "@/components/ui/button";
import { Check, Eye, Archive } from "lucide-react";
import { Invoice } from "@/types/invoice";
import { toast } from "sonner";

interface InvoiceActionsProps {
  invoice: Invoice | null;
  isValidateEnabled: boolean;
  onValidate: () => void;
  onPreviewClick: () => void;
}

export function InvoiceActions({ 
  invoice, 
  isValidateEnabled, 
  onValidate,
  onPreviewClick 
}: InvoiceActionsProps) {
  const handleArchive = () => {
    if (invoice) {
      toast.success(`La facture ${invoice.id} a été archivée`);
    }
  };

  const isArchiveEnabled = invoice?.status === "paid" && !isValidateEnabled;

  return (
    <>
      <Button
        variant="outline"
        onClick={onValidate}
        disabled={!isValidateEnabled}
        className={`bg-green-500/10 border-white ${
          isValidateEnabled 
            ? 'hover:bg-green-500/20 text-green-400 hover:text-green-300 cursor-pointer' 
            : 'opacity-50 cursor-not-allowed text-gray-400'
        }`}
      >
        <Check className="h-4 w-4 mr-2" />
        Valider
      </Button>
      <Button
        variant="outline"
        onClick={handleArchive}
        disabled={!isArchiveEnabled}
        className={`bg-blue-500/10 border-white ${
          isArchiveEnabled
            ? 'hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 cursor-pointer'
            : 'opacity-50 cursor-not-allowed text-gray-400'
        }`}
      >
        <Archive className="h-4 w-4 mr-2" />
        Archiver
      </Button>
      <Button
        variant="outline"
        onClick={onPreviewClick}
        className="bg-[#9b87f5]/10 hover:bg-[#9b87f5]/20 border-white text-[#9b87f5] hover:text-[#7E69AB] transition-all duration-200"
      >
        <Eye className="h-4 w-4 mr-2" />
        Aperçu
      </Button>
    </>
  );
}