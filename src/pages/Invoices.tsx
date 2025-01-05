import { motion } from "framer-motion";
import FacturationWidget from "@/components/invoices/FacturationWidget";

const mockInvoices = [
  {
    id: "1",
    number: "FAC001",
    client: "Client A",
    amount: 150000,
    status: "paid" as const,
    date: "2024-03-20",
    paymentMethod: "bank_transfer" as const
  },
  {
    id: "2",
    number: "FAC002",
    client: "Client B",
    amount: 225000,
    status: "pending" as const,
    date: "2024-03-21",
    paymentMethod: "check" as const
  },
  {
    id: "3",
    number: "FAC003",
    client: "Client C",
    amount: 180000,
    status: "overdue" as const,
    date: "2024-03-22",
    paymentMethod: "cash" as const
  }
];

const Invoices = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6"
      >
        <FacturationWidget invoices={mockInvoices} />
      </motion.div>
    </div>
  );
};

export default Invoices;