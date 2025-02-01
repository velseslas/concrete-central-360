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
      className="space-y-4"
    >
      {reports.map((type, index) => (
        <motion.div
          key={type}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="group"
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border border-gray-700/50 backdrop-blur-xl hover:bg-gray-800/50 transition-all duration-300 group shadow-lg hover:shadow-purple-500/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20">
                  <Eye className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium group-hover:text-purple-400 transition-colors">
                    {getReportTitle(type)}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Visualisez et exportez vos données {getReportTitle(type).toLowerCase()}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedReport(type)}
                  className="hover:bg-purple-500/20 text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Aperçu
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}

      <Dialog open={selectedReport !== null} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-4xl bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50 backdrop-blur-xl">
          <div className="flex justify-end space-x-2 mb-4">
            <Button 
              variant="outline" 
              onClick={() => selectedReport && handleDownload(selectedReport)}
              className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 border-blue-500/20"
            >
              <Download className="mr-2 h-4 w-4" />
              Télécharger
            </Button>
            <Button 
              variant="outline" 
              onClick={() => selectedReport && handlePrint(selectedReport)}
              className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 hover:text-purple-300 border-purple-500/20"
            >
              <Printer className="mr-2 h-4 w-4" />
              Imprimer
            </Button>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-gray-700/50">
            <h2 className="text-xl font-bold text-white mb-4">
              {selectedReport && getReportTitle(selectedReport)}
            </h2>
            <div className="space-y-4 text-gray-300">
              {/* Exemple de contenu */}
              <p>Contenu du {selectedReport && getReportTitle(selectedReport).toLowerCase()}...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}