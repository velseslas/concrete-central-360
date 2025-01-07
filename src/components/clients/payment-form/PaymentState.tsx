import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { PaymentStatePreview } from "./PaymentStatePreview";
import { PaymentStateDetailsDialog } from "./PaymentStateDetailsDialog";
import { PaymentFilters } from "./PaymentFilters";
import { PaymentSummary } from "./PaymentSummary";

interface PaymentStateProps {
  payments: Array<{
    id: number;
    date: string;
    reference: string;
    amount: number;
    method: string;
    clientName: string;
    projectName: string;
  }>;
}

export function PaymentState({ payments }: PaymentStateProps) {
  const [periodType, setPeriodType] = useState<string>("day");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string>("all");
  const [selectedMethod, setSelectedMethod] = useState<string>("all");

  const handleGenerateReport = () => {
    console.log("Generating payment state with filters:", {
      periodType,
      startDate,
      endDate,
      selectedClient,
      selectedMethod
    });
    setShowPreview(true);
  };

  const filteredPayments = payments.filter(payment => {
    const dateInRange = (!startDate || payment.date >= startDate) && 
                       (!endDate || payment.date <= endDate);
    const clientMatch = selectedClient === "all" || payment.clientName === selectedClient;
    const methodMatch = selectedMethod === "all" || payment.method === selectedMethod;
    return dateInRange && clientMatch && methodMatch;
  });

  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <Card className="bg-gray-900 text-white border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-400" />
          État des Paiements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <PaymentFilters
            periodType={periodType}
            setPeriodType={setPeriodType}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
          />

          <PaymentSummary 
            totalAmount={totalAmount}
            onShowDetails={() => setShowDetails(true)}
          />

          <div className="flex justify-end mt-6">
            <Button 
              onClick={handleGenerateReport} 
              className="w-full md:w-auto bg-blue-500 hover:bg-blue-600"
            >
              Générer l'état
            </Button>
          </div>
        </div>

        {showDetails && (
          <PaymentStateDetailsDialog
            open={showDetails}
            onOpenChange={setShowDetails}
            payments={filteredPayments}
            filters={{
              periodType,
              startDate,
              endDate,
              client: selectedClient,
              method: selectedMethod
            }}
          />
        )}

        {showPreview && (
          <PaymentStatePreview
            open={showPreview}
            onOpenChange={setShowPreview}
            payments={filteredPayments}
            filters={{
              periodType,
              startDate,
              endDate,
              client: selectedClient,
              method: selectedMethod
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}