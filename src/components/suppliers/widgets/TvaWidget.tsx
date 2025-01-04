import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export const TvaWidget = () => {
  const [tvaRate, setTvaRate] = useState("20");

  const handleSave = () => {
    console.log("Saving TVA rate:", tvaRate);
    toast.success("Taux de TVA mis à jour");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Taux de TVA (%)</Label>
          <Input
            type="number"
            value={tvaRate}
            onChange={(e) => setTvaRate(e.target.value)}
            className="bg-gray-800/50 border-gray-700"
          />
        </div>
        <Button 
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500"
        >
          Enregistrer
        </Button>
      </div>
    </motion.div>
  );
};