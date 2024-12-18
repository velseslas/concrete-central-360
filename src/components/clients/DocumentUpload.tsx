import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface DocumentUploadProps {
  clientId: number;
}

export function DocumentUpload({ clientId }: DocumentUploadProps) {
  const [documentTitle, setDocumentTitle] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: Implement actual file upload logic
      console.log("Uploading file:", file, "for client:", clientId, "with title:", documentTitle);
      toast.success("Document téléchargé avec succès");
      setDocumentTitle("");
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="font-semibold">Documents administratifs</h3>
      <div className="flex gap-4">
        <Input
          placeholder="Titre du document"
          value={documentTitle}
          onChange={(e) => setDocumentTitle(e.target.value)}
        />
        <div className="relative">
          <Input
            type="file"
            className="hidden"
            id="file-upload"
            onChange={handleFileUpload}
          />
          <Button asChild>
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="mr-2 h-4 w-4" />
              Télécharger
            </label>
          </Button>
        </div>
      </div>
    </div>
  );
}