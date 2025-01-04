import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Printer } from "lucide-react";
import { DocumentUpload } from "@/components/shared/DocumentUpload";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";

const mockDocuments = [
  { id: 1, title: "Contrat de partenariat" },
  { id: 2, title: "Attestation fiscale" },
  { id: 3, title: "Bon de livraison" },
];

export function DocumentsWidget() {
  const [showUploadForm, setShowUploadForm] = useState(false);
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Documents Administratifs</CardTitle>
        <Button onClick={() => setShowUploadForm(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nouveau document
        </Button>
      </CardHeader>
      <CardContent>
        {showUploadForm ? (
          <DocumentUpload 
            onUploadSuccess={() => setShowUploadForm(false)}
          />
        ) : null}

        <div className="space-y-2 mt-4">
          {mockDocuments.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
              onClick={() => handleDocumentClick(doc)}
            >
              <FileText className="h-5 w-5 text-muted-foreground" />
              <span>{doc.title}</span>
            </div>
          ))}
        </div>
      </CardContent>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-h-[90vh] w-[90vw] max-w-[800px] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center space-y-0">
            <DialogTitle className="text-2xl font-bold text-primary mr-8">
              Aperçu - {selectedDoc?.title}
            </DialogTitle>
            <Button onClick={handlePrint} variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Imprimer
            </Button>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center">
              <FileText className="h-24 w-24 text-gray-400" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}