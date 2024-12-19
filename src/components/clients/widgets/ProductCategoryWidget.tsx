import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProductCategoryList } from "./ProductCategoryList";

interface ProductCategoryWidgetProps {
  onNewCategory: () => void;
}

export function ProductCategoryWidget({ onNewCategory }: ProductCategoryWidgetProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Catégories de produits</CardTitle>
        <Button onClick={onNewCategory} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle catégorie
        </Button>
      </CardHeader>
      <CardContent>
        <ProductCategoryList />
      </CardContent>
    </Card>
  );
}