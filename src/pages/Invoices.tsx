import { useState } from "react";
import { motion } from "framer-motion";
import FacturationWidget from "@/components/invoices/FacturationWidget";

interface Invoice {
  id: string;
  number: string;
  client: string;
  amount: number;
  status: "pending" | "paid" | "overdue";
  date: string;
  paymentMethod: "cash" | "bank_transfer" | "check";
}

const Invoices = () => {
  const [invoices] = useState<Invoice[]>([
    {
      id: "1",
      number: "FAC001",
      client: "Client A",
      amount: 15000,
      status: "paid",
      date: "2024-03-20",
      paymentMethod: "bank_transfer",
    },
    {
      id: "2",
      number: "FAC002",
      client: "Client B",
      amount: 22500,
      status: "pending",
      date: "2024-03-21",
      paymentMethod: "check",
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FacturationWidget invoices={invoices} />
        </motion.div>
      </div>
    </div>
  );
};

export default Invoices;