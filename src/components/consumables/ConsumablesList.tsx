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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Véhicule/Équipement</TableHead>
          <TableHead>Quantité</TableHead>
          <TableHead>Coût (DA)</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockConsumables.map((consumable) => (
          <TableRow key={consumable.id}>
            <TableCell>{new Date(consumable.date).toLocaleDateString()}</TableCell>
            <TableCell>{consumable.type}</TableCell>
            <TableCell>{consumable.vehicle}</TableCell>
            <TableCell>{consumable.quantity} {consumable.unit}</TableCell>
            <TableCell>{consumable.cost}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(consumable)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(consumable.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ConsumablesList;