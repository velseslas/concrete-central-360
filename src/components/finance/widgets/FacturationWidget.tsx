import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Receipt } from "lucide-react";
import { CashFlowWidget } from "../CashFlowWidget";
import { ExpensesWidget } from "../ExpensesWidget";
import { TransactionsWidget } from "../TransactionsWidget";
import { FinanceStats } from "../FinanceStats";

export function FacturationWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Receipt className="h-6 w-6 text-blue-400" />
            Facturation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <FinanceStats />
            <CashFlowWidget />
            <ExpensesWidget />
            <TransactionsWidget />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}