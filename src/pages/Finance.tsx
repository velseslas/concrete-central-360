
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  DollarSign, 
  CreditCard, 
  FileText, 
  Receipt,
  Building2,
  Calculator
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FinanceStats } from "@/components/finance/FinanceStats";
import { PaymentTrackingWidget } from "@/components/finance/widgets/PaymentTrackingWidget";
import { BillingListWidget } from "@/components/finance/widgets/BillingListWidget";
import { BillingReportsWidget } from "@/components/finance/widgets/BillingReportsWidget";
import { DailyExpenseWidget } from "@/components/finance/widgets/DailyExpenseWidget";
import { QuoteWidget } from "@/components/finance/widgets/QuoteWidget";

export default function Finance() {
  const [activeWidget, setActiveWidget] = useState<string | null>(null);

  const widgets = [
    {
      id: 'client-payments',
      title: 'Paiements Clients',
      icon: CreditCard,
      color: 'text-purple-400',
      component: PaymentTrackingWidget
    },
    {
      id: 'supplier-payments',
      title: 'Paiements Fournisseurs',
      icon: Building2,
      color: 'text-amber-400',
      component: DailyExpenseWidget
    },
    {
      id: 'billing',
      title: 'Facturation',
      icon: Receipt,
      color: 'text-emerald-400',
      component: BillingListWidget
    },
    {
      id: 'reports',
      title: 'Rapports',
      icon: FileText,
      color: 'text-gray-400',
      component: BillingReportsWidget
    },
    {
      id: 'quotes',
      title: 'Devis',
      icon: Calculator,
      color: 'text-orange-400',
      component: QuoteWidget
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
      <>
        <FinanceStats />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
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
      </>
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
}
