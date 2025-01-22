import { Card } from "@/components/ui/card";
import { Construction, CheckCircle2, Clock } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import { ProjectList } from "./ProjectList";

interface Project {
  id: number;
  name: string;
  client: string;
  status: string;
  concreteQuantity: string;
  createdAt: string;
}

interface ProjectStatsProps {
  projects: Project[];
}

export function ProjectStats({ projects }: ProjectStatsProps) {
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  const totalProjects = projects.length;
  const inProgressProjects = projects.filter(p => p.status.toLowerCase() === "en cours");
  const completedProjects = projects.filter(p => p.status.toLowerCase() === "terminé");

  const inProgressPercentage = totalProjects > 0 ? Math.round((inProgressProjects.length / totalProjects) * 100) : 0;
  const completedPercentage = totalProjects > 0 ? Math.round((completedProjects.length / totalProjects) * 100) : 0;

  const stats = [
    {
      id: "total",
      title: "Total Chantiers",
      value: totalProjects,
      percentage: "100%",
      icon: Construction,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      projects: projects
    },
    {
      id: "inProgress",
      title: "Chantiers en Cours",
      value: inProgressProjects.length,
      percentage: `${inProgressPercentage}%`,
      icon: Clock,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      projects: inProgressProjects
    },
    {
      id: "completed",
      title: "Chantiers Terminés",
      value: completedProjects.length,
      percentage: `${completedPercentage}%`,
      icon: CheckCircle2,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      projects: completedProjects
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.id}
              className="p-4 bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-800 shadow-xl cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => setSelectedStat(stat.id)}
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

      <Sheet open={selectedStat !== null} onOpenChange={() => setSelectedStat(null)}>
        <SheetContent side="right" className="w-full sm:w-[540px] bg-gray-900/95 border-gray-800">
          <SheetHeader>
            <SheetTitle className="text-white">
              {stats.find(s => s.id === selectedStat)?.title}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <ProjectList 
              projects={stats.find(s => s.id === selectedStat)?.projects || []} 
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}