import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface InvoiceStatsCardProps {
  icon: LucideIcon;
  title: string;
  amount: number;
  subtitle: string;
  iconColor: string;
  onClick?: () => void;
  isHighlighted?: boolean;
}

export function InvoiceStatsCard({
  icon: Icon,
  title,
  amount,
  subtitle,
  iconColor,
  onClick,
  isHighlighted = false,
}: InvoiceStatsCardProps) {
  return (
    <div 
      className={`p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 min-w-[160px] flex-1 ${onClick ? 'cursor-pointer hover:bg-gray-700/50' : ''} ${
        isHighlighted ? 'shadow-[0_0_15px_rgba(239,68,68,0.3)]' : ''
      }`}
      onClick={onClick}
    >
      <h3 className="font-semibold mb-2 text-gray-300 flex items-center gap-2 text-lg">
        <Icon className={`h-5 w-5 ${iconColor}`} />
        {title}
      </h3>
      <p className={`text-base font-bold ${isHighlighted ? 'text-red-400 animate-[pulse_1.5s_ease-in-out_infinite]' : 'text-white'}`}>
        {amount.toLocaleString()} DA
      </p>
      <p className="text-sm text-gray-400">{subtitle}</p>
    </div>
  );
}