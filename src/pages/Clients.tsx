import { ClientListWidget } from "@/components/clients/widgets/ClientListWidget";
import { ProductionWidget } from "@/components/production/ProductionWidget";

export default function Clients() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <ClientListWidget />
      <ProductionWidget clientId={0} /> {/* Le clientId sera à gérer dynamiquement selon le client sélectionné */}
    </div>
  );
}