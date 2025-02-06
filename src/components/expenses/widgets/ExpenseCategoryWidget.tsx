
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, ListFilter } from "lucide-react";
import { useState } from "react";
import { ExpenseCategoryForm } from "./ExpenseCategoryForm";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface ExpenseCategory {
  id: string;
  name: string;
  type: string;
}

const mockCategories: ExpenseCategory[] = [
  { id: '1', name: 'Carburant', type: 'mechanical' },
  { id: '2', name: 'Entretien', type: 'mechanical' },
  { id: '3', name: 'Matières premières', type: 'concrete' },
  { id: '4', name: 'Fournitures', type: 'general' },
];

export function ExpenseCategoryWidget() {
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [categories, setCategories] = useState<ExpenseCategory[]>(mockCategories);
  const [editingCategory, setEditingCategory] = useState<ExpenseCategory | null>(null);

  const handleDeleteCategory = (categoryId: string) => {
    console.log("Deleting category:", categoryId);
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    toast.success("Catégorie supprimée avec succès");
  };

  const handleEditCategory = (category: ExpenseCategory) => {
    console.log("Editing category:", category);
    setEditingCategory(category);
    setShowNewCategoryForm(true);
  };

  const handleCreateCategory = (name: string, type: string) => {
    console.log("Creating new category:", { name, type });
    const newCategory = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      type
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const handleUpdateCategory = (name: string, type: string) => {
    if (!editingCategory) return;
    
    console.log("Updating category:", { id: editingCategory.id, name, type });
    setCategories(prev => prev.map(cat => 
      cat.id === editingCategory.id ? { ...cat, name, type } : cat
    ));
    setEditingCategory(null);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'general': return 'Dépenses Générales';
      case 'mechanical': return 'Parc Mécanique';
      case 'concrete': return 'Centrale à Béton';
      default: return type;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group h-full"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300 h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
            <ListFilter className="h-5 w-5 text-yellow-400" />
            Catégories
          </CardTitle>
          <Button 
            onClick={() => setShowNewCategoryForm(true)} 
            size="sm"
            className="bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle catégorie
          </Button>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-4">
            {categories.length === 0 ? (
              <p className="text-white/70">Aucune catégorie pour le moment</p>
            ) : (
              <div className="grid gap-3">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-700/30 hover:border-gray-600/50 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div>
                        <h4 className="font-medium text-white">{category.name}</h4>
                        <p className="text-sm text-white/70">
                          {getTypeLabel(category.type)}
                        </p>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditCategory(category)}
                          className="hover:bg-blue-500/20 text-blue-400 hover:text-blue-300"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCategory(category.id)}
                          className="hover:bg-red-500/20 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </CardContent>

        <ExpenseCategoryForm 
          open={showNewCategoryForm} 
          onOpenChange={setShowNewCategoryForm}
          onSubmit={editingCategory ? handleUpdateCategory : handleCreateCategory}
          initialData={editingCategory}
        />
      </Card>
    </motion.div>
  );
}
