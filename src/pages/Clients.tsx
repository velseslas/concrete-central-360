import { ClientListWidget } from "@/components/clients/ClientListWidget";
import { ProductionWidget } from "@/components/production/ProductionWidget";

export default function Clients() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <ClientListWidget />
      <ProductionWidget />
    </div>
  );
}