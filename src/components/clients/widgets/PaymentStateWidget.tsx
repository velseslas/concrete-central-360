import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Filter, Printer } from "lucide-react";
import { toast } from "sonner";

const mockClients = [
  { id: "1", name: "SARL ABC" },
  { id: "2", name: "EURL XYZ" },
  { id: "3", name: "SPA DEF" }
];

const paymentMethods = [
  { id: "cash", label: "Espèces" },
  { id: "check", label: "Chèque" },
  { id: "transfer", label: "Virement" }
];

export function PaymentStateWidget() {
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [showReport, setShowReport] = useState(false);

  const handleGenerateReport = () => {
    if (!selectedClient || !startDate || !endDate || !paymentMethod) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    console.log("Generating report with filters:", {
      client: selectedClient,
      startDate,
      endDate,
      paymentMethod,
    });
    
    setShowReport(true);
    toast.success("État de paiement généré avec succès");
  };

  const handlePrint = () => {
    window.print();
    console.log("Printing payment state");
  };

  // Données d'exemple pour le rapport
  const reportData = [
    {
      date: "2024-03-20",
      reference: "PAY001",
      amount: 150000,
      method: "Chèque",
      status: "Payé"
    },
    {
      date: "2024-03-21",
      reference: "PAY002",
      amount: 75000,
      method: "Virement",
      status: "Payé"
    }
  ];

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          État des Paiements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filtres</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un client" />
              </SelectTrigger>
              <SelectContent>
                {mockClients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
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

            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
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

          <div className="flex justify-end gap-4">
            <Button onClick={handleGenerateReport} className="bg-blue-500 hover:bg-blue-600">
              Générer l'état
            </Button>
            {showReport && (
              <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2">
                <Printer className="h-4 w-4" />
                Imprimer
              </Button>
            )}
          </div>

          {showReport && (
            <div className="mt-6 print:mt-0">
              <div className="mb-6 print:mb-4">
                <h2 className="text-xl font-bold mb-2">État des Paiements</h2>
                <p className="text-sm text-gray-600">
                  Période: du {startDate} au {endDate}
                </p>
                <p className="text-sm text-gray-600">
                  Client: {mockClients.find(c => c.id === selectedClient)?.name}
                </p>
                <p className="text-sm text-gray-600">
                  Mode de paiement: {paymentMethods.find(m => m.id === paymentMethod)?.label}
                </p>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Référence</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.map((payment, index) => (
                    <TableRow key={index}>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.reference}</TableCell>
                      <TableCell>{payment.amount.toLocaleString()} DA</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>{payment.status}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-bold">
                    <TableCell colSpan={2} className="text-right">Total:</TableCell>
                    <TableCell>
                      {reportData.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString()} DA
                    </TableCell>
                    <TableCell colSpan={2}></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}