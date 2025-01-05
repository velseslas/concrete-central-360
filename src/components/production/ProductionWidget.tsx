import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Package, Clock, FileCheck, FileX, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { useState } from "react";
import { ProductionSheetTitle } from "./sheets/ProductionSheetTitle";
import { ProductionSheetContent } from "./sheets/ProductionSheetContent";

export function ProductionWidget() {
  const [isDailyOpen, setIsDailyOpen] = useState(false);
  const [isInProgressOpen, setIsInProgressOpen] = useState(false);
  const [isPendingOpen, setIsPendingOpen] = useState(false);
  const [isCancelledOpen, setIsCancelledOpen] = useState(false);
  
  // Exemple de données
  const totalProduction = 450;
  const dailyProduction = 150;
  const inProgressProduction = 130;
  const pendingProduction = 100;
  const cancelledProduction = 70;
  const completionRate = (dailyProduction / totalProduction) * 100;

  // Données pour les productions
  const dailyProductionList = [
    { id: "PRD-001", client: "Client A", formulation: "B25", volume: 85, date: "2024-03-20" },
    { id: "PRD-002", client: "Client B", formulation: "B30", volume: 65, date: "2024-03-20" },
    { id: "PRD-003", client: "Client C", formulation: "B25", volume: 78, date: "2024-03-20" },
  ];

  const inProgressProductionList = [
    { id: "PRD-004", client: "Client D", formulation: "B40", volume: 92, date: "2024-03-20" },
    { id: "PRD-005", client: "Client E", formulation: "B25", volume: 45, date: "2024-03-20" },
  ];

  const pendingProductionList = [
    { id: "PRD-006", client: "Client F", formulation: "B30", volume: 35, date: "2024-03-20" },
    { id: "PRD-007", client: "Client G", formulation: "B25", volume: 70, date: "2024-03-20" },
  ];

  const cancelledProductionList = [
    { id: "PRD-008", client: "Client H", formulation: "B40", volume: 28, date: "2024-03-20" },
    { id: "PRD-009", client: "Client I", formulation: "B30", volume: 42, date: "2024-03-20" },
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
            </div>
          </CardHeader>
          <CardContent className="py-2">
            <div className="flex flex-nowrap overflow-x-auto gap-3 pb-2">
              <div 
                className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 min-w-[160px] flex-1 cursor-pointer hover:bg-gray-700/50"
                onClick={() => setIsDailyOpen(true)}
              >
                <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5 text-green-400" />
                  Production du jour
                </h3>
                <p className="text-base font-bold text-white">{dailyProduction} m³</p>
                <p className="text-sm text-gray-400">{dailyProductionList.length} productions</p>
              </div>
              <div 
                className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 min-w-[160px] flex-1 cursor-pointer hover:bg-gray-700/50"
                onClick={() => setIsInProgressOpen(true)}
              >
                <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2 text-lg">
                  <Package className="h-5 w-5 text-yellow-400" />
                  En cours
                </h3>
                <p className="text-base font-bold text-white">{inProgressProduction} m³</p>
                <p className="text-sm text-gray-400">{inProgressProductionList.length} productions</p>
              </div>
              <div 
                className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 min-w-[160px] flex-1 cursor-pointer hover:bg-gray-700/50"
                onClick={() => setIsPendingOpen(true)}
              >
                <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-blue-400" />
                  En attente
                </h3>
                <p className="text-base font-bold text-white">{pendingProduction} m³</p>
                <p className="text-sm text-gray-400">{pendingProductionList.length} productions</p>
              </div>
              <div 
                className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 min-w-[160px] flex-1 cursor-pointer hover:bg-gray-700/50"
                onClick={() => setIsCancelledOpen(true)}
              >
                <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2 text-lg">
                  <FileX className="h-5 w-5 text-red-400" />
                  Annulées
                </h3>
                <p className="text-base font-bold text-white">{cancelledProduction} m³</p>
                <p className="text-sm text-gray-400">{cancelledProductionList.length} productions</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 min-w-[160px] flex-1">
                <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2 text-lg">
                  <FileCheck className="h-5 w-5 text-blue-400" />
                  Taux de réalisation
                </h3>
                <div className="space-y-2">
                  <p className="text-base font-bold text-white">{completionRate.toFixed(1)}%</p>
                  <Progress value={completionRate} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Sheet pour la production du jour */}
      <Sheet open={isDailyOpen} onOpenChange={setIsDailyOpen}>
        <SheetContent side="right" className="w-full sm:w-[540px] bg-gray-900 border-gray-800 text-white">
          <SheetHeader>
            <ProductionSheetTitle 
              icon={Calendar}
              title="Production du jour"
              iconColor="text-green-400"
            />
          </SheetHeader>
          <ProductionSheetContent items={dailyProductionList} />
        </SheetContent>
      </Sheet>

      {/* Sheet pour les productions en cours */}
      <Sheet open={isInProgressOpen} onOpenChange={setIsInProgressOpen}>
        <SheetContent side="right" className="w-full sm:w-[540px] bg-gray-900 border-gray-800 text-white">
          <SheetHeader>
            <ProductionSheetTitle 
              icon={Package}
              title="Productions en cours"
              iconColor="text-yellow-400"
            />
          </SheetHeader>
          <ProductionSheetContent items={inProgressProductionList} />
        </SheetContent>
      </Sheet>

      {/* Sheet pour les productions en attente */}
      <Sheet open={isPendingOpen} onOpenChange={setIsPendingOpen}>
        <SheetContent side="right" className="w-full sm:w-[540px] bg-gray-900 border-gray-800 text-white">
          <SheetHeader>
            <ProductionSheetTitle 
              icon={Clock}
              title="Productions en attente"
              iconColor="text-blue-400"
            />
          </SheetHeader>
          <ProductionSheetContent items={pendingProductionList} />
        </SheetContent>
      </Sheet>

      {/* Sheet pour les productions annulées */}
      <Sheet open={isCancelledOpen} onOpenChange={setIsCancelledOpen}>
        <SheetContent side="right" className="w-full sm:w-[540px] bg-gray-900 border-gray-800 text-white">
          <SheetHeader>
            <ProductionSheetTitle 
              icon={FileX}
              title="Productions annulées" 
              iconColor="text-red-400"
            />
          </SheetHeader>
          <ProductionSheetContent items={cancelledProductionList} />
        </SheetContent>
      </Sheet>
    </>
  );
}