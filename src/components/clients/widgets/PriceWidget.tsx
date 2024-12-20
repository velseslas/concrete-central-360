import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PriceList } from "./PriceList";
import { useState } from "react";
import { PriceForm } from "../PriceForm";

export function PriceWidget() {
  const [showNewPriceForm, setShowNewPriceForm] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Prix produits</CardTitle>
        <Button onClick={() => setShowNewPriceForm(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nouveau prix
        </Button>
      </CardHeader>
      <CardContent>
        <PriceList />
      </CardContent>

      <PriceForm 
        open={showNewPriceForm} 
        onOpenChange={setShowNewPriceForm} 
      />
    </Card>
  );
}