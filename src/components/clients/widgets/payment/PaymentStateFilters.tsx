import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { PaymentStatePreview } from "./PaymentStatePreview";

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
  const [showPreview, setShowPreview] = useState(false);
  
  const paymentMethods = [
    { id: "cash", label: "Espèces" },
    { id: "check", label: "Chèque" },
    { id: "transfer", label: "Virement" }
  ];

  // Mock data for demonstration
  const mockReportData = {
    client: clients.find(c => c.id === selectedClient)?.name || "",
    startDate,
    endDate,
    paymentMethod: paymentMethods.find(m => m.id === paymentMethod)?.label || "",
    payments: [
      {
        date: "2024-03-20",
        reference: "PAY001",
        amount: 15000,
        method: "Espèces"
      },
      {
        date: "2024-03-15",
        reference: "PAY002",
        amount: 25000,
        method: "Chèque"
      }
    ]
  };

  const handleGenerateReport = () => {
    console.log("Generating report with filters:", {
      client: selectedClient,
      startDate,
      endDate,
      paymentMethod
    });

    if (!selectedClient || !startDate || !endDate || !paymentMethod) {
      toast.error("Veuillez remplir tous les champs du filtre");
      return;
    }

    onGenerateReport();
    setShowPreview(true);
    toast.success("État des paiements généré avec succès");
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
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
        <Button 
          onClick={handleGenerateReport} 
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Générer l'état
        </Button>
      </div>

      <PaymentStatePreview
        open={showPreview}
        onOpenChange={setShowPreview}
        reportData={mockReportData}
      />
    </div>
  );
}