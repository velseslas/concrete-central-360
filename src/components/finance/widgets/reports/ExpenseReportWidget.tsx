
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CalendarDays, 
  Download, 
  Printer, 
  FileText,
  BarChart3
} from "lucide-react";
import { ExpenseReportFilters } from "./ExpenseReportFilters";
import { ExpenseReportTable } from "./ExpenseReportTable";
import { ExpenseReportPreviewDialog } from "./ExpenseReportPreviewDialog";
import { motion } from "framer-motion";
import { toast } from "sonner";

type ReportPeriod = "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
type ExpenseCategory = "general" | "vehicles" | "concrete" | "all";

export function ExpenseReportWidget() {
  const [reportPeriod, setReportPeriod] = useState<ReportPeriod>("monthly");
  const [expenseCategory, setExpenseCategory] = useState<ExpenseCategory>("all");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showPreview, setShowPreview] = useState(false);

  const handleExport = () => {
    toast.success("Exportation du rapport en cours...");
    setShowPreview(true);
  };

  const handlePrint = () => {
    toast.success("Ouverture de l'aperçu avant impression...");
    setShowPreview(true);
  };

  const handleDateChange = (date: Date) => {
    console.log("Date changed:", date);
    setSelectedDate(date);
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50" />
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-400" />
            Rapport d'Achat
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="bg-gray-800/50 hover:bg-gray-700/50 border-gray-700/50 text-white"
              onClick={handlePrint}
            >
              <Printer className="mr-2 h-4 w-4" />
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
        <ExpenseReportFilters
          reportPeriod={reportPeriod}
          expenseCategory={expenseCategory}
          onReportPeriodChange={setReportPeriod}
          onExpenseCategoryChange={setExpenseCategory}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />

        <div className="expense-report-content printable-content">
          <ExpenseReportTable 
            reportPeriod={reportPeriod}
            expenseCategory={expenseCategory}
            selectedDate={selectedDate}
          />
        </div>
      </CardContent>

      <ExpenseReportPreviewDialog
        open={showPreview}
        onOpenChange={setShowPreview}
        reportPeriod={reportPeriod}
        expenseCategory={expenseCategory}
        selectedDate={selectedDate}
      />
    </Card>
  );
}
