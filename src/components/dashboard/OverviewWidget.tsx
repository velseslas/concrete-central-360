import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, ArrowDown, ArrowUp, TrendingUp } from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  trend: number;
  status: "increase" | "decrease" | "neutral";
}

const stats: StatItem[] = [
  {
    label: "Production totale",
    value: "1,250 m³",
    trend: 12.5,
    status: "increase"
  },
  {
    label: "Commandes en cours",
    value: "24",
    trend: -2.4,
    status: "decrease"
  },
  {
    label: "Chiffre d'affaires",
    value: "2,450,000 DA",
    trend: 8.2,
    status: "increase"
  },
  {
    label: "Livraisons du jour",
    value: "18",
    trend: 0,
    status: "neutral"
  }
];

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
        return "bg-emerald-500/80 text-white";
      case "decrease":
        return "bg-rose-500/80 text-white";
      default:
        return "bg-blue-500/80 text-white";
    }
  };

  const getCardColor = (index: number) => {
    const colors = [
      "from-cyan-400 to-blue-500",
      "from-emerald-400 to-teal-500",
      "from-violet-400 to-purple-500",
      "from-amber-400 to-orange-500"
    ];
    return colors[index];
  };

  return (
    <Card className="col-span-4 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-lg border border-gray-700/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Activity className="h-5 w-5 text-cyan-400" />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Aperçu Général
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className={`bg-gradient-to-br ${getCardColor(index)} border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105`}
            >
              <CardContent className="p-4">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm font-medium text-white/90">
                    {stat.label}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-white">
                      {stat.value}
                    </p>
                    <Badge 
                      variant="outline" 
                      className={`flex items-center gap-1 ${getTrendColor(stat.status)} border-0`}
                    >
                      {getTrendIcon(stat.status)}
                      {stat.trend}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}