import { useState } from "react";
import { ClientList } from "@/components/clients/ClientList";
import { ClientForm } from "@/components/clients/ClientForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BusinessTypeWidget } from "@/components/clients/widgets/BusinessTypeWidget";
import { ProductWidget } from "@/components/clients/widgets/ProductWidget";
import { DocumentsWidget } from "@/components/clients/widgets/DocumentsWidget";
import { AdminDocumentsWidget } from "@/components/clients/widgets/AdminDocumentsWidget";
import { ReportsWidget } from "@/components/clients/widgets/ReportsWidget";
import { OrderWidget } from "@/components/clients/widgets/OrderWidget";
import { PaymentWidget } from "@/components/finance/PaymentWidget";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const Clients = () => {
  const [showClientForm, setShowClientForm] = useState(false);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Gestion des Clients</CardTitle>
            <Button onClick={() => setShowClientForm(true)} size="sm" className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200">
              <Plus className="mr-2 h-4 w-4" />
              Nouveau Client
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ClientList />
        </CardContent>
        <CardFooter>
          <Button onClick={() => setShowClientForm(true)} size="sm" className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un Client
          </Button>
        </CardFooter>
      </Card>

      {showClientForm && (
        <ClientForm onClose={() => setShowClientForm(false)} />
      )}

      <BusinessTypeWidget />
      <ProductWidget />
      <DocumentsWidget />
      <AdminDocumentsWidget />
      <ReportsWidget />
      <OrderWidget />
      <PaymentWidget />
    </div>
  );
};

export default Clients;
