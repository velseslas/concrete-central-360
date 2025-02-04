
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

interface Document {
  id: number;
  title: string;
}

interface DocumentListProps {
  documents: Document[];
  onDocumentClick: (doc: Document) => void;
}

export function DocumentList({ documents, onDocumentClick }: DocumentListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
      {documents.map((doc) => (
        <motion.div
          key={doc.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-gray-900/50 p-4 backdrop-blur-sm border border-gray-700/50 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer"
          onClick={() => onDocumentClick(doc)}
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
  );
}
