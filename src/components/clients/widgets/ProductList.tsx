
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {filteredProducts.map((product, index) => {
        const category = getCategoryName(product.category);
        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-[#101422] rounded-lg p-6 border border-[#1F2232] hover:border-[#7C3AED] transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start">
                <div className="h-10 w-10 flex items-center justify-center rounded-md bg-[#1F2232] text-[#7C3AED] mr-3">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                  <Badge 
                    variant="outline" 
                    className={`mt-1 ${category.color}/20 text-${category.color.replace('bg-', '')}-400 border-${category.color.replace('bg-', '')}-500/30`}
                  >
                    {category.name}
                  </Badge>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-400 mb-4">{product.description}</p>
            
            <div className="flex justify-between items-center">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                onClick={() => handleDelete(product.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </Button>
              <Button 
                variant="ghost" 
                className="text-[#7C3AED] hover:text-[#6D28D9] hover:bg-[#7C3AED]/10"
                onClick={() => onEdit?.(product)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
