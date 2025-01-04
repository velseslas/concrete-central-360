import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export function PriceWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
        <CardHeader>
          <CardTitle>Prix</CardTitle>
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
              <h3 className="text-lg font-semibold mb-2">Historique des prix</h3>
              <p className="text-gray-400">Suivi des changements de prix dans le temps</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}