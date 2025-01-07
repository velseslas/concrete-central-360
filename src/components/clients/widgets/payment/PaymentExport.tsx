import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { toast } from "sonner";

export function PaymentExport() {
  const handleExportPDF = () => {
    console.log("Exporting to PDF...");
    toast.success("Export PDF en cours...");
  };

  const handleExportExcel = () => {
    console.log("Exporting to Excel...");
    toast.success("Export Excel en cours...");
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border-red-500/20"
        onClick={handleExportPDF}
      >
        <FileText className="h-4 w-4 mr-2" />
        Export PDF
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300 border-green-500/20"
        onClick={handleExportExcel}
      >
        <FileSpreadsheet className="h-4 w-4 mr-2" />
        Export Excel
      </Button>
    </div>
  );
}