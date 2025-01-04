import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DeliveryForm } from "./forms/DeliveryForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Données mockées pour la démonstration
const mockDeliveries = [
  {
    id: 1,
    date: "2024-03-20",
    supplier: "Carrière du Nord",
    producer: "Lafarge",
    category: "Gravier",
    product: "Gravier 20/40",
    quantity: "30",
    unit: "tonnes",
    vehicleNumber: "1234-ABC-16",
    deliveryNoteNumber: "BL-2024-001",
  },
  {
    id: 2,
    date: "2024-03-19",
    supplier: "Ciments Algérie",
    producer: "GICA",
    category: "Ciment",
    product: "CEM II/A",
    quantity: "25",
    unit: "tonnes",
    vehicleNumber: "5678-XYZ-16",
    deliveryNoteNumber: "BL-2024-002",
  },
];

export function DeliveryWidget() {
  const [showNewDeliveryForm, setShowNewDeliveryForm] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Livraisons</CardTitle>
        <Button onClick={() => setShowNewDeliveryForm(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle livraison
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Fournisseur</TableHead>
                <TableHead>Producteur</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Unité</TableHead>
                <TableHead>N° Camion</TableHead>
                <TableHead>N° BL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDeliveries.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell>{delivery.date}</TableCell>
                  <TableCell>{delivery.supplier}</TableCell>
                  <TableCell>{delivery.producer}</TableCell>
                  <TableCell>{delivery.category}</TableCell>
                  <TableCell>{delivery.product}</TableCell>
                  <TableCell>{delivery.quantity}</TableCell>
                  <TableCell>{delivery.unit}</TableCell>
                  <TableCell>{delivery.vehicleNumber}</TableCell>
                  <TableCell>{delivery.deliveryNoteNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DeliveryForm 
          open={showNewDeliveryForm} 
          onOpenChange={setShowNewDeliveryForm}
        />
      </CardContent>
    </Card>
  );
}