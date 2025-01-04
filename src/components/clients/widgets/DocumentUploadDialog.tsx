import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DocumentUpload } from "@/components/shared/DocumentUpload";

interface DocumentUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DocumentUploadDialog({ open, onOpenChange }: DocumentUploadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau document</DialogTitle>
        </DialogHeader>
        <DocumentUpload 
          onUploadSuccess={() => {
            onOpenChange(false);
            console.log("Document uploadé avec succès");
          }}
        />
      </DialogContent>
    </Dialog>
  );
}