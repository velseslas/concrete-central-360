import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ClipboardList, Truck, ArrowUpRight } from "lucide-react";
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
      pending: { label: "En attente", className: "bg-yellow-100 text-yellow-800" },
      in_progress: { label: "En cours", className: "bg-blue-100 text-blue-800" },
      completed: { label: "Terminée", className: "bg-green-100 text-green-800" },
    };

    const config = statusConfig[status];
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6 space-y-6"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Production
            </h1>
            <p className="text-gray-400">Gestion de la production</p>
          </div>
          <Button className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300">
            <ClipboardList className="mr-2 h-4 w-4" />
            Nouvelle production
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Production du jour</CardTitle>
                <Calendar className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-400">75 m³</div>
                <p className="text-xs text-gray-500">+12% par rapport à hier</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">En cours</CardTitle>
                <Truck className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-400">3</div>
                <p className="text-xs text-gray-500">Productions actives</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Volume total</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">150 m³</div>
                <p className="text-xs text-gray-500">Cette semaine</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-200">Productions en cours</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-400">N° Production</TableHead>
                    <TableHead className="text-gray-400">Client</TableHead>
                    <TableHead className="text-gray-400">Formulation</TableHead>
                    <TableHead className="text-gray-400">Volume (m³)</TableHead>
                    <TableHead className="text-gray-400">Date de livraison</TableHead>
                    <TableHead className="text-gray-400">Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productionOrders.map((order) => (
                    <TableRow key={order.id} className="border-gray-700 hover:bg-gray-700/50 transition-colors">
                      <TableCell className="font-medium text-gray-300">{order.orderNumber}</TableCell>
                      <TableCell className="text-gray-300">{order.client}</TableCell>
                      <TableCell className="text-gray-300">{order.formulation}</TableCell>
                      <TableCell className="text-gray-300">{order.volume}</TableCell>
                      <TableCell className="text-gray-300">{order.deliveryDate}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Production;