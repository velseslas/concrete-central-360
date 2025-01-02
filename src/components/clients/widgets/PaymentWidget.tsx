import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, CreditCard } from "lucide-react";
import { toast } from "sonner";

interface Payment {
  id: string;
  date: string;
  amount: number;
  method: "cash" | "check" | "transfer";
  status: "pending" | "completed" | "failed";
}

export function PaymentWidget() {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [payments] = useState<Payment[]>([
    {
      id: "PAY001",
      date: "2024-03-15",
      amount: 50000,
      method: "check",
      status: "completed"
    }
  ]);

  const getStatusBadge = (status: Payment["status"]) => {
    const statusConfig = {
      pending: { label: "En attente", className: "bg-yellow-100 text-yellow-800" },
      completed: { label: "Complété", className: "bg-green-100 text-green-800" },
      failed: { label: "Échoué", className: "bg-red-100 text-red-800" }
    };

    const config = statusConfig[status];
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getMethodLabel = (method: Payment["method"]) => {
    const methodLabels = {
      cash: "Espèces",
      check: "Chèque",
      transfer: "Virement"
    };
    return methodLabels[method];
  };

  const handleNewPayment = () => {
    setShowPaymentForm(true);
    toast.success("Nouveau paiement ajouté avec succès");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Paiements Clients
        </CardTitle>
        <Button onClick={handleNewPayment} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nouveau paiement
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N° Paiement</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Méthode</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.amount.toLocaleString()} DA</TableCell>
                  <TableCell>{getMethodLabel(payment.method)}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}