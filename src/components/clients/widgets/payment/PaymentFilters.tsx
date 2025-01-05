import { PaymentStateFilters } from "./PaymentStateFilters";

interface PaymentFiltersProps {
  clients: any[];
  filteredClient: string;
  startDate: string;
  endDate: string;
  paymentMethod: string;
  onClientChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onPaymentMethodChange: (value: string) => void;
  onGenerateReport: () => void;
}

export function PaymentFilters({
  clients,
  filteredClient,
  startDate,
  endDate,
  paymentMethod,
  onClientChange,
  onStartDateChange,
  onEndDateChange,
  onPaymentMethodChange,
  onGenerateReport
}: PaymentFiltersProps) {
  return (
    <PaymentStateFilters
      clients={clients}
      selectedClient={filteredClient}
      startDate={startDate}
      endDate={endDate}
      paymentMethod={paymentMethod}
      onClientChange={onClientChange}
      onStartDateChange={onStartDateChange}
      onEndDateChange={onEndDateChange}
      onPaymentMethodChange={onPaymentMethodChange}
      onGenerateReport={onGenerateReport}
    />
  );
}