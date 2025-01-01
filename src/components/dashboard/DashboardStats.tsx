import { TrendingUp, Users, Truck, AlertTriangle, DollarSign, Package } from "lucide-react";

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
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
              </div>
              <div className={`rounded-full p-3 ${stat.trendUp ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className={`text-sm ${stat.trendUp ? "text-green-600" : "text-red-600"}`}>
                {stat.trend}
              </span>
              <span className="text-sm text-gray-500">{stat.description}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;