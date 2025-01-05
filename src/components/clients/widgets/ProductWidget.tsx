import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ProductForm } from "../ProductForm";
import { ProductList } from "./ProductList";

export function ProductWidget() {
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
      className="group"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-white flex items-center gap-2">
              <Package className="h-6 w-6 text-blue-400" />
              Liste des Produits
            </CardTitle>
            <Button 
              onClick={() => {
                setProductToEdit(null);
                setShowNewProductForm(true);
              }}
              variant="outline"
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white border-gray-700"
            >
              Ajouter un produit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ProductList onEdit={handleEdit} />
        </CardContent>
      </Card>

      <ProductForm 
        open={showNewProductForm}
        onOpenChange={setShowNewProductForm}
        productToEdit={productToEdit}
      />
    </motion.div>
  );
}