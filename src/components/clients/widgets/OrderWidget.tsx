import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus } from "lucide-react";
import { OrderForm } from "@/components/orders/OrderForm";

interface Order {
  id: string;
  clientId: number;
  clientName: string;
  product: string;
  quantity: number;
  status: "pending" | "in_progress" | "completed";
  orderDate: string;
  deliveryDate: string;
  totalPrice: number;
}

export function OrderWidget() {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Mock data - replace with actual data fetching
  const [orders] = useState<Order[]>([
    {
      id: "CMD001",
      clientId: 1,
      clientName: "Entreprise ABC",
      product: "Béton B25",
      quantity: 30,
      status: "pending",
      orderDate: "2024-03-15",
      deliveryDate: "2024-03-20",
      totalPrice: 360000,
    },
  ]);

  const getStatusBadge = (status: Order["status"]) => {
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

  const handleEdit = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderForm(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Commandes Clients
        </CardTitle>
        <Button onClick={() => setShowOrderForm(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle commande
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N° Commande</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Date de livraison</TableHead>
                <TableHead>Prix Total</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow 
                  key={order.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleEdit(order)}
                >
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.clientName}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.quantity} m³</TableCell>
                  <TableCell>{order.deliveryDate}</TableCell>
                  <TableCell>{order.totalPrice.toLocaleString()} DA</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <OrderForm
        open={showOrderForm}
        onOpenChange={setShowOrderForm}
        orderToEdit={selectedOrder}
      />
    </Card>
  );
}