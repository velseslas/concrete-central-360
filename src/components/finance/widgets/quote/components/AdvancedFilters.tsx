import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { QuoteFilters } from "../types";

interface AdvancedFiltersProps {
  filters: QuoteFilters;
  onFilterChange: (filters: QuoteFilters) => void;
  onReset: () => void;
}

export function AdvancedFilters({ filters, onFilterChange, onReset }: AdvancedFiltersProps) {
  const handleFilterChange = (key: keyof QuoteFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-4 bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Période</label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange("startDate", e.target.value)}
              className="bg-gray-900/50"
              placeholder="Date début"
            />
            <Input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange("endDate", e.target.value)}
              className="bg-gray-900/50"
              placeholder="Date fin"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Montant</label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              value={filters.minAmount}
              onChange={(e) => handleFilterChange("minAmount", e.target.value)}
              className="bg-gray-900/50"
              placeholder="Min"
            />
            <Input
              type="number"
              value={filters.maxAmount}
              onChange={(e) => handleFilterChange("maxAmount", e.target.value)}
              className="bg-gray-900/50"
              placeholder="Max"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Statut</label>
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger className="bg-gray-900/50">
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="accepted">Accepté</SelectItem>
              <SelectItem value="rejected">Refusé</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={onReset}
          className="bg-gray-800/50 hover:bg-gray-700/50"
        >
          <X className="h-4 w-4 mr-2" />
          Réinitialiser
        </Button>
        <Button
          variant="default"
          onClick={() => onFilterChange(filters)}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Filter className="h-4 w-4 mr-2" />
          Appliquer
        </Button>
      </div>
    </div>
  );
}