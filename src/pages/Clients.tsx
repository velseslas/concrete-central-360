import { useState } from "react";
import { ClientForm } from "@/components/clients/ClientForm";
import { BusinessTypeForm } from "@/components/clients/BusinessTypeForm";
import { ProductForm } from "@/components/clients/ProductForm";
import { PriceForm } from "@/components/clients/PriceForm";
import { ClientListWidget } from "@/components/clients/widgets/ClientListWidget";
import { ProductCategoryWidget } from "@/components/clients/widgets/ProductCategoryWidget";
import { UnitsWidget } from "@/components/clients/widgets/UnitsWidget";
import { BusinessTypeWidget } from "@/components/clients/widgets/BusinessTypeWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, EuroSign, UserPlus } from "lucide-react";

const Clients = () => {
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [showBusinessTypeForm, setShowBusinessTypeForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showPriceForm, setShowPriceForm] = useState(false);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Gestion des Clients</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Actions Rapides</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button 
              onClick={() => setShowNewClientForm(true)}
              className="w-full justify-start"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Nouveau Client
            </Button>
            <Button 
              onClick={() => setShowProductForm(true)}
              className="w-full justify-start"
              variant="outline"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Nouveau Produit
            </Button>
            <Button 
              onClick={() => setShowPriceForm(true)}
              className="w-full justify-start"
              variant="outline"
            >
              <EuroSign className="mr-2 h-4 w-4" />
              Nouveau Prix
            </Button>
          </CardContent>
        </Card>

        <ProductCategoryWidget />
        <UnitsWidget />
        <BusinessTypeWidget />
      </div>

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
}

export default Clients;