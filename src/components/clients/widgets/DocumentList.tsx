import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { CustomDialogContent } from "./CustomDialogContent";

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
    <div className="space-y-2">
      {mockDocuments.map((doc) => (
        <motion.div
          key={doc.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
          onClick={() => handleDocumentClick(doc)}
        >
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <span>{doc.title}</span>
          </div>
        </motion.div>
      ))}

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <CustomDialogContent className="max-h-[90vh] w-[90vw] max-w-[800px] overflow-y-auto">
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center">
              <FileText className="h-24 w-24 text-gray-400" />
            </div>
          </div>
        </CustomDialogContent>
      </Dialog>
    </div>
  );
}