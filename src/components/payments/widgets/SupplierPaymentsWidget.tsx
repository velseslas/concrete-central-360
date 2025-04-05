
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Eye, Plus, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Mock data for supplier payments
const mockSupplierPayments = [
  {
    id: "SP001",
    supplier: "SARL CIMENT PLUS",
    totalAmount: 850000,
    paidAmount: 500000,
    remainingAmount: 350000,
    dueDate: "2024-07-30",
    status: "partiel"
  },
  {
    id: "SP002",
    supplier: "EURL AGREGATS",
    totalAmount: 325000,
    paidAmount: 325000,
    remainingAmount: 0,
    dueDate: "2024-07-15",
    status: "payé"
  },
  {
    id: "SP003",
    supplier: "ETS COMPTOIR METALLIQUE",
    totalAmount: 1200000,
    paidAmount: 600000,
    remainingAmount: 600000,
    dueDate: "2024-07-20",
    status: "partiel"
  },
  {
    id: "SP004",
    supplier: "SPA EQUIPEMENTS BTP",
    totalAmount: 430000,
    paidAmount: 0,
    remainingAmount: 430000,
    dueDate: "2024-08-05",
    status: "impayé"
  }
];

export function SupplierPaymentsWidget() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const totalDue = mockSupplierPayments.reduce((acc, payment) => acc + payment.remainingAmount, 0);
  const urgentDue = mockSupplierPayments.filter(payment => {
    const dueDate = new Date(payment.dueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && payment.remainingAmount > 0;
  }).reduce((acc, payment) => acc + payment.remainingAmount, 0);

  const filteredSuppliers = mockSupplierPayments.filter(payment => 
    payment.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewPayment = () => {
    console.log("Opening new supplier payment form");
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
      <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 hover:shadow-lg transition-shadow">
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
                className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 border-amber-500/20 transition-all duration-200 hover:scale-105"
              >
                <Eye className="h-4 w-4 mr-2" />
                Voir tout
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleNewPayment}
                className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 border-amber-500/20 transition-all duration-200 hover:scale-105"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nouveau
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
                <p className="text-sm text-gray-400">Total à payer</p>
                <p className="text-lg font-bold text-white">{totalDue.toLocaleString('fr-FR')} DA</p>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
                <p className="text-sm text-gray-400">Urgent (7 jours)</p>
                <p className="text-lg font-bold text-red-400">{urgentDue.toLocaleString('fr-FR')} DA</p>
              </div>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                placeholder="Rechercher un fournisseur..."
                className="pl-10 bg-gray-800/50 border-gray-700 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Suppliers List */}
            <div className="space-y-3">
              {filteredSuppliers.length > 0 ? (
                filteredSuppliers.map((payment) => (
                  <motion.div
                    key={payment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.01 }}
                    className="p-4 rounded-lg bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-amber-500/30 cursor-pointer group overflow-hidden"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center">
                          <h3 className="font-medium text-white">{payment.supplier}</h3>
                        </div>
                        <p className="text-sm text-gray-400">Échéance: {payment.dueDate}</p>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="mr-2 text-right">
                          {payment.status === "payé" ? (
                            <p className="font-semibold text-green-400">0 DA</p>
                          ) : (
                            <p className="font-semibold text-amber-400">
                              {payment.remainingAmount.toLocaleString('fr-FR')} DA
                            </p>
                          )}
                        </span>
                        {getStatusBadge(payment.status)}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-400">
                  Aucun fournisseur ne correspond à votre recherche
                </div>
              )}
            </div>
            
            {filteredSuppliers.length > 4 && (
              <div className="text-center pt-2">
                <Button 
                  variant="ghost" 
                  className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10"
                  onClick={handleViewAll}
                >
                  Voir plus
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
