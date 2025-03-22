
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Eye, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SupplierPaymentForm } from "./forms/SupplierPaymentForm";
import { SupplierPaymentDetails } from "./forms/SupplierPaymentDetails";
import { SupplierPaymentSummary } from "./widgets/SupplierPaymentSummary";
import { SupplierPaymentTable } from "./widgets/SupplierPaymentTable";
import { SupplierPaymentCollapsedList } from "./widgets/SupplierPaymentCollapsedList";
import { mockSupplierPayments } from "./data/supplierPaymentsData";

export function SupplierPaymentsWidget() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [supplierForDetails, setSupplierForDetails] = useState<{id: string, name: string} | null>(null);

  const totalDue = mockSupplierPayments.reduce((acc, payment) => acc + payment.remainingAmount, 0);
  const urgentDue = mockSupplierPayments.filter(payment => {
    const dueDate = new Date(payment.dueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && payment.remainingAmount > 0;
  }).reduce((acc, payment) => acc + payment.remainingAmount, 0);

  const handleNewPayment = () => {
    setShowPaymentForm(true);
  };

  const handleViewAll = () => {
    navigate("/finance/supplier-payments");
  };

  const handleRowClick = (payment: any) => {
    setSupplierForDetails({
      id: payment.id,
      name: payment.supplier
    });
    setShowPaymentDetails(true);
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
          <div className="space-y-4">
            <SupplierPaymentSummary totalDue={totalDue} urgentDue={urgentDue} />
            
            {isExpanded ? (
              <SupplierPaymentTable 
                payments={mockSupplierPayments} 
                handleRowClick={handleRowClick} 
                setIsExpanded={setIsExpanded} 
              />
            ) : (
              <SupplierPaymentCollapsedList 
                payments={mockSupplierPayments} 
                handleRowClick={handleRowClick} 
                setIsExpanded={setIsExpanded} 
              />
            )}
          </div>
        </CardContent>
      </Card>

      <SupplierPaymentForm
        open={showPaymentForm}
        onOpenChange={setShowPaymentForm}
      />

      <SupplierPaymentDetails
        open={showPaymentDetails}
        onOpenChange={setShowPaymentDetails}
        supplier={supplierForDetails}
      />
    </motion.div>
  );
}
