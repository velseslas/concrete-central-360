
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DocumentUpload } from "@/components/shared/DocumentUpload";

interface DocumentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DocumentsDialog = ({
  open,
  onOpenChange
}: DocumentsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Documents du véhicule</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <h4 className="text-white font-medium mb-4">Ajouter un document</h4>
          <DocumentUpload onUploadSuccess={() => onOpenChange(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
