import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/datepicker";

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
  onGenerateReport: () => void;
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
  onGenerateReport,
}: PaymentFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="period-type" className="text-sm text-gray-400">
            Période
          </Label>
          <Select
            id="period-type"
            value={periodType}
            onValueChange={setPeriodType}
            className="w-full bg-gray-800 border-gray-700 text-white"
          >
            <option value="day">Jour</option>
            <option value="week">Semaine</option>
            <option value="month">Mois</option>
            <option value="year">Année</option>
            <option value="custom">Personnalisé</option>
          </Select>
        </div>

        {periodType === "custom" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="start-date" className="text-sm text-gray-400">
                Date début
              </Label>
              <DatePicker
                id="start-date"
                value={startDate}
                onChange={setStartDate}
                className="w-full bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date" className="text-sm text-gray-400">
                Date fin
              </Label>
              <DatePicker
                id="end-date"
                value={endDate}
                onChange={setEndDate}
                className="w-full bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label htmlFor="client" className="text-sm text-gray-400">
            Client
          </Label>
          <Select
            id="client"
            value={selectedClient}
            onValueChange={setSelectedClient}
            className="w-full bg-gray-800 border-gray-700 text-white"
          >
            <option value="all">Tous les clients</option>
            <option value="client1">Client 1</option>
            <option value="client2">Client 2</option>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="payment-method" className="text-sm text-gray-400">
            Mode de paiement
          </Label>
          <Select
            id="payment-method"
            value={selectedMethod}
            onValueChange={setSelectedMethod}
            className="w-full bg-gray-800 border-gray-700 text-white"
          >
            <option value="all">Tous les modes</option>
            <option value="cash">Espèces</option>
            <option value="check">Chèque</option>
            <option value="transfer">Virement</option>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="w-full md:w-auto">
          <Label className="sr-only">Actions</Label>
          <Button 
            onClick={onGenerateReport} 
            className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 transition-colors w-full border border-indigo-400/20"
          >
            Générer l'état
          </Button>
        </div>
      </div>
    </div>
  );
}