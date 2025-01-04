import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface WidgetProps {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  component: React.ComponentType<any>;
}

interface DashboardProps {
  widgets: WidgetProps[];
  activeWidget: string | null;
  setActiveWidget: (widget: string | null) => void;
}

export function SupplierDashboard({ widgets, activeWidget, setActiveWidget }: DashboardProps) {
  if (!widgets || widgets.length === 0) {
    return null;
  }

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