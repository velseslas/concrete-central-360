
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { ExpenseReportTable } from "./ExpenseReportTable";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type ReportPeriod = "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
type ExpenseCategory = "general" | "vehicles" | "concrete" | "all";

interface ExpenseReportPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportPeriod: ReportPeriod;
  expenseCategory: ExpenseCategory;
  selectedDate?: Date;
}

export function ExpenseReportPreviewDialog({
  open,
  onOpenChange,
  reportPeriod,
  expenseCategory,
  selectedDate = new Date()
}: ExpenseReportPreviewDialogProps) {
  const handleDownload = () => {
    toast.success("Téléchargement du rapport en cours...");
    const reportElement = document.getElementById('expense-report-preview');
    if (reportElement) {
      html2canvas(reportElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;
        
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save(`Rapport-Dépenses-${reportPeriod}-${new Date().toISOString().slice(0, 10)}.pdf`);
      });
    }
  };

  const handlePrint = () => {
    toast.success("Impression du rapport en cours...");
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

        <div id="expense-report-preview" className="bg-white text-gray-900 p-6 rounded-lg">
          <ExpenseReportTable 
            reportPeriod={reportPeriod}
            expenseCategory={expenseCategory}
            selectedDate={selectedDate}
            preview
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
