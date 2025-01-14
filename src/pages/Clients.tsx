import { useState } from "react";
import { Users, FileText, Construction, Building2, Package, DollarSign, ShoppingCart, CreditCard, Factory } from "lucide-react";
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
import { ProductionWidget } from "@/components/clients/widgets/ProductionWidget";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Clients = () => {
  const [activeWidget, setActiveWidget] = useState<string | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<number>(1);
  
  const widgets = [
    {
      id: 'clients',
      title: 'Clients',
      icon: Users,
      color: 'text-blue-400',
      component: ClientListWidget
    },
    {
      id: 'documents',
      title: 'Documents',
      icon: FileText,
      color: 'text-yellow-400',
      component: AdminDocumentsWidget
    },
    {
      id: 'chantiers',
      title: 'Chantiers',
      icon: Construction,
      color: 'text-orange-400',
      component: ProjectWidget
    },
    {
      id: 'categories',
      title: 'Catégories',
      icon: Building2,
      color: 'text-green-400',
      component: ProductCategoryWidget
    },
    {
      id: 'produits',
      title: 'Produits',
      icon: Package,
      color: 'text-purple-400',
      component: ProductWidget
    },
    {
      id: 'prix',
      title: 'Prix Produits',
      icon: DollarSign,
      color: 'text-yellow-400',
      component: PriceWidget
    },
    {
      id: 'commandes',
      title: 'Commandes',
      icon: ShoppingCart,
      color: 'text-indigo-400',
      component: () => <OrderWidget clientId={selectedClientId} />
    },
    {
      id: 'rapports',
      title: 'Rapports',
      icon: FileText,
      color: 'text-gray-400',
      component: ReportsWidget
    },
    {
      id: 'paiements',
      title: 'Paiements des Clients',
      icon: CreditCard,
      color: 'text-emerald-400',
      component: PaymentWidget
    },
    {
      id: 'production',
      title: 'Production',
      icon: Factory,
      color: 'text-blue-500',
      component: ProductionWidget
    }
  ];

  const renderContent = () => {
    if (activeWidget) {
      const widget = widgets.find(w => w.id === activeWidget);
      if (widget) {
        const WidgetComponent = widget.component;
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setActiveWidget(null)}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                ← Retour
              </button>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {widget.title}
              </h2>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-lg p-6"
            >
              <WidgetComponent />
            </motion.div>
          </motion.div>
        );
      }
    }

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {widgets.map((widget, index) => {
          const IconComponent = widget.icon;
          return (
            <motion.div
              key={widget.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card 
                className="cursor-pointer group hover:scale-105 transition-all duration-300 bg-gray-900/50 backdrop-blur-xl border-gray-800 hover:border-gray-700"
                onClick={() => setActiveWidget(widget.id)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-gray-100">
                    <div className={`p-2 rounded-lg bg-gray-800/50 group-hover:scale-110 transition-transform duration-300 ${widget.color}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    {widget.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Gestion de {widget.title.toLowerCase()}
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
        transition={{ duration: 0.3 }}
        className="container mx-auto p-6 space-y-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-6"
        >
          {renderContent()}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Clients;
