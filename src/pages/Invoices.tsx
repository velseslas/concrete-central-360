import { motion, AnimatePresence } from "framer-motion";
import FacturationWidget from "@/components/invoices/FacturationWidget";
import { useState } from "react";
import { ChevronDown, FileText } from "lucide-react";
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

  return (
    <div className="container mx-auto p-6">
      <Card 
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700 shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-300"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-400" />
              <CardTitle className="text-white">Gestion des Factures</CardTitle>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-white">
                <span className="text-gray-400 mr-2">Total:</span>
                {totalAmount.toLocaleString()} DA
              </div>
              <ChevronDown 
                className={`h-6 w-6 text-blue-400 transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
                }`} 
              />
            </div>
          </div>
        </CardHeader>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="pt-0">
                <FacturationWidget invoices={mockInvoices} />
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
};

export default Invoices;