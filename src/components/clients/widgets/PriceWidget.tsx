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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Prix</CardTitle>
          <Button onClick={() => setShowPriceForm(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un prix
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-700/50">
                <h3 className="text-lg font-semibold mb-2">Prix standard</h3>
                <p className="text-gray-400">Liste des prix standards pour tous les clients</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-700/50">
                <h3 className="text-lg font-semibold mb-2">Prix spéciaux</h3>
                <p className="text-gray-400">Prix personnalisés pour certains clients</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gray-700/50">
              <h3 className="text-lg font-semibold mb-2">Liste des Prix</h3>
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