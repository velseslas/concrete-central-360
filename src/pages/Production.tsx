import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Factory, Plus, Search, Calendar, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface ProductionOrder {
  id: string;
  orderNumber: string;
  client: string;
  formulation: string;
  volume: number;
  status: "pending" | "in_progress" | "completed";
  deliveryDate: string;
}

const Production = () => {
  const [productionOrders] = useState<ProductionOrder[]>([
    {
      id: "1",
      orderNumber: "PRD001",
      client: "Client A",
      formulation: "B25",
      volume: 30,
      status: "in_progress",
      deliveryDate: "2024-03-25",
    },
    {
      id: "2",
      orderNumber: "PRD002",
      client: "Client B",
      formulation: "B30",
      volume: 45,
      status: "pending",
      deliveryDate: "2024-03-26",
    },
  ]);

  const getStatusBadge = (status: ProductionOrder["status"]) => {
    const statusConfig = {
      pending: { label: "En attente", className: "bg-yellow-500/20 text-yellow-400" },
      in_progress: { label: "En cours", className: "bg-blue-500/20 text-blue-400" },
      completed: { label: "Terminée", className: "bg-green-500/20 text-green-400" },
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
                <Factory className="h-6 w-6 text-blue-400" />
                Production en Cours
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
              {productionOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="text-white font-medium flex items-center gap-2">
                        <Factory className="h-4 w-4 text-blue-400" />
                        {order.orderNumber}
                      </h3>
                      <p className="text-gray-400 text-sm">{order.client}</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                      <div className="text-right">
                        <p className="text-white font-medium">{order.formulation}</p>
                        <p className="text-gray-400 text-sm">{order.volume} m³</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-400" />
                        <span className="text-sm text-gray-300">
                          {order.deliveryDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(order.status)}
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

export default Production;