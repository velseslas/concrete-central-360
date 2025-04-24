import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, ArrowDown, ArrowUp, TrendingUp } from "lucide-react";
interface StatItem {
  label: string;
  value: string;
  trend: number;
  status: "increase" | "decrease" | "neutral";
}
const stats: StatItem[] = [{
  label: "Production totale",
  value: "1,250 m³",
  trend: 12.5,
  status: "increase"
}, {
  label: "Commandes en cours",
  value: "24",
  trend: -2.4,
  status: "decrease"
}, {
  label: "Chiffre d'affaires",
  value: "2,450,000 DA",
  trend: 8.2,
  status: "increase"
}, {
  label: "Taux de recouvrement",
  value: "85%",
  trend: 5.3,
  status: "increase"
}];

// ... keep existing code (getTrendIcon, getTrendColor, and getCardColor functions)

export function OverviewWidget() {
  const getTrendIcon = (status: StatItem["status"]) => {
    switch (status) {
      case "increase":
        return <ArrowUp className="h-4 w-4 text-white" />;
      case "decrease":
        return <ArrowDown className="h-4 w-4 text-white" />;
      default:
        return <TrendingUp className="h-4 w-4 text-white" />;
    }
  };
  const getTrendColor = (status: StatItem["status"]) => {
    switch (status) {
      case "increase":
        return "bg-[#0EA5E9] text-white";
      case "decrease":
        return "bg-[#8B5CF6] text-white";
      default:
        return "bg-[#D946EF] text-white";
    }
  };
  const getCardColor = (index: number) => {
    const colors = ["from-[#0EA5E9] to-[#8B5CF6]", "from-[#8B5CF6] to-[#D946EF]", "from-[#D946EF] to-[#F97316]", "from-[#F97316] to-[#0EA5E9]"];
    return colors[index];
  };
  return <Card className="col-span-4 bg-gray-800/50 backdrop-blur-lg border border-gray-700/50">
      
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => <Card key={index} className={`bg-gradient-to-br ${getCardColor(index)} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}>
              <CardContent className="p-4">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm font-medium text-white/80">
                    {stat.label}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-white">
                      {stat.value}
                    </p>
                    <Badge variant="outline" className={`flex items-center gap-1 ${getTrendColor(stat.status)} border-0`}>
                      {getTrendIcon(stat.status)}
                      {stat.trend}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </CardContent>
    </Card>;
}