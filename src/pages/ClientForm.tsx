
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ClientForm as ClientFormComponent } from "@/components/clients/ClientForm";
import { ProjectListSection } from "@/components/clients/widgets/ProjectListSection";
import { DocumentsWidget } from "@/components/clients/widgets/DocumentsWidget";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ClientFormPage = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");
  
  const handleSuccess = () => {
    navigate("/clients");
  };

  // We'll add an empty array as a placeholder for projects
  // In a real application, you would fetch this data from an API
  const projects = [];

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
            <TabsList className="grid grid-cols-3 mb-8 bg-gray-800/50 border border-gray-700/30">
              <TabsTrigger 
                value="info" 
                className="data-[state=active]:bg-violet-600/30 data-[state=active]:text-white text-gray-400"
              >
                Informations
              </TabsTrigger>
              <TabsTrigger 
                value="projects" 
                className="data-[state=active]:bg-violet-600/30 data-[state=active]:text-white text-gray-400"
              >
                Chantiers
              </TabsTrigger>
              <TabsTrigger 
                value="documents" 
                className="data-[state=active]:bg-violet-600/30 data-[state=active]:text-white text-gray-400"
              >
                Documents
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="mt-6">
              <ClientFormComponent 
                clientToEdit={clientId ? { id: parseInt(clientId) } : undefined} 
                onSuccess={handleSuccess}
              />
            </TabsContent>

            <TabsContent value="projects" className="mt-6">
              <ProjectListSection projects={projects} />
            </TabsContent>

            <TabsContent value="documents" className="mt-6">
              <DocumentsWidget />
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ClientFormPage;
