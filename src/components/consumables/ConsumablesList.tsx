import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";

interface ConsumablesListProps {
  onEdit: (consumable: any) => void;
}

const mockConsumables = [
  {
    id: 1,
    date: "2024-02-20",
    type: "Carburant",
    vehicle: "Camion Mercedes Actros",
    quantity: 150,
    unit: "L",
    cost: 15000,
  },
  {
    id: 2,
    date: "2024-02-21",
    type: "Carburant",
    vehicle: "Centrale à béton",
    quantity: 200,
    unit: "L",
    cost: 20000,
  },
];

const ConsumablesList = ({ onEdit }: ConsumablesListProps) => {
  const handleDelete = (id: number) => {
    console.log("Deleting consumable:", id);
    toast.success("Consommation supprimée");
  };

  return (
    <div className="rounded-md border border-gray-700/50">
      <Table>
        <TableHeader className="bg-gray-900/50 backdrop-blur-xl">
          <TableRow className="border-b border-gray-700">
            <TableHead className="text-gray-300">Date</TableHead>
            <TableHead className="text-gray-300">Type</TableHead>
            <TableHead className="text-gray-300">Véhicule/Équipement</TableHead>
            <TableHead className="text-gray-300">Quantité</TableHead>
            <TableHead className="text-gray-300">Coût (DA)</TableHead>
            <TableHead className="text-right text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockConsumables.map((consumable) => (
            <TableRow key={consumable.id} className="border-b border-gray-700/50 hover:bg-gray-800/50 backdrop-blur-xl transition-colors">
              <TableCell className="text-gray-300">{new Date(consumable.date).toLocaleDateString()}</TableCell>
              <TableCell className="text-gray-300">{consumable.type}</TableCell>
              <TableCell className="text-gray-300">{consumable.vehicle}</TableCell>
              <TableCell className="text-gray-300">{consumable.quantity} {consumable.unit}</TableCell>
              <TableCell className="text-gray-300">{consumable.cost}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(consumable)}
                    className="hover:bg-gray-700/50"
                  >
                    <Edit className="h-4 w-4 text-gray-300" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(consumable.id)}
                    className="hover:bg-gray-700/50"
                  >
                    <Trash className="h-4 w-4 text-gray-300" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ConsumablesList;