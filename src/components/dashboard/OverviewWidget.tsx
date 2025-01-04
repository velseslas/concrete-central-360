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
        return <ArrowUp className="h-4 w-4 text-emerald-500" />;
      case "decrease":
        return <ArrowDown className="h-4 w-4 text-rose-500" />;
      default:
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
    }
  };

  const getTrendColor = (status: StatItem["status"]) => {
    switch (status) {
      case "increase":
        return "text-emerald-500 bg-emerald-50 border-emerald-200";
      case "decrease":
        return "text-rose-500 bg-rose-50 border-rose-200";
      default:
        return "text-blue-500 bg-blue-50 border-blue-200";
    }
  };

  const getCardColor = (index: number) => {
    const colors = [
      "from-violet-500/10 to-violet-400/5",
      "from-blue-500/10 to-blue-400/5",
      "from-emerald-500/10 to-emerald-400/5",
      "from-amber-500/10 to-amber-400/5"
    ];
    return colors[index];
  };

  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Activity className="h-5 w-5 text-indigo-500" />
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Aperçu Général
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className={`bg-gradient-to-br ${getCardColor(index)} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}>
              <CardContent className="p-4">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <Badge 
                      variant="outline" 
                      className={`flex items-center gap-1 ${getTrendColor(stat.status)} border`}
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