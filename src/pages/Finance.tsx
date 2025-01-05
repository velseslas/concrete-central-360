import { FinanceStats } from "@/components/finance/FinanceStats";
import { TransactionsWidget } from "@/components/finance/TransactionsWidget";
import { CashFlowWidget } from "@/components/finance/CashFlowWidget";
import { ExpensesWidget } from "@/components/finance/ExpensesWidget";
import { PaymentWidget } from "@/components/finance/PaymentWidget";

export default function Finance() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-100">Finance</h1>
      
      <FinanceStats />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TransactionsWidget />
        <CashFlowWidget />
      </div>
      
      <PaymentWidget />
      
      <ExpensesWidget />
    </div>
  );
}