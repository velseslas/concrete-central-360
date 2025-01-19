import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { OrderForm } from "@/components/orders/OrderForm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface OrderWidgetProps {
  clientId: number;
}

export function OrderWidget({ clientId }: OrderWidgetProps) {
  const [showNewOrderForm, setShowNewOrderForm] = useState(false);

  // Mock data for demonstration
  const orders = [
    {
      id: 1,
      date: "2024-03-20",
      status: "pending",
      total: 150000,
      items: 3
    },
    {
      id: 2,
      date: "2024-03-19",
      status: "completed",
      total: 275000,
      items: 5
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "En attente", className: "bg-yellow-500/20 text-yellow-400" },
      completed: { label: "Terminée", className: "bg-green-500/20 text-green-400" },
      cancelled: { label: "Annulée", className: "bg-red-500/20 text-red-400" }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-xl font-bold">Commandes</CardTitle>
        <Button 
          onClick={() => setShowNewOrderForm(true)}
          className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 border-indigo-500/20 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle Commande
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg overflow-hidden border border-gray-700/50">
          <Table>
            <TableHeader className="bg-gray-800/50">
              <TableRow>
                <TableHead className="text-gray-300">N°</TableHead>
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Articles</TableHead>
                <TableHead className="text-gray-300">Total</TableHead>
                <TableHead className="text-gray-300">Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="hover:bg-gray-800/30">
                  <TableCell className="font-medium text-white">#{order.id}</TableCell>
                  <TableCell className="text-gray-300">{order.date}</TableCell>
                  <TableCell className="text-gray-300">{order.items} articles</TableCell>
                  <TableCell className="text-gray-300">{order.total.toLocaleString()} DA</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <OrderForm
        open={showNewOrderForm}
        onOpenChange={setShowNewOrderForm}
        clientId={clientId}
      />
    </Card>
  );
}