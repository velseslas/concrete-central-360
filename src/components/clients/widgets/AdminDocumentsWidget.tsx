import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import { DocumentUpload } from "@/components/shared/DocumentUpload";
import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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

  const handleClientClick = (client: typeof mockClients[0]) => {
    setSelectedClient(client);
    setDialogOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Gestion des Documents
          </CardTitle>
          <Button onClick={() => setShowUploadForm(true)} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau document
          </Button>
        </CardHeader>
        <CardContent>
          {showUploadForm ? (
            <div className="mb-6">
              <DocumentUpload 
                onUploadSuccess={() => setShowUploadForm(false)}
              />
            </div>
          ) : null}

          <div className="space-y-2 mt-4">
            {mockClients.map((client) => (
              <div
                key={client.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => handleClientClick(client)}
              >
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span>{client.nom}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedClient?.nom}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            {selectedClient?.documents.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <FileText className="h-12 w-12 text-blue-500" />
                <span className="text-sm text-center">{doc.title}</span>
              </motion.div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}