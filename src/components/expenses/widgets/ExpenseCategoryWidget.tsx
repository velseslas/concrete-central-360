import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
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

  const handleUpdateCategory = (name: string, type: string) => {
    if (editingCategory) {
      setCategories(prev => prev.map(cat => 
        cat.id === editingCategory.id ? { ...cat, name, type } : cat
      ));
      toast.success("Catégorie modifiée avec succès");
    } else {
      const newCategory = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        type
      };
      setCategories(prev => [...prev, newCategory]);
      toast.success("Catégorie créée avec succès");
    }
    setEditingCategory(null);
    setShowNewCategoryForm(false);
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Catégories de Dépenses</CardTitle>
        <Button onClick={() => setShowNewCategoryForm(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle catégorie
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.length === 0 ? (
            <p className="text-muted-foreground">Aucune catégorie pour le moment</p>
          ) : (
            <div className="grid gap-4">
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                    <div>
                      <h4 className="font-medium">{category.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {getTypeLabel(category.type)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditCategory(category)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCategory(category.id)}
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

        <ExpenseCategoryForm 
          open={showNewCategoryForm} 
          onOpenChange={setShowNewCategoryForm}
          onSubmit={handleUpdateCategory}
          initialData={editingCategory}
        />
      </CardContent>
    </Card>
  );
}