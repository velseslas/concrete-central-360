import { useState } from "react";
import { ClientForm } from "@/components/clients/ClientForm";
import { BusinessTypeForm } from "@/components/clients/BusinessTypeForm";
import { ProductForm } from "@/components/clients/ProductForm";
import { PriceForm } from "@/components/clients/PriceForm";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { ClientListWidget } from "@/components/clients/widgets/ClientListWidget";
import { ProductCategoryWidget } from "@/components/clients/widgets/ProductCategoryWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, Construction, Package, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import ClientList from "@/components/clients/ClientList";

const Clients = () => {
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [showBusinessTypeForm, setShowBusinessTypeForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showPriceForm, setShowPriceForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  
  const [activeWidget, setActiveWidget] = useState<string | null>(null);

  const widgets = [
    {
      id: 'clients',
      title: 'Clients',
      icon: Users,
      color: 'text-blue-500',
      onClick: () => setActiveWidget('clients'),
      addNew: () => setShowNewClientForm(true)
    },
    {
      id: 'categories',
      title: 'Catégories',
      icon: Building2,
      color: 'text-green-500',
      onClick: () => setActiveWidget('categories'),
      addNew: () => setShowBusinessTypeForm(true)
    },
    {
      id: 'chantiers',
      title: 'Chantiers',
      icon: Construction,
      color: 'text-orange-500',
      onClick: () => setActiveWidget('chantiers'),
      addNew: () => setShowProjectForm(true)
    },
    {
      id: 'produits',
      title: 'Produits',
      icon: Package,
      color: 'text-purple-500',
      onClick: () => setActiveWidget('produits'),
      addNew: () => setShowProductForm(true)
    },
    {
      id: 'prix',
      title: 'Prix Produits',
      icon: DollarSign,
      color: 'text-yellow-500',
      onClick: () => setActiveWidget('prix'),
      addNew: () => setShowPriceForm(true)
    }
  ];

  const renderContent = () => {
    switch (activeWidget) {
      case 'clients':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Liste des Clients</h2>
              <Button onClick={() => setShowNewClientForm(true)}>
                Nouveau Client
              </Button>
            </div>
            <ClientList />
          </div>
        );
      case 'categories':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Catégories</h2>
              <Button onClick={() => setShowBusinessTypeForm(true)}>
                Nouvelle Catégorie
              </Button>
            </div>
            <ProductCategoryWidget />
          </div>
        );
      // Add other cases for chantiers, produits, prix
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {widgets.map((widget) => {
              const IconComponent = widget.icon;
              return (
                <Card 
                  key={widget.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={widget.onClick}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IconComponent className={`h-6 w-6 ${widget.color}`} />
                      {widget.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Gérer les {widget.title.toLowerCase()}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Gestion des Clients</h1>
      
      {renderContent()}

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
      {showProjectForm && (
        <ProjectForm 
          open={showProjectForm} 
          onOpenChange={setShowProjectForm}
          clientId={1}
        />
      )}
    </div>
  );
};

export default Clients;