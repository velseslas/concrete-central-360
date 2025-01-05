import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";

export function FinanceStats() {
  const stats = [
    {
      title: "Revenu Total",
      value: "2.4M DA",
      change: "+23%",
      icon: DollarSign,
      color: "text-green-500"
    },
    {
      title: "Dépenses",
      value: "850K DA",
      change: "+12%",
      icon: TrendingDown,
      color: "text-red-500"
    },
    {
      title: "Bénéfice Net",
      value: "1.55M DA",
      change: "+18%",
      icon: TrendingUp,
      color: "text-blue-500"
    },
    {
      title: "Trésorerie",
      value: "750K DA",
      change: "+5%",
      icon: PiggyBank,
      color: "text-yellow-500"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow bg-gray-800/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-100">{stat.value}</div>
              <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change} depuis le mois dernier
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}