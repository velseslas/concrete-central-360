import { motion } from "framer-motion";
import { InvoiceWidget } from "@/components/invoices/InvoiceWidget";
import { FacturationWidget } from "@/components/invoices/FacturationWidget";
import { BillingListWidget } from "@/components/finance/widgets/BillingListWidget";
import { PaymentTrackingWidget } from "@/components/finance/widgets/PaymentTrackingWidget";

const Invoices = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <InvoiceWidget />
        <PaymentTrackingWidget />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="grid grid-cols-1 gap-6"
      >
        <FacturationWidget />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="grid grid-cols-1 gap-6"
      >
        <BillingListWidget />
      </motion.div>
    </div>
  );
};

export default Invoices;