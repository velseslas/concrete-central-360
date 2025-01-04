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
      color: 'text-blue-400',
      description: 'Gérer la liste des clients et leurs informations'
    },
    {
      id: 'documents',
      title: 'Documents',
      icon: FileText,
      color: 'text-yellow-400',
      description: 'Gérer les documents administratifs'
    },
    {
      id: 'chantiers',
      title: 'Chantiers',
      icon: Construction,
      color: 'text-orange-400',
      description: 'Gérer les projets et chantiers'
    },
    {
      id: 'categories',
      title: 'Catégories',
      icon: Building2,
      color: 'text-green-400',
      description: 'Gérer les catégories de produits'
    },
    {
      id: 'produits',
      title: 'Produits',
      icon: Package,
      color: 'text-purple-400',
      description: 'Gérer le catalogue des produits'
    },
    {
      id: 'prix',
      title: 'Prix Produits',
      icon: DollarSign,
      color: 'text-yellow-400',
      description: 'Gérer les tarifs et prix'
    },
    {
      id: 'commandes',
      title: 'Commandes',
      icon: ShoppingCart,
      color: 'text-indigo-400',
      description: 'Gérer les commandes clients'
    },
    {
      id: 'rapports',
      title: 'Rapports',
      icon: FileText,
      color: 'text-gray-400',
      description: 'Consulter les rapports et statistiques'
    },
    {
      id: 'paiements',
      title: 'Paiements',
      icon: CreditCard,
      color: 'text-emerald-400',
      description: 'Gérer les paiements clients'
    }
  ];

  const getComponent = (id: string) => {
    switch (id) {
      case 'clients':
        return ClientListWidget;
      case 'documents':
        return AdminDocumentsWidget;
      case 'chantiers':
        return ProjectWidget;
      case 'categories':
        return ProductCategoryWidget;
      case 'produits':
        return ProductWidget;
      case 'prix':
        return PriceWidget;
      case 'commandes':
        return OrderWidget;
      case 'rapports':
        return ReportsWidget;
      case 'paiements':
        return PaymentWidget;
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (activeWidget) {
      const widget = widgets.find(w => w.id === activeWidget);
      if (widget) {
        const WidgetComponent = getComponent(widget.id);
        if (!WidgetComponent) return null;
        
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setActiveWidget(null)}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                ← Retour
              </button>
              <h2 className="text-2xl font-bold text-white">{widget.title}</h2>
            </div>
            <WidgetComponent />
          </motion.div>
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
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <Card 
                className="relative overflow-hidden cursor-pointer group"
                onClick={() => setActiveWidget(widget.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-lg transition-all duration-300 group-hover:backdrop-blur-xl" />
                <CardHeader className="relative">
                  <CardTitle className="flex items-center gap-3 text-gray-100">
                    <div className={`p-2 rounded-lg ${widget.color} bg-opacity-20`}>
                      <IconComponent className={`h-6 w-6 ${widget.color}`} />
                    </div>
                    {widget.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-gray-400">
                    {widget.description}
                  </p>
                </CardContent>
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 group-hover:ring-white/20 transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent" />
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="flex justify-between items-center">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
              >
                Gestion des Clients
              </motion.h1>
            </div>
            {renderContent()}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Clients;