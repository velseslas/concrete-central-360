import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, CheckCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export function ProductWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-[#f97316] to-[#8b5cf6] border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Package className="h-6 w-6" />
            Produits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Béton B25", price: "8500 DA/m³", status: "Disponible", icon: CheckCircle },
                { name: "Béton B30", price: "9000 DA/m³", status: "Disponible", icon: CheckCircle },
                { name: "Béton B35", price: "9500 DA/m³", status: "Sur commande", icon: AlertTriangle },
              ].map((product, index) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-white">{product.name}</h3>
                    <p className="text-sm text-white/80">{product.price}</p>
                    <div className="flex items-center gap-1 text-white/90">
                      <product.icon className="h-4 w-4" />
                      <span className="text-sm">{product.status}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}