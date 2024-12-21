import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, Upload } from "lucide-react";
import { toast } from "sonner";

const mockClients = [
  { id: 1, name: "Client A" },
  { id: 2, name: "Client B" },
];

const mockDocuments = [
  { id: 1, clientId: 1, title: "Document 1", date: "2024-03-15" },
  { id: 2, clientId: 1, title: "Document 2", date: "2024-03-16" },
];

export function AdminDocumentsWidget() {
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [documentTitle, setDocumentTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedClient || !documentTitle || !selectedFile) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    console.log("Uploading:", { selectedClient, documentTitle, selectedFile });
    toast.success("Document téléchargé avec succès");
    setDocumentTitle("");
    setSelectedFile(null);
  };

  const handleDownload = (documentId: number) => {
    console.log("Downloading document:", documentId);
    toast.success("Téléchargement commencé");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Documents Administratifs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger>
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
            <Input
              placeholder="Titre du document"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
            />
            <div className="flex gap-2">
              <Input
                type="file"
                onChange={handleFileChange}
                className="max-w-[200px]"
              />
              <Button onClick={handleUpload}>
                <Upload className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
            </div>
          </div>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    {mockClients.find(c => c.id === doc.clientId)?.name}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {doc.title}
                  </TableCell>
                  <TableCell>{doc.date}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(doc.id)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}