import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FileText, DollarSign, Calendar, Clock, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function InvoiceWidget() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Exemple de données
  const totalInvoices = 450000;
  const currentMonthInvoices = 150000;
  const overdueInvoices = 130000;
  const totalPaid = 320000;
  const recoveryRate = (totalPaid / totalInvoices) * 100;

  const hasOverdueInvoices = overdueInvoices > 0;

  // Exemple de données pour les factures en souffrance
  const overdueInvoicesList = [
    { id: "FAC-001", client: "Client A", amount: 45000, dueDate: "2024-02-15" },
    { id: "FAC-002", client: "Client B", amount: 35000, dueDate: "2024-02-10" },
    { id: "FAC-003", client: "Client C", amount: 28000, dueDate: "2024-02-05" },
    { id: "FAC-004", client: "Client D", amount: 22000, dueDate: "2024-01-30" },
  ];

  return (
    <>
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
            <div className="flex flex-nowrap overflow-x-auto gap-4 pb-2">
              <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 min-w-[200px] flex-1">
                <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-400" />
                  Total facturé
                </h3>
                <p className="text-2xl font-bold text-white">{totalInvoices.toLocaleString()} DA</p>
                <p className="text-sm text-gray-400">15 factures au total</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 min-w-[200px] flex-1">
                <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-yellow-400" />
                  Factures du mois
                </h3>
                <p className="text-2xl font-bold text-white">{currentMonthInvoices.toLocaleString()} DA</p>
                <p className="text-sm text-gray-400">5 factures ce mois</p>
              </div>
              <div 
                className={`p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 min-w-[200px] flex-1 ${hasOverdueInvoices ? 'shadow-[0_0_15px_rgba(239,68,68,0.3)] cursor-pointer' : ''}`}
                onClick={() => hasOverdueInvoices && setIsOpen(true)}
              >
                <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2">
                  <Clock className={`h-5 w-5 text-red-400 ${hasOverdueInvoices ? 'animate-[pulse_1.5s_ease-in-out_infinite]' : ''}`} />
                  Factures en souffrance
                </h3>
                <p className={`text-2xl font-bold ${hasOverdueInvoices ? 'text-red-400 animate-[pulse_1.5s_ease-in-out_infinite]' : 'text-white'}`}>
                  {overdueInvoices.toLocaleString()} DA
                </p>
                <p className="text-sm text-gray-400">4 factures impayées</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 min-w-[200px] flex-1">
                <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-400" />
                  Paiements reçus
                </h3>
                <p className="text-2xl font-bold text-white">{totalPaid.toLocaleString()} DA</p>
                <p className="text-sm text-gray-400">9 paiements effectués</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 min-w-[200px] flex-1">
                <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                  Taux de recouvrement
                </h3>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-white">{recoveryRate.toFixed(1)}%</p>
                  <Progress value={recoveryRate} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="w-full sm:w-[540px] bg-gray-900 border-gray-800 text-white">
          <SheetHeader>
            <SheetTitle className="text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-red-400" />
              Factures en souffrance
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-8rem)] mt-6">
            <div className="space-y-4">
              {overdueInvoicesList.map((invoice) => (
                <div 
                  key={invoice.id}
                  className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-white">{invoice.client}</h4>
                      <p className="text-sm text-gray-400">Facture #{invoice.id}</p>
                    </div>
                    <p className="text-lg font-bold text-red-400">{invoice.amount.toLocaleString()} DA</p>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <p className="text-gray-400">Échéance :</p>
                    <p className="text-red-300">{new Date(invoice.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}