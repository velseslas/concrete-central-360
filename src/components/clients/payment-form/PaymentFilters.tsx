import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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
          <Select value={periodType} onValueChange={setPeriodType}>
            <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Sélectionner une période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Jour</SelectItem>
              <SelectItem value="week">Semaine</SelectItem>
              <SelectItem value="month">Mois</SelectItem>
              <SelectItem value="year">Année</SelectItem>
              <SelectItem value="custom">Personnalisé</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {periodType === "custom" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="start-date" className="text-sm text-gray-400">
                Date début
              </Label>
              <Input
                type="date"
                id="start-date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date" className="text-sm text-gray-400">
                Date fin
              </Label>
              <Input
                type="date"
                id="end-date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label htmlFor="client" className="text-sm text-gray-400">
            Client
          </Label>
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Sélectionner un client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les clients</SelectItem>
              <SelectItem value="client1">Client 1</SelectItem>
              <SelectItem value="client2">Client 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="payment-method" className="text-sm text-gray-400">
            Mode de paiement
          </Label>
          <Select value={selectedMethod} onValueChange={setSelectedMethod}>
            <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Sélectionner un mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les modes</SelectItem>
              <SelectItem value="cash">Espèces</SelectItem>
              <SelectItem value="check">Chèque</SelectItem>
              <SelectItem value="transfer">Virement</SelectItem>
            </SelectContent>
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