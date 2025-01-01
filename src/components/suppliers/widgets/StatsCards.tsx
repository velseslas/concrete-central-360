import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, TrendingUp, Truck } from "lucide-react";

export function StatsCards() {
  const stats = [
    {
      title: "Total Fournisseurs",
      value: "24",
      change: "+12%",
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Produits Actifs",
      value: "145",
      change: "+8%",
      icon: Package,
      color: "text-green-500"
    },
    {
      title: "Chiffre d'Affaires",
      value: "2.4M DA",
      change: "+23%",
      icon: TrendingUp,
      color: "text-yellow-500"
    },
    {
      title: "Livraisons en Cours",
      value: "12",
      change: "+2",
      icon: Truck,
      color: "text-purple-500"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
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