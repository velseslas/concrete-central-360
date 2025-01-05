import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CreditCard, DollarSign, Clock } from "lucide-react";

export function PaymentTrackingWidget() {
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
          <CardTitle className="text-white flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-blue-400" />
            Suivi des Paiements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
              <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-400" />
                Payé
              </h3>
              <p className="text-2xl font-bold text-white">1.2M DA</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
              <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-400" />
                En attente
              </h3>
              <p className="text-2xl font-bold text-white">450K DA</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
              <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-red-400" />
                En retard
              </h3>
              <p className="text-2xl font-bold text-white">180K DA</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}