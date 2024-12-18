import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ClientList from "@/components/clients/ClientList";
import { ClientForm } from "@/components/clients/ClientForm";
import { BusinessTypeForm } from "@/components/clients/BusinessTypeForm";
import { ProductForm } from "@/components/clients/ProductForm";
import { PriceForm } from "@/components/clients/PriceForm";

const Clients = () => {
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [showBusinessTypeForm, setShowBusinessTypeForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showPriceForm, setShowPriceForm] = useState(false);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Clients</h1>
        <div className="flex gap-2">
          <Button onClick={() => setShowBusinessTypeForm(true)} variant="outline">
            Nouvelle raison sociale
          </Button>
          <Button onClick={() => setShowProductForm(true)} variant="outline">
            Nouveau produit
          </Button>
          <Button onClick={() => setShowPriceForm(true)} variant="outline">
            Nouveau prix
          </Button>
          <Button onClick={() => setShowNewClientForm(true)}>
            <Plus className="mr-2" />
            Nouveau Client
          </Button>
        </div>
      </div>

      <ClientList />
      <ClientForm open={showNewClientForm} onOpenChange={setShowNewClientForm} />
      <BusinessTypeForm open={showBusinessTypeForm} onOpenChange={setShowBusinessTypeForm} />
      <ProductForm open={showProductForm} onOpenChange={setShowProductForm} />
      <PriceForm open={showPriceForm} onOpenChange={setShowPriceForm} />
    </div>
  );
};

export default Clients;