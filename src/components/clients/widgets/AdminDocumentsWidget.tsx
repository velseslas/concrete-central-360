
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DocumentUploadDialog } from "@/components/clients/DocumentUploadDialog";
import { SearchBar } from "./document-management/SearchBar";
import { ClientList } from "./document-management/ClientList";
import { DocumentList } from "./document-management/DocumentList";
import { DocumentPreview } from "./document-management/DocumentPreview";

const mockClients = [
  { id: "1", nom: "Entreprise ABC", documents: [
    { id: 1, title: "Contrat commercial" },
    { id: 2, title: "Facture 2024-001" }
  ]},
  { id: "2", nom: "Société XYZ", documents: [
    { id: 3, title: "Devis 2024-001" }
  ]},
  { id: "3", nom: "Company 123", documents: [
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
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
          <ClientList clients={filteredClients} onClientClick={handleClientClick} />
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50 backdrop-blur-xl">
          <DocumentList 
            documents={selectedClient?.documents || []} 
            onDocumentClick={handleDocumentClick}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DocumentPreview
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          document={selectedDoc}
          onPrint={handlePrint}
        />
      </Dialog>

      <Dialog open={showUploadForm} onOpenChange={setShowUploadForm}>
        <DialogContent className="max-w-4xl bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50 backdrop-blur-xl">
          <DocumentUploadDialog 
            open={showUploadForm} 
            onOpenChange={setShowUploadForm}
            clients={mockClients.map(client => ({ id: client.id, nom: client.nom }))}
          />
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
