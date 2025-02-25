
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Printer, X } from "lucide-react";

interface DocumentPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: { id: string; title: string } | null;
  onPrint: () => void;
}

export function DocumentPreview({ open, onOpenChange, document, onPrint }: DocumentPreviewProps) {
  if (!document) return null;

  return (
    <DialogContent className="max-h-[90vh] w-[90vw] max-w-[800px] overflow-y-auto bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50 backdrop-blur-xl">
      <DialogHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex-1">
          <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Aperçu - {document.title}
          </DialogTitle>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={onPrint}
            className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/30 hover:to-purple-500/30 text-indigo-300 hover:text-white border border-indigo-500/30 transition-all duration-300"
          >
            <Printer className="mr-2 h-4 w-4" />
            Imprimer
          </Button>
          <DialogClose asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="ml-2 text-gray-400 hover:text-white hover:bg-gray-700/50"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Fermer</span>
            </Button>
          </DialogClose>
        </div>
      </DialogHeader>
      <div className="flex flex-col items-center gap-4 py-4">
        <div className="w-full aspect-[3/4] bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-lg flex items-center justify-center">
          <FileText className="h-24 w-24 text-indigo-400" />
        </div>
      </div>
    </DialogContent>
  );
}
