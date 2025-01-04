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
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case "decrease":
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      default:
        return <TrendingUp className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (status: StatItem["status"]) => {
    switch (status) {
      case "increase":
        return "text-green-500";
      case "decrease":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Aperçu Général
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <Badge 
                      variant="outline" 
                      className={`flex items-center gap-1 ${getTrendColor(stat.status)}`}
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