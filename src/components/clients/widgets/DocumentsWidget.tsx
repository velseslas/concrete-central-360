import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Printer, FileChartLine } from "lucide-react";
import { DocumentUpload } from "@/components/shared/DocumentUpload";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";

const mockDocuments = [
  { id: 1, title: "Contrat commercial" },
  { id: 2, title: "Attestation fiscale" },
  { id: 3, title: "Bon de livraison" },
];

export function DocumentsWidget() {
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<{ id: number; title: string } | null>(null);

  const handleDocumentClick = (doc: { id: number; title: string }) => {
    setSelectedDoc(doc);
    setPreviewOpen(true);
  };

  const handlePrint = () => {
    console.log("Impression du document:", selectedDoc?.title);
    window.print();
  };

  return (
    <Card className="max-w-3xl mx-auto bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-800 shadow-xl backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:from-indigo-500/30 group-hover:to-purple-500/30">
            <FileChartLine className="h-5 w-5 text-indigo-400" />
          </div>
          Documents Administratifs
        </CardTitle>
        <Button 
          onClick={() => setShowUploadDialog(true)} 
          className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/30 hover:to-purple-500/30 text-indigo-300 hover:text-white border border-indigo-500/30 transition-all duration-300"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nouveau document
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockDocuments.map((doc) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-gray-900/50 p-4 backdrop-blur-sm border border-gray-700/50 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer"
              onClick={() => handleDocumentClick(doc)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-all duration-300">
                    <FileText className="h-5 w-5 text-indigo-400 group-hover:text-indigo-300" />
                  </div>
                  <span className="text-gray-200 group-hover:text-white transition-colors">
                    {doc.title}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>

      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Ajouter un nouveau document
            </DialogTitle>
          </DialogHeader>
          <DocumentUpload 
            onUploadSuccess={() => {
              setShowUploadDialog(false);
              console.log("Document uploadé avec succès");
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-h-[90vh] w-[90vw] max-w-[800px] overflow-y-auto bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50 backdrop-blur-xl">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0">
            <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Aperçu - {selectedDoc?.title}
            </DialogTitle>
            <Button 
              onClick={handlePrint}
              className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/30 hover:to-purple-500/30 text-indigo-300 hover:text-white border border-indigo-500/30 transition-all duration-300"
            >
              <Printer className="mr-2 h-4 w-4" />
              Imprimer
            </Button>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-full aspect-[3/4] bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-lg flex items-center justify-center">
              <FileText className="h-24 w-24 text-indigo-400" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}