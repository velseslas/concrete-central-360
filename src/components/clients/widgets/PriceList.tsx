import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface Price {
  id: number;
  client: string;
  product: string;
  project: string;
  price: number;
}

interface PriceListProps {
  onEdit: (price: Price) => void;
}

const mockPrices: Price[] = [
  {
    id: 1,
    client: "Client A",
    product: "Béton B25",
    project: "Projet X",
    price: 12000,
  },
  {
    id: 2,
    client: "Client B",
    product: "Pompe 36m",
    project: "Projet Y",
    price: 15000,
  },
];

export function PriceList({ onEdit }: PriceListProps) {
  const handleDelete = (priceId: number) => {
    console.log("Delete price:", priceId);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Produit</TableHead>
            <TableHead>Chantier</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockPrices.map((price) => (
            <TableRow key={price.id}>
              <TableCell>{price.client}</TableCell>
              <TableCell>{price.product}</TableCell>
              <TableCell>{price.project}</TableCell>
              <TableCell>{price.price.toLocaleString()} DA</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onEdit(price)}
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
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}