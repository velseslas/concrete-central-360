import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, DollarSign, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import InvoiceWidget from "@/components/invoices/InvoiceWidget";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button className="bg-blue-600 hover:bg-blue-700">
                <FileText className="mr-2 h-4 w-4" />
                Nouvelle facture
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-200">Total facturé</CardTitle>
                <DollarSign className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">37 500 DA</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-200">En attente</CardTitle>
                <FileText className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">22 500 DA</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-200">Payé</CardTitle>
                <CreditCard className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">15 000 DA</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {invoices.map((invoice) => (
              <InvoiceWidget key={invoice.id} invoice={invoice} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-200">Liste des factures</CardTitle>
              </CardHeader>
              <CardContent>
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
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Invoices;