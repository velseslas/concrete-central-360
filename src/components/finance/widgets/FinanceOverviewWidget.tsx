import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, ArrowUpDown, PiggyBank } from "lucide-react";

export function FinanceOverviewWidget() {
  const stats = [
    {
      title: "Chiffre d'Affaires",
      value: "2.4M DA",
      change: "+12%",
      icon: TrendingUp,
      color: "text-emerald-500"
    },
    {
      title: "Trésorerie",
      value: "850K DA",
      change: "+5%",
      icon: DollarSign,
      color: "text-blue-500"
    },
    {
      title: "Flux de Trésorerie",
      value: "+300K DA",
      change: "+8%",
      icon: ArrowUpDown,
      color: "text-purple-500"
    },
    {
      title: "Épargne",
      value: "450K DA",
      change: "+15%",
      icon: PiggyBank,
      color: "text-amber-500"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
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
    </motion.div>
  );
}