import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { useState } from "react";
import { ProductionSheetTitle } from "./sheets/ProductionSheetTitle";
import { ProductionSheetContent } from "./sheets/ProductionSheetContent";
import { ProductionStats } from "./stats/ProductionStats";
import { Calendar, Package, Clock, FileX } from "lucide-react";

export function ProductionWidget() {
  const [isDailyOpen, setIsDailyOpen] = useState(false);
  const [isInProgressOpen, setIsInProgressOpen] = useState(false);
  const [isPendingOpen, setIsPendingOpen] = useState(false);
  const [isCancelledOpen, setIsCancelledOpen] = useState(false);
  
  // Exemple de données
  const totalProduction = 450;
  const dailyProduction = 150;
  const yesterdayProduction = 180;
  const inProgressProduction = 130;
  const pendingProduction = 100;
  const cancelledProduction = 70;
  const yesterdayCancelled = 50;

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
          <CardHeader className="py-3" />
          <CardContent className="py-2">
            <ProductionStats
              dailyProduction={dailyProduction}
              yesterdayProduction={yesterdayProduction}
              inProgressProduction={inProgressProduction}
              pendingProduction={pendingProduction}
              cancelledProduction={cancelledProduction}
              yesterdayCancelled={yesterdayCancelled}
              totalProduction={totalProduction}
              dailyProductionList={dailyProductionList}
              inProgressProductionList={inProgressProductionList}
              pendingProductionList={pendingProductionList}
              cancelledProductionList={cancelledProductionList}
              onDailyClick={() => setIsDailyOpen(true)}
              onInProgressClick={() => setIsInProgressOpen(true)}
              onPendingClick={() => setIsPendingOpen(true)}
              onCancelledClick={() => setIsCancelledOpen(true)}
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Sheets */}
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