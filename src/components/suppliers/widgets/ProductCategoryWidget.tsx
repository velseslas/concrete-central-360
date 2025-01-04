import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { ProductCategoryForm } from "./forms/ProductCategoryForm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

// Données mockées pour la démonstration
const mockCategories = [
  {
    id: 1,
    name: "Ciment",
    description: "Tous types de ciment"
  },
  {
    id: 2,
    name: "Gravier",
    description: "Différentes tailles de gravier"
  },
  {
    id: 3,
    name: "Sable",
    description: "Sable de construction"
  }
];

export function ProductCategoryWidget() {
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<any>(null);

  const handleEdit = (category: any) => {
    setCategoryToEdit(category);
    setShowNewCategoryForm(true);
  };

  const handleDelete = (categoryId: number) => {
    console.log("Deleting category:", categoryId);
    toast.success("Catégorie supprimée");
  };

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(category)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ProductCategoryForm 
          open={showNewCategoryForm} 
          onOpenChange={setShowNewCategoryForm}
          categoryToEdit={categoryToEdit}
        />
      </CardContent>
    </Card>
  );
}