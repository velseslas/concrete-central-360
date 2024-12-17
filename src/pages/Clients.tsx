import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ClientList from "@/components/clients/ClientList";
import { ClientForm } from "@/components/clients/ClientForm";

const Clients = () => {
  const [showNewClientForm, setShowNewClientForm] = useState(false);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Clients</h1>
        <Button onClick={() => setShowNewClientForm(true)}>
          <Plus className="mr-2" />
          Nouveau Client
        </Button>
      </div>

      <ClientList />
      <ClientForm open={showNewClientForm} onOpenChange={setShowNewClientForm} />
    </div>
  );
};

export default Clients;