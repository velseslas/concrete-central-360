import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FileText, DollarSign, AlertCircle, CheckCircle } from "lucide-react";

export function BillingStatsWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Facturé</p>
              <p className="text-2xl font-bold text-white mt-1">450,000 DA</p>
              <p className="text-sm text-gray-400 mt-1">15 factures</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-full">
              <FileText className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Paiements Reçus</p>
              <p className="text-2xl font-bold text-white mt-1">320,000 DA</p>
              <p className="text-sm text-gray-400 mt-1">10 paiements</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">En Retard</p>
              <p className="text-2xl font-bold text-white mt-1">130,000 DA</p>
              <p className="text-sm text-gray-400 mt-1">5 factures</p>
            </div>
            <div className="bg-red-500/20 p-3 rounded-full">
              <AlertCircle className="h-6 w-6 text-red-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Taux de Recouvrement</p>
              <p className="text-2xl font-bold text-white mt-1">71%</p>
              <p className="text-sm text-gray-400 mt-1">Ce mois</p>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-purple-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}