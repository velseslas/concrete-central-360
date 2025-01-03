import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileText } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data pour les clients - à remplacer par des données réelles plus tard
const mockClients = [
  { id: 1, name: "Client A" },
  { id: 2, name: "Client B" },
  { id: 3, name: "Client C" },
];

interface DocumentUploadProps {
  clientId?: number;
}

export function DocumentUpload({ clientId: initialClientId }: DocumentUploadProps) {
  const [documentTitle, setDocumentTitle] = useState("");
  const [selectedClientId, setSelectedClientId] = useState<string>(
    initialClientId?.toString() || ""
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Log pour debug
      console.log("Fichier sélectionné:", file.name);
      console.log("Client ID:", selectedClientId);
      console.log("Titre du document:", documentTitle);

      // Simuler l'upload
      toast.success("Document téléchargé avec succès");
      setDocumentTitle("");
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="font-semibold">Télécharger un document</h3>
      <div className="space-y-4">
        {!initialClientId && (
          <Select
            value={selectedClientId}
            onValueChange={setSelectedClientId}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionner un client" />
            </SelectTrigger>
            <SelectContent>
              {mockClients.map((client) => (
                <SelectItem key={client.id} value={client.id.toString()}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
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
                <FileText className="mr-2 h-4 w-4" />
                Télécharger
              </label>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}