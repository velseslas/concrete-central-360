import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, FileText, Edit, Trash2 } from "lucide-react";
import { PurchaseOrderForm } from "./forms/PurchaseOrderForm";
import { toast } from "sonner";

// Données d'exemple
const mockOrders = [
  {
    id: 1,
    supplier: "SARL CIMENT PLUS",
    product: "Ciment",
    quantity: 100,
    unitPrice: 1200,
    total: 120000,
    deliveryDate: "2024-03-25",
    status: "En attente"
  },
  {
    id: 2,
    supplier: "EURL AGREGATS",
    product: "Gravier 8/15",
    quantity: 50,
    unitPrice: 800,
    total: 40000,
    deliveryDate: "2024-03-26",
    status: "Validé"
  }
];

export function PurchaseOrderWidget() {
  const [showNewOrderForm, setShowNewOrderForm] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState<any>(null);

  const handleEdit = (order: any) => {
    setOrderToEdit(order);
    setShowNewOrderForm(true);
  };

  const handleDelete = (orderId: number) => {
    console.log("Deleting order:", orderId);
    toast.success("Bon de commande supprimé");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Bons de commande</CardTitle>
        <Button onClick={() => setShowNewOrderForm(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nouveau bon de commande
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fournisseur</TableHead>
              <TableHead>Produit</TableHead>
              <TableHead>Quantité</TableHead>
              <TableHead>Prix unitaire</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date livraison</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.supplier}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.unitPrice.toLocaleString()} DA</TableCell>
                <TableCell>{order.total.toLocaleString()} DA</TableCell>
                <TableCell>{order.deliveryDate}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(order)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(order.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <PurchaseOrderForm
          open={showNewOrderForm}
          onOpenChange={setShowNewOrderForm}
          orderToEdit={orderToEdit}
        />
      </CardContent>
    </Card>
  );
}