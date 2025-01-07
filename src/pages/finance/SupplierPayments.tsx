import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Download, Filter } from "lucide-react";
import { useState } from "react";
import { PaymentForm } from "@/components/payments/PaymentForm";
import { toast } from "sonner";

export default function SupplierPayments() {
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleNewPayment = () => {
    setShowPaymentForm(true);
  };

  const handleExport = () => {
    toast.success("Export des paiements en cours...");
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold text-white">Paiements Fournisseurs</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="bg-gray-800/50 border-gray-700 hover:bg-gray-800 text-gray-200"
            onClick={() => toast.info("Filtres à venir...")}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
          <Button
            variant="outline"
            className="bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300 border-green-500/20"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleNewPayment}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Paiement
          </Button>
        </div>
      </motion.div>

      <PaymentForm
        open={showPaymentForm}
        onOpenChange={setShowPaymentForm}
      />
    </div>
  );
}