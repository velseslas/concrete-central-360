import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Wallet, History } from "lucide-react";
import { motion } from "framer-motion";

export function PaymentWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-[#ec4899] to-[#8b5cf6] border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CreditCard className="h-6 w-6" />
            Paiements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <h3 className="text-lg font-semibold mb-2 text-white flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Paiements en attente
                </h3>
                <p className="text-2xl font-bold text-white">3</p>
              </div>
              <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <h3 className="text-lg font-semibold mb-2 text-white flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Total payé
                </h3>
                <p className="text-2xl font-bold text-white">15 000 DA</p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 text-white">Derniers paiements</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-white">Facture #{2024001 + index}</p>
                      <p className="text-sm text-white/80">12/03/2024</p>
                    </div>
                    <span className="text-white font-semibold">5 000 DA</span>
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