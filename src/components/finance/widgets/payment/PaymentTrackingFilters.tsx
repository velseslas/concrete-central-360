import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface PaymentTrackingFiltersProps {
  selectedClient: string;
  startDate: string;
  endDate: string;
  paymentMethod: string;
  onClientChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onPaymentMethodChange: (value: string) => void;
  onGenerateReport: () => void;
}

export function PaymentTrackingFilters({
  selectedClient,
  startDate,
  endDate,
  paymentMethod,
  onClientChange,
  onStartDateChange,
  onEndDateChange,
  onPaymentMethodChange,
  onGenerateReport
}: PaymentTrackingFiltersProps) {
  return (
    <div className="space-y-4 bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select value={selectedClient} onValueChange={onClientChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un client" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les clients</SelectItem>
            <SelectItem value="1">Client A</SelectItem>
            <SelectItem value="2">Client B</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          placeholder="Date début"
          className="bg-gray-900/50"
        />

        <Input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          placeholder="Date fin"
          className="bg-gray-900/50"
        />

        <Select value={paymentMethod} onValueChange={onPaymentMethodChange}>
          <SelectTrigger>
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

      <div className="flex justify-end">
        <Button 
          onClick={onGenerateReport}
          variant="outline"
          className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtrer
        </Button>
      </div>
    </div>
  );
}