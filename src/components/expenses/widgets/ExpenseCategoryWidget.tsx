import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export function ExpenseCategoryWidget() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Maintenance", type: "Centrale à Béton" },
    { id: 2, name: "Carburant", type: "Parc Roulant" },
    { id: 3, name: "Pièces", type: "Parc Roulant" },
  ]);

  const handleDelete = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
    toast.success("Catégorie supprimée avec succès");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Catégories de Dépenses</h2>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-blue-500/20 text-blue-400"
          onClick={() => toast.info("Ajout de catégorie")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle catégorie
        </Button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between p-4 rounded-xl bg-gray-700/30 border border-gray-600 hover:bg-gray-700/50 transition-all duration-300"
            >
              <div>
                <h3 className="font-medium text-white">{category.name}</h3>
                <p className="text-sm text-gray-400">{category.type}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-blue-500/20 text-blue-400"
                  onClick={() => toast.info("Modification de catégorie")}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-red-500/20 text-red-400"
                  onClick={() => handleDelete(category.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}