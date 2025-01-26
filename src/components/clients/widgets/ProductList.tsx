import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
}

interface ProductListProps {
  onEdit?: (product: Product) => void;
  searchQuery?: string;
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

export function ProductList({ onEdit, searchQuery = "" }: ProductListProps) {
  const handleDelete = (productId: number) => {
    console.log("Delete product:", productId);
  };

  const getCategoryName = (categoryId: string) => {
    const categories = [
      { id: "1", name: "Béton", color: "bg-purple-500" },
      { id: "2", name: "Pompe", color: "bg-blue-500" },
      { id: "3", name: "Location", color: "bg-indigo-500" },
    ];
    const category = categories.find(cat => cat.id === categoryId);
    return {
      name: category?.name || categoryId,
      color: category?.color || "bg-gray-500"
    };
  };

  const filteredProducts = mockProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    getCategoryName(product.category).name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredProducts.map((product, index) => {
        const category = getCategoryName(product.category);
        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-4 rounded-lg bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border border-gray-700/50 backdrop-blur-xl hover:bg-gray-800/50 transition-all duration-300 group shadow-lg hover:shadow-purple-500/10"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20">
                  <Package className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium group-hover:text-purple-400 transition-colors">
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
                    className="hover:bg-purple-500/20 text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(product.id)}
                    className="hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
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