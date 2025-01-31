import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Eye, Calendar, ChartBar, ChartLine } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Report {
  id: string;
  title: string;
  icon: JSX.Element;
  period: string;
  data: {
    totalClients: number;
    totalProjects: number;
    totalRevenue: number;
  };
}

export function ReportsWidget() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Mock data for demonstration
  const reports: Report[] = [
    {
      id: "daily",
      title: "Rapport Quotidien",
      icon: <Calendar className="h-5 w-5 text-blue-400" />,
      period: format(new Date(), "d MMMM yyyy", { locale: fr }),
      data: {
        totalClients: 12,
        totalProjects: 8,
        totalRevenue: 45000
      }
    },
    {
      id: "weekly",
      title: "Rapport Hebdomadaire",
      icon: <ChartBar className="h-5 w-5 text-indigo-400" />,
      period: `Semaine du ${format(new Date(), "d MMMM yyyy", { locale: fr })}`,
      data: {
        totalClients: 45,
        totalProjects: 23,
        totalRevenue: 180000
      }
    },
    {
      id: "monthly",
      title: "Rapport Mensuel",
      icon: <ChartLine className="h-5 w-5 text-purple-400" />,
      period: format(new Date(), "MMMM yyyy", { locale: fr }),
      data: {
        totalClients: 156,
        totalProjects: 89,
        totalRevenue: 750000
      }
    }
  ];

  const handlePreview = (report: Report) => {
    console.log("Opening preview for report:", report.title);
    setSelectedReport(report);
    setPreviewOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-400" />
            Rapports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reports.map((report) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="relative p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-gray-600/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {report.icon}
                    <h3 className="font-semibold text-gray-200">{report.title}</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePreview(report)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Aperçu
                  </Button>
                </div>
                <p className="text-sm text-gray-400 mb-3">{report.period}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Clients</span>
                    <span className="text-gray-200">{report.data.totalClients}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Projets</span>
                    <span className="text-gray-200">{report.data.totalProjects}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Chiffre d'affaires</span>
                    <span className="text-gray-200">{report.data.totalRevenue.toLocaleString()} DA</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedReport?.icon}
              <span>{selectedReport?.title} - Aperçu</span>
            </DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                <h3 className="text-lg font-semibold mb-4">Informations générales</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-gray-800/80">
                    <p className="text-sm text-gray-400">Total Clients</p>
                    <p className="text-2xl font-bold text-blue-400">
                      {selectedReport?.data.totalClients}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-800/80">
                    <p className="text-sm text-gray-400">Total Projets</p>
                    <p className="text-2xl font-bold text-indigo-400">
                      {selectedReport?.data.totalProjects}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-800/80">
                    <p className="text-sm text-gray-400">Chiffre d'affaires</p>
                    <p className="text-2xl font-bold text-purple-400">
                      {selectedReport?.data.totalRevenue.toLocaleString()} DA
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}