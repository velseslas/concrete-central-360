
import { motion } from "framer-motion";
import { 
  FileText, 
  Download, 
  Trash2, 
  FileEdit, 
  Eye 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export interface Document {
  id: string;
  title: string;
  description: string;
  clientName: string;
  documentType: string;
  uploadDate: string;
  fileSize: string;
  fileType: string;
}

interface DocumentListProps {
  documents: Document[];
}

export function DocumentList({ documents }: DocumentListProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const handlePreview = (document: Document) => {
    setSelectedDocument(document);
    setPreviewOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {documents.map((document, index) => (
        <motion.div
          key={document.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 flex flex-col md:flex-row justify-between gap-4"
        >
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-md bg-gray-700/50">
              <FileText className="h-6 w-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-medium">{document.title}</h3>
              <p className="text-gray-400 text-sm">{document.description}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">
            <div className="text-sm text-gray-400">
              <span className="px-2 py-1 rounded-full bg-gray-700/50">
                {document.documentType}
              </span>
            </div>
            <div className="text-sm text-gray-400">
              <span>{document.fileSize}</span>
            </div>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-8 w-8 p-0"
                onClick={() => handlePreview(document)}
              >
                <Eye className="h-4 w-4 text-gray-300" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-8 w-8 p-0"
              >
                <Download className="h-4 w-4 text-gray-300" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-8 w-8 p-0"
              >
                <FileEdit className="h-4 w-4 text-gray-300" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      ))}

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="bg-gray-900/95 border-gray-800 max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-white">
              Aperçu du document
            </DialogTitle>
          </DialogHeader>
          {selectedDocument && (
            <div className="mt-4 space-y-4">
              <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-2">{selectedDocument.title}</h3>
                <p className="text-gray-400 mb-4">{selectedDocument.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400 mb-1">Type</p>
                    <p className="text-white">{selectedDocument.documentType}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Format</p>
                    <p className="text-white">{selectedDocument.fileType}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Taille</p>
                    <p className="text-white">{selectedDocument.fileSize}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Date d'ajout</p>
                    <p className="text-white">{selectedDocument.uploadDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Client</p>
                    <p className="text-white">{selectedDocument.clientName}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
