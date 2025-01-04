import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export function PaymentWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
        <CardHeader>
          <CardTitle>Paiements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-700/50">
                <h3 className="text-lg font-semibold mb-2">Paiements en attente</h3>
                <p className="text-2xl font-bold text-yellow-400">3</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-700/50">
                <h3 className="text-lg font-semibold mb-2">Total payé</h3>
                <p className="text-2xl font-bold text-green-400">15 000 DA</p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Derniers paiements</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-3 rounded-lg bg-gray-700/30 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">Facture #{2024001 + index}</p>
                      <p className="text-sm text-gray-400">12/03/2024</p>
                    </div>
                    <span className="text-green-400 font-semibold">5 000 DA</span>
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