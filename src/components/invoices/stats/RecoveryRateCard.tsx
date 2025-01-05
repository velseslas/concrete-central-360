import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";

interface RecoveryRateCardProps {
  rate: number;
}

export function RecoveryRateCard({ rate }: RecoveryRateCardProps) {
  return (
    <div className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 min-w-[160px] flex-1">
      <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2 text-lg">
        <TrendingUp className="h-5 w-5 text-blue-400" />
        Taux de recouvrement
      </h3>
      <div className="space-y-2">
        <p className="text-base font-bold text-white">{rate.toFixed(1)}%</p>
        <Progress value={rate} className="h-2" />
      </div>
    </div>
  );
}