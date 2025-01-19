import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProductCategoryList } from "./ProductCategoryList";
import { useState } from "react";
import { ProductCategoryForm } from "./ProductCategoryForm";

export function ProductCategoryWidget() {
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-xl font-bold">Catégories de Produits</CardTitle>
        <Button 
          onClick={() => setShowNewCategoryForm(true)}
          className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 border-indigo-500/20 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle Catégorie
        </Button>
      </CardHeader>
      <CardContent>
        <ProductCategoryList />
      </CardContent>

      {showNewCategoryForm && (
        <ProductCategoryForm
          open={showNewCategoryForm}
          onOpenChange={setShowNewCategoryForm}
        />
      )}
    </Card>
  );
}