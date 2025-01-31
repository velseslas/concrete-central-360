import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Eye, Download, Printer } from "lucide-react";
import { motion } from "framer-motion";

type ReportType = "daily" | "weekly" | "monthly" | "quarterly" | "yearly";

export function ReportsWidget() {
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null);

  const handleDownload = (type: ReportType) => {
    console.log(`Téléchargement du rapport ${type}`);
    // Logique de téléchargement à implémenter
  };

  const handlePrint = (type: ReportType) => {
    console.log(`Impression du rapport ${type}`);
    window.print();
  };

  const getReportTitle = (type: ReportType) => {
    switch (type) {
      case "daily":
        return "Rapport Quotidien";
      case "weekly":
        return "Rapport Hebdomadaire";
      case "monthly":
        return "Rapport Mensuel";
      case "quarterly":
        return "Rapport Trimestriel";
      case "yearly":
        return "Rapport Annuel";
    }
  };

  const reports: ReportType[] = ["daily", "weekly", "monthly", "quarterly", "yearly"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {reports.map((type) => (
        <motion.div
          key={type}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{getReportTitle(type)}</CardTitle>
              <Button 
                variant="outline" 
                onClick={() => setSelectedReport(type)}
                className="bg-gray-700/50 hover:bg-gray-600/50"
              >
                <Eye className="mr-2 h-4 w-4" />
                Aperçu
              </Button>
            </CardHeader>
            <CardContent>
              {/* Contenu spécifique au type de rapport */}
            </CardContent>
          </Card>
        </motion.div>
      ))}

      <Dialog open={selectedReport !== null} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-4xl bg-gray-800/95 border border-gray-700">
          <div className="flex justify-end space-x-2 mb-4">
            <Button 
              variant="outline" 
              onClick={() => selectedReport && handleDownload(selectedReport)}
            >
              <Download className="mr-2 h-4 w-4" />
              Télécharger
            </Button>
            <Button 
              variant="outline" 
              onClick={() => selectedReport && handlePrint(selectedReport)}
            >
              <Printer className="mr-2 h-4 w-4" />
              Imprimer
            </Button>
          </div>
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">
              {selectedReport && getReportTitle(selectedReport)}
            </h2>
            <div className="space-y-4">
              {/* Exemple de contenu */}
              <p>Contenu du {selectedReport && getReportTitle(selectedReport).toLowerCase()}...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}