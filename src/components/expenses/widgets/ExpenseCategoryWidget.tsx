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
      className="group"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
        <CardContent>
          <div className="space-y-4">
            {categories.length === 0 ? (
              <p className="text-white/70">Aucune catégorie pour le moment</p>
            ) : (
              <div className="grid gap-4">
                {categories.map((category) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300">
                      <div>
                        <h4 className="font-medium text-white">{category.name}</h4>
                        <p className="text-sm text-white/70">
                          {getTypeLabel(category.type)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditCategory(category)}
                          className="text-white/70 hover:text-white hover:bg-white/10"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-white/70 hover:text-white hover:bg-white/10"
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