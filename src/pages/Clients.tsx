
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Package, DollarSign, ShoppingCart, Factory } from "lucide-react";
import { motion } from "framer-motion";
import { ClientList } from "@/components/clients/ClientList";
import { ProductWidget } from "@/components/clients/widgets/ProductWidget";
import { ReportsWidget } from "@/components/clients/widgets/ReportsWidget";
import { OrderWidget } from "@/components/clients/widgets/OrderWidget";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Clients = () => {
  const [activeWidget, setActiveWidget] = useState<string | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<number>(1);
  const navigate = useNavigate();
  
  const widgets = [
    {
      id: 'clients',
      title: 'Gestion des Clients',
      icon: Users,
      color: 'text-blue-400',
      component: ClientList
    },
    {
      id: 'produits',
      title: 'Gestion Produits',
      icon: Package,
      color: 'text-purple-400',
      component: ProductWidget
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
      icon: Factory,
      color: 'text-gray-400',
      component: ReportsWidget
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
            <WidgetComponent />
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
        className="container mx-auto p-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Clients;
