import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye } from "lucide-react";
import { ProductionReportFilters } from "./ProductionReportFilters";
import { ProductionReportPreviewDialog } from "./ProductionReportPreviewDialog";
import { useProduction } from "../useProduction";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function ProductionReportsWidget() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [status, setStatus] = useState("all");
  const [showPreview, setShowPreview] = useState(false);
  const { productions } = useProduction();

  const filteredProductions = productions.filter((production) => {
    const productionDate = new Date(production.start_date);
    const matchesStartDate = !startDate || productionDate >= startDate;
    const matchesEndDate = !endDate || productionDate <= endDate;
    const matchesStatus = status === "all" || production.status === status;
    return matchesStartDate && matchesEndDate && matchesStatus;
  });

  const handleExport = async () => {
    try {
      const element = document.querySelector(".production-report-template");
      if (!element) {
        toast.error("Erreur lors de l'export du rapport");
        return;
      }

      const canvas = await html2canvas(element as HTMLElement);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("rapport-production.pdf");
      toast.success("Rapport exporté avec succès");
    } catch (error) {
      console.error("Error exporting report:", error);
      toast.error("Erreur lors de l'export du rapport");
    }
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50" />
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-400" />
            Rapports de Production
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="bg-gray-800/50 hover:bg-gray-700/50 border-gray-700/50 text-white"
              onClick={() => setShowPreview(true)}
            >
              <Eye className="mr-2 h-4 w-4" />
              Aperçu
            </Button>
            <Button
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
              onClick={handleExport}
            >
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <ProductionReportFilters
          startDate={startDate}
          endDate={endDate}
          status={status}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onStatusChange={setStatus}
        />

        <div className="production-report-template">
          <ProductionReportTemplate productions={filteredProductions} />
        </div>
      </CardContent>

      <ProductionReportPreviewDialog
        open={showPreview}
        onOpenChange={setShowPreview}
        productions={filteredProductions}
      />
    </Card>
  );
}