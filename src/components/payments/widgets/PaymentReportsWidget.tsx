import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, FileSpreadsheet, Download } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export function PaymentReportsWidget() {
  const handleExportPDF = () => {
    console.log("Exporting payment report to PDF");
    toast.success("Export PDF en cours...");
  };

  const handleExportExcel = () => {
    console.log("Exporting payment report to Excel");
    toast.success("Export Excel en cours...");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Download className="h-5 w-5 text-blue-400" />
            Rapports
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            onClick={handleExportPDF}
            className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border-red-500/20"
          >
            <FileText className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button
            variant="outline"
            onClick={handleExportExcel}
            className="w-full bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300 border-green-500/20"
          >
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}