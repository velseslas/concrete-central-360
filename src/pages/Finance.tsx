import { motion } from "framer-motion";
import { PaymentStatsWidget } from "@/components/payments/widgets/PaymentStatsWidget";
import { PaymentOverviewWidget } from "@/components/payments/widgets/PaymentOverviewWidget";
import { PaymentHistoryWidget } from "@/components/payments/widgets/PaymentHistoryWidget";
import { PaymentReportsWidget } from "@/components/payments/widgets/PaymentReportsWidget";

export default function Finance() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold text-white">Finance</h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PaymentStatsWidget />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PaymentOverviewWidget />
        </div>
        <div className="space-y-6">
          <PaymentHistoryWidget />
          <PaymentReportsWidget />
        </div>
      </div>
    </div>
  );
}