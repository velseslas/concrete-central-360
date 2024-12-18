import { useState } from "react";
import { ClientForm } from "@/components/clients/ClientForm";
import { BusinessTypeForm } from "@/components/clients/BusinessTypeForm";
import { ProductForm } from "@/components/clients/ProductForm";
import { PriceForm } from "@/components/clients/PriceForm";
import { ClientListWidget } from "@/components/clients/widgets/ClientListWidget";
import { ClientActionsWidget } from "@/components/clients/widgets/ClientActionsWidget";

const Clients = () => {
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [showBusinessTypeForm, setShowBusinessTypeForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showPriceForm, setShowPriceForm] = useState(false);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Gestion des Clients</h1>
      
      <ClientActionsWidget
        onNewClient={() => setShowNewClientForm(true)}
        onNewBusinessType={() => setShowBusinessTypeForm(true)}
        onNewProduct={() => setShowProductForm(true)}
        onNewPrice={() => setShowPriceForm(true)}
      />

      <ClientListWidget />

      <ClientForm 
        open={showNewClientForm} 
        onOpenChange={setShowNewClientForm} 
      />
      <BusinessTypeForm 
        open={showBusinessTypeForm} 
        onOpenChange={setShowBusinessTypeForm} 
      />
      <ProductForm 
        open={showProductForm} 
        onOpenChange={setShowProductForm} 
      />
      <PriceForm 
        open={showPriceForm} 
        onOpenChange={setShowPriceForm} 
      />
    </div>
  );
};

export default Clients;