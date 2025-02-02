import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Printer, Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DocumentUploadDialog } from "@/components/clients/DocumentUploadDialog";
import { Input } from "@/components/ui/input";

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
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredClients = mockClients.filter(client => 
    client.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.documents.some(doc => doc.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-800 shadow-xl backdrop-blur-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
              <FileText className="h-6 w-6 text-indigo-400" />
            </div>
            <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Gestion des Documents
            </CardTitle>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-[200px] bg-gray-800/50 border-gray-700/50 text-gray-300 placeholder:text-gray-500"
              />
            </div>
            <Button 
              onClick={() => setShowUploadForm(true)} 
              className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/30 hover:to-purple-500/30 text-indigo-300 hover:text-white border border-indigo-500/30 transition-all duration-300"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouveau document
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mt-4">
            {filteredClients.map((client) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-gray-900/50 p-4 backdrop-blur-sm border border-gray-700/50 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer"
                onClick={() => handleClientClick(client)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-all duration-300">
                      <FileText className="h-5 w-5 text-indigo-400 group-hover:text-indigo-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-200 group-hover:text-white transition-colors">
                        {client.nom}
                      </h3>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300">
                        {client.documents.length} document(s)
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              {selectedClient?.nom}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
            {selectedClient?.documents.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-gray-900/50 p-4 backdrop-blur-sm border border-gray-700/50 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer"
                onClick={() => handleDocumentClick(doc)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-all duration-300">
                    <FileText className="h-8 w-8 text-indigo-400 group-hover:text-indigo-300" />
                  </div>
                  <h4 className="text-gray-200 group-hover:text-white font-medium transition-colors">
                    {doc.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
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

      <Dialog open={showUploadForm} onOpenChange={setShowUploadForm}>
        <DialogContent className="max-w-4xl bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50 backdrop-blur-xl">
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
