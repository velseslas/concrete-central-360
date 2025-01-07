import { motion } from "framer-motion";
import { FinanceOverviewWidget } from "@/components/finance/widgets/FinanceOverviewWidget";
import { BillingReportsWidget } from "@/components/finance/widgets/BillingReportsWidget";
import { PaymentTrackingWidget } from "@/components/finance/widgets/PaymentTrackingWidget";
import { DailyExpenseWidget } from "@/components/finance/widgets/DailyExpenseWidget";
import { TransactionsWidget } from "@/components/finance/TransactionsWidget";
import { CashFlowWidget } from "@/components/finance/CashFlowWidget";
import { ExpensesWidget } from "@/components/finance/ExpensesWidget";

export default function Finance() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Finance
        </h1>
      </motion.div>

      <div className="space-y-8">
        {/* Vue d'ensemble */}
        <FinanceOverviewWidget />

        {/* Graphiques principaux */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CashFlowWidget />
          <ExpensesWidget />
        </div>

        {/* Widgets de gestion */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PaymentTrackingWidget />
          </div>
          <div className="space-y-6">
            <BillingReportsWidget />
          </div>
        </div>

        {/* Transactions et dépenses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TransactionsWidget />
          <DailyExpenseWidget />
        </div>
      </div>
    </div>
  );
}