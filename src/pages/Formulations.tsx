import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Beaker, Plus, Search, Calendar, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface Formulation {
  id: string;
  name: string;
  type: string;
  resistance: string;
  status: "active" | "inactive" | "draft";
  lastModified: string;
}

const Formulations = () => {
  const [formulations] = useState<Formulation[]>([
    {
      id: "1",
      name: "B25",
      type: "Standard",
      resistance: "25 MPa",
      status: "active",
      lastModified: "2024-03-20",
    },
    {
      id: "2",
      name: "B30",
      type: "Haute Performance",
      resistance: "30 MPa",
      status: "draft",
      lastModified: "2024-03-19",
    },
  ]);

  const getStatusBadge = (status: Formulation["status"]) => {
    const statusConfig = {
      active: { label: "Active", className: "bg-green-500/20 text-green-400" },
      inactive: { label: "Inactive", className: "bg-red-500/20 text-red-400" },
      draft: { label: "Brouillon", className: "bg-yellow-500/20 text-yellow-400" },
    };

    const config = statusConfig[status];
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 space-y-6">
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
                <Beaker className="h-6 w-6 text-blue-400" />
                Formulations de Béton
              </CardTitle>
              <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                <div className="relative flex-grow md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Rechercher une formulation..." 
                    className="pl-9 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400"
                  />
                </div>
                <Button variant="outline" size="sm" className="text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle Formulation
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formulations.map((formulation) => (
                <motion.div
                  key={formulation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="text-white font-medium flex items-center gap-2">
                        <Beaker className="h-4 w-4 text-blue-400" />
                        {formulation.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{formulation.type}</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                      <div className="text-right">
                        <p className="text-white font-medium">{formulation.resistance}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-400" />
                        <span className="text-sm text-gray-300">
                          {formulation.lastModified}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(formulation.status)}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-blue-500/20"
                        >
                          <ArrowUpRight className="h-4 w-4 text-blue-400" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Formulations;