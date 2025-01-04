import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { OrderForm } from "@/components/orders/OrderForm";

interface Order {
  id: string;
  formulation: string;
  volume: number;
  status: "pending" | "in_progress" | "completed";
  deliveryDate: string;
}

interface OrderWidgetProps {
  clientId: number;
}

export function OrderWidget({ clientId }: OrderWidgetProps) {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orders] = useState<Order[]>([
    {
      id: "CMD001",
      formulation: "B25",
      volume: 30,
      status: "pending",
      deliveryDate: "2024-03-20",
    }
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

  const handleSubmit = (data: any) => {
    console.log("New order:", data);
    setShowOrderForm(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Commandes</CardTitle>
        <Button onClick={() => setShowOrderForm(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle commande
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>N° Commande</TableHead>
              <TableHead>Formulation</TableHead>
              <TableHead>Volume (m³)</TableHead>
              <TableHead>Date de livraison</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.formulation}</TableCell>
                <TableCell>{order.volume}</TableCell>
                <TableCell>{order.deliveryDate}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <OrderForm
        open={showOrderForm}
        onOpenChange={setShowOrderForm}
        onSubmit={handleSubmit}
      />
    </Card>
  );
}