
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientForm as ClientFormComponent } from "@/components/clients/ClientForm";
import { ArrowLeft, FileText, Construction, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocumentsWidget } from "@/components/clients/widgets/DocumentsWidget";
import { ProjectWidget } from "@/components/clients/widgets/ProjectWidget";
import { ProductPriceForm } from "@/components/clients/ProductPriceForm";

const ClientFormPage = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");
  
  const handleSuccess = () => {
    navigate("/clients");
  };

  const parsedClientId = clientId ? parseInt(clientId) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto p-6"
      >
        <Button 
          variant="ghost" 
          className="mb-6 text-gray-300 hover:text-white"
          onClick={() => navigate("/clients")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux clients
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8 bg-gray-800/50 border border-gray-700/30">
              <TabsTrigger 
                value="info" 
                className="data-[state=active]:bg-violet-600/30 data-[state=active]:text-white text-gray-400"
              >
                Informations
              </TabsTrigger>
              <TabsTrigger 
                value="documents" 
                className="data-[state=active]:bg-violet-600/30 data-[state=active]:text-white text-gray-400"
              >
                Documents
              </TabsTrigger>
              <TabsTrigger 
                value="projects" 
                className="data-[state=active]:bg-violet-600/30 data-[state=active]:text-white text-gray-400"
              >
                Chantiers
              </TabsTrigger>
              <TabsTrigger 
                value="prices" 
                className="data-[state=active]:bg-violet-600/30 data-[state=active]:text-white text-gray-400"
              >
                Prix Produits
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="mt-6">
              <ClientFormComponent 
                clientToEdit={clientId ? { id: parseInt(clientId) } : undefined} 
                onSuccess={handleSuccess}
              />
            </TabsContent>
            
            <TabsContent value="documents" className="mt-6">
              <DocumentsWidget clientId={parsedClientId} />
            </TabsContent>
            
            <TabsContent value="projects" className="mt-6">
              <ProjectWidget clientId={parsedClientId} />
            </TabsContent>
            
            <TabsContent value="prices" className="mt-6">
              <ProductPriceForm clientId={parsedClientId} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ClientFormPage;
