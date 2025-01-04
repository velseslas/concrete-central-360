import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ProductForm } from "../ProductForm";
import { ProductList } from "./ProductList";
import { motion } from "framer-motion";

export function ProductManagementWidget() {
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [productToEdit, setProductToEdit] = useState<any>(null);

  const handleEdit = (product: any) => {
    setProductToEdit(product);
    setShowNewProductForm(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Gestion des Produits</CardTitle>
          <Button 
            onClick={() => {
              setProductToEdit(null);
              setShowNewProductForm(true);
            }}
            size="sm"
            className="bg-white/10 hover:bg-white/20 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nouveau produit
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <ProductList onEdit={handleEdit} />
          
          <ProductForm 
            open={showNewProductForm}
            onOpenChange={setShowNewProductForm}
            productToEdit={productToEdit}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}