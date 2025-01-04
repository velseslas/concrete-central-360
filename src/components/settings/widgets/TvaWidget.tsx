import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Percent } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export const TvaWidget = () => {
  const [tvaRate, setTvaRate] = useState("20");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating TVA rate:", tvaRate);
    toast.success("Taux de TVA mis à jour");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Percent className="h-6 w-6 text-blue-400" />
              <CardTitle className="text-white">TVA</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="tva-rate" className="text-sm text-gray-300">
                Taux de TVA (%)
              </label>
              <Input
                id="tva-rate"
                type="number"
                value={tvaRate}
                onChange={(e) => setTvaRate(e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-gray-100"
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
            >
              Mettre à jour
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};