import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { DollarSign, Calendar, Clock } from "lucide-react";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { useState } from "react";
import { InvoiceSheetTitle } from "./sheets/InvoiceSheetTitle";
import { InvoiceSheetContent } from "./sheets/InvoiceSheetContent";
import { InvoiceStatsCard } from "./stats/InvoiceStatsCard";
import { RecoveryRateCard } from "./stats/RecoveryRateCard";

export function InvoiceWidget() {
  const [isOverdueOpen, setIsOverdueOpen] = useState(false);
  const [isTotalOpen, setIsTotalOpen] = useState(false);
  const [isMonthlyOpen, setIsMonthlyOpen] = useState(false);
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false);
  
  // Exemple de données
  const totalInvoices = 450000;
  const currentMonthInvoices = 150000;
  const overdueInvoices = 130000;
  const totalPaid = 320000;
  const recoveryRate = (totalPaid / totalInvoices) * 100;

  const hasOverdueInvoices = overdueInvoices > 0;

  const allInvoices = [
    { id: "FAC-001", client: "Client A", amount: 85000, date: "2024-02-20" },
    { id: "FAC-002", client: "Client B", amount: 65000, date: "2024-02-18" },
    { id: "FAC-003", client: "Client C", amount: 78000, date: "2024-02-15" },
    { id: "FAC-004", client: "Client D", amount: 92000, date: "2024-02-10" },
  ];

  const monthlyInvoices = [
    { id: "FAC-005", client: "Client E", amount: 45000, date: "2024-02-05" },
    { id: "FAC-006", client: "Client F", amount: 35000, date: "2024-02-03" },
    { id: "FAC-007", client: "Client G", amount: 70000, date: "2024-02-01" },
  ];

  const payments = [
    { id: "PAY-001", client: "Client A", amount: 85000, date: "2024-02-19" },
    { id: "PAY-002", client: "Client B", amount: 65000, date: "2024-02-17" },
    { id: "PAY-003", client: "Client C", amount: 78000, date: "2024-02-14" },
    { id: "PAY-004", client: "Client D", amount: 92000, date: "2024-02-09" },
  ];

  const overdueInvoicesList = [
    { id: "FAC-001", client: "Client A", amount: 45000, date: "2024-02-15", dueDate: "2024-02-15" },
    { id: "FAC-002", client: "Client B", amount: 35000, date: "2024-02-10", dueDate: "2024-02-10" },
    { id: "FAC-003", client: "Client C", amount: 28000, date: "2024-02-05", dueDate: "2024-02-05" },
    { id: "FAC-004", client: "Client D", amount: 22000, date: "2024-01-30", dueDate: "2024-01-30" },
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
          <CardHeader className="py-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-white flex items-center gap-2 text-xl font-bold">
                Facturation
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="py-2">
            <div className="flex flex-nowrap overflow-x-auto gap-3 pb-2">
              <InvoiceStatsCard
                icon={DollarSign}
                title="Total facturé"
                amount={totalInvoices}
                subtitle="15 factures au total"
                iconColor="text-green-400"
                onClick={() => setIsTotalOpen(true)}
              />
              <InvoiceStatsCard
                icon={Calendar}
                title="Factures du mois"
                amount={currentMonthInvoices}
                subtitle="5 factures ce mois"
                iconColor="text-yellow-400"
                onClick={() => setIsMonthlyOpen(true)}
              />
              <InvoiceStatsCard
                icon={Clock}
                title="Factures en souffrance"
                amount={overdueInvoices}
                subtitle="4 factures impayées"
                iconColor={hasOverdueInvoices ? "text-red-400" : "text-gray-400"}
                onClick={() => hasOverdueInvoices && setIsOverdueOpen(true)}
                isHighlighted={hasOverdueInvoices}
              />
              <InvoiceStatsCard
                icon={DollarSign}
                title="Paiements reçus"
                amount={totalPaid}
                subtitle="9 paiements effectués"
                iconColor="text-green-400"
                onClick={() => setIsPaymentsOpen(true)}
              />
              <RecoveryRateCard rate={recoveryRate} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Sheet pour le total des factures */}
      <Sheet open={isTotalOpen} onOpenChange={setIsTotalOpen}>
        <SheetContent side="right" className="w-full sm:w-[540px] bg-gray-900 border-gray-800 text-white">
          <SheetHeader>
            <InvoiceSheetTitle 
              icon={DollarSign}
              title="Total des factures"
              iconColor="text-green-400"
            />
          </SheetHeader>
          <InvoiceSheetContent items={allInvoices} type="invoice" />
        </SheetContent>
      </Sheet>

      {/* Sheet pour les factures du mois */}
      <Sheet open={isMonthlyOpen} onOpenChange={setIsMonthlyOpen}>
        <SheetContent side="right" className="w-full sm:w-[540px] bg-gray-900 border-gray-800 text-white">
          <SheetHeader>
            <InvoiceSheetTitle 
              icon={Calendar}
              title="Factures du mois"
              iconColor="text-yellow-400"
            />
          </SheetHeader>
          <InvoiceSheetContent items={monthlyInvoices} type="invoice" />
        </SheetContent>
      </Sheet>

      {/* Sheet pour les factures en souffrance */}
      <Sheet open={isOverdueOpen} onOpenChange={setIsOverdueOpen}>
        <SheetContent side="right" className="w-full sm:w-[540px] bg-gray-900 border-gray-800 text-white">
          <SheetHeader>
            <InvoiceSheetTitle 
              icon={Clock}
              title="Factures en souffrance"
              iconColor="text-red-400"
            />
          </SheetHeader>
          <InvoiceSheetContent items={overdueInvoicesList} type="overdue" />
        </SheetContent>
      </Sheet>

      {/* Sheet pour les paiements reçus */}
      <Sheet open={isPaymentsOpen} onOpenChange={setIsPaymentsOpen}>
        <SheetContent side="right" className="w-full sm:w-[540px] bg-gray-900 border-gray-800 text-white">
          <SheetHeader>
            <InvoiceSheetTitle 
              icon={DollarSign}
              title="Paiements reçus"
              iconColor="text-green-400"
            />
          </SheetHeader>
          <InvoiceSheetContent items={payments} type="payment" />
        </SheetContent>
      </Sheet>
    </>
  );
}
