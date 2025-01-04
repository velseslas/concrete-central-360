import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Package, TruckDelivery } from "lucide-react";
import { motion } from "framer-motion";

export function OrderWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-[#8b5cf6] to-[#d946ef] border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            Commandes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <h3 className="font-semibold mb-2 text-white flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Commandes en cours
                </h3>
                <p className="text-2xl font-bold text-white">8</p>
              </div>
              <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <h3 className="font-semibold mb-2 text-white flex items-center gap-2">
                  <TruckDelivery className="h-5 w-5" />
                  En livraison
                </h3>
                <p className="text-2xl font-bold text-white">3</p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-white mb-3">Dernières commandes</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-white">Commande #{2024010 + index}</p>
                        <p className="text-sm text-white/80">Béton B25 - 30m³</p>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs bg-white/20 text-white border border-white/30">
                        En cours
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}