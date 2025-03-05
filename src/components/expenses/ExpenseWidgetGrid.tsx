
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DollarSign, Car, Building2, Globe, ListFilter, 
  FileText, BarChart3
} from "lucide-react";

interface ExpenseWidgetProps {
  onSelectWidget: (widgetId: string) => void;
}

export const ExpenseWidgetGrid = ({ onSelectWidget }: ExpenseWidgetProps) => {
  const widgets = [
    {
      id: 'summary',
      title: 'Tableau de Bord',
      icon: DollarSign,
      color: 'text-emerald-400',
      description: 'Vue d\'ensemble des dépenses'
    },
    {
      id: 'global',
      title: 'Achat Générale',
      icon: Globe,
      color: 'text-blue-400',
      description: 'Aperçu global des achats'
    },
    {
      id: 'categories',
      title: 'Catégories',
      icon: ListFilter,
      color: 'text-yellow-400',
      description: 'Gestion des catégories de dépenses'
    },
    {
      id: 'mechanical',
      title: 'Parc Roulant',
      icon: Car,
      color: 'text-[#9b87f5]',
      description: 'Dépenses liées au parc roulant'
    },
    {
      id: 'concrete',
      title: 'Centrale à Béton',
      icon: Building2,
      color: 'text-[#F97316]',
      description: 'Dépenses de la centrale à béton'
    },
    {
      id: 'reports',
      title: 'Rapport Achat',
      icon: FileText,
      color: 'text-green-400',
      description: 'Rapports et analyses des achats'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {widgets.map((widget) => {
        const IconComponent = widget.icon;
        return (
          <motion.div
            key={widget.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="group"
          >
            <Card
              className="relative overflow-hidden cursor-pointer bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300 h-full"
              onClick={() => onSelectWidget(widget.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white text-lg">
                  <IconComponent className={`h-5 w-5 ${widget.color}`} />
                  {widget.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">{widget.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};
