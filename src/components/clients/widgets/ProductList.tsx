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
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
}

interface ProductListProps {
  onEdit: (product: Product) => void;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Béton B25",
    category: "1",
    description: "Béton standard",
  },
  {
    id: 2,
    name: "Pompe 36m",
    category: "2",
    description: "Pompe à béton",
  },
];

export function ProductList({ onEdit }: ProductListProps) {
  const handleDelete = (productId: number) => {
    console.log("Delete product:", productId);
    toast.success("Produit supprimé avec succès");
  };

  const getCategoryName = (categoryId: string) => {
    const categories = [
      { id: "1", name: "Béton" },
      { id: "2", name: "Pompe" },
      { id: "3", name: "Location" },
    ];
    return categories.find(cat => cat.id === categoryId)?.name || categoryId;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{getCategoryName(product.category)}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onEdit(product)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}