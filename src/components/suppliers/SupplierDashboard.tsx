import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, CreditCard, FileText, Truck, ShoppingCart, Tag, Euro, Factory } from "lucide-react";

interface WidgetProps {
  id: string;
  title: string;
  icon: any;
  color: string;
  component: any;
}

interface DashboardProps {
  widgets: WidgetProps[];
  activeWidget: string | null;
  setActiveWidget: (widget: string | null) => void;
}

export function SupplierDashboard({ widgets, activeWidget, setActiveWidget }: DashboardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {widgets.map((widget, index) => {
        const IconComponent = widget.icon;
        return (
          <motion.div
            key={widget.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <Card 
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
          </motion.div>
        );
      })}
    </motion.div>
  );
}