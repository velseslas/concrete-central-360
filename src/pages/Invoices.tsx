import { motion } from "framer-motion";
import { InvoiceWidget } from "@/components/invoices/InvoiceWidget";
import { BillingListWidget } from "@/components/finance/widgets/BillingListWidget";

const Invoices = () => {
  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Section principale avec les statistiques */}
        <div className="grid grid-cols-1 gap-6">
          <InvoiceWidget />
        </div>

        {/* Liste des factures */}
        <div className="grid grid-cols-1 gap-6">
          <BillingListWidget />
        </div>
      </motion.div>
    </div>
  );
};

export default Invoices;