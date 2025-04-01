
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Eye, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ClientPaymentForm } from "./forms/ClientPaymentForm";
import { ClientPaymentDetails } from "./forms/ClientPaymentDetails";
import { ClientPaymentSummary } from "./widgets/ClientPaymentSummary";
import { ClientPaymentTable } from "./widgets/ClientPaymentTable";
import { ClientPaymentCollapsedList } from "./widgets/ClientPaymentCollapsedList";
import { mockClientPayments } from "./data/clientPaymentsData";

export function ClientPaymentsWidget() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [clientForDetails, setClientForDetails] = useState<{id: string, name: string} | null>(null);

  const totalDue = mockClientPayments.reduce((acc, payment) => acc + payment.remainingAmount, 0);
  const urgentDue = mockClientPayments.filter(payment => {
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
    navigate("/finance/client-payments");
  };

  const handleRowClick = (payment: any) => {
    setClientForDetails({
      id: payment.id,
      name: payment.client
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
              <Users className="h-5 w-5 text-green-400" />
              Paiements Clients
            </span>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleViewAll}
                className="bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300 border-green-500/20 transition-all duration-200 hover:scale-105"
              >
                <Eye className="h-4 w-4 mr-2" />
                Voir tout
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleNewPayment}
                className="bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300 border-green-500/20 transition-all duration-200 hover:scale-105"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nouveau
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ClientPaymentSummary totalDue={totalDue} urgentDue={urgentDue} />
            
            {isExpanded ? (
              <ClientPaymentTable 
                payments={mockClientPayments} 
                handleRowClick={handleRowClick} 
                setIsExpanded={setIsExpanded} 
              />
            ) : (
              <ClientPaymentCollapsedList 
                payments={mockClientPayments} 
                handleRowClick={handleRowClick} 
                setIsExpanded={setIsExpanded} 
              />
            )}
          </div>
        </CardContent>
      </Card>

      <ClientPaymentForm
        open={showPaymentForm}
        onOpenChange={setShowPaymentForm}
      />

      <ClientPaymentDetails
        open={showPaymentDetails}
        onOpenChange={setShowPaymentDetails}
        client={clientForDetails}
      />
    </motion.div>
  );
}
