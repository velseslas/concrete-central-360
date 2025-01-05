import { motion, AnimatePresence } from "framer-motion";
import FacturationWidget from "@/components/invoices/FacturationWidget";
import { useState } from "react";
import { FileText, DollarSign, CreditCard, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  const [isExpanded, setIsExpanded] = useState(false);

  const totalAmount = mockInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = mockInvoices
    .filter((invoice) => invoice.status === "pending")
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidAmount = mockInvoices
    .filter((invoice) => invoice.status === "paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Factures
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                  <h3 className="font-semibold mb-2 text-white flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Total Facturé
                  </h3>
                  <p className="text-2xl font-bold text-white">{totalAmount.toLocaleString()} DA</p>
                </div>
                <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                  <h3 className="font-semibold mb-2 text-white flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    En Attente
                  </h3>
                  <p className="text-2xl font-bold text-white">{pendingAmount.toLocaleString()} DA</p>
                </div>
                <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                  <h3 className="font-semibold mb-2 text-white flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payé
                  </h3>
                  <p className="text-2xl font-bold text-white">{paidAmount.toLocaleString()} DA</p>
                </div>
              </div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FacturationWidget invoices={mockInvoices} />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex justify-center">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-white hover:text-blue-200 transition-colors duration-200 flex items-center gap-2"
                >
                  {isExpanded ? "Voir moins" : "Voir plus"}
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FileText className="h-4 w-4" />
                  </motion.div>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Invoices;