import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Package } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
}

interface ProductListProps {
  onEdit?: (product: Product) => void;
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
      { id: "1", name: "Béton", color: "bg-blue-500" },
      { id: "2", name: "Pompe", color: "bg-green-500" },
      { id: "3", name: "Location", color: "bg-purple-500" },
    ];
    const category = categories.find(cat => cat.id === categoryId);
    return {
      name: category?.name || categoryId,
      color: category?.color || "bg-gray-500"
    };
  };

  return (
    <div className="space-y-4">
      {mockProducts.map((product, index) => {
        const category = getCategoryName(product.category);
        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-200 group"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gray-700/50">
                  <Package className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">
                    {product.name}
                  </h3>
                  <Badge 
                    variant="outline" 
                    className={`mt-1 ${category.color}/20 text-${category.color.replace('bg-', '')}-400 border-${category.color.replace('bg-', '')}-500/30`}
                  >
                    {category.name}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                <p className="text-gray-400 text-sm">{product.description}</p>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit?.(product)}
                    className="hover:bg-blue-500/10 hover:text-blue-400 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(product.id)}
                    className="hover:bg-red-500/10 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}