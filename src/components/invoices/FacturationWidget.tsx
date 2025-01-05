import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Receipt } from "lucide-react";
import { CashFlowWidget } from "@/components/finance/CashFlowWidget";
import { ExpensesWidget } from "@/components/finance/ExpensesWidget";
import { TransactionsWidget } from "@/components/finance/TransactionsWidget";
import { FinanceStats } from "@/components/finance/FinanceStats";

export function FacturationWidget() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="group cursor-pointer"
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Receipt className="h-6 w-6 text-blue-400" />
                Facturation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Cliquez pour voir tous les détails financiers</p>
            </CardContent>
          </Card>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="max-w-5xl h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Receipt className="h-6 w-6 text-blue-400" />
            Détails de Facturation
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 p-4">
          <div className="grid grid-cols-1 gap-6">
            <FinanceStats />
            <CashFlowWidget />
            <ExpensesWidget />
            <TransactionsWidget />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}