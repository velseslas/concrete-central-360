import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ProductForm } from "../ProductForm";
import { ProductList } from "./ProductList";
import { PriceList } from "./PriceList";

export function ProductWidget() {
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  const handleEdit = (product: any) => {
    setShowNewProductForm(true);
  };

  const handlePriceEdit = (price: any) => {
    console.log("Editing price:", price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card className="bg-gradient-to-br from-[#f97316] to-[#8b5cf6] border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Package className="h-6 w-6" />
            Produits
          </CardTitle>
          <Button 
            onClick={() => setShowNewProductForm(true)}
            variant="secondary"
            className="bg-white/10 hover:bg-white/20 text-white"
          >
            Ajouter un produit
          </Button>
        </CardHeader>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Liste des Produits</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductList onEdit={handleEdit} />
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Liste des Prix</CardTitle>
        </CardHeader>
        <CardContent>
          <PriceList onEdit={handlePriceEdit} />
        </CardContent>
      </Card>

      <ProductForm 
        open={showNewProductForm}
        onOpenChange={setShowNewProductForm}
      />
    </motion.div>
  );
}