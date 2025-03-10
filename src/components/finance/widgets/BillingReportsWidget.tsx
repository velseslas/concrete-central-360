import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FileText, Eye, Download, Printer } from "lucide-react";
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
          <div className="space-y-4">
            {[
              { title: "Rapport mensuel", date: "Mars 2024" },
              { title: "Rapport trimestriel", date: "Q1 2024" },
              { title: "Rapport annuel", date: "2024" }
            ].map((report, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-white font-medium">{report.title}</h3>
                  <p className="text-gray-400 text-sm">{report.date}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-white"
                  onClick={() => handlePreview(report)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Aperçu
                </Button>
              </div>
            ))}
          </div>
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