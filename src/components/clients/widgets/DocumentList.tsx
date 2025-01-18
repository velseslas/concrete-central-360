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
    <div className="space-y-4">
      {mockDocuments.map((doc, index) => (
        <motion.div
          key={doc.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          onClick={() => handleDocumentClick(doc)}
          className="p-4 rounded-lg bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/30 transition-colors cursor-pointer group"
        >
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h4 className="font-medium text-gray-100 group-hover:text-white transition-colors flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-400" />
                {doc.title}
              </h4>
              <p className="text-sm text-gray-400">
                Document #{doc.id}
              </p>
            </div>
            <div className="px-3 py-1 rounded-full text-xs border border-blue-500/30 bg-blue-500/20 text-blue-400 flex items-center gap-2">
              PDF
            </div>
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