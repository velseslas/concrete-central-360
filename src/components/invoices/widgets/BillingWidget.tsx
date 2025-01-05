import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FileText, Factory } from "lucide-react";
import { ProductionWidget } from "@/components/clients/widgets/ProductionWidget";
import { BillingListWidget } from "@/components/finance/widgets/BillingListWidget";
import { BillingReportsWidget } from "@/components/finance/widgets/BillingReportsWidget";

export function BillingWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-6">
        {/* Section Facturation */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50" />
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-400" />
              Gestion de la Facturation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Widget Liste des Factures */}
            <BillingListWidget />

            {/* Widget Rapports de Facturation */}
            <BillingReportsWidget />

            {/* Widget Production */}
            <div className="mt-6">
              <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50" />
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Factory className="h-6 w-6 text-blue-400" />
                    Production
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ProductionWidget clientId={1} />
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}