import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ProductCategoryForm } from "./ProductCategoryForm";
import { ProductCategoryList } from "./ProductCategoryList";
import { motion } from "framer-motion";

export function ProductCategoryWidget() {
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-[#1E40AF] to-[#7E22CE] border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium text-white">Catégories de Produits</CardTitle>
          <Button 
            onClick={() => setShowNewCategoryForm(true)}
            size="sm"
            className="bg-white/10 hover:bg-white/20 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle catégorie
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <ProductCategoryList />
          
          <ProductCategoryForm 
            open={showNewCategoryForm}
            onOpenChange={setShowNewCategoryForm}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}