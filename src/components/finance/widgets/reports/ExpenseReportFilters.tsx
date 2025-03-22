
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

type ReportPeriod = "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
type ExpenseCategory = "general" | "vehicles" | "concrete" | "all";

interface ExpenseReportFiltersProps {
  reportPeriod: ReportPeriod;
  expenseCategory: ExpenseCategory;
  onReportPeriodChange: (period: ReportPeriod) => void;
  onExpenseCategoryChange: (category: ExpenseCategory) => void;
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
}

export function ExpenseReportFilters({
  reportPeriod,
  expenseCategory,
  onReportPeriodChange,
  onExpenseCategoryChange,
  selectedDate = new Date(),
  onDateChange
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

  const getDatePlaceholder = () => {
    switch (reportPeriod) {
      case "daily": return "Sélectionner un jour";
      case "weekly": return "Sélectionner une semaine";
      case "monthly": return "Sélectionner un mois";
      case "quarterly": return "Sélectionner un trimestre";
      case "yearly": return "Sélectionner une année";
      default: return "Sélectionner une date";
    }
  };

  return (
    <div className="space-y-4 bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        <div>
          <label className="block text-sm text-gray-400 mb-2">Période</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal bg-gray-700/50 border-gray-600 text-white"
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, 'd MMMM yyyy', { locale: fr }) : getDatePlaceholder()}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && onDateChange && onDateChange(date)}
                initialFocus
                className="bg-gray-800 text-white"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
