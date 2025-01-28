import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface Category {
  id: number;
  name: string;
  description: string;
}

interface ProductCategoryListProps {
  onEdit: (category: Category) => void;
}

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

export function ProductCategoryList({ onEdit }: ProductCategoryListProps) {
  const handleDelete = (categoryId: number) => {
    console.log("Deleting category:", categoryId);
    toast.success("Catégorie supprimée");
  };

  return (
    <div className="space-y-4">
      {mockCategories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="group p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/30 hover:border-gray-600/50 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h4 className="font-medium text-gray-100 group-hover:text-white transition-colors">{category.name}</h4>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{category.description}</p>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(category)}
                className="hover:bg-blue-500/20 text-blue-400 hover:text-blue-300"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(category.id)}
                className="hover:bg-red-500/20 text-red-400 hover:text-red-300"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}