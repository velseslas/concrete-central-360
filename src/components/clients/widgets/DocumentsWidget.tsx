
import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DocumentUploadDialog } from "../DocumentUploadDialog";
import { DocumentList } from "./DocumentList";

interface DocumentsWidgetProps {
  clientId: number | null;
}

// Mock data for clients
const mockClients = [
  { id: "1", nom: "SARL Construction" },
  { id: "2", nom: "SPA Promotech" },
  { id: "3", nom: "EURL Architectura" },
];

// Mock data for documents
const mockDocuments = [
  {
    id: "1",
    title: "Contrat de vente",
    description: "Contrat de vente béton",
    clientName: "SARL Construction",
    documentType: "Contrat",
    uploadDate: "2023-05-10",
    fileSize: "1.2 MB",
    fileType: "PDF",
  },
  {
    id: "2",
    title: "Facture #F2023-056",
    description: "Facture pour livraison béton",
    clientName: "SPA Promotech",
    documentType: "Facture",
    uploadDate: "2023-06-22",
    fileSize: "0.8 MB",
    fileType: "PDF",
  },
  {
    id: "3",
    title: "Bon de commande #BC-123",
    description: "Commande de matériaux",
    clientName: "EURL Architectura",
    documentType: "Bon de commande",
    uploadDate: "2023-07-15",
    fileSize: "1.5 MB",
    fileType: "DOCX",
  },
];

export function DocumentsWidget({ clientId }: DocumentsWidgetProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [documentType, setDocumentType] = useState("all");
  const [clientFilter, setClientFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Filter documents based on search, document type, and client
  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = documentType === "all" || doc.documentType === documentType;
    const matchesClient = clientFilter === "all" || doc.clientName === mockClients.find(c => c.id === clientFilter)?.nom;
    
    return matchesSearch && matchesType && matchesClient;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-400" />
          Gestion des Documents
        </h2>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 border border-white/20 transition-colors"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouveau document
            </Button>
          </DialogTrigger>
          <DocumentUploadDialog 
            open={dialogOpen} 
            onOpenChange={setDialogOpen} 
            clients={mockClients}
          />
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Rechercher un document..." 
            className="pl-9 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4">
          <Select value={documentType} onValueChange={setDocumentType}>
            <SelectTrigger className="w-[180px] bg-gray-800/50 border-gray-700/50 text-white">
              <SelectValue placeholder="Type de document" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all" className="text-gray-200">Tous les types</SelectItem>
              <SelectItem value="Contrat" className="text-gray-200">Contrat</SelectItem>
              <SelectItem value="Facture" className="text-gray-200">Facture</SelectItem>
              <SelectItem value="Bon de commande" className="text-gray-200">Bon de commande</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={clientFilter} onValueChange={setClientFilter}>
            <SelectTrigger className="w-[180px] bg-gray-800/50 border-gray-700/50 text-white">
              <SelectValue placeholder="Client" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all" className="text-gray-200">Tous les clients</SelectItem>
              {mockClients.map(client => (
                <SelectItem key={client.id} value={client.id} className="text-gray-200">
                  {client.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <DocumentList documents={filteredDocuments} />
    </motion.div>
  );
}
