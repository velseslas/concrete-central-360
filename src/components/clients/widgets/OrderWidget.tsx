import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { OrderForm } from "@/components/orders/OrderForm";
import { motion } from "framer-motion";

interface Order {
  id: string;
  formulation: string;
  volume: number;
  status: "pending" | "in_progress" | "completed";
  deliveryDate: string;
  client: string;
  project: string;
  category: string;
}

interface OrderWidgetProps {
  clientId: number;
}

export function OrderWidget({ clientId }: OrderWidgetProps) {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orders] = useState<Order[]>([
    {
      id: "CMD001",
      deliveryDate: "2024-03-20",
      client: "Client A",
      project: "Projet 1",
      category: "Béton",
      formulation: "B25",
      volume: 30,
      status: "pending",
    }
  ]);

  const getStatusBadge = (status: Order["status"]) => {
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

  const handleSubmit = (data: any) => {
    console.log("New order:", data);
    setShowOrderForm(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-white flex items-center gap-2">Commandes</CardTitle>
          <Button 
            onClick={() => setShowOrderForm(true)} 
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle commande
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-gray-800/50">
                    <TableHead className="text-gray-300">N° Commande</TableHead>
                    <TableHead className="text-gray-300">Date de livraison</TableHead>
                    <TableHead className="text-gray-300">Client</TableHead>
                    <TableHead className="text-gray-300">Chantier</TableHead>
                    <TableHead className="text-gray-300">Catégorie</TableHead>
                    <TableHead className="text-gray-300">Produit</TableHead>
                    <TableHead className="text-gray-300">Quantité</TableHead>
                    <TableHead className="text-gray-300">Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-gray-700/50">
                      <TableCell className="font-medium text-blue-400">{order.id}</TableCell>
                      <TableCell className="text-gray-300">{order.deliveryDate}</TableCell>
                      <TableCell className="text-gray-300">{order.client}</TableCell>
                      <TableCell className="text-gray-300">{order.project}</TableCell>
                      <TableCell className="text-gray-300">{order.category}</TableCell>
                      <TableCell className="text-gray-300">{order.formulation}</TableCell>
                      <TableCell className="text-gray-300">{order.volume}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      <OrderForm
        open={showOrderForm}
        onOpenChange={setShowOrderForm}
        onSubmit={handleSubmit}
      />
    </motion.div>
  );
}