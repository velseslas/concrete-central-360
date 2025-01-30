import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";

interface DocumentPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: {
    id: number;
    title: string;
  };
}

export function DocumentPreview({ open, onOpenChange, document }: DocumentPreviewProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent className="p-0 border-0 bg-transparent shadow-none max-w-3xl mx-auto">
        <style>
          {`
            @media print {
              body * {
                visibility: hidden;
              }
              .print-preview, .print-preview * {
                visibility: visible;
              }
              .print-preview {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
              }
              @page {
                size: auto;
                margin: 20mm;
              }
            }
          `}
        </style>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="print-preview bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 p-6 rounded-lg shadow-xl border border-gray-700/50 backdrop-blur-xl"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                {document.title}
              </h1>
              <p className="text-gray-400">Document #{document.id}</p>
            </div>
            
            <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-700/50 rounded-lg bg-gray-800/30 backdrop-blur-sm">
              <FileText className="w-16 h-16 text-gray-600" />
            </div>

            <div className="space-y-4">
              <div className="border-t border-gray-700/50 pt-4">
                <p className="text-sm text-gray-400 text-center">
                  Ce document est généré automatiquement.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}