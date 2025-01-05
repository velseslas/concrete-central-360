import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

export function FacturationWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white flex items-center gap-2">
              <ShoppingCart className="h-6 w-6 text-blue-400" />
              Gestion des commandes
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-blue-400" />
                  Total commandes
                </h3>
                <p className="text-2xl font-bold text-white">1,250</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-yellow-400" />
                  En cours
                </h3>
                <p className="text-2xl font-bold text-white">350</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-green-400" />
                  Complétées
                </h3>
                <p className="text-2xl font-bold text-white">900</p>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
              <div className="p-4">
                <h3 className="font-semibold text-gray-300 mb-4">Dernières commandes</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((_, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 rounded-lg bg-gray-900/50 hover:bg-gray-700/50 border border-gray-700/50 transition-colors cursor-pointer group/item"
                    >
                      <div className="flex items-center gap-3">
                        <ShoppingCart className="h-5 w-5 text-blue-400 group-hover/item:text-blue-300" />
                        <div>
                          <p className="text-gray-200 font-medium">Commande #{2024001 + index}</p>
                          <p className="text-sm text-gray-400">Client {index + 1}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-200 font-medium">150,000 DA</p>
                        <p className="text-sm text-gray-400">20/03/2024</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}