import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface ProductCategory {
  id: number;
  name: string;
  description: string;
}

const mockCategories: ProductCategory[] = [
  {
    id: 1,
    name: "Béton",
    description: "Différents types de béton",
  },
  {
    id: 2,
    name: "Pompe",
    description: "Services de pompage",
  },
  {
    id: 3,
    name: "Location",
    description: "Services de location d'équipement",
  },
];

export function ProductCategoryList() {
  const handleEdit = (category: ProductCategory) => {
    console.log("Edit category:", category);
  };

  const handleDelete = (categoryId: number) => {
    console.log("Delete category:", categoryId);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Nom</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockCategories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
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
    </div>
  );
}