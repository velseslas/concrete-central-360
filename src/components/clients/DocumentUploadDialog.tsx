
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DocumentForm } from "./document-upload/DocumentForm";

interface DocumentUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clients: { id: string; nom: string }[];
}

export function DocumentUploadDialog({ open, onOpenChange, clients }: DocumentUploadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Nouveau document
          </DialogTitle>
        </DialogHeader>
        <DocumentForm 
          clients={clients}
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
