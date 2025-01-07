import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";

interface PaymentFiltersProps {
  periodType: string;
  setPeriodType: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  selectedClient: string;
  setSelectedClient: (value: string) => void;
  selectedMethod: string;
  setSelectedMethod: (value: string) => void;
}

export function PaymentFilters({
  periodType,
  setPeriodType,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedClient,
  setSelectedClient,
  selectedMethod,
  setSelectedMethod,
}: PaymentFiltersProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-4 w-4" />
        <span className="font-medium">Filtres</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="period-type" className="text-sm font-medium text-gray-200">
            Type de période
          </Label>
          <Select value={periodType} onValueChange={setPeriodType}>
            <SelectTrigger id="period-type" className="bg-gray-800 border-gray-700">
              <SelectValue placeholder="Sélectionner la période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Par jour</SelectItem>
              <SelectItem value="week">Par semaine</SelectItem>
              <SelectItem value="month">Par mois</SelectItem>
              <SelectItem value="year">Par année</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="start-date" className="text-sm font-medium text-gray-200">
            Date de début
          </Label>
          <Input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="end-date" className="text-sm font-medium text-gray-200">
            Date de fin
          </Label>
          <Input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="client-select" className="text-sm font-medium text-gray-200">
            Client
          </Label>
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger id="client-select" className="bg-gray-800 border-gray-700">
              <SelectValue placeholder="Sélectionner un client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les clients</SelectItem>
              <SelectItem value="Client A">Client A</SelectItem>
              <SelectItem value="Client B">Client B</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="payment-method" className="text-sm font-medium text-gray-200">
            Mode de paiement
          </Label>
          <Select value={selectedMethod} onValueChange={setSelectedMethod}>
            <SelectTrigger id="payment-method" className="bg-gray-800 border-gray-700">
              <SelectValue placeholder="Mode de paiement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les modes</SelectItem>
              <SelectItem value="especes">Espèces</SelectItem>
              <SelectItem value="cheque">Chèque</SelectItem>
              <SelectItem value="virement">Virement</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}