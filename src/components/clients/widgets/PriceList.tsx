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
    <div className="rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-900/50 backdrop-blur-xl">
          <TableRow className="border-b border-gray-700 hover:bg-gray-800/50">
            <TableHead className="text-gray-300">Client</TableHead>
            <TableHead className="text-gray-300">Chantier</TableHead>
            <TableHead className="text-gray-300">Catégorie</TableHead>
            <TableHead className="text-gray-300">Produit</TableHead>
            <TableHead className="text-gray-300">Prix</TableHead>
            <TableHead className="text-right text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockPrices.map((price) => (
            <TableRow key={price.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors duration-200">
              <TableCell className="text-gray-300">{price.client}</TableCell>
              <TableCell className="text-gray-300">{price.project}</TableCell>
              <TableCell className="text-gray-300">Béton</TableCell>
              <TableCell className="text-gray-300">{price.product}</TableCell>
              <TableCell className="text-gray-300">{price.price.toLocaleString()} DA</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onEdit(price)}
                    className="hover:bg-gray-700/50"
                  >
                    <Edit className="h-4 w-4 text-gray-300" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDelete(price.id)}
                    className="hover:bg-gray-700/50"
                  >
                    <Trash2 className="h-4 w-4 text-gray-300" />
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