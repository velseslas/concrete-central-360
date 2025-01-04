import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import { PriceForm } from "./forms/PriceForm";
import { toast } from "sonner";

// Données mockées pour la démonstration
const mockPrices = [
  {
    id: 1,
    supplier: "SARL CIMENT PLUS",
    category: "Ciment",
    product: "CEM II/A",
    price: 12000,
    unit: "tonne",
    startDate: "2024-03-01",
    endDate: "2024-06-30"
  },
  {
    id: 2,
    supplier: "EURL AGREGATS",
    category: "Gravier",
    product: "Gravier 15/25",
    price: 3500,
    unit: "m³",
    startDate: "2024-03-01",
    endDate: "2024-12-31"
  }
];

export function PriceWidget() {
  const [showNewPriceForm, setShowNewPriceForm] = useState(false);
  const [priceToEdit, setPriceToEdit] = useState<any>(null);

  const handleEdit = (price: any) => {
    setPriceToEdit(price);
    setShowNewPriceForm(true);
  };

  const handleDelete = (priceId: number) => {
    console.log("Deleting price:", priceId);
    toast.success("Prix supprimé");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Prix des Produits</CardTitle>
        <Button onClick={() => setShowNewPriceForm(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nouveau prix
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fournisseur</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Produit</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Unité</TableHead>
              <TableHead>Date début</TableHead>
              <TableHead>Date fin</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPrices.map((price) => (
              <TableRow key={price.id}>
                <TableCell>{price.supplier}</TableCell>
                <TableCell>{price.category}</TableCell>
                <TableCell>{price.product}</TableCell>
                <TableCell>{price.price.toLocaleString()} DA</TableCell>
                <TableCell>{price.unit}</TableCell>
                <TableCell>{price.startDate}</TableCell>
                <TableCell>{price.endDate}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(price)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(price.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <PriceForm 
          open={showNewPriceForm} 
          onOpenChange={setShowNewPriceForm}
          priceToEdit={priceToEdit}
        />
      </CardContent>
    </Card>
  );
}