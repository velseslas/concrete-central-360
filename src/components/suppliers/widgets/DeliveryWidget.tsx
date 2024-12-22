import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DeliveryForm } from "./forms/DeliveryForm";

export function DeliveryWidget() {
  const [showNewDeliveryForm, setShowNewDeliveryForm] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Livraisons</CardTitle>
        <Button onClick={() => setShowNewDeliveryForm(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle livraison
        </Button>
      </CardHeader>
      <CardContent>
        {/* Table des livraisons à implémenter */}
        <DeliveryForm 
          open={showNewDeliveryForm} 
          onOpenChange={setShowNewDeliveryForm}
        />
      </CardContent>
    </Card>
  );
}