import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Eye, Printer, Upload } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data pour les clients et leurs documents
const mockClients = [
  { 
    id: 1, 
    name: "Client A",
    documents: [
      { id: 1, title: "Facture Mars 2024", url: "#" },
      { id: 2, title: "Contrat", url: "#" },
    ]
  },
  { 
    id: 2, 
    name: "Client B",
    documents: [
      { id: 3, title: "Devis 2024", url: "#" },
    ]
  },
];

export function AdminDocumentsWidget() {
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [showDocuments, setShowDocuments] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [documentTitle, setDocumentTitle] = useState("");
  const [uploadClientId, setUploadClientId] = useState<string>("");

  const handleViewDocuments = (client: any) => {
    setSelectedClient(client);
    setShowDocuments(true);
  };

  const handlePreview = (document: any) => {
    setSelectedDocument(document);
    setShowPreview(true);
    console.log("Prévisualisation du document:", document);
  };

  const handlePrint = () => {
    console.log("Impression du document:", selectedDocument);
    toast.success("Impression lancée");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Fichier sélectionné:", file.name);
      console.log("Client ID:", uploadClientId);
      console.log("Titre du document:", documentTitle);

      toast.success("Document téléchargé avec succès");
      setDocumentTitle("");
      setShowUpload(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Documents Administratifs</CardTitle>
        <Button onClick={() => setShowUpload(true)} variant="outline" size="sm">
          <Upload className="h-4 w-4 mr-2" />
          Nouveau document
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Nombre de Documents</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.documents.length}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDocuments(client)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Détails
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Dialog pour télécharger un nouveau document */}
        <Dialog open={showUpload} onOpenChange={setShowUpload}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Télécharger un nouveau document</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              <Select
                value={uploadClientId}
                onValueChange={setUploadClientId}
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
              <Input
                placeholder="Titre du document"
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
              />
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setShowUpload(false)}>
                  Annuler
                </Button>
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
          </DialogContent>
        </Dialog>

        {/* Dialog pour afficher les documents d'un client */}
        <Dialog open={showDocuments} onOpenChange={setShowDocuments}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                Documents de {selectedClient?.name}
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
              {selectedClient?.documents.map((doc: any) => (
                <div 
                  key={doc.id} 
                  className="flex flex-col items-center space-y-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => handlePreview(doc)}
                >
                  <FileText className="h-12 w-12 text-blue-500" />
                  <span className="text-sm text-center">{doc.title}</span>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Dialog pour prévisualiser un document */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-4xl h-[80vh]">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center pr-12">
                <span>{selectedDocument?.title}</span>
                <Button onClick={handlePrint} className="mr-8">
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimer
                </Button>
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 bg-gray-100 rounded-lg p-4 h-full">
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Aperçu du document {selectedDocument?.title}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}