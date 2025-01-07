import { motion } from "framer-motion";
import { PaymentOverviewWidget } from "@/components/payments/widgets/PaymentOverviewWidget";
import { ClientPaymentsWidget } from "@/components/payments/widgets/ClientPaymentsWidget";
import { SupplierPaymentsWidget } from "@/components/payments/widgets/SupplierPaymentsWidget";
import { PaymentStatsWidget } from "@/components/payments/widgets/PaymentStatsWidget";
import { PaymentHistoryWidget } from "@/components/payments/widgets/PaymentHistoryWidget";
import { PaymentReportsWidget } from "@/components/payments/widgets/PaymentReportsWidget";

export default function Payments() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-white"
      >
        Gestion des Paiements
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PaymentStatsWidget />
        <PaymentOverviewWidget />
        <PaymentHistoryWidget />
        <ClientPaymentsWidget />
        <SupplierPaymentsWidget />
        <PaymentReportsWidget />
      </div>
    </div>
  );
}