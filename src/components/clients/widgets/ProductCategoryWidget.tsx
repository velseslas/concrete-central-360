import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Package } from "lucide-react";
import { ProductCategoryForm } from "./ProductCategoryForm";
import { ProductCategoryList } from "./ProductCategoryList";

export function ProductCategoryWidget() {
  const [showForm, setShowForm] = useState(false);

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
      <CardHeader className="relative z-10">
        <div className="flex justify-between items-center">
          <CardTitle className="text-white flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-400" />
            Catégories de produits
          </CardTitle>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle catégorie
          </Button>
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <ProductCategoryList />
        <ProductCategoryForm 
          open={showForm} 
          onOpenChange={setShowForm}
        />
      </CardContent>
    </Card>
  );
}