import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QuoteFilters } from "../types";

interface AdvancedFiltersProps {
  filters: QuoteFilters;
  onFilterChange: (filters: QuoteFilters) => void;
  onReset: () => void;
}

export function AdvancedFilters({
  filters,
  onFilterChange,
  onReset
}: AdvancedFiltersProps) {
  const handleChange = (key: keyof QuoteFilters, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-800/30 rounded-lg">
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Date début</label>
        <Input
          type="date"
          value={filters.startDate}
          onChange={(e) => handleChange('startDate', e.target.value)}
          className="bg-gray-900/50"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Date fin</label>
        <Input
          type="date"
          value={filters.endDate}
          onChange={(e) => handleChange('endDate', e.target.value)}
          className="bg-gray-900/50"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Montant min</label>
        <Input
          type="number"
          value={filters.minAmount}
          onChange={(e) => handleChange('minAmount', e.target.value)}
          className="bg-gray-900/50"
          placeholder="Montant minimum"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Montant max</label>
        <Input
          type="number"
          value={filters.maxAmount}
          onChange={(e) => handleChange('maxAmount', e.target.value)}
          className="bg-gray-900/50"
          placeholder="Montant maximum"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Statut</label>
        <Select
          value={filters.status}
          onValueChange={(value) => handleChange('status', value)}
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
      <div className="flex items-end">
        <Button
          variant="outline"
          onClick={onReset}
          className="w-full bg-gray-800/50 hover:bg-gray-700/50"
        >
          Réinitialiser
        </Button>
      </div>
    </div>
  );
}