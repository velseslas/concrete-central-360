import { Calendar, TrendingUp, TrendingDown } from "lucide-react";

interface DailyProductionCardProps {
  dailyProduction: number;
  productionChange: number;
  productionCount: number;
  onClick: () => void;
}

export function DailyProductionCard({
  dailyProduction,
  productionChange,
  productionCount,
  onClick
}: DailyProductionCardProps) {
  return (
    <div 
      className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 min-w-[160px] flex-1 cursor-pointer hover:bg-gray-700/50"
      onClick={onClick}
    >
      <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2 text-lg">
        <Calendar className="h-5 w-5 text-green-400" />
        Production du jour
      </h3>
      <p className="text-base font-bold text-white">{dailyProduction} m³</p>
      <div className="flex items-center gap-2 mt-1">
        {productionChange > 0 ? (
          <TrendingUp className="h-4 w-4 text-green-400" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-400" />
        )}
        <p className={`text-sm ${productionChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {Math.abs(productionChange).toFixed(1)}% vs hier
        </p>
      </div>
      <p className="text-sm text-gray-400 mt-1">{productionCount} productions</p>
    </div>
  );
}