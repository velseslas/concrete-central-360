import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Plus, Search } from "lucide-react";
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
      className="group"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-400" />
              Catégories de Produits
            </CardTitle>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Rechercher une catégorie..." 
                  className="pl-9 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400"
                />
              </div>
              <Button 
                onClick={() => setShowNewCategoryForm(true)}
                variant="outline" 
                size="sm" 
                className="text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle Catégorie
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: "CAT-001", name: "Béton", count: "12 produits", date: "15/03/2024" },
              { id: "CAT-002", name: "Agrégats", count: "8 produits", date: "14/03/2024" },
              { id: "CAT-003", name: "Adjuvants", count: "5 produits", date: "13/03/2024" },
              { id: "CAT-004", name: "Ciment", count: "3 produits", date: "12/03/2024" },
              { id: "CAT-005", name: "Additifs", count: "7 produits", date: "11/03/2024" },
            ].map((category) => (
              <div
                key={category.id}
                className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-white font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-400" />
                      {category.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{category.id}</p>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                    <div className="text-right">
                      <p className="text-white font-medium">{category.count}</p>
                      <p className="text-gray-400 text-sm">{category.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ProductCategoryForm 
        open={showNewCategoryForm}
        onOpenChange={setShowNewCategoryForm}
      />
    </motion.div>
  );
}