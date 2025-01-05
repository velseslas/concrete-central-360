import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, FileText, Plus, Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

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
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative flex-grow md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Rechercher un prix..." 
            className="pl-9 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400"
          />
        </div>
      </div>

      <div className="space-y-4">
        {mockPrices.map((price) => (
          <motion.div
            key={price.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="font-medium flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  <FileText className="h-4 w-4 text-blue-400" />
                  {price.client}
                </h3>
                <p className="text-gray-400 text-sm">{price.project}</p>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                <div>
                  <p className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    {price.product}
                  </p>
                  <p className="text-gray-400 text-sm">{price.price.toLocaleString()} DA</p>
                </div>
                <div className="flex gap-2">
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
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}