import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Filter } from "lucide-react";
import { PaymentStateDialog } from "./PaymentStateDialog";
import { PaymentStatePreview } from "./PaymentStatePreview";

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
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filtres</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={periodType} onValueChange={setPeriodType}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner la période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Par jour</SelectItem>
                <SelectItem value="week">Par semaine</SelectItem>
                <SelectItem value="month">Par mois</SelectItem>
                <SelectItem value="year">Par année</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Date début"
            />

            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="Date fin"
            />

            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les clients</SelectItem>
                <SelectItem value="Client A">Client A</SelectItem>
                <SelectItem value="Client B">Client B</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedMethod} onValueChange={setSelectedMethod}>
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

            <Button onClick={handleGenerateReport} className="bg-blue-500 hover:bg-blue-600">
              Générer l'état
            </Button>
          </div>

          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Résumé</h3>
              <p className="text-xl font-bold text-blue-400">
                Total: {totalAmount.toLocaleString()} DA
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowDetails(true)}
              className="w-full mt-2"
            >
              Voir les détails
            </Button>
          </div>
        </div>

        <PaymentStateDialog
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
      </CardContent>
    </Card>
  );
}