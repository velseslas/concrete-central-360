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
            <motion.h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            </motion.h1>
            <p className="text-gray-400">Gestion de la production</p>
          </div>
          <Button className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300">
            <ClipboardList className="mr-2 h-4 w-4" />
            Nouvelle production
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Productions en cours</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>N° Production</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Formulation</TableHead>
                    <TableHead>Volume (m³)</TableHead>
                    <TableHead>Date de livraison</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productionOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.orderNumber}</TableCell>
                      <TableCell>{order.client}</TableCell>
                      <TableCell>{order.formulation}</TableCell>
                      <TableCell>{order.volume}</TableCell>
                      <TableCell>{order.deliveryDate}</TableCell>
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
