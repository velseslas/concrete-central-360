import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { ReportTemplate } from "./ReportTemplate";

interface ReportPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: {
    clientId: string;
    status: string;
    startDate: string;
    endDate: string;
  };
}

export function ReportPreviewDialog({
  open,
  onOpenChange,
  filters
}: ReportPreviewDialogProps) {
  const handleDownload = () => {
    console.log("Downloading report...");
    // Implement download logic here
  };

  const handlePrint = () => {
    console.log("Printing report...");
    window.print();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle>Aperçu du Rapport</DialogTitle>
        </DialogHeader>
        
        <div className="flex justify-end gap-4 mb-4">
          <Button onClick={handleDownload} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Télécharger
          </Button>
          <Button onClick={handlePrint} variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Imprimer
          </Button>
        </div>

        <div className="bg-white text-gray-900 p-6 rounded-lg">
          <ReportTemplate filters={filters} />
        </div>
      </DialogContent>
    </Dialog>
  );
}