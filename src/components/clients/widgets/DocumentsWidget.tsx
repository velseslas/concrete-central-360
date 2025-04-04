
import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Printer, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { DocumentList } from "./DocumentList";

const mockDocuments = [
  { id: 1, title: "Contrat commercial" },
  { id: 2, title: "Facture 2024-001" },
  { id: 3, title: "Bon de commande" },
];

interface Document {
  id: number;
  title: string;
}

export function DocumentsWidget() {
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const handleDocumentClick = (doc: Document) => {
    setSelectedDoc(doc);
    setPreviewOpen(true);
  };

  const handlePrint = () => {
    console.log("Impression du document:", selectedDoc?.title);
    toast.success("Document envoyé à l'impression");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-800 shadow-xl p-6 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-400" />
            <h2 className="text-lg font-medium text-white">Documents Administratifs</h2>
          </div>
          <Button 
            onClick={() => setShowUploadDialog(true)}
            className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nouveau document
          </Button>
        </div>
        
        <div className="space-y-3">
          {mockDocuments.map((doc) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              className="p-4 rounded-lg bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-indigo-500/30 transition-all cursor-pointer group relative overflow-hidden"
              onClick={() => handleDocumentClick(doc)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-indigo-400" />
                  <span className="text-gray-200 group-hover:text-white transition-colors">{doc.title}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upload Dialog */}
      {showUploadDialog && (
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogContent className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50 backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                Ajouter un nouveau document
              </DialogTitle>
            </DialogHeader>
            <div className="p-4">
              <h3 className="text-white mb-4">Formulaire de téléchargement</h3>
              <div className="grid gap-4">
                <div>
                  <label className="text-sm text-gray-400">Titre du document</label>
                  <input type="text" className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white mt-1" />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Fichier</label>
                  <input type="file" className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white mt-1" />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setShowUploadDialog(false)}>Annuler</Button>
                  <Button onClick={() => {
                    toast.success("Document téléchargé avec succès");
                    setShowUploadDialog(false);
                  }}>Télécharger</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Preview Dialog */}
      {selectedDoc && previewOpen && (
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-h-[90vh] w-[90vw] max-w-[800px] overflow-y-auto bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50 backdrop-blur-xl">
            <DialogHeader className="flex flex-row items-center justify-between space-y-0">
              <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                Aperçu - {selectedDoc.title}
              </DialogTitle>
              <Button 
                onClick={handlePrint}
                variant="outline"
                className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 border-indigo-500/20 transition-colors"
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
      )}
    </motion.div>
  );
}
