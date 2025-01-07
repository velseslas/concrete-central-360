import { motion } from "framer-motion";
import { BillingListWidget } from "@/components/finance/widgets/BillingListWidget";
import { BillingReportsWidget } from "@/components/finance/widgets/BillingReportsWidget";
import { BillingStatsWidget } from "@/components/finance/widgets/BillingStatsWidget";
import { BillingChartWidget } from "@/components/finance/widgets/BillingChartWidget";
import { BillingPaymentsWidget } from "@/components/finance/widgets/BillingPaymentsWidget";

export default function Billing() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-white mb-6">Gestion de la Facturation</h1>
        
        {/* Stats Overview */}
        <div className="mb-6">
          <BillingStatsWidget />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Liste des factures */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <BillingListWidget />
          </motion.div>

          {/* Graphique d'évolution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <BillingChartWidget />
          </motion.div>

          {/* Suivi des paiements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <BillingPaymentsWidget />
          </motion.div>

          {/* Rapports */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <BillingReportsWidget />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}