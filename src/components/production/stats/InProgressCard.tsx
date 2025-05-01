import { Package } from "lucide-react";

interface InProgressCardProps {
  inProgressProduction: number;
  productionCount: number;
  onClick: () => void;
}

export function InProgressCard({
  inProgressProduction,
  productionCount,
  onClick
}: InProgressCardProps) {
  return (
    <div 
      className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 min-w-[160px] flex-1 cursor-pointer hover:bg-gray-700/50"
      onClick={onClick}
    >
      <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2 text-lg">
        <Package className="h-5 w-5 text-yellow-400" />
        En cours
      </h3>
      <p className="text-base font-bold text-white">{inProgressProduction} m³</p>
      <p className="text-sm text-gray-400">{productionCount} productions</p>
    </div>
  );
}