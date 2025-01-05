import { motion } from "framer-motion";
import { InvoiceWidget } from "@/components/invoices/InvoiceWidget";
import { BillingListWidget } from "@/components/finance/widgets/BillingListWidget";
import { DailyExpenseWidget } from "@/components/finance/widgets/DailyExpenseWidget";
import { GlobalExpenseWidget } from "@/components/finance/widgets/GlobalExpenseWidget";

const Invoices = () => {
  return (
    <div className="container mx-auto p-4 lg:p-6 xl:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-8"
      >
        {/* Section principale avec les statistiques */}
        <div className="grid grid-cols-1 gap-8">
          <InvoiceWidget />
        </div>

        {/* Liste des factures */}
        <div className="grid grid-cols-1 gap-8">
          <BillingListWidget />
        </div>

        {/* Dépenses Globales */}
        <div className="grid grid-cols-1 gap-8">
          <GlobalExpenseWidget />
        </div>

        {/* Dépenses du jour */}
        <div className="grid grid-cols-1 gap-8">
          <DailyExpenseWidget />
        </div>
      </motion.div>
    </div>
  );
};

export default Invoices;