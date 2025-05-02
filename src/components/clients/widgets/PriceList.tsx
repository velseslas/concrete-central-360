
import { Button } from "@/components/ui/button";
import { Edit, FileText, Trash2 } from "lucide-react";
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
      {mockPrices.map((price) => (
        <motion.div
          key={price.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-5 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:bg-gray-800/60 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-white font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-400" />
                {price.client}
              </h3>
              <p className="text-gray-400 text-sm">{price.project}</p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
              <div>
                <p className="text-white font-medium">{price.product}</p>
                <p className="text-blue-400 font-semibold">{price.price.toLocaleString()} DA</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(price)}
                  className="hover:bg-blue-500/20 text-blue-400 hover:text-blue-300"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(price.id)}
                  className="hover:bg-red-500/20 text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
