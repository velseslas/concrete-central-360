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
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg bg-gradient-to-br from-gray-900/50 via-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 overflow-hidden shadow-xl"
    >
      <Table>
        <TableHeader className="bg-gray-900/70 backdrop-blur-xl border-b border-gray-700">
          <TableRow>
            <TableHead className="text-gray-300 font-medium">Nom</TableHead>
            <TableHead className="text-gray-300 font-medium">Description</TableHead>
            <TableHead className="text-right text-gray-300 font-medium">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockCategories.map((category) => (
            <TableRow 
              key={category.id} 
              className="border-b border-gray-700/50 hover:bg-purple-500/10 transition-colors duration-200"
            >
              <TableCell className="text-gray-300 font-medium">{category.name}</TableCell>
              <TableCell className="text-gray-400">{category.description}</TableCell>
              <TableCell>
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleEdit(category)}
                    className="hover:bg-purple-500/20 text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDelete(category.id)}
                    className="hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}