
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  DollarSign, Car, Building2, Globe, ListFilter, 
  Plus, FileText, Download, Calendar, Filter, BarChart3
} from "lucide-react";
import ExpenseForm from "@/components/expenses/ExpenseForm";
import ExpenseList from "@/components/expenses/ExpenseList";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { ExpenseCategoryWidget } from "@/components/expenses/widgets/ExpenseCategoryWidget";
import { RollingStockExpenseWidget } from "@/components/expenses/widgets/RollingStockExpenseWidget";
import { ConcreteExpenseWidget } from "@/components/expenses/widgets/ConcreteExpenseWidget";
import { GlobalExpenseWidget } from "@/components/expenses/widgets/GlobalExpenseWidget";
import { ExpenseSummaryWidget } from "@/components/expenses/widgets/ExpenseSummaryWidget";
import { ExpenseFilters } from "@/components/expenses/widgets/ExpenseFilters";
import { toast } from "sonner";
import { ExpenseReportWidget } from "@/components/finance/widgets/reports/ExpenseReportWidget";

const Expenses = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<any>(null);
  const [activeWidget, setActiveWidget] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const handleEdit = (expense: any) => {
    setEditingExpense(expense);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingExpense(null);
  };

  const handleExport = () => {
    toast.success("Export des dépenses en cours...");
    // Logique d'exportation à implémenter
  };

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

  const renderWidget = (widgetId: string) => {
    switch (widgetId) {
      case 'summary':
        return <ExpenseSummaryWidget />;
      case 'global':
        return <GlobalExpenseWidget />;
      case 'categories':
        return <ExpenseCategoryWidget />;
      case 'mechanical':
        return <RollingStockExpenseWidget />;
      case 'concrete':
        return <ConcreteExpenseWidget />;
      case 'reports':
        return <ExpenseReportWidget />;
      default:
        return (
          <Card className="backdrop-blur-lg bg-gray-800/50 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white">Liste des dépenses</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseList onEdit={handleEdit} category="general" />
            </CardContent>
          </Card>
        );
    }
  };

  const renderContent = () => {
    if (activeWidget) {
      const widget = widgets.find(w => w.id === activeWidget);
      if (!widget) return null;

      return (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveWidget(null)}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                ← Retour
              </button>
              <h2 className="text-2xl font-bold text-white">{widget.title}</h2>
            </div>
            
            <div className="flex gap-2">
              {activeWidget !== 'summary' && activeWidget !== 'reports' && (
                <>
                  <Button 
                    variant="outline" 
                    className="bg-gray-800/50 text-gray-300 border-gray-700"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filtres
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="bg-green-600/20 text-green-400 border-green-700/50 hover:bg-green-600/30"
                    onClick={handleExport}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Exporter
                  </Button>
                </>
              )}
              
              {(activeWidget === 'global' || activeWidget === 'mechanical' || activeWidget === 'concrete') && (
                <Button
                  onClick={() => setIsOpen(true)}
                  className="bg-[#9b87f5] hover:bg-[#8a76e5]"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle dépense
                </Button>
              )}
            </div>
          </div>
          
          {showFilters && activeWidget !== 'reports' && <ExpenseFilters />}
          
          <div className="grid grid-cols-1 gap-6">
            {renderWidget(activeWidget)}
          </div>
        </div>
      );
    }

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
                onClick={() => setActiveWidget(widget.id)}
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-6 space-y-6"
      >
        {renderContent()}

        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                {editingExpense ? "Modifier la dépense" : "Ajouter une dépense"}
              </DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              <ExpenseForm
                onClose={handleClose}
                initialData={editingExpense}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </motion.div>
    </div>
  );
};

export default Expenses;
