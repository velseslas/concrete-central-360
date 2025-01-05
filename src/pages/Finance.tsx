import { FinanceStats } from "@/components/finance/FinanceStats";
import { BillingListWidget } from "@/components/finance/widgets/BillingListWidget";
import { PaymentTrackingWidget } from "@/components/finance/widgets/PaymentTrackingWidget";
import { BillingReportsWidget } from "@/components/finance/widgets/BillingReportsWidget";

export default function Finance() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-100">Finance</h1>
      
      <FinanceStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BillingListWidget />
        <PaymentTrackingWidget />
      </div>
      
      <BillingReportsWidget />
    </div>
  );
}