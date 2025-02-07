
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Package, TrendingUp, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export function ConcreteExpenseStatsWidget() {
  const stats = [
    {
      title: "Dépenses Matériaux",
      value: "850,000 DA",
      change: "+15%",
      icon: Building2,
      color: "text-orange-400",
      trend: "up"
    },
    {
      title: "Consommation",
      value: "2,500 T",
      change: "+3%",
      icon: Package,
      color: "text-blue-400",
      trend: "up"
    },
    {
      title: "Coût Moyen",
      value: "340 DA/T",
      change: "-2%",
      icon: TrendingUp,
      color: "text-green-400",
      trend: "down"
    },
    {
      title: "Budget Mensuel",
      value: "950,000 DA",
      change: "+5%",
      icon: BarChart3,
      color: "text-purple-400",
      trend: "up"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-[#1A1F2C] via-gray-900 to-[#1A1F2C] border-[#9b87f5]/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-[#9b87f5]/10 to-[#7E69AB]/10 opacity-50" />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 bg-${stat.color}/20 rounded-full`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="mt-4">
                  <span className={`text-sm ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-400 ml-2">vs mois dernier</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
