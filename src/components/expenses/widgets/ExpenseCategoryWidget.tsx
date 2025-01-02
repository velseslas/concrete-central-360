import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ExpenseCategoryForm } from "./ExpenseCategoryForm";

export function ExpenseCategoryWidget() {
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Catégories</CardTitle>
        <Button onClick={() => setShowNewCategoryForm(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle catégorie
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* La liste des catégories sera ajoutée ici plus tard */}
          <p className="text-sm text-muted-foreground">Aucune catégorie pour le moment</p>
        </div>
      </CardContent>

      <ExpenseCategoryForm 
        open={showNewCategoryForm} 
        onOpenChange={setShowNewCategoryForm} 
      />
    </Card>
  );
}