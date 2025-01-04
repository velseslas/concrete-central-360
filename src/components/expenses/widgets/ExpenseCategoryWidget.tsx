import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { ExpenseCategoryForm } from "./ExpenseCategoryForm";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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

const expenseTypes = [
  { id: "general", label: "Dépenses Générales" },
  { id: "mechanical", label: "Parc Mécanique" },
  { id: "concrete", label: "Centrale à Béton" }
];

export function ExpenseCategoryWidget() {
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [categories, setCategories] = useState<ExpenseCategory[]>(mockCategories);
  const [editingCategory, setEditingCategory] = useState<ExpenseCategory | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedType, setSelectedType] = useState("");

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

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim() || !selectedType) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    const newCategory = {
      id: Math.random().toString(36).substr(2, 9),
      name: newCategoryName,
      type: selectedType
    };

    setCategories(prev => [...prev, newCategory]);
    setNewCategoryName("");
    setSelectedType("");
    toast.success("Catégorie créée avec succès");
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
    <Card className="backdrop-blur-lg bg-white/10 border-white/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium text-white">Catégories</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateCategory} className="mb-6 space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Nom de la catégorie"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Sélectionner le type de dépense" />
              </SelectTrigger>
              <SelectContent>
                {expenseTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            type="submit"
            className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
          >
            Ajouter la catégorie
          </Button>
        </form>

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
                  <div className="flex items-center justify-between p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
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
        onSubmit={handleUpdateCategory}
        initialData={editingCategory}
      />
    </Card>
  );
}