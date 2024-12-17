import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, DollarSign, CreditCard } from "lucide-react";

interface Invoice {
  id: string;
  number: string;
  client: string;
  amount: number;
  status: "pending" | "paid" | "overdue";
  date: string;
  paymentMethod: "cash" | "bank_transfer" | "check";
}

const Invoices = () => {
  const [invoices] = useState<Invoice[]>([
    {
      id: "1",
      number: "FAC001",
      client: "Client A",
      amount: 15000,
      status: "paid",
      date: "2024-03-20",
      paymentMethod: "bank_transfer",
    },
    {
      id: "2",
      number: "FAC002",
      client: "Client B",
      amount: 22500,
      status: "pending",
      date: "2024-03-21",
      paymentMethod: "check",
    },
  ]);

  const getStatusBadge = (status: Invoice["status"]) => {
    const statusConfig = {
      pending: { label: "En attente", className: "bg-yellow-100 text-yellow-800" },
      paid: { label: "Payée", className: "bg-green-100 text-green-800" },
      overdue: { label: "En retard", className: "bg-red-100 text-red-800" },
    };

    const config = statusConfig[status];
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getPaymentMethodLabel = (method: Invoice["paymentMethod"]) => {
    const methodConfig = {
      cash: "Espèces",
      bank_transfer: "Virement bancaire",
      check: "Chèque",
    };

    return methodConfig[method];
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Factures</h1>
          <p className="text-gray-500">Gestion de la facturation</p>
        </div>
        <Button className="bg-primary">
          <FileText className="mr-2 h-4 w-4" />
          Nouvelle facture
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total facturé</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">37 500 DA</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22 500 DA</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payé</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 000 DA</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des factures</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N° Facture</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Mode de paiement</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.number}</TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell>{invoice.amount.toLocaleString()} DA</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{getPaymentMethodLabel(invoice.paymentMethod)}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Invoices;