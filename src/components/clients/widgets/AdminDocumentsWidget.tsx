import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Printer } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DocumentUploadDialog } from "@/components/clients/DocumentUploadDialog";

const mockClients = [
  { id: 1, nom: "Entreprise ABC", documents: [
    { id: 1, title: "Contrat commercial" },
    { id: 2, title: "Facture 2024-001" }
  ]},
  { id: 2, nom: "Société XYZ", documents: [
    { id: 3, title: "Devis 2024-001" }
  ]},
  { id: 3, nom: "Company 123", documents: [
    { id: 4, title: "Bon de commande" },
    { id: 5, title: "Attestation fiscale" }
  ]},
];

export function AdminDocumentsWidget() {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState<typeof mockClients[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<{ id: number; title: string } | null>(null);

  console.log("AdminDocumentsWidget - Upload form state:", showUploadForm);

  const handleClientClick = (client: typeof mockClients[0]) => {
    setSelectedClient(client);
    setDialogOpen(true);
  };

  const handleDocumentClick = (doc: { id: number; title: string }) => {
    setSelectedDoc(doc);
    setPreviewOpen(true);
  };

  const handlePrint = () => {
    console.log("Impression du document:", selectedDoc?.title);
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-800 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-400" />
            Gestion des Documents
          </CardTitle>
          <Button 
            onClick={() => setShowUploadForm(true)} 
            className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nouveau document
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mt-4">
            {mockClients.map((client) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-indigo-500/30 transition-all cursor-pointer group relative overflow-hidden"
                onClick={() => handleClientClick(client)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <FileText className="h-5 w-5 text-indigo-400" />
                <span className="text-gray-200 group-hover:text-white transition-colors">{client.nom}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              {selectedClient?.nom}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            {selectedClient?.documents.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-indigo-500/30 transition-all cursor-pointer group relative overflow-hidden"
                onClick={() => handleDocumentClick(doc)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <FileText className="h-12 w-12 text-indigo-400" />
                <span className="text-sm text-center text-gray-200 group-hover:text-white transition-colors">{doc.title}</span>
              </motion.div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-h-[90vh] w-[90vw] max-w-[800px] overflow-y-auto bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0">
            <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Aperçu - {selectedDoc?.title}
            </DialogTitle>
            <Button 
              onClick={handlePrint} 
              variant="outline"
              className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 transition-colors"
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

      <Dialog open={showUploadForm} onOpenChange={setShowUploadForm}>
        <DialogContent className="max-w-4xl bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Nouveau document
            </DialogTitle>
          </DialogHeader>
          <DocumentUploadDialog onSuccess={() => setShowUploadForm(false)} />
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}