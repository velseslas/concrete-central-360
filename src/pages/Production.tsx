import { motion } from "framer-motion";
import { ProductionWidget } from "@/components/production/ProductionWidget";
import { ProductionReportsWidget } from "@/components/clients/widgets/production/reports/ProductionReportsWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Production = () => {
  // Données de production pour l'exemple
  const productions = [
    {
      id: "PRD001",
      date: "2024-03-20",
      client: "Client A",
      formulation: "B25",
      volume: 30,
      status: "completed",
    },
    {
      id: "PRD002",
      date: "2024-03-20",
      client: "Client B",
      formulation: "B30",
      volume: 45,
      status: "in_progress",
    },
    {
      id: "PRD003",
      date: "2024-03-20",
      client: "Client C",
      formulation: "B40",
      volume: 25,
      status: "pending",
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "En attente", className: "bg-yellow-100 text-yellow-800" },
      in_progress: { label: "En cours", className: "bg-blue-100 text-blue-800" },
      completed: { label: "Terminée", className: "bg-green-100 text-green-800" },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto p-4 lg:p-6 xl:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-8"
      >
        {/* Section principale avec les statistiques */}
        <div className="grid grid-cols-1 gap-8">
          <ProductionWidget />
        </div>

        {/* Section des rapports */}
        <div className="grid grid-cols-1 gap-8">
          <ProductionReportsWidget />
        </div>

        {/* Liste des productions */}
        <div className="grid grid-cols-1 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="group"
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="h-6 w-6 text-blue-400" />
                    Liste des Productions
                  </CardTitle>
                  <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                    <div className="relative flex-grow md:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input 
                        placeholder="Rechercher une production..." 
                        className="pl-9 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400"
                      />
                    </div>
                    <Button variant="outline" size="sm" className="text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Nouvelle Production
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productions.map((production) => (
                    <div
                      key={production.id}
                      className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <h3 className="text-white font-medium flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-400" />
                            {production.id}
                          </h3>
                          <p className="text-gray-400 text-sm">{production.client}</p>
                        </div>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                          <div className="text-right">
                            <p className="text-white font-medium">{production.volume} m³</p>
                            <p className="text-gray-400 text-sm">{production.date}</p>
                          </div>
                          <div>
                            {getStatusBadge(production.status)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Production;