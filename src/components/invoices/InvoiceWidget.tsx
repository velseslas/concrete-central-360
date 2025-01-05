import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export function InvoiceWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Factures
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <h3 className="font-semibold mb-2 text-white flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Factures en attente
                </h3>
                <p className="text-2xl font-bold text-white">15</p>
              </div>
              <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <h3 className="font-semibold mb-2 text-white flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Factures payées
                </h3>
                <p className="text-2xl font-bold text-white">45</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="font-semibold text-white mb-4">Dernières factures</h3>
              <div className="space-y-2">
                {[1, 2, 3].map((_, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <span className="text-white">Facture #{2024001 + index}</span>
                    <span className="text-white">150,000 DA</span>
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