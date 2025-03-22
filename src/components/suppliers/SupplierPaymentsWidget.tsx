
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, CreditCard, Plus, DollarSign, Calculator } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

// Données mockées pour les paiements fournisseurs
const mockSupplierPayments = [
  {
    id: "SP001",
    supplier: "SARL CIMENT PLUS",
    totalAmount: 850000,
    paidAmount: 500000,
    remainingAmount: 350000,
    lastPaymentDate: "2024-07-10",
    dueDate: "2024-07-30",
    status: "partiel"
  },
  {
    id: "SP002",
    supplier: "EURL AGREGATS",
    totalAmount: 325000,
    paidAmount: 325000,
    remainingAmount: 0,
    lastPaymentDate: "2024-07-05",
    dueDate: "2024-07-15",
    status: "payé"
  },
  {
    id: "SP003",
    supplier: "ETS COMPTOIR METALLIQUE",
    totalAmount: 1200000,
    paidAmount: 600000,
    remainingAmount: 600000,
    lastPaymentDate: "2024-06-28",
    dueDate: "2024-07-20",
    status: "partiel"
  },
  {
    id: "SP004",
    supplier: "SPA EQUIPEMENTS BTP",
    totalAmount: 430000,
    paidAmount: 0,
    remainingAmount: 430000,
    lastPaymentDate: "-",
    dueDate: "2024-08-05",
    status: "impayé"
  }
];

export function SupplierPaymentsWidget() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const totalDue = mockSupplierPayments.reduce((acc, payment) => acc + payment.remainingAmount, 0);
  const urgentDue = mockSupplierPayments.filter(payment => {
    const dueDate = new Date(payment.dueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && payment.remainingAmount > 0;
  }).reduce((acc, payment) => acc + payment.remainingAmount, 0);

  const handleNewPayment = () => {
    navigate("/finance/supplier-payments");
    toast.success("Redirection vers la page de paiement fournisseur");
  };

  const handleViewAll = () => {
    navigate("/finance/supplier-payments");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "payé":
        return <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-green-500/20">Payé</Badge>;
      case "partiel":
        return <Badge className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border-amber-500/20">Partiel</Badge>;
      case "impayé":
        return <Badge className="bg-red-500/20 text-red-500 hover:bg-red-500/30 border-red-500/20">Impayé</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 cursor-pointer hover:bg-gray-800/50 transition-colors">
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-amber-400" />
              Paiements Fournisseurs
            </span>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleViewAll}
                className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 border-amber-500/20"
              >
                Voir tout
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleNewPayment}
                className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 border-amber-500/20"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nouveau
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 group hover:bg-gray-700/30 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-400">Total à payer</p>
                  <DollarSign className="h-5 w-5 text-amber-400 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-xl font-bold text-white">{totalDue.toLocaleString('fr-FR')} DA</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 group hover:bg-gray-700/30 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-400">Urgent (7 jours)</p>
                  <Calculator className="h-5 w-5 text-red-400 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-xl font-bold text-red-400">{urgentDue.toLocaleString('fr-FR')} DA</p>
              </div>
            </div>
            
            {isExpanded ? (
              <div className="mt-6">
                <Table>
                  <TableHeader className="bg-gray-800/50">
                    <TableRow className="hover:bg-gray-700/50 border-gray-700">
                      <TableHead className="text-gray-300">Fournisseur</TableHead>
                      <TableHead className="text-gray-300 text-right">Montant total</TableHead>
                      <TableHead className="text-gray-300 text-right">Payé</TableHead>
                      <TableHead className="text-gray-300 text-right">Reste</TableHead>
                      <TableHead className="text-gray-300 text-center">Statut</TableHead>
                      <TableHead className="text-gray-300 text-right">Échéance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSupplierPayments.map((payment) => (
                      <TableRow key={payment.id} className="hover:bg-gray-700/50 border-gray-700">
                        <TableCell className="font-medium text-gray-200">{payment.supplier}</TableCell>
                        <TableCell className="text-right text-gray-300">{payment.totalAmount.toLocaleString('fr-FR')}</TableCell>
                        <TableCell className="text-right text-green-400">{payment.paidAmount.toLocaleString('fr-FR')}</TableCell>
                        <TableCell className="text-right text-amber-400">{payment.remainingAmount.toLocaleString('fr-FR')}</TableCell>
                        <TableCell className="text-center">{getStatusBadge(payment.status)}</TableCell>
                        <TableCell className="text-right text-gray-300">{payment.dueDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex justify-center mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(false)}
                    className="text-gray-400 hover:text-gray-300"
                  >
                    Voir moins
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="space-y-3 mt-4">
                  {mockSupplierPayments.slice(0, 2).map((payment) => (
                    <div 
                      key={payment.id}
                      className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 flex justify-between items-center group hover:bg-gray-700/30 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-200">{payment.supplier}</p>
                        <p className="text-xs text-gray-400">Échéance: {payment.dueDate}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-medium text-amber-400">
                          {payment.remainingAmount.toLocaleString('fr-FR')} DA
                        </span>
                        {getStatusBadge(payment.status)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(true)}
                    className="text-gray-400 hover:text-gray-300"
                  >
                    Voir plus
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
