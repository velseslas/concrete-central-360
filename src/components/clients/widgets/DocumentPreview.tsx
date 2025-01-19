import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FileText } from "lucide-react";

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
        <div className="print-preview bg-white p-6 rounded-lg shadow-lg min-h-[70vh] w-full">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-xl font-bold">{document.title}</h1>
              <p className="text-gray-500">Document #{document.id}</p>
            </div>
            
            <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-lg">
              <FileText className="w-16 h-16 text-gray-300" />
            </div>

            <div className="space-y-4">
              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 text-center">
                  Ce document est généré automatiquement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}