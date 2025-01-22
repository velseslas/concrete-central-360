import { DailyProductionCard } from "./DailyProductionCard";
import { InProgressCard } from "./InProgressCard";
import { PendingCard } from "./PendingCard";
import { CancelledCard } from "./CancelledCard";
import { CompletionRateCard } from "./CompletionRateCard";
import { motion } from "framer-motion";

interface ProductionStatsProps {
  dailyProduction: number;
  yesterdayProduction: number;
  inProgressProduction: number;
  pendingProduction: number;
  cancelledProduction: number;
  yesterdayCancelled: number;
  totalProduction: number;
  dailyProductionList: any[];
  inProgressProductionList: any[];
  pendingProductionList: any[];
  cancelledProductionList: any[];
  onDailyClick: () => void;
  onInProgressClick: () => void;
  onPendingClick: () => void;
  onCancelledClick: () => void;
}

export function ProductionStats({
  dailyProduction,
  yesterdayProduction,
  inProgressProduction,
  pendingProduction,
  cancelledProduction,
  yesterdayCancelled,
  totalProduction,
  dailyProductionList,
  inProgressProductionList,
  pendingProductionList,
  cancelledProductionList,
  onDailyClick,
  onInProgressClick,
  onPendingClick,
  onCancelledClick,
}: ProductionStatsProps) {
  const productionChange = ((dailyProduction - yesterdayProduction) / yesterdayProduction) * 100;
  const cancelledChange = ((cancelledProduction - yesterdayCancelled) / yesterdayCancelled) * 100;
  const completionRate = (dailyProduction / totalProduction) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
    >
      <DailyProductionCard
        dailyProduction={dailyProduction}
        productionChange={productionChange}
        productionCount={dailyProductionList.length}
        onClick={onDailyClick}
      />
      <InProgressCard
        inProgressProduction={inProgressProduction}
        productionCount={inProgressProductionList.length}
        onClick={onInProgressClick}
      />
      <PendingCard
        pendingProduction={pendingProduction}
        productionCount={pendingProductionList.length}
        onClick={onPendingClick}
      />
      <CancelledCard
        cancelledProduction={cancelledProduction}
        cancelledChange={cancelledChange}
        productionCount={cancelledProductionList.length}
        onClick={onCancelledClick}
      />
      <CompletionRateCard completionRate={completionRate} />
    </motion.div>
  );
}