import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Package } from "lucide-react";
import { ProductCategoryForm } from "./forms/ProductCategoryForm";
import { ProductCategoryList } from "./ProductCategoryList";
import { motion } from "framer-motion";

export function ProductCategoryWidget() {
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<any>(null);

  const handleEdit = (category: any) => {
    setCategoryToEdit(category);
    setShowNewCategoryForm(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800/30 shadow-xl backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50" />
        <CardHeader className="relative z-10">
          <div className="flex justify-between items-center">
            <CardTitle className="text-white flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-400" />
              Catégories de produits
            </CardTitle>
            <Button 
              onClick={() => setShowNewCategoryForm(true)}
              className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-600 hover:to-purple-600 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle catégorie
            </Button>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <ProductCategoryList onEdit={handleEdit} />
          <ProductCategoryForm 
            open={showNewCategoryForm} 
            onOpenChange={setShowNewCategoryForm}
            categoryToEdit={categoryToEdit}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}