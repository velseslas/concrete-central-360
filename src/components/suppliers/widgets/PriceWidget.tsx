import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PriceForm } from "./forms/PriceForm";

export function PriceWidget() {
  const [showNewPriceForm, setShowNewPriceForm] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Prix des Produits</CardTitle>
        <Button onClick={() => setShowNewPriceForm(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nouveau prix
        </Button>
      </CardHeader>
      <CardContent>
        {/* Table des prix à implémenter */}
        <PriceForm 
          open={showNewPriceForm} 
          onOpenChange={setShowNewPriceForm}
        />
      </CardContent>
    </Card>
  );
}