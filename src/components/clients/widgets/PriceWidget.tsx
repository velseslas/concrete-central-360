
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, FileText } from "lucide-react";
import { useState } from "react";
import { PriceForm } from "../PriceForm";
import { PriceList } from "./PriceList";

export function PriceWidget() {
  const [showPriceForm, setShowPriceForm] = useState(false);

  const handlePriceEdit = (price: any) => {
    console.log("Editing price:", price);
  };

  const handleOpenPriceForm = () => {
    console.log("Opening price form");
    setShowPriceForm(true);
  };

  const handleClosePriceForm = (open: boolean) => {
    console.log("Closing price form, open state:", open);
    setShowPriceForm(open);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Prix des produits</h2>
          <Button 
            onClick={handleOpenPriceForm}
            className="bg-violet-600 hover:bg-violet-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouveau prix
          </Button>
        </div>
        
        <PriceList onEdit={handlePriceEdit} />
      </div>

      <PriceForm 
        open={showPriceForm} 
        onOpenChange={handleClosePriceForm}
      />
    </motion.div>
  );
}
