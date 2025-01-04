import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Construction, Building2, Package, DollarSign, ShoppingCart, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { ClientListWidget } from "@/components/clients/widgets/ClientListWidget";
import { ProductCategoryWidget } from "@/components/clients/widgets/ProductCategoryWidget";
import { ProjectWidget } from "@/components/clients/widgets/ProjectWidget";
import { ProductWidget } from "@/components/clients/widgets/ProductWidget";
import { PriceWidget } from "@/components/clients/widgets/PriceWidget";
import { AdminDocumentsWidget } from "@/components/clients/widgets/AdminDocumentsWidget";
import { ReportsWidget } from "@/components/clients/widgets/ReportsWidget";
import { OrderWidget } from "@/components/clients/widgets/OrderWidget";
import { PaymentWidget } from "@/components/clients/widgets/PaymentWidget";

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
      id: 'categories',
      title: 'Catégories',
      icon: Building2,
      color: 'text-green-500',
      component: ProductCategoryWidget
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
    },
    {
      id: 'paiements',
      title: 'Paiements',
      icon: CreditCard,
      color: 'text-emerald-500',
      component: PaymentWidget
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
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {widgets.map((widget, index) => {
          const IconComponent = widget.icon;
          return (
            <motion.div
              key={widget.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow hover:scale-105 transition-all duration-200"
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
            </motion.div>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-6 space-y-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Gestion des Clients
            </h1>
          </div>
          {renderContent()}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Clients;