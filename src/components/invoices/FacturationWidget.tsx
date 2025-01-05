import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, DollarSign, CreditCard, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

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
      pending: { label: "En attente", className: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20" },
      paid: { label: "Payée", className: "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20" },
      overdue: { label: "En retard", className: "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20" },
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

  const handleNewInvoice = () => {
    console.log("Creating new invoice");
    toast.info("Fonctionnalité en cours de développement");
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-white">Facturation</CardTitle>
          </div>
          <Button 
            onClick={handleNewInvoice}
            size="sm"
            className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle facture
          </Button>
        </div>
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

        <div className="rounded-lg overflow-hidden border border-gray-700">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 bg-gray-800/50">
                <TableHead className="text-gray-300">N° Facture</TableHead>
                <TableHead className="text-gray-300">Client</TableHead>
                <TableHead className="text-gray-300">Montant</TableHead>
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Mode de paiement</TableHead>
                <TableHead className="text-gray-300">Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id} className="border-gray-700 bg-gray-800/30 hover:bg-gray-700/50 transition-colors duration-200">
                  <TableCell className="text-gray-300">{invoice.number}</TableCell>
                  <TableCell className="text-gray-300">{invoice.client}</TableCell>
                  <TableCell className="text-gray-300">{invoice.amount.toLocaleString()} DA</TableCell>
                  <TableCell className="text-gray-300">{invoice.date}</TableCell>
                  <TableCell className="text-gray-300">{getPaymentMethodLabel(invoice.paymentMethod)}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default FacturationWidget;