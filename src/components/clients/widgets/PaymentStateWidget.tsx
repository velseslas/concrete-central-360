import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaymentStateFilters } from "./payment/PaymentStateFilters";
import { PaymentStateDialog } from "./payment/PaymentStateDialog";

const mockClients = [
  { id: "1", name: "Entreprise ABC" },
  { id: "2", name: "SARL XYZ" }
];

const mockPayments = [
  {
    date: "2024-03-20",
    reference: "PAY001",
    amount: 5000,
    method: "Espèces",
    status: "Payé"
  },
  {
    date: "2024-03-15",
    reference: "PAY002",
    amount: 7500,
    method: "Chèque",
    status: "En attente"
  }
];

export function PaymentStateWidget() {
  const [showReport, setShowReport] = useState(false);
  const [selectedClient, setSelectedClient] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleGenerateReport = () => {
    console.log("Generating report with filters:", {
      client: selectedClient,
      startDate,
      endDate,
      paymentMethod
    });
    setShowReport(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>État des Paiements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <PaymentStateFilters
          clients={mockClients}
          selectedClient={selectedClient}
          startDate={startDate}
          endDate={endDate}
          paymentMethod={paymentMethod}
          onClientChange={setSelectedClient}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onPaymentMethodChange={setPaymentMethod}
          onGenerateReport={handleGenerateReport}
        />

        <PaymentStateDialog
          open={showReport}
          onOpenChange={setShowReport}
          reportData={mockPayments}
          filters={{
            client: mockClients.find(c => c.id === selectedClient)?.name || "",
            startDate,
            endDate,
            paymentMethod
          }}
        />
      </CardContent>
    </Card>
  );
}