import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Eye, Printer } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Documents Administratifs</CardTitle>
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

        {/* Popup des documents du client */}
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

        {/* Popup de prévisualisation du document */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-4xl h-[80vh]">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>{selectedDocument?.title}</span>
                <Button onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimer
                </Button>
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 bg-gray-100 rounded-lg p-4 h-full">
              {/* Ici, on simule un aperçu de document */}
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