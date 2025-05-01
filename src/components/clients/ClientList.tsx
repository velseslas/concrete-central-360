
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientListContent } from "./list/ClientListContent";
import { DocumentsWidget } from "./widgets/DocumentsWidget";
import { ProjectWidget } from "./widgets/ProjectWidget";
import { ProductPriceForm } from "./ProductPriceForm";

export function ClientList() {
  const [activeTab, setActiveTab] = useState("clients");
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl">
        <CardContent className="p-6">
          <Tabs 
            defaultValue="clients" 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 mb-6 bg-gray-800/50">
              <TabsTrigger 
                value="clients" 
                className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                Clients
              </TabsTrigger>
              <TabsTrigger 
                value="documents" 
                className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                Documents
              </TabsTrigger>
              <TabsTrigger 
                value="projects" 
                className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                Chantiers
              </TabsTrigger>
              <TabsTrigger 
                value="prices" 
                className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                Prix Produits
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="clients">
              <ClientListContent 
                onClientSelect={(clientId) => setSelectedClientId(clientId)} 
                selectedClientId={selectedClientId}
              />
            </TabsContent>
            
            <TabsContent value="documents">
              <DocumentsWidget clientId={selectedClientId} />
            </TabsContent>
            
            <TabsContent value="projects">
              <ProjectWidget clientId={selectedClientId} />
            </TabsContent>
            
            <TabsContent value="prices">
              <ProductPriceForm clientId={selectedClientId} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}
