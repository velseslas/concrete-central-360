import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BillingListWidget() {
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
              Liste des Factures
            </CardTitle>
            <Button variant="outline" size="sm" className="text-white">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Facture
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-white font-medium">Facture #{2024001 + index}</h3>
                    <p className="text-gray-400 text-sm">Client {index + 1}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">150,000 DA</p>
                    <p className="text-gray-400 text-sm">20/03/2024</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}