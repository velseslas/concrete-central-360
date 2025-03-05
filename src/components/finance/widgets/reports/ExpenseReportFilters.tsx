
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays } from "lucide-react";

type ReportPeriod = "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
type ExpenseCategory = "general" | "vehicles" | "concrete" | "all";

interface ExpenseReportFiltersProps {
  reportPeriod: ReportPeriod;
  expenseCategory: ExpenseCategory;
  onReportPeriodChange: (period: ReportPeriod) => void;
  onExpenseCategoryChange: (category: ExpenseCategory) => void;
}

export function ExpenseReportFilters({
  reportPeriod,
  expenseCategory,
  onReportPeriodChange,
  onExpenseCategoryChange
}: ExpenseReportFiltersProps) {
  const periods = [
    { value: "daily", label: "Rapport Quotidien" },
    { value: "weekly", label: "Rapport Hebdomadaire" },
    { value: "monthly", label: "Rapport Mensuel" },
    { value: "quarterly", label: "Rapport Trimestriel" },
    { value: "yearly", label: "Rapport Annuel" }
  ];

  const categories = [
    { value: "all", label: "Tous les achats" },
    { value: "general", label: "Achat Générale" },
    { value: "vehicles", label: "Parc Roulant" },
    { value: "concrete", label: "Centrale à Béton" }
  ];

  return (
    <div className="space-y-4 bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Type de Rapport</label>
          <Select 
            value={reportPeriod} 
            onValueChange={(value) => onReportPeriodChange(value as ReportPeriod)}
          >
            <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
              <SelectValue placeholder="Sélectionner une période" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              {periods.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    {period.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Catégorie d'Achat</label>
          <Select 
            value={expenseCategory} 
            onValueChange={(value) => onExpenseCategoryChange(value as ExpenseCategory)}
          >
            <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
