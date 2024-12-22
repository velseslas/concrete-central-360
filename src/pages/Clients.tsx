import { useState } from "react";
import { ClientForm } from "@/components/clients/ClientForm";
import { BusinessTypeForm } from "@/components/clients/BusinessTypeForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, Construction, Package, DollarSign, FileText, ShoppingCart } from "lucide-react";
import { ClientListWidget } from "@/components/clients/widgets/ClientListWidget";
import { ProductCategoryWidget } from "@/components/clients/widgets/ProductCategoryWidget";
import { ProjectWidget } from "@/components/clients/widgets/ProjectWidget";
import { ProductWidget } from "@/components/clients/widgets/ProductWidget";
import { PriceWidget } from "@/components/clients/widgets/PriceWidget";
import { AdminDocumentsWidget } from "@/components/clients/widgets/AdminDocumentsWidget";
import { OrderWidget } from "@/components/clients/widgets/OrderWidget";
import { ReportsWidget } from "@/components/clients/widgets/ReportsWidget";

const Clients = () => {
  const [activeWidget, setActiveWidget] = useState<string | null>(null);
  
  const widgets = [
    {
      id: 'clients',
      title: 'Clients',
      icon: Users,
      color: 'text-blue-500',
      component: ClientListWidget
    },
    {
      id: 'categories',
      title: 'Catégories',
      icon: Building2,
      color: 'text-green-500',
      component: ProductCategoryWidget
    },
    {
      id: 'documents',
      title: 'Documents',
      icon: FileText,
      color: 'text-yellow-500',
      component: AdminDocumentsWidget
    },
    {
      id: 'chantiers',
      title: 'Chantiers',
      icon: Construction,
      color: 'text-orange-500',
      component: ProjectWidget
    },
    {
      id: 'produits',
      title: 'Produits',
      icon: Package,
      color: 'text-purple-500',
      component: ProductWidget
    },
    {
      id: 'prix',
      title: 'Prix Produits',
      icon: DollarSign,
      color: 'text-yellow-500',
      component: PriceWidget
    },
    {
      id: 'commandes',
      title: 'Commandes',
      icon: ShoppingCart,
      color: 'text-indigo-500',
      component: OrderWidget
    },
    {
      id: 'rapports',
      title: 'Rapports',
      icon: FileText,
      color: 'text-gray-500',
      component: ReportsWidget
    }
  ];

  const renderContent = () => {
    if (activeWidget) {
      const widget = widgets.find(w => w.id === activeWidget);
      if (widget) {
        const WidgetComponent = widget.component;
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setActiveWidget(null)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                ← Retour
              </button>
              <h2 className="text-2xl font-bold">{widget.title}</h2>
            </div>
            <WidgetComponent />
          </div>
        );
      }
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {widgets.map((widget) => {
          const IconComponent = widget.icon;
          return (
            <Card 
              key={widget.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setActiveWidget(widget.id)}
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
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Gestion des Clients</h1>
      {renderContent()}
    </div>
  );
};

export default Clients;