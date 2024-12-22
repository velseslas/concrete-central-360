import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ProductCategoryForm } from "./forms/ProductCategoryForm";

export function ProductCategoryWidget() {
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Catégories de Produits</CardTitle>
        <Button onClick={() => setShowNewCategoryForm(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle catégorie
        </Button>
      </CardHeader>
      <CardContent>
        {/* Table will be implemented later */}
        <ProductCategoryForm 
          open={showNewCategoryForm} 
          onOpenChange={setShowNewCategoryForm}
        />
      </CardContent>
    </Card>
  );
}