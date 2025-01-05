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
      {mockDocuments.map((doc) => (
        <motion.div
          key={doc.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
          onClick={() => handleDocumentClick(doc)}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-white font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-400" />
                {doc.title}
              </h3>
              <p className="text-gray-400 text-sm">Document #{doc.id}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400">
                PDF
              </span>
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