import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Truck, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface Order {
  id: string;
  client: string;
  formulation: string;
  volume: number;
  status: "pending" | "in_progress" | "completed";
  deliveryDate: string;
}

const Orders = () => {
  const [orders] = useState<Order[]>([
    {
      id: "CMD001",
      client: "Client A",
      formulation: "B25",
      volume: 30,
      status: "pending",
      deliveryDate: "2024-03-20",
    },
    {
      id: "CMD002",
      client: "Client B",
      formulation: "B30",
      volume: 45,
      status: "in_progress",
      deliveryDate: "2024-03-21",
    },
  ]);

  const getStatusBadge = (status: Order["status"]) => {
    const statusConfig = {
      pending: { label: "En attente", className: "bg-yellow-100 text-yellow-800 border-yellow-300" },
      in_progress: { label: "En cours", className: "bg-blue-100 text-blue-800 border-blue-300" },
      completed: { label: "Terminée", className: "bg-green-100 text-green-800 border-green-300" },
    };

    const config = statusConfig[status];
    return (
      <Badge variant="outline" className={`${config.className} animate-fade-in`}>
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
          className="flex justify-end items-center"
        >
          <Button className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle commande
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: FileText, title: "Total commandes", value: orders.length, color: "blue" },
            { icon: Truck, title: "En cours", value: orders.filter((o) => o.status === "in_progress").length, color: "yellow" },
            { icon: CheckCircle, title: "Terminées", value: orders.filter((o) => o.status === "completed").length, color: "green" }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 bg-${stat.color}-100 rounded-full`}>
                      <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                      <p className="text-2xl font-semibold">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Liste des commandes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>N° Commande</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Formulation</TableHead>
                      <TableHead>Volume (m³)</TableHead>
                      <TableHead>Date de livraison</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow 
                        key={order.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.client}</TableCell>
                        <TableCell>{order.formulation}</TableCell>
                        <TableCell>{order.volume}</TableCell>
                        <TableCell>{order.deliveryDate}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Orders;
