
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Filter, Plus } from "lucide-react";
import { ExpenseSummaryWidget } from "./widgets/ExpenseSummaryWidget";
import { GlobalExpenseWidget } from "./widgets/GlobalExpenseWidget";
import { ExpenseCategoryWidget } from "./widgets/ExpenseCategoryWidget";
import { RollingStockExpenseWidget } from "./widgets/RollingStockExpenseWidget";
import { ConcreteExpenseWidget } from "./widgets/ConcreteExpenseWidget";
import { ExpenseReportWidget } from "@/components/finance/widgets/reports/ExpenseReportWidget";
import { ExpenseFilters } from "./widgets/ExpenseFilters";
import { toast } from "sonner";

interface ExpenseWidgetContentProps {
  activeWidget: string;
  onGoBack: () => void;
  onOpenDrawer: () => void;
}

export const ExpenseWidgetContent = ({ 
  activeWidget, 
  onGoBack,
  onOpenDrawer
}: ExpenseWidgetContentProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleExport = () => {
    toast.success("Export des dépenses en cours...");
    // Logique d'exportation à implémenter
  };

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
        return null;
    }
  };

  const getWidgetTitle = (widgetId: string) => {
    switch (widgetId) {
      case 'summary':
        return 'Tableau de Bord';
      case 'global':
        return 'Achat Générale';
      case 'categories':
        return 'Catégories';
      case 'mechanical':
        return 'Parc Roulant';
      case 'concrete':
        return 'Centrale à Béton';
      case 'reports':
        return 'Rapport Achat';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex items-center gap-2">
          <button
            onClick={onGoBack}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Retour
          </button>
          <h2 className="text-2xl font-bold text-white">{getWidgetTitle(activeWidget)}</h2>
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
              onClick={onOpenDrawer}
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
