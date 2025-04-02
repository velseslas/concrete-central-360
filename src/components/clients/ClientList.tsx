
import { useState } from "react";
import { motion } from "framer-motion";
import { Sheet, SheetContent } from "../ui/sheet";
import { ClientForm } from "./ClientForm";
import { DocumentsWidget } from "./widgets/DocumentsWidget";
import { ProjectListSection } from "./widgets/ProjectListSection";
import { ClientListHeader } from "./list/ClientListHeader";
import { Dialog, DialogContent } from "../ui/dialog";
import { User, Mail, Phone, MapPin, Building } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus, Search } from "lucide-react";

const mockClients = [
  {
    id: 1,
    nom: "Constructions Modernes",
    contactName: "Jean Dupont",
    email: "j.dupont@construmod.fr",
    telephone: "01 23 45 67 89",
    ville: "Alger",
    region: "Alger",
    projectCount: 5,
  },
  {
    id: 2,
    nom: "BatiBéton",
    contactName: "Marie Leroy",
    email: "m.leroy@batibeton.fr",
    telephone: "01 34 56 78 90",
    ville: "Oran",
    region: "Oran",
    projectCount: 3,
  },
  {
    id: 3,
    nom: "ConstruPro",
    contactName: "Paul Martin",
    email: "p.martin@construpro.fr",
    telephone: "01 45 67 89 01",
    ville: "Constantine",
    region: "Constantine",
    projectCount: 7,
  },
  {
    id: 4,
    nom: "TechBuild",
    contactName: "Sophie Richard",
    email: "s.richard@techbuild.fr",
    telephone: "01 56 78 90 12",
    ville: "Annaba",
    region: "Annaba",
    projectCount: 2,
  },
  {
    id: 5,
    nom: "ImmoBat",
    contactName: "Thomas Bernard",
    email: "t.bernard@immobat.fr",
    telephone: "01 67 89 01 23",
    ville: "Blida",
    region: "Blida",
    projectCount: 4,
  },
];

export const ClientList = () => {
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [showProjectList, setShowProjectList] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [isNewClientDialogOpen, setIsNewClientDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (clientId: number) => {
    console.log("Deleting client:", clientId);
  };

  const handleEdit = (client: any) => {
    setSelectedClient(client);
  };

  const handleViewProjects = (client: any) => {
    setSelectedClient(client);
    setShowProjectList(true);
  };

  const handleDocumentUpload = (client: any) => {
    setSelectedClient(client);
    setShowDocuments(true);
  };

  const handleViewDetails = (client: any) => {
    console.log("Viewing details for client:", client);
    setSelectedClient(client);
  };

  const filteredClients = mockClients.filter((client) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      client.nom.toLowerCase().includes(searchLower) ||
      client.contactName.toLowerCase().includes(searchLower) ||
      client.email.toLowerCase().includes(searchLower) ||
      client.telephone.includes(searchQuery) ||
      client.ville.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-[#070A14] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Clients</h1>
            <p className="text-gray-400">Gérez vos clients et leurs projets</p>
          </div>
          <Button 
            className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white flex items-center gap-2"
            onClick={() => setIsNewClientDialogOpen(true)}
          >
            <Plus className="h-5 w-5" />
            Nouveau client
          </Button>
        </div>
        
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher un client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-[#101422] border-[#1F2232] rounded-lg w-full text-white"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#101422] rounded-lg p-6 border border-[#1F2232] hover:border-[#7C3AED] transition-all"
            >
              <div className="flex items-start mb-4">
                <div className="h-10 w-10 flex items-center justify-center rounded-md bg-[#1F2232] text-[#7C3AED] mr-3">
                  <Building className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{client.nom}</h3>
                  <div className="flex items-center mt-1 text-gray-400">
                    <User className="h-4 w-4 mr-1" />
                    <span className="text-sm">{client.contactName}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-300">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm truncate">{client.email}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm">{client.telephone}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm">{client.ville}, {client.region}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">{client.projectCount} projets</span>
                <Button 
                  variant="ghost" 
                  className="text-[#7C3AED] hover:text-[#6D28D9] hover:bg-[#7C3AED]/10"
                  onClick={() => handleViewDetails(client)}
                >
                  Voir les détails
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {selectedClient && (
        <>
          <Sheet open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
            <SheetContent side="right" className="w-[400px] sm:w-[540px] bg-[#101422] border-[#1F2232]">
              <ClientForm clientToEdit={selectedClient} onSuccess={() => setSelectedClient(null)} />
            </SheetContent>
          </Sheet>
          
          {showProjectList && (
            <Sheet open={showProjectList} onOpenChange={setShowProjectList}>
              <SheetContent side="right" className="w-[400px] sm:w-[540px] bg-[#101422] border-[#1F2232]">
                <ProjectListSection projects={[]} />
              </SheetContent>
            </Sheet>
          )}

          {showDocuments && (
            <Sheet open={showDocuments} onOpenChange={setShowDocuments}>
              <SheetContent side="right" className="w-[400px] sm:w-[540px] bg-[#101422] border-[#1F2232]">
                <DocumentsWidget />
              </SheetContent>
            </Sheet>
          )}
        </>
      )}

      <Dialog open={isNewClientDialogOpen} onOpenChange={setIsNewClientDialogOpen}>
        <DialogContent className="max-w-[800px] max-h-[90vh] overflow-y-auto bg-[#101422] border-[#1F2232]">
          <ClientForm onSuccess={() => setIsNewClientDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
