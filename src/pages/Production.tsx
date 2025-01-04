import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ClipboardList, Truck } from "lucide-react";

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
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Production</h1>
          <p className="text-gray-500">Gestion de la production</p>
        </div>
        <Button className="bg-primary">
          <ClipboardList className="mr-2 h-4 w-4" />
          Nouvelle production
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Production du jour</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75 m³</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En cours</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volume total</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150 m³</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Productions en cours</CardTitle>
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
    </div>
  );
};

export default Production;