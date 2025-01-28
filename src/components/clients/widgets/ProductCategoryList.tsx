import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

// Exemple de données
const mockCategories = [
  { id: 1, name: "Béton", description: "Différents types de béton" },
  { id: 2, name: "Agrégats", description: "Matériaux de construction" },
];

export function ProductCategoryList() {
  const handleEdit = (category: any) => {
    console.log("Editing category:", category);
    toast.info("Fonctionnalité à venir");
  };

  const handleDelete = (categoryId: number) => {
    console.log("Deleting category:", categoryId);
    toast.success("Catégorie supprimée");
  };

  return (
    <div className="rounded-md border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700/50">
            <TableHead className="text-gray-300">Nom</TableHead>
            <TableHead className="text-gray-300">Description</TableHead>
            <TableHead className="text-right text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockCategories.map((category) => (
            <TableRow key={category.id} className="border-gray-700/50">
              <TableCell className="font-medium text-gray-200">{category.name}</TableCell>
              <TableCell className="text-gray-300">{category.description}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(category)}
                  className="hover:bg-gray-700/50 text-gray-300 hover:text-gray-200"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(category.id)}
                  className="hover:bg-gray-700/50 text-gray-300 hover:text-gray-200"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}