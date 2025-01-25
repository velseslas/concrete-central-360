import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-white flex items-center gap-2">Prix</CardTitle>
          <Button 
            onClick={handleOpenPriceForm}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un prix
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg">
              <PriceList onEdit={handlePriceEdit} />
            </div>
          </div>
        </CardContent>
      </Card>

      <PriceForm 
        open={showPriceForm} 
        onOpenChange={setShowPriceForm}
      />
    </motion.div>
  );
}