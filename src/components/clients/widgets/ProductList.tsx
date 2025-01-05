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
    <div className="rounded-md border border-gray-700/50">
      <Table>
        <TableHeader className="bg-gray-900/50 backdrop-blur-xl">
          <TableRow className="border-b border-gray-700 hover:bg-gray-800/50">
            <TableHead className="text-gray-300">Nom</TableHead>
            <TableHead className="text-gray-300">Catégorie</TableHead>
            <TableHead className="text-gray-300">Description</TableHead>
            <TableHead className="text-right text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockProducts.map((product) => (
            <TableRow key={product.id} className="border-b border-gray-700/50 hover:bg-gray-800/50 backdrop-blur-xl transition-colors">
              <TableCell className="text-gray-300">{product.name}</TableCell>
              <TableCell className="text-gray-300">{getCategoryName(product.category)}</TableCell>
              <TableCell className="text-gray-300">{product.description}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onEdit(product)}
                    className="hover:bg-gray-700/50"
                  >
                    <Edit className="h-4 w-4 text-gray-300" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDelete(product.id)}
                    className="hover:bg-gray-700/50"
                  >
                    <Trash2 className="h-4 w-4 text-gray-300" />
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