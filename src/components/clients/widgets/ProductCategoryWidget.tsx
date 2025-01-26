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
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenForm = () => {
    console.log("Opening category form");
    setShowNewCategoryForm(true);
  };

  const handleCloseForm = (open: boolean) => {
    console.log("Closing category form, open state:", open);
    setShowNewCategoryForm(open);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-6 w-6 text-purple-400" />
              Catégories de Produits
            </CardTitle>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Rechercher une catégorie..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-purple-500/50 focus:ring-purple-500/20"
                />
              </div>
              <Button 
                type="button"
                onClick={handleOpenForm}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 cursor-pointer shadow-lg hover:shadow-purple-500/20"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle Catégorie
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ProductCategoryList />
        </CardContent>
      </Card>

      <ProductCategoryForm 
        open={showNewCategoryForm}
        onOpenChange={handleCloseForm}
      />
    </motion.div>
  );
}