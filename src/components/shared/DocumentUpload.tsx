import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Upload } from "lucide-react";
import { toast } from "sonner";

interface DocumentUploadProps {
  clientId?: number;
  onUploadSuccess?: () => void;
}

export function DocumentUpload({ clientId, onUploadSuccess }: DocumentUploadProps) {
  const [documentTitle, setDocumentTitle] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name);
      console.log("Document title:", documentTitle);
      console.log("Client ID:", clientId);
      
      toast.success("Document téléchargé avec succès");
      setDocumentTitle("");
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    }
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Titre du document"
        value={documentTitle}
        onChange={(e) => setDocumentTitle(e.target.value)}
      />
      <div className="flex justify-end">
        <div className="relative">
          <Input
            type="file"
            className="hidden"
            id="file-upload"
            onChange={handleFileUpload}
          />
          <Button asChild>
            <label htmlFor="file-upload" className="cursor-pointer">
              <FileText className="mr-2 h-4 w-4" />
              Télécharger
            </label>
          </Button>
        </div>
      </div>
    </div>
  );
}