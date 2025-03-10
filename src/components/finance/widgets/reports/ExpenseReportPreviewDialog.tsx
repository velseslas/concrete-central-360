
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { ExpenseReportTable } from "./ExpenseReportTable";

type ReportPeriod = "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
type ExpenseCategory = "general" | "vehicles" | "concrete" | "all";

interface ExpenseReportPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportPeriod: ReportPeriod;
  expenseCategory: ExpenseCategory;
}

export function ExpenseReportPreviewDialog({
  open,
  onOpenChange,
  reportPeriod,
  expenseCategory
}: ExpenseReportPreviewDialogProps) {
  const handleDownload = () => {
    console.log("Downloading report...");
    // Implement download logic here
  };

  const handlePrint = () => {
    console.log("Printing report...");
    window.print();
  };

  const getPeriodTitle = (): string => {
    switch (reportPeriod) {
      case "daily": return "Rapport Quotidien";
      case "weekly": return "Rapport Hebdomadaire";
      case "monthly": return "Rapport Mensuel";
      case "quarterly": return "Rapport Trimestriel";
      case "yearly": return "Rapport Annuel";
      default: return "Rapport";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle>{getPeriodTitle()} des Dépenses</DialogTitle>
        </DialogHeader>
        
        <div className="flex justify-end gap-4 mb-4">
          <Button onClick={handleDownload} variant="outline" className="bg-gray-800 text-white border-gray-700">
            <Download className="h-4 w-4 mr-2" />
            Télécharger
          </Button>
          <Button onClick={handlePrint} variant="outline" className="bg-gray-800 text-white border-gray-700">
            <Printer className="h-4 w-4 mr-2" />
            Imprimer
          </Button>
        </div>

        <div className="bg-white text-gray-900 p-6 rounded-lg">
          <ExpenseReportTable 
            reportPeriod={reportPeriod}
            expenseCategory={expenseCategory}
            preview
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
