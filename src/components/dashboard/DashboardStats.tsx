import { TrendingUp, Users, Truck, AlertTriangle } from "lucide-react";

const DashboardStats = () => {
  const stats = [
    {
      title: "Production du jour",
      value: "150 m³",
      icon: TrendingUp,
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: "Clients actifs",
      value: "24",
      icon: Users,
      trend: "+2",
      trendUp: true,
    },
    {
      title: "Livraisons en cours",
      value: "8",
      icon: Truck,
      trend: "Normal",
      trendUp: true,
    },
    {
      title: "Alertes stock",
      value: "2",
      icon: AlertTriangle,
      trend: "Attention",
      trendUp: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="card-dashboard">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="mt-1 text-2xl font-semibold">{stat.value}</p>
              </div>
              <div className={`rounded-full p-2 ${stat.trendUp ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm ${stat.trendUp ? "text-green-600" : "text-red-600"}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;