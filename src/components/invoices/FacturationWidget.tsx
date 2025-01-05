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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Factures
            </CardTitle>
            <Button 
              onClick={handleNewInvoice}
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle facture
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Total facturé</CardTitle>
                  <DollarSign className="h-4 w-4 text-white/70" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{totalAmount.toLocaleString()} DA</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">En attente</CardTitle>
                  <FileText className="h-4 w-4 text-white/70" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{pendingAmount.toLocaleString()} DA</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Payé</CardTitle>
                  <CreditCard className="h-4 w-4 text-white/70" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{paidAmount.toLocaleString()} DA</div>
                </CardContent>
              </Card>
            </div>

            <div className="rounded-lg overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/20 hover:bg-white/5">
                    <TableHead className="text-white">N° Facture</TableHead>
                    <TableHead className="text-white">Client</TableHead>
                    <TableHead className="text-white">Montant</TableHead>
                    <TableHead className="text-white">Date</TableHead>
                    <TableHead className="text-white">Mode de paiement</TableHead>
                    <TableHead className="text-white">Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id} className="border-white/20 hover:bg-white/5">
                      <TableCell className="text-white">{invoice.number}</TableCell>
                      <TableCell className="text-white">{invoice.client}</TableCell>
                      <TableCell className="text-white">{invoice.amount.toLocaleString()} DA</TableCell>
                      <TableCell className="text-white">{invoice.date}</TableCell>
                      <TableCell className="text-white">{getPaymentMethodLabel(invoice.paymentMethod)}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FacturationWidget;