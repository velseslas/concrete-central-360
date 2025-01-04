import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export function ProductWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-amber-800">Produits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Béton B25", price: "8500 DA/m³", stock: "Disponible" },
                { name: "Béton B30", price: "9000 DA/m³", stock: "Disponible" },
                { name: "Béton B35", price: "9500 DA/m³", stock: "Sur commande" },
              ].map((product, index) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-white/50 border border-amber-100"
                >
                  <h3 className="font-semibold text-amber-900">{product.name}</h3>
                  <p className="text-sm text-amber-700">{product.price}</p>
                  <p className="text-sm text-amber-700">{product.stock}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}