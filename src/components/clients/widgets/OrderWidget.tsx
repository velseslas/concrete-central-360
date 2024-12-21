import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Trash2 } from "lucide-react";
import { OrderForm } from "@/components/orders/OrderForm";
import { toast } from "sonner";

interface Order {
  id: string;
  clientId: number;
  clientName: string;
  product: string;
  quantity: number;
  deliveryDate: string;
  orderDate: string; // Added this line to resolve the TypeScript error
  totalPrice: number;
  status: "pending" | "in_progress" | "completed";
}

export function OrderWidget() {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "CMD001",
      clientId: 1,
      clientName: "Client A",
      product: "B25",
      quantity: 30,
      deliveryDate: "2024-03-20",
      orderDate: new Date().toISOString().split('T')[0], // Added this line
      totalPrice: 150000,
      status: "pending",
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

  const handleNewOrder = () => {
    setSelectedOrder(null);
    setShowOrderForm(true);
  };

  const handleDeleteOrder = (orderId: string) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette commande ?");
    if (confirmDelete) {
      setOrders(orders.filter(order => order.id !== orderId));
      toast.success("Commande supprimée avec succès");
    }
  };

  const handleSubmit = (data: any) => {
    console.log("Form submitted:", data);
    if (selectedOrder) {
      toast.success("Commande modifiée avec succès");
    } else {
      toast.success("Nouvelle commande créée avec succès");
    }
    setShowOrderForm(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Commandes Clients
        </CardTitle>
        <Button onClick={handleNewOrder} size="sm">
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow 
                  key={order.id}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <TableCell className="font-medium" onClick={() => handleEdit(order)}>{order.id}</TableCell>
                  <TableCell onClick={() => handleEdit(order)}>{order.clientName}</TableCell>
                  <TableCell onClick={() => handleEdit(order)}>{order.product}</TableCell>
                  <TableCell onClick={() => handleEdit(order)}>{order.quantity} m³</TableCell>
                  <TableCell onClick={() => handleEdit(order)}>{order.deliveryDate}</TableCell>
                  <TableCell onClick={() => handleEdit(order)}>{order.totalPrice.toLocaleString()} DA</TableCell>
                  <TableCell onClick={() => handleEdit(order)}>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteOrder(order.id);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <OrderForm
        open={showOrderForm}
        onOpenChange={setShowOrderForm}
        onSubmit={handleSubmit}
        orderToEdit={selectedOrder}
      />
    </Card>
  );
}