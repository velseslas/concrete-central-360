import { TrendingUp, Users, Truck, AlertTriangle, DollarSign, Package } from "lucide-react";
import { motion } from "framer-motion";

const DashboardStats = () => {
  const stats = [
    {
      title: "Production du jour",
      value: "150 m³",
      icon: TrendingUp,
      trend: "+12.5%",
      trendUp: true,
      description: "Par rapport à hier"
    },
    {
      title: "Clients actifs",
      value: "24",
      icon: Users,
      trend: "+2",
      trendUp: true,
      description: "Nouveaux clients"
    },
    {
      title: "Livraisons en cours",
      value: "8",
      icon: Truck,
      trend: "Normal",
      trendUp: true,
      description: "En temps et en heure"
    },
    {
      title: "Alertes stock",
      value: "2",
      icon: AlertTriangle,
      trend: "Attention",
      trendUp: false,
      description: "Stocks faibles"
    },
    {
      title: "Chiffre d'affaires",
      value: "45,250 DA",
      icon: DollarSign,
      trend: "+8.2%",
      trendUp: true,
      description: "Ce mois-ci"
    },
    {
      title: "Commandes",
      value: "12",
      icon: Package,
      trend: "+3",
      trendUp: true,
      description: "Nouvelles commandes"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 hover:border-gray-600/50 transition-all duration-300 hover:shadow-lg group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                <p className="mt-2 text-2xl font-semibold text-white group-hover:text-[#0EA5E9] transition-colors">
                  {stat.value}
                </p>
              </div>
              <div className={`rounded-full p-3 ${
                stat.trendUp 
                  ? "bg-[#0EA5E9]/10 text-[#0EA5E9] group-hover:bg-[#0EA5E9]/20" 
                  : "bg-red-500/10 text-red-500 group-hover:bg-red-500/20"
              } transition-colors`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className={`text-sm ${
                stat.trendUp ? "text-[#0EA5E9]" : "text-red-500"
              }`}>
                {stat.trend}
              </span>
              <span className="text-sm text-gray-400">{stat.description}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DashboardStats;