import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { PaymentStatePreview } from "./PaymentStatePreview";
import { PaymentStateDetailsDialog } from "./PaymentStateDetailsDialog";
import { PaymentFilters } from "./PaymentFilters";

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
              onGenerateReport={handleGenerateReport}
            />

            <div className="flex items-center gap-4 px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
              <span className="text-sm text-gray-400">Total:</span>
              <span className="text-lg font-semibold text-blue-400">
                {totalAmount.toLocaleString()} DA
              </span>
              <Button 
                variant="outline" 
                onClick={() => setShowDetails(true)}
                size="sm"
                className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Voir les détails
              </Button>
            </div>
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