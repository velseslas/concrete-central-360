import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, DollarSign, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

interface Invoice {
  id: string;
  number: string;
  client: string;
  amount: number;
  status: "pending" | "paid" | "overdue";
  date: string;
  paymentMethod: "cash" | "bank_transfer" | "check";
}

interface FacturationWidgetProps {
  invoices: Invoice[];
}

const FacturationWidget = ({ invoices }: FacturationWidgetProps) => {
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

  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = invoices
    .filter((invoice) => invoice.status === "pending")
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidAmount = invoices
    .filter((invoice) => invoice.status === "paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-200">Facturation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Total facturé</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalAmount.toLocaleString()} DA</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">En attente</CardTitle>
              <FileText className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{pendingAmount.toLocaleString()} DA</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Payé</CardTitle>
              <CreditCard className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{paidAmount.toLocaleString()} DA</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <FileText className="mr-2 h-4 w-4" />
            Nouvelle facture
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-gray-700">
              <TableHead className="text-gray-400">N° Facture</TableHead>
              <TableHead className="text-gray-400">Client</TableHead>
              <TableHead className="text-gray-400">Montant</TableHead>
              <TableHead className="text-gray-400">Date</TableHead>
              <TableHead className="text-gray-400">Mode de paiement</TableHead>
              <TableHead className="text-gray-400">Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id} className="border-gray-700">
                <TableCell className="font-medium text-gray-300">{invoice.number}</TableCell>
                <TableCell className="text-gray-300">{invoice.client}</TableCell>
                <TableCell className="text-gray-300">{invoice.amount.toLocaleString()} DA</TableCell>
                <TableCell className="text-gray-300">{invoice.date}</TableCell>
                <TableCell className="text-gray-300">{getPaymentMethodLabel(invoice.paymentMethod)}</TableCell>
                <TableCell>{getStatusBadge(invoice.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default FacturationWidget;