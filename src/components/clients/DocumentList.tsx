import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";

interface Document {
  id: number;
  title: string;
  type: string;
  date: string;
}

interface DocumentListProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: any;
}

// Données mockées pour l'exemple
const mockDocuments: Document[] = [
  {
    id: 1,
    title: "Contrat commercial",
    type: "PDF",
    date: "2024-01-15"
  },
  {
    id: 2,
    title: "Facture 2024-001",
    type: "PDF",
    date: "2024-01-16"
  }
];

export function DocumentList({ open, onOpenChange, client }: DocumentListProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-400" />
            Documents de {client?.nom}
          </DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 space-y-4"
        >
          {mockDocuments.map((doc) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <div>
                    <h3 className="text-gray-200 font-medium">{doc.title}</h3>
                    <p className="text-sm text-gray-400">
                      Type: {doc.type} • Date: {doc.date}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}