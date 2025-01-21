import { Card } from "@/components/ui/card";
import { Construction, CheckCircle2, Clock } from "lucide-react";

interface ProjectStatsProps {
  projects: {
    id: number;
    name: string;
    client: string;
    status: string;
    concreteQuantity: string;
  }[];
}

export function ProjectStats({ projects }: ProjectStatsProps) {
  const totalProjects = projects.length;
  const inProgressProjects = projects.filter(p => p.status.toLowerCase() === "en cours").length;
  const completedProjects = projects.filter(p => p.status.toLowerCase() === "terminé").length;

  const inProgressPercentage = totalProjects > 0 ? Math.round((inProgressProjects / totalProjects) * 100) : 0;
  const completedPercentage = totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0;

  const stats = [
    {
      title: "Total Chantiers",
      value: totalProjects,
      percentage: "100%",
      icon: Construction,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      title: "Chantiers en Cours",
      value: inProgressProjects,
      percentage: `${inProgressPercentage}%`,
      icon: Clock,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
    },
    {
      title: "Chantiers Terminés",
      value: completedProjects,
      percentage: `${completedPercentage}%`,
      icon: CheckCircle2,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className="p-4 bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-800 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                <div className="flex items-baseline gap-2">
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {stat.value}
                  </p>
                  <span className={`text-sm ${stat.color}`}>
                    {stat.percentage}
                  </span>
                </div>
              </div>
              <div className={`rounded-full p-3 ${stat.bgColor}`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}