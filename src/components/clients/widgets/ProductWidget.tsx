import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { ProductClientForm } from "./forms/ProductClientForm";
import { ProductList } from "./ProductList";
import { motion } from "framer-motion";

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
    >
      <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-400" />
            Produits Client
          </CardTitle>
          <Button 
            onClick={() => {
              setProductToEdit(null);
              setShowNewProductForm(true);
            }}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg transition-all duration-200 hover:shadow-blue-500/25"
            size="sm"
          >
            <Package className="mr-2 h-4 w-4" />
            Nouveau produit
          </Button>
        </CardHeader>
        <CardContent>
          <ProductList onEdit={handleEdit} />
          
          <ProductClientForm 
            open={showNewProductForm}
            onOpenChange={setShowNewProductForm}
            productToEdit={productToEdit}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}