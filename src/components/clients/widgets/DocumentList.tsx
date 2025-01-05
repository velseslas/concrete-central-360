import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { DocumentPreview } from "./DocumentPreview";

interface Document {
  id: number;
  title: string;
}

const mockDocuments = [
  { id: 1, title: "Contrat commercial" },
  { id: 2, title: "Facture 2024-001" },
  { id: 3, title: "Bon de commande" },
];

export function DocumentList() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const handleDocumentClick = (doc: Document) => {
    setSelectedDoc(doc);
    setPreviewOpen(true);
  };

  return (
    <div className="space-y-2 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-4">
      {mockDocuments.map((doc) => (
        <motion.div
          key={doc.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer border border-gray-700/50"
          onClick={() => handleDocumentClick(doc)}
        >
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400" />
            <span className="text-gray-300">{doc.title}</span>
          </div>
        </motion.div>
      ))}

      {selectedDoc && (
        <DocumentPreview
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          document={selectedDoc}
        />
      )}
    </div>
  );
}