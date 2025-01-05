import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

export function FacturationWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-slate-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-slate-100 flex items-center gap-2 text-lg font-medium">
            <ShoppingCart className="h-5 w-5 text-blue-400" />
            Commandes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400">
            Gestion de commandes
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}