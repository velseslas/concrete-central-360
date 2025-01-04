import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface PaymentStateFiltersProps {
  clients: Array<{ id: string; name: string }>;
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

export function PaymentStateFilters({
  clients,
  selectedClient,
  startDate,
  endDate,
  paymentMethod,
  onClientChange,
  onStartDateChange,
  onEndDateChange,
  onPaymentMethodChange,
  onGenerateReport
}: PaymentStateFiltersProps) {
  const paymentMethods = [
    { id: "cash", label: "Espèces" },
    { id: "check", label: "Chèque" },
    { id: "transfer", label: "Virement" }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-4 w-4" />
        <span className="font-medium">Filtres</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select value={selectedClient} onValueChange={onClientChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un client" />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          placeholder="Date début"
        />

        <Input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          placeholder="Date fin"
        />

        <Select value={paymentMethod} onValueChange={onPaymentMethodChange}>
          <SelectTrigger>
            <SelectValue placeholder="Mode de paiement" />
          </SelectTrigger>
          <SelectContent>
            {paymentMethods.map((method) => (
              <SelectItem key={method.id} value={method.id}>
                {method.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end">
        <Button onClick={onGenerateReport} className="bg-blue-500 hover:bg-blue-600">
          Générer l'état
        </Button>
      </div>
    </div>
  );
}