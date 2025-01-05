import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import { motion } from "framer-motion";
import { ProductList } from "./ProductList";

export function ProductWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-800 shadow-xl">
        <CardHeader className="border-b border-gray-800">
          <CardTitle className="text-gray-100 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Liste des Produits</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
            <ProductList />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}