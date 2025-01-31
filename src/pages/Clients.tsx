import { ClientListWidget } from "@/components/clients/widgets/ClientListWidget";
import { ProjectWidget } from "@/components/clients/widgets/ProjectWidget";
import { PaymentWidget } from "@/components/clients/widgets/PaymentWidget";
import { ProductionWidget } from "@/components/clients/widgets/ProductionWidget";
import { ReportsWidget } from "@/components/clients/widgets/ReportsWidget";

export default function Clients() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <ClientListWidget />
        <ReportsWidget />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProjectWidget />
          <PaymentWidget />
        </div>
        <ProductionWidget />
      </div>
    </div>
  );
}