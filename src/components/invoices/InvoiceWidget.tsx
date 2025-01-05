import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FileText, DollarSign, Calendar } from "lucide-react";

export function InvoiceWidget() {
  // Exemple de données
  const totalInvoices = 450000;
  const currentMonthInvoices = 150000;

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
              <FileText className="h-6 w-6 text-blue-400" />
              Aperçu des Factures
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-400" />
                  Total facturé
                </h3>
                <p className="text-2xl font-bold text-white">{totalInvoices.toLocaleString()} DA</p>
                <p className="text-sm text-gray-400">15 factures au total</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-yellow-400" />
                  Factures du mois
                </h3>
                <p className="text-2xl font-bold text-white">{currentMonthInvoices.toLocaleString()} DA</p>
                <p className="text-sm text-gray-400">5 factures ce mois</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}