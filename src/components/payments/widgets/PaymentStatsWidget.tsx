import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Users, Building2, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    title: "Total Paiements",
    value: "1,234,567 DA",
    change: "+12.5%",
    icon: DollarSign,
    color: "text-blue-500",
    trend: "up"
  },
  {
    title: "Paiements Clients",
    value: "856,432 DA",
    change: "+8.2%",
    icon: Users,
    color: "text-green-500",
    trend: "up"
  },
  {
    title: "Paiements Fournisseurs",
    value: "378,135 DA",
    change: "-3.1%",
    icon: Building2,
    color: "text-purple-500",
    trend: "down"
  },
  {
    title: "Taux de Recouvrement",
    value: "92%",
    change: "+5.3%",
    icon: TrendingUp,
    color: "text-amber-500",
    trend: "up"
  }
];

export function PaymentStatsWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="col-span-3"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={stat.title}
              className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                  <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </motion.div>
  );
}