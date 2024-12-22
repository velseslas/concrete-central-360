import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export function ProductWidget() {
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Produits</CardTitle>
        <Button onClick={() => setShowNewProductForm(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nouveau produit
        </Button>
      </CardHeader>
      <CardContent>
        {/* Table des produits à implémenter */}
      </CardContent>
    </Card>
  );
}