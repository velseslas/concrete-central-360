import { BillingReportsWidget } from "@/components/finance/widgets/BillingReportsWidget";

export default function Reports() {
  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Rapports Financiers</h1>
        <BillingReportsWidget />
      </div>
    </div>
  );
}