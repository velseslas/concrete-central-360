import { motion } from "framer-motion";
import { InvoiceWidget } from "@/components/invoices/InvoiceWidget";
import { FacturationWidget } from "@/components/invoices/FacturationWidget";
import { BillingListWidget } from "@/components/finance/widgets/BillingListWidget";
import { PaymentTrackingWidget } from "@/components/finance/widgets/PaymentTrackingWidget";

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <InvoiceWidget />
          </div>
          <div>
            <PaymentTrackingWidget />
          </div>
        </div>

        {/* Section des factures */}
        <div className="grid grid-cols-1 gap-6">
          <BillingListWidget />
        </div>

        {/* Section des statistiques détaillées */}
        <div className="grid grid-cols-1 gap-6">
          <FacturationWidget />
        </div>
      </motion.div>
    </div>
  );
};

export default Invoices;