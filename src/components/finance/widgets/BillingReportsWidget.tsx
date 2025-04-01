
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FileText, Eye, Download, Printer, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export function BillingReportsWidget() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<{ title: string; date: string } | null>(null);

  const handleDownload = () => {
    console.log("Téléchargement du rapport de facturation:", selectedReport?.title);
    // Logique de téléchargement à implémenter
  };

  const handlePrint = () => {
    console.log("Impression du rapport de facturation:", selectedReport?.title);
    window.print();
  };

  const handlePreview = (report: { title: string; date: string }) => {
    setSelectedReport(report);
    setPreviewOpen(true);
  };

  const reports = [
    { title: "Rapport mensuel", date: "Mars 2024" },
    { title: "Rapport trimestriel", date: "Q1 2024" },
    { title: "Rapport annuel", date: "2024" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-400" />
            Rapports de Facturation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-4"
          >
            {reports.map((report, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-[#101422] rounded-lg p-4 border border-[#1F2232] hover:border-[#7C3AED] transition-all"
              >
                <div className="flex items-start mb-2">
                  <div className="h-8 w-8 flex items-center justify-center rounded-md bg-[#1F2232] text-[#7C3AED] mr-2">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{report.title}</h3>
                    <div className="flex items-center text-gray-400 text-xs mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      {report.date}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-[#7C3AED] hover:text-[#6D28D9] hover:bg-[#7C3AED]/10"
                    onClick={() => handlePreview(report)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Aperçu
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl bg-gray-800/95 border border-gray-700">
          <div className="flex justify-end space-x-2 mb-4">
            <Button variant="outline" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Télécharger
            </Button>
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Imprimer
            </Button>
          </div>
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">
              Aperçu - {selectedReport?.title}
            </h2>
            <div className="space-y-4">
              <p>Contenu du rapport de facturation pour {selectedReport?.title} ({selectedReport?.date})</p>
              {/* Contenu de l'aperçu du rapport */}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
