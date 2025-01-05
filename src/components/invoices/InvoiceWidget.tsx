import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FileText, DollarSign, Clock, AlertTriangle } from "lucide-react";

export function InvoiceWidget() {
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
                  Factures du mois
                </h3>
                <p className="text-2xl font-bold text-white">450,000 DA</p>
                <p className="text-sm text-gray-400">15 factures</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-400" />
                  En attente
                </h3>
                <p className="text-2xl font-bold text-white">180,000 DA</p>
                <p className="text-sm text-gray-400">6 factures</p>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 p-4">
              <h3 className="font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                Factures urgentes
              </h3>
              <div className="space-y-3">
                {[
                  { id: "F2024-089", client: "SARL Construct", montant: "85,000 DA", echeance: "5 jours" },
                  { id: "F2024-092", client: "ETS Batiment", montant: "120,000 DA", echeance: "3 jours" },
                ].map((facture) => (
                  <div
                    key={facture.id}
                    className="flex justify-between items-center p-3 rounded-lg bg-gray-900/50 hover:bg-gray-700/50 border border-gray-700/50 transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="text-gray-200 font-medium">{facture.id}</p>
                      <p className="text-sm text-gray-400">{facture.client}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-200 font-medium">{facture.montant}</p>
                      <p className="text-sm text-red-400">Échéance: {facture.echeance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}