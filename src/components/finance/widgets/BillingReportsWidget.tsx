import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Eye, Download, Printer } from "lucide-react";
import { motion } from "framer-motion";

export function BillingReportsWidget() {
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleDownload = () => {
    console.log("Téléchargement du rapport de facturation");
    // Logique de téléchargement à implémenter
  };

  const handlePrint = () => {
    console.log("Impression du rapport de facturation");
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Rapports de Facturation</CardTitle>
          <Button 
            variant="outline" 
            onClick={() => setPreviewOpen(true)}
            className="bg-gray-700/50 hover:bg-gray-600/50"
          >
            <Eye className="mr-2 h-4 w-4" />
            Aperçu
          </Button>
        </CardHeader>
        <CardContent>
          {/* Contenu des rapports de facturation */}
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
            <h2 className="text-xl font-bold mb-4">Aperçu du Rapport de Facturation</h2>
            <div className="space-y-4">
              {/* Contenu de l'aperçu du rapport */}
              <p>Contenu du rapport de facturation...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}